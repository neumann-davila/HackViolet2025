const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  

const AIOrchestrator = require('./services/AIOrchestrator.js');
const MongoDBManager = require('./services/MongoDBManager.js')

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000']
};

app.use(cors(corsOptions));

app.get('/', (req, res) =>  {
  res.send("Teacher Aid Active")
});

app.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    response = await AIOrchestrator.submitRequest(message);
    // Sending the response back as JSON
    res.status(200).json({ answer: `${response}`} );    

  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Something went wrong with OpenAI API.' });
  }
});

app.put('/signUp', async (req, res) => {
  try {
    console.log(req.body);
    await MongoDBManager.newUser(req.body);
  } catch (error) {
    console.error("Error with MongoDB Atlas");
    console.error(error);
    res.status(500).json({ error: 'Something went wrong with MongoDB Atlas.' });
  }
})

app.post('/getUser', async (req, res) => {
  const { email } = req.body;
  try {
    userData = await MongoDBManager.getUser(email);

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error with MongoDB Atlas");
    res.status(500).json({ error: 'Something went wrong with MongoDB Atlas.' });
  }
})

app.put('/newClassroom', async (req, res) => {
  try {
    console.log(req.body);
    await MongoDBManager.newClassroom(req.body);
  } catch (error) {
    console.error("Error with MongoDB Atlas: newClassroom");
    console.error(error);
    res.status(500).json({ error: 'Something went wrong with MongoDB Atlas: newClassroom' });
  }
});

app.post('/classroomData', async (req, res) => {
  // put like a name thing, name sent in req, send it to mongoDB function (getClassroom) using .find and filter similar structure to user one. return back to res
  const { name } = req.body;
  try {
    classroomData = await MongoDBManager.getClassroom(name);
    
    res.status(200).json(classroomData);
  } catch (error) {
    console.error("Error with MongoDB Atlas: classroomData");
    console.log(error);
    res.status(500).json({error: 'Something went wrong with MongoDB Atlas: classroomData'});
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));