const stringComparison = require('string-comparison');
const Therapist = require('../models/therapist')


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

async function matchObject(userInfo) {
    const correlationScores = []
    const userFormatForMatching = {
        "age": "", 
        "race": "",
        "religion": "",
        "diagnosis": "", 
    }
    const user = userInfo
    Object.keys(user).forEach(key => {
        if (!(key in userFormatForMatching)) {
            delete user[key];
        }
    });

    const therapistArray = returnAllTherapists()
    const valid = assertObject(userInfo, userFormat)
    if(!valid) throw new Error('Object format incorrect')

    for (let therapist of therapistArray) {
        let correlationValue = calculateCorrelation(userInfo, therapist) 
        correlationScores.push({compatibilityScore: correlationValue, therapist: therapist})
    }

    const top5Indices = correlationScores
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
        .slice(0, 7)

    const ranking = top5Indices.map(index => therapistArray[index]);
    const result = {
        matches: ranking, 
        diagnosis: user.diagnosis
    }

    return result
}

module.exports = { matchObject }