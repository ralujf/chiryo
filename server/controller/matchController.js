const matchUserWithTherapist = ({ user }) => {
    const {
        _id, username, email, password
    } = user

    try {
        
        // Example return
        return [therapist1, therapist2, therapist3]
    } catch (error) {
        console.error(`There has been an unexpected error: ${error}`)
        return []
    }
}

module.exports = matchUserWithTherapist