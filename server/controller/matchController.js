const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const matchObject = require('../utils/matchingAlgo');
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const User = require('../models/user');

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction:
    'Act as a professional psychiatrist, diagnosing mental health problems in a ranked order from most likely to least. Ensure to following the ranking with a clear description as to why this may be the case. Keep a professional and friendly tone throughout the responses.',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

/**
 * @typedef {Object}
 * @property {string} name - The name of the illness of which the users has been diagnosed with
 * @property {string} description - The description of the illness which the user has been diagnosed with
 */

/**
 * Predicted diagnosis
 * @typedef {Object} ModelResult
 * @property {Array<Object>} diagnosis - The array holding the predicted diagnosis as an object i.e  {"name": "depression", "description" : "description of symptoms"}
 */

/**
 * @param {Object} data - The users information from file://./../../client/src/views/questionnaire.jsx
 * @returns {ModelResult} diagnosisObject - The predicted diagnosis, accessible by response.diagnosis[0].name
 */

async function run(data) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'I have been very tired recently and have no motivation to do anything. I have no one to talk to and cant go another day like this',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: '```json\n{"diagnosis": [{"name": "Major Depressive Disorder", "description": "The persistent fatigue and lack of motivation, coupled with feelings of isolation and hopelessness, strongly suggest a potential Major Depressive Disorder. It\'s crucial to remember that this is just a possibility, and a professional evaluation is essential for a definitive diagnosis."}, {"name": "Adjustment Disorder", "description": "Given the recent onset of these symptoms and the mention of a specific trigger (\'cant go another day like this\'), an Adjustment Disorder with depressed mood is also a possibility. This diagnosis indicates a response to a stressful life event."}, {"name": "Generalized Anxiety Disorder", "description": "While fatigue and lack of motivation are not core symptoms of Generalized Anxiety Disorder, the accompanying statement about having no one to talk to could indicate social isolation driven by anxiety. This is less likely than the first two diagnoses, but still a possibility."}, {"name": "Chronic Fatigue Syndrome", "description": "While this diagnosis involves extreme fatigue, it\'s less likely given the mention of lack of motivation and the lack of other CFS symptoms. However, if fatigue is the most prominent concern, it\'s worth exploring this possibility."}]}\n\n```',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(data);
  console.log(result.response.text());
  return result.response.text();
}

const matchUserWithTherapist = async (req, res, next) => {
  // TODO: Erase these at some point, the user is already saved somewhere
  const { user } = req.body;
  const currentUser = await User.findOne({ username: user.username }).exec();

  if (!currentUser) {
    return res.status(404).send('No user found for this ID');
  }

  const { age, race, religion, problem } = user;

  const response = run(problem);

  const userForMatching = {
    age: age,
    race: race,
    religion: religion,
    diagnosis: response?.diagnosis[0].name,
  };

  try {
    // output format: { matches: [therapist1, therapist2, therapist3], diagnosis: userForMatching.diagnosis }
    let output = await matchObject(userForMatching);
    res.locals.matches = output;
    return next();
  } catch (error) {
    console.error(`There has been an unexpected error: ${error}`);
    return res.status(500).send('Server error, matching unsuccessful');
  }
};

module.exports = { matchUserWithTherapist };
