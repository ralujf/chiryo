const { GoogleGenAI, Type } = require('@google/genai');
const User = require('../models/user');
const { matchObject } = require('../utils/matchingAlgo');

const AI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const CONFIG = {
  temperature: 0.4,
  topP: 0.95,
  responseMimeType: 'application/json',
  responseSchema: {
    type: Type.OBJECT,
    required: ['diagnosis'],
    properties: {
      diagnosis: {
        type: Type.OBJECT,
        required: ['name', 'description'],
        properties: {
          name: {
            type: Type.STRING,
          },
          description: {
            type: Type.STRING,
          },
        },
      },
    },
  },
  systemInstruction: [
    {
      text: `Act as a professional therapist and psychiatrist, diagnosing mental health problems. Ensure to provide a clear and comprehensive description as to why a prediction was created for the specific client. Keep a professional, light and friendly tone throughout the responses.`,
    },
  ],
};

const MODEL = 'gemini-2.5-flash-preview-04-17';

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
  const CONTENTS = [
    {
      role: 'user',
      parts: [
        {
          text: data,
        },
      ],
    },
  ];

  const response = await AI.models.generateContentStream({
    model: MODEL,
    config: CONFIG,
    contents: CONTENTS,
  });

  const chunks = [];

  for await (const chunk of response) {
    chunks.push(chunk.text);
  }

  const diagnosis = combineResponse(chunks);
  const cleanedResponse = parseFromJSON(diagnosis);

  return cleanedResponse;
}

const combineResponse = (geminiResponse) => {
  return geminiResponse.reduce((combined, chunk) => combined + chunk, '');
};

const parseFromJSON = (geminiResponse) => {
  const cleanedResponse = geminiResponse.replace(/```json\n|```/g, '');

  try {
    const parsedResponse = JSON.parse(cleanedResponse);
    return parsedResponse;
  } catch (err) {
    console.error('Failed to parse JSON response:', err);
    return null;
  }
};

const matchUserWithTherapist = async (req, res, next) => {
  const { userId } = req.body.data;
  const currentUser = await User.findById(userId).exec();

  if (!currentUser) {
    return res.status(404).send('No user found for this ID');
  }

  const { age, race, religion, problem } = currentUser;

  const response = await run(problem);

  if (!response || !response.diagnosis) {
    return res.status(500).send('Failed to diagnose user');
  }

  const userForMatching = {
    age: age,
    race: race,
    religion: religion,
    diagnosis: response.diagnosis.name,
  };

  try {
    let output = await matchObject(userForMatching);

    res.locals.data = output;

    return next();
  } catch (err) {
    console.error(`There has been an unexpected error: ${err}`);
    return res.status(500).send('Server error, matching unsuccessful' + err);
  }
};

module.exports = { matchUserWithTherapist };
