const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AttendanceSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'late', 'excused'],
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;
