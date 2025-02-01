const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  

const AIOrchestrator = require('./services/AIOrchestrator.js');
const MongoDBOrchestrator = require('./services/MongoDBManager.js')

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
    await MongoDBOrchestrator.newUser(req.body);
  } catch (error) {
    console.error("Error with MongoDB Atlas");
    console.error(error);
    res.status(500).json({ error: 'Something went wrong with MongoDB Atlas.' });
  }
})

app.post('/getUser', async (req, res) => {
  const { email } = req.body;
  try {
    userData = await MongoDBOrchestrator.getUser(email);

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error with MongoDB Atlas");
    res.status(500).json({ error: 'Something went wrong with MongoDB Atlas.' });
  }
})

app.post('/newClassroom', async (req, res) => {

});

app.post('/classroomData', async (req, res) => {
  const {} = req.body;
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));