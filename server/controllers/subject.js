const { Subject } = require("../models/subject");

exports.addSubject = async (req, res) => {
  try {
    // console.log(req.body);

    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json("Subject add successfull.");


    
   


  } catch (err) {
    res.status(500).json("Subject already exists.");
  }
};

exports.getSubjectsByTeacherAdminId = async (req, res) => {
  try {
    const teacherAdminId = req.query.userId;

    // console.log(teacherAdminId, req.query);
    const subjects = await Subject.find({ teacherAdminId: teacherAdminId });
    res.status(201).json(subjects);
  } catch (err) {
    res.status(500).json("Failed to fetch.");
    console.log(err);
  }
};

exports.getSubjectDetailsByTeacherId = async (req, res) => {
  try {
    const { subjectId } = req.user;

    const subjectData = await Subject.findOne({ _id: subjectId });

    // console.log(req.user);
    res.status(200).json(subjectData);
  } catch (err) {
    res.status(500).json("Failed to get subject id");
  }
};

exports.getSubjectsByTeacherAdminIdAndClass = async (req, res) => {
  try {
    // console.log(req.user);
    const { std_class, teacherAdminId } = req.user;
    const subjects = await Subject.find({
      $and: [{ class: std_class }, { teacherAdminId: teacherAdminId }],
    });
    // console.log(subjects);

    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json("Error : Server error");
  }
};

