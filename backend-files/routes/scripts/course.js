let Course = require('../../models/course');
module.exports = {

    registerCourses: async function (req, res) {
        try {
            let contactUser = await Course.create({
                name: req.body.name,
                description: req.body.description,
                instructor: req.body.instructor,
                price: req.body.price,
                category: req.body.category,
                courseCategory: req.body.courseCategory,
                students: req.body.students,
                rating: req.body.rating,
            });
            res.send({ "Success": true, "message": "Your Course has been Registered!" })

        } catch (error) {
            res.send({ "Success": false, err })
        }
    },
    
    getCourseById: async (req, res) => {
        try {
            Course.find({ _id: req.params.courseId }, 'name description instructor price category courseCategory students rating').populate('course').exec(async (err, courseDetails) => {
                if (err)
                    console.log(err);
                else {
                    if (courseDetails && courseDetails[0]) {
                        res.send({ "Success": true, courseDetails });
                    } else {
                        res.send({ "Success": false, err });
                    }
                }

            })
        } catch (err) {
            res.send({ "Success": false, err })
        }
    },

    getAllCourses: async (req, res) => {
        try {
            let Courses = await Course.find({}).sort({ created_at: -1 });
            res.send({ "Success": true, Courses });
        } catch (err) {
            res.send({ "Success": false, err })
        }
    },

    searchCourses: async (req, res) => {
        if (req.body.name == '' && req.body.courseCategory == '') {
            Course.find({}).populate('profileImage').populate('company').exec(async (err, searchResults) => {
                res.send({ "Success": true, searchResults });
            });
        } else if (req.body.name !== '' && req.body.courseCategory == '') {
            Course.find({ name: req.body.name }, 'name description instructor price category courseCategory students rating').populate('profileImage').populate('company').exec(async (err, searchResults) => {
                res.send({ "Success": true, searchResults });
            });
        } else if (req.body.courseCategory !== '' && req.body.name == '') {
            Course.find({ courseCategory: req.body.courseCategory }, 'name description instructor price category courseCategory students rating').populate('profileImage').populate('company').exec(async (err, searchResults) => {
                res.send({ "Success": true, searchResults });
            });
        } else if(req.body.courseCategory !== '' && req.body.name !== '') {
            Course.find({ name: req.body.name, courseCategory: req.body.courseCategory }, 'name description instructor price category courseCategory students rating').populate('profileImage').populate('company').exec(async (err, searchResults) => {
                res.send({ "Success": true, searchResults });
            });
        }
    },

    deleteCourseById: async (req, res) => {
        try {
            Course.findOneAndDelete({ _id: req.params.courseId }).exec((err, feedbacks) => {
                if (err)
                    console.log(err);
                else
                    res.send({ "Success": true, "message": "Course Deleted Successfully!" });
            })
        } catch (err) {
            res.send({ "Success": false, err })
        }

    },
};