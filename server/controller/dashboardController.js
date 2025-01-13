const Dashboard = require('../models/dashboard');
const User = require('../models/user')

const fetchDashboard = async (req, res) => {
    const { userId, offset }  = req.params
    if (userId && offset && offset > 0) {
        try {
            const rows = await Dashboard.find({ 'user._id' : userId })
            .skip(offset)
            .limit(5)
            .exec();
        return rows.length ? res.status(200).json(results) : res.status(200).send("No results found for this valid user");    
        } catch (error) {
            return res.status(500).send("An error occurred with the submitted ID")
        }
    } else {
        return res.status(400).send('No offset provided')
    }
}

const deleteRecord = async (req, res) => {
    try {
        const { userId, therapistId } = req.params
        const result = await Dashboard.updateOne(
            { 'user._id': userId, 'therapist._id': therapistId },
            { $set: { 'user._id': 'CLOSED'} }
          );
      
          if (result.nModified > 0) {
            return res.status(200).send('Records updated successfully');
          } else {
            return res.status(404).send('No records found to update');
          }
    } catch (error) {
          console.error('Error updating records:', error);
          return res.status(500).send('An error occurred while updating records');
    }
}

const deleteAllRecords = async (req, res) => {
    try {
        const { userId } = req.params
        const result = await Dashboard.updateMany(
            { 'user._id': userId },
            { $set: { 'user._id': 'CLOSED'} }
          );
      
          if (result.nModified > 0) {
            return res.status(200).send('Records updated successfully');
          } else {
            return res.status(404).send('No records found to update');
          }
    } catch (error) {
          console.error('Error updating records:', error);
          return res.status(500).send('An error occurred while updating records');
    }
}

const updateRecord = async (req, res) => {
    try {
        const { userId, therapistId } = req.params
        const { rowData } = req.body

        const result = await Dashboard.updateOne(
            {'user._id': userId, 'therapist._id': therapistId}, 
            { $set: {...rowData} }
        )

        if (result.modifiedCount === 1) return res.status(200).send('Row deleted successfully')
        return res.status(500).send('Operation Unsuccessful')
    } catch (error) {
        res.status(500).send("An error occurred with the submitted ID")        
    }
}

const insertToDashboard = async (req, res) => {
    const { userId } = req.params
    const data = req.matches
    const currentUser = await User.findById(userId).exec(); 
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
    return res.status(200).send("Successfully matched").then(() => res.redirect('/dashboard'))
    ;
}

module.exports = { fetchDashboard, deleteRecord, deleteAllRecords, updateRecord, insertToDashboard }