const stringComparison = require('string-comparison');
const Therapist = require('../models/therapist')

/**
 * 
 * @param {Object} objectA - object with any number of keys 
 * @param {Object} objectB - object with any number of keys
 * @returns 
 * @description - Return correlation score between two objects with the same keys using string comparison (cosine.similarity) and a simple distance calculation. The higher the number, the better the correlation
 */
function calculateCorrelation(objectA, objectB) {
    const keys = Object.keys(objectA);
    let totalScore = 0;
    let count = 0;
    
    keys.forEach(key => {
        const valueA = objectA[key];
        const valueB = objectB[key];
        
        if (typeof valueA === 'number' && typeof valueB === 'number') {
            // Normalize the difference between numbers to a score between 0 and 1
            const max = Math.max(valueA, valueB);
            const min = Math.min(valueA, valueB);
            const score = 1 - (max - min) / (max + min);
            totalScore += score;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
            // Use string-comparison to get a score between 0 and 1
            const cosine = stringComparison.cosine;
            const score = cosine.similarity(valueA, valueB);
            totalScore += score;
        } else {
            // skip 
        }
        count++;
    });

    return count > 0 ? totalScore / count : 0;
}
/**
 * 
 * @param {Object} objectA - an object with any keys
 * @param {Object} objectB - an objects with any keys
 * @returns {boolean}
 * @description - Returns true if the objects have the same complete structure 
 */
function assertObject(objectA, objectB) {
    const keysA = Object.keys(objectA);
    const keysB = Object.keys(objectB);
    
    if (keysA.length !== keysB.length) {
        return false;
    }
    
    for (let key of keysA) {
        if (!(key in objectB) || typeof objectA[key] !== typeof objectB[key]) {
            return false;
        }
    }

    return true;
}

const returnAllTherapists = async () => {
    try {
        const therapists = await Therapist.find({});
        return therapists;
    } catch (error) {
        console.error(`Error fetching therapists: ${error}`);
        throw new Error('Unable to fetch therapists');
    }
};

/**
 * @typedef {Object} UserSubset
 * @property {string} _id
 * @property {number} age
 * @property {race} string
 * @property {religion} string 
 * @property {diagnosis} string 
 */

/**
 * 
 * @param {UserSubset} userInfo - Subset of user information containing the information required to make a successful match 
 * @returns {CorrelationScore[]} - Matches: Ranking of the therapists, Diagnosis: The users diagnosis    
 * @description - Return matches and diagnosis of the user by taking a users information, i.e. age, race, diagnosis, religion and use these features to match them with a therapist  
 */
async function matchObject(userInfo) {
    const correlationScores = []
    const userFormatForMatching = {
        "age": "", 
        "race": "",
        "religion": "",
        "diagnosis": "", 
    }

    // Double check keys are filtered
    const user = userInfo
    Object.keys(user).forEach(key => {
        if (!(key in userFormatForMatching)) {
            delete user[key];
        }
    });

    const therapistArray = returnAllTherapists()
    const valid = assertObject(userInfo, userFormatForMatching)
    if(!valid) throw new Error('Object format incorrect')

    for (const  therapist of therapistArray) {
        let correlationValue = calculateCorrelation(userInfo, therapist) 
        correlationScores.push({compatibilityScore: correlationValue, therapist: therapist})
    }

    /**
     * @typedef {Object} Therapist
     * @property {string} _id
     * @property {string} firstName
     * @property {string} lastName
     * @property {string} email
     * @property {string} expertise
     */

    /**
     * @typedef {Object} CorrelationScore
     * @property {number} compatibilityScore
     * @property {Therapist} therapist
     */

    /**
     * @type {CorrelationScore[]}
     */

    const topMatches = correlationScores
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
        .slice(0, 7)

    const rankedTherapistByCompat = topMatches.map((x) => x.therapist)
    
    const result = {
        matches: rankedTherapistByCompat, 
        diagnosis: user.diagnosis
    }

    return result
}

module.exports = { matchObject }