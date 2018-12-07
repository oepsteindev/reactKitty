import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: "",
      items: "",
      error: "",
      dewpoint_f: "",
      city: "",
      bad_hair_cat: "",
      good_hair_cat: "",
      temp_f: "",
      dewpoint: "",
      humidity: "",
      icon_url: "",
      image: "",
      desc: "",
      color: "",
      isLoaded: 0
    };
    //must bind this to method, currently recommeneded method to bind
    this.handleChange = this.handleChange.bind(this);
    this.getdata = this.getdata.bind(this);
  }

  async handleChange(e) {
    this.setState({ zip: e.target.value });
    this.getdata(e.target.value);
  }

  componentDidMount() {
    console.log("mounted");
  }

  async getdata(zip) {
    await fetch(
      "https://api.wunderground.com/api/d5b402928887a79d/forecast/geolookup/conditions/q/" +
        zip +
        "/format.json"
    )
      .then(response => response.json())
      .then(data => {
        const bad_hair_cat =
          "http://img06.deviantart.net/2c2a/i/2013/236/5/5/doodle_237___persian_cat_by_giovannag-d6jlpei.jpg";
        const good_hair_cat = "http://i.imgur.com/ZiEBSak.jpg?1";
        let { current_observation, location } = data;

        let { city } = location;
        let { dewpoint_f } = current_observation;
        let { temp_f } = current_observation;
        let { dewpoint } = current_observation;
        let { dewpoint_string } = current_observation;
        let { relative_humidity } = current_observation;
        let { icon_url } = current_observation;
        let image = dewpoint_f > 65 ? bad_hair_cat : good_hair_cat;
        let desc =
          dewpoint_f > 65 ? "Bad hair day! Run!" : "Good hair day, good kitty!";
        let temp = "The Current temperature in " + city + " is: " + temp_f;
        let color = dewpoint_f > 65 ? "red" : "green";

        this.setState({
          dewpoint_f: dewpoint_f,
          city: city,
          bad_hair_cat: bad_hair_cat,
          good_hair_cat: good_hair_cat,
          temp_f: temp_f,
          temp: temp,
          dewpoint: dewpoint,
          humidity: relative_humidity,
          icon_url: icon_url,
          image: image,
          dewpoint_string: dewpoint_string,
          desc: desc,
          color: color,
          isLoaded: 1
        });
      });
  }

  //in your component
  addDefaultSrc(ev) {
    ev.target.src =
      "https://cdn1.iconfinder.com/data/icons/amenities-outline-ii/48/_cats-512.png";
  }

  getDewpoint() {
    if (this.state.isLoaded === 1) {
      return (
        <div>
          <span>Current Dewpoint:</span>
          <span className={this.state.color}>
            <strong>{this.state.dewpoint_string}</strong>
          </span>
          <br />
        </div>
      );
    } else {
      return false;
    }
  }

  getHumidity() {
    if (this.state.isLoaded === 1) {
      return (
        <div>
          Relative Humidity:
          <span className={this.state.color}>
            <strong>{this.state.humidity}</strong>
          </span>
          <br />
        </div>
      );
    } else {
      return false;
    }
  }

  getIcon() {
    if (this.state.isLoaded === 1) {
      return (
        <div>
          <img
            src={this.state.icon_url}
            alt="logo"
            height="50"
            width="50"
            onError={this.addDefaultSrc}
          />
        </div>
      );
    } else {
      return false;
    }
  }

  getImage() {
    if (this.state.isLoaded === 1) {
      return (
        <div>
          <img
            src={this.state.image}
            alt="logo"
            height="200"
            width="200"
            onError={this.addDefaultSrc}
          />
          <br />
          <br />
        </div>
      );
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar color="dark" className="bg-dark" expand="md">
          <h1>
            <span id="title">
              <img src={logo} alt="logo" height="60" width="60" />
              <i className="fa fa-paw greenies" aria-hidden="true" />
              &nbsp;Weather Kitty&nbsp;
              <i className="fa fa-paw greenies" aria-hidden="true" />
            </span>
            <img src={logo} alt="logo" height="60" width="60" />
          </h1>
        </Navbar>

        <div className="container panel panel-default">
          <h3>The React Version!</h3>
          <br />
          This React app hits the WeatherUnderground API, which returns a giant
          JSON object, that I parse so that Weather Kitty can tell you if you're
          going to have bad hair day or not. I've written and re-written this
          app in VueJS, NodeJS, VanillaJS, and Python, and its in memory of my
          cat, whose name was Kitty. Enter your zip code to get started!
          <br />
          <hr />
          <h3>{this.state.desc}</h3>
          {this.getImage()}
          {this.state.temp}
          {this.getHumidity()}
          {this.getDewpoint()}
          {this.getIcon()}
          <form>
            <label>
              Zip Code:
              <input
                type="text"
                name="zip"
                className="form-control"
                onChange={this.handleChange}
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
