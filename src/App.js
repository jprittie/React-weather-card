import React, { Component } from 'react';
import Weather from './Weather';
import './tachyons.css';
import './prism.css';
const API_KEY = '5cc1f25759881907aed6171543839b19';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
       temp: "",
       description: "" ,
       icon: "",
       loading: false
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
      .then(data => {
        this.setState({
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        })
      })
      .catch(err => console.error(err));
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

