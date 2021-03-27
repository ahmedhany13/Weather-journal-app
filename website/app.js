/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const apiKey = '&appid=21dc77d76e005acdaffcfd94f3677a40&units=imperial';  // my apiKey = '21dc77d76e005acdaffcfd94f3677a40'
const url = `http://api.openweathermap.org/data/2.5/weather?`;


//prees generate button causing a 'click' action.
const press = document.getElementById('generate').addEventListener('click' , preformAction);

function preformAction(e){

  const zipCode = document.querySelector('input').value; // 33034
  const feeling = document.querySelector('.myInput').value;


  getDataEx(url,zipCode,apiKey)
  .then(function(data){
    const temp  = data.main.temp;
    postData('/posting',{temperature:temp ,date:newDate ,userResponse:feeling} )
    updateUI()
  })
}

// update ui method -->
const updateUI = async() => {
  const request = await fetch ('/all');
  try {
    const dataRetrived = await request.json();
    document.getElementById('date').innerHTML = `Today's date is: ${dataRetrived.date}`;
    document.getElementById('temp').innerHTML = `Today's Temperature is: ${dataRetrived.temperature} °F`;
    document.getElementById('content').innerHTML = `User's felling is: ${dataRetrived.userResponse}`;

  } catch (error) {
    console.log('error is :',error);
  }
}



//get the data from the openWeatherMap website , (external Api)

const getDataEx = async (url,zipCode,apiKey)=>{
    const comUrl = `${url}zip=${zipCode},us${apiKey}`;
    const res = await fetch (comUrl);
    try{
      const data = await res.json();
      //console.log(data);
      return data;
    }catch(error){
      console.log('error is : ' , error);
    }
}


// getData from the server side , returns an Objet endpoint (local API)
const getData = async (url)=>{
  const req = await fetch (url);
  try{
    const data = await res.json();
    console.log(data);
  }catch(error){
    console.log('error is : ' , error);
  }
}

// post data to server side , put inside the object endpoint (local API)

const postData = async (url, data = {})=>{
    const response = await fetch (url, {
    method : 'POST',
    credentials: 'same-origin',
    headers : {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try{
    const newData = await response.json();
    if(newData.back === 'recived'){
      return newData;
    }

  }catch(error){
    console.log('error is :',error);
  }
}
