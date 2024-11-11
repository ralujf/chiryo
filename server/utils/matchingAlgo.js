const stringComparison = require('string-comparison');
const Therapist = require('../models/therapist')

const returnAllTherapists = async () => {
    try {
        const therapists = await Therapist.find({});
        return therapists;
    } catch (error) {
        console.error(`Error fetching therapists: ${error}`);
        throw new Error('Unable to fetch therapists');
    }
};

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
            const jaccard = stringComparison.jaccard;
            const score = jaccard.similarity(valueA, valueB);
            totalScore += score;
        } else if (valueA instanceof Date && valueB instanceof Date) {
            // Calculate the difference in time between the two dates
            const timeDiff = Math.abs(valueA.getTime() - valueB.getTime());
            // Normalize the difference to a score between 0 and 1
            const maxTimeDiff = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
            const score = 1 - (timeDiff / maxTimeDiff);
            totalScore += score;
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

async function matchObject(userInfo) {
    const correlationScores = []
    // TODO: Update when I decide on schema

    // Format required for matching (is not the same as a regular) user
    const userFormat = {
        "firstName": "",
        "lastName": "",
        "diagnosis": "", // this is derived from the return 
        // other fields will go here
    }

    const user = userInfo
    // TODO: delete object keys from object
    
    const therapistArray = returnAllTherapists()

    const valid = await assertObject(userInfo, userFormat)
    if(!valid) throw new Error('Object format incorrect')

    for (let therapist of therapistArray) {
        let correlationValue = calculateCorrelation(userInfo, therapist) 
        correlationScores.push(correlationValue)
    }

    const top5Indices = correlationScores
        .map((score, index) => ({ score, index }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(item => item.index);

    const result = top5Indices.map(index => therapistArray[index]);
    return result
}

module.exports = { matchObject }