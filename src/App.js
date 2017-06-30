import React, { Component } from 'react';
import Weather from './Weather';
import './tachyons.css';
import './prism.css';
const API_KEY = 'ee02a2917e12d7e46a233b9f641b8eba';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
       temp: "",
       description: "" ,
       icon: "",
       error: null
    }
  }

  componentWillMount(){
    this.getWeather();
  }

  componentDidMount(){
    this.timer = setInterval(() => this.getWeather(), 15000);
  }


  getWeather = () => {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(response => {
        //console.log(response);
        if (response.cod !== 200) {
          throw {
            message: "Error thrown",
            status: response.cod
          }
        }
        return response;
      })
      .then(data => {
 
        this.setState({
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          error: false
        })
      })
      .catch(err => {
        console.error(err.message, err.status)
        this.setState({
          temp: "--",
          description: "Weather data unavailable",
          icon: "",
          error: true
        })
      });
  }



  render() {
    return (
      <Weather
        temp={this.state.temp}
        description={this.state.description}
        icon={this.state.icon}
      />
    );
  }
}

