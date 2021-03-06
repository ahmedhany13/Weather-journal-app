// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;

// Setup Server

const server = app.listen(port , ()=>{
  console.log('Server is running on port', `${port}`);
})

//
app.get('/data', (req,res)=>{
  res.send(projectData);
})

app.post('/posting', (req,res)=>{
  const rest = {
    back : 'recived'
  };
  res.send(rest);
  const newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
  }
  projectData[0] = newEntry;
})

app.get('/all' ,(req,res)=>{
  res.send(projectData[0]);
})
