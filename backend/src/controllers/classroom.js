const Classroom = require('../models/classroom');

// @desc   Get all classrooms
// @route  GET /api/classrooms
// @access Public
const getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.status(200).json({ success: true, data: classrooms });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc   Get single classroom
// @route  GET /api/classrooms/:id
// @access Public
const getClassroomById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ success: false, error: 'Classroom not found' });
    }
    res.status(200).json({ success: true, data: classroom });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Classroom not found' });
    }
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc   Create new classroom
// @route  POST /api/classrooms
// @access Private
const createClassroom = async (req, res) => {
  const { classroomID, classroomNumber, capacity, schedule, equipmentList } = req.body;
  try {
    const classroom = new Classroom({
      classroomID,
      classroomNumber,
      capacity,
      schedule,
      equipmentList
    });
    const savedClassroom = await classroom.save();
    res.status(201).json({ success: true, data: savedClassroom });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc   Update classroom
// @route  PUT /api/classrooms/:id
// @access Private
const updateClassroom = async (req, res) => {
  const { classroomID, classroomNumber, capacity, schedule, equipmentList } = req.body;
  try {
    let classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ success: false, error: 'Classroom not found' });
    }
    classroom.classroomID = classroomID;
    classroom.classroomNumber = classroomNumber;
    classroom.capacity = capacity;
    classroom.schedule = schedule;
    classroom.equipmentList = equipmentList;
    const savedClassroom = await classroom.save();
    res.status(200).json({ success: true, data: savedClassroom });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Classroom not found' });
    }
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc   Delete classroom
// @route  DELETE /api/classrooms/:id
// @access Private
const deleteClassroom = async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.id);
  
      if (!classroom) {
        return res.status(404).json({ success: false, message: 'Classroom not found' });
      }
  
      await classroom.remove();
      res.status(200).json({ success: true, message: 'Classroom deleted successfully' });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ success: false, message: 'Classroom not found' });
      }
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
  module.exports = {
    createClassroom,
    getClassrooms,
    getClassroom,
    updateClassroom,
    deleteClassroom
  };
  