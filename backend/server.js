const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  
const openAI = require('openai') 

//const AIOrchestrator = require('./services/AIOrchestrator');

const app = express();
app.use(bodyParser.json());


app.use(cors({
    origin: 'http://localhost:3000'
  }));
