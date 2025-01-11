/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} username
 * @property {string} email
 */

/**
 * @typedef {Object} Therapist
 * @property {string} _id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} expertise
 */

/**
 * @typedef {Object} TableRow
 * @property {User} user
 * @property {Therapist} therapist
 * @property {string} location
 * @property {string} locationLink
 * @property {Date} time
 * @property {string} diagnosis
 * @property {boolean} markResolvedUser
 * @property {boolean} markResolvedTherapist
 */

/**
 * @returns {TableRow[]}
 */

export {};
