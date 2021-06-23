//import logo from './logo.svg';
//import emailjs from 'emailjs-com';
import './App.css';
import React, { useState, useEffect } from 'react';
//import apiKey from './EmailKey.js';

function App() {
 

  const [vin, setvin] = useState('');
  const [associations, setAssociations] = useState([]);
  const [model, setModel] = useState([])
  const [vinDetail, setVinDetail] = useState([]);
  const getMakeandModels = (Mfr_ID) => {
    console.log("value.Mfr_ID", Mfr_ID);
    fetch("http://localhost:3001/api/getallmodels/"+Mfr_ID, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => {console.log(result);setModel(JSON.parse(result).body.Results); setVinDetail([]) })
      .catch(error => console.log('error', error));
  }
    
  
  const getVINDetails = () =>{
    fetch("http://localhost:3001/api/getVinDetails/"+vin, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => {console.log(result); setVinDetail(()=>JSON.parse(result).body.Results); setModel([])})
      .catch(error => console.log('error', error));
  }

  useEffect(()=> {
    console.log("associations", associations)
    if(associations.length === 0){
      fetch('http://localhost:3001/api/getallManufacturers',{
        method: 'GET',
        redirect: 'follow'
      })
      .then(response => response.text())
    .then(result => { setAssociations(()=>JSON.parse(result).body.Results)
      console.log(associations);
    })
    }
  })
  return (
    <div>
    <div className="App">
      <h1>Shair Your car</h1>
    </div>
    <div class="inline">
          <div class="dropdown">
            <button class="dropbtn" >Find Manufacturer</button>
            <div class="dropdown-content">
            {associations.map((value, index) => {
             return <a onClick={(e)=>{getMakeandModels(value.Mfr_ID)}}>{value.Mfr_Name}</a>
             })}
            </div>
          </div>
         
    </div>
    <h1 class="inline"> OR</h1>
    <div class="inline">
        <input value={vin} onChange={e=>setvin(e.target.value.trim())} placeholder="Add Vin Nuber"/>
        <button class="dropbtn" onClick={getVINDetails}>GO</button>
    </div>
    <div>
      {
        model.length !== 0 && <h2>models For {model[0].Make_Name}</h2>}
        {
        model.map((value, index)=>{
          return <p>{value.Model_Name}</p>
        })
      }
        {
          vinDetail.map((value, index)=>{
            return  <div>
            <p>
                make: {value.Manufacturer}
            </p>
            <p>
               Model:{value.Model}
            </p>
            <p>
                Year: {value.ModelYear}
            </p>
          </div>
          })
        }
        
    </div>

    <div>

    </div>
    </div>
  );
}

export default App;
