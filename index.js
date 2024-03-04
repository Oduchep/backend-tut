const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const courses = [
  { id: 1, name: 'Panda Cola' },
  { id: 2, name: 'Peter Parker' },
  { id: 3, name: 'Paul Play' },
  { id: 4, name: 'Hoola Hoop' },
];

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(course);
};

app.get('/', (req, res) => {
  res.send('Hello my friend!');
});

// get all courses
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// get single course
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('Course with id not found');

  res.send(course);
});

// create course
app.post('/api/create-course', (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = { id: courses.length + 1, name: req.body.name };

  courses.push(course);
  res.send(course);
});

// update course
app.put('/api/update-course/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('Course with id not found');

  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

const port = process.env.PORT || 6005;
app.listen(port, () => {
  console.log(`Listening on port...${port}`);
});
