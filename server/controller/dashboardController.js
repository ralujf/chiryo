const Dashboard = require('../models/dashboard');
const User = require('../models/user')
// TODO: Ensure that dashboard functions are using a subset user object to find dashboard items
// Refactor all the functions frontend and backend to take in 
// the entire row of data, and find that exact row

const fetchDashboard = async (registeredUserId, offset = null) => {
    if (offset && offset > 0) {
        const dashboards = await Dashboard.find({ 'user._id': registeredUserId })
            .skip(offset)
            .limit(5)
            .exec();
        return dashboards.length ? dashboards : null;
    } else {
        return null;
    }
}

const deleteRecord = async (registeredUserId, rowData) => {
    const result = await Dashboard.deleteOne({'user._id': registeredUserId, ...rowData  });
    return result.deletedCount ? 1 : -1;
}

const updateRecord = async (registeredUserId, rowData) => {
    const result = await Dashboard.updateOne({ 'user._id': registeredUserId, ...rowData  });
    return result.modifiedCount ? 1 : -1;
}

const insertToDashboard = async (registeredUserId, data) => {
    const currentUser = await User.findById(registeredUserId).exec();
    // TODO: Get preferred time and location from currentUser

    const dashboardData = await data.matches.map(therapist => ({
        user: {
            _id: currentUser._id,
            username: currentUser.username,
            email: currentUser.email
        },
        therapist: {
            _id: therapist._id,
            firstName: therapist.firstName,
            lastName: therapist.lastName,
            expertise: therapist.expertise
        },
        location: therapist.location || 'virtual',
        time: new Date(),
        diagnosis: data.diagnosis,
        markResolvedUser: therapist.markResolvedUser || false,
        markResolvedTherapist: therapist.markResolvedTherapist || false
    }));

    const newRecords = await Dashboard.insertMany(dashboardData);
    return newRecords;
}

module.exports = { fetchDashboard, deleteRecord, updateRecord, insertToDashboard }