import "Flies/css/index.css";
import FlyIn from "FlyIn";
import FlyLate from "FlyLate";
import FlyOut from "FlyOut";
import FlySearch from "FlySearch";
import React, { Component } from "react";
import sun from "Flies/img/sun.svg";
/**
 * Flies list
 * @reactProps {Array} cities List of cities in selector
 * @reactProps {string} city Cty selecetd by default
 * @reactProps {Function} change Call on change city
 */
class Flies extends Component {
  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    /**
     * @ignore
     */
    this.state = {
      show: "*",
      city: props.city,
      // eslint-disable-next-line
      change: props.change || (e => {console.log(e)}),
      table: null
    };
    this.show = this.show.bind(this);
  }

  show(what) {
    return e => {
      this.setState(
        { show: e.target.checked ? what : "*" },
        this.state.change(this.value)
      );
    };
  }

  /**
   * Expose data for external usage for react component.
   */
  get value() {
    return {
      city: this.state.city,
      table: this.state.table,
      show: this.state.show
    };
  }

  /**
   * Handle change of city. Get weather from remote
   * Call props.change if any
   */
  handleChange(e) {
    const city = e.target.value;
    this.setState(
      {
        city,
        weather: null,
        weather_date: null,
        errors: []
      },
      () => {
        this.state.change(this.value);
        this.loadCityWeather(city);
      }
    );
  }

  /**
   * Redraw table data on create component
   */
  componentDidMount() {
    this.loadFlyTable(this.state.city);
  }

  /**
   * Load weather from openweathermap.org
   */
  loadFlyTable(city) {
    city = "s9600396";
    clearTimeout(this.state.timeout);
    this.setState({
      timeout: setTimeout(() => {
        this.loadFlyTable();
      }, 1000 * 60)
    });
    fetch(
      /* Code: s9600396*/
      /* Station_type: airport*/
      /* Transport_type: plane*/
      /* `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=bd5e378503939ddaee76f12ad7a97608`*/
      `https://api.rasp.yandex.net/v3.0/schedule/?apikey=dc96082a-c0f3-4699-aaf9-f32908c4a33e&format=json&lang=en_RU&&station=${city}&transport_types=plane`
      /* `http://api.rasp.yandex.net/v3.0/schedule/?apikey=27cc38c3-fd6f-4da5-83a6-a2ecb491f985&format=json&lang=en_RU&&station=${city}&transport_types=plane`,*/
    )
      .then(resp => {
        // eslint-disable-next-line
	console.log('resp',resp);
        if (resp.ok) {
          return resp.json();
        }
      })
      .then(json => {
        this.setState(
          {
            table_date: new Date(),
            table: json
          },
          () => {
            // eslint-disable-next-line
	    console.log('val',this.state);
            this.state.change(this.value);
          }
        );
      });
  }

  /**
   * @ignore
   */
  render() {
    return (
      <div className="flies">
        <img src={sun} alt="" className="flies__sun" />
        <div className="flies__buttons">
          <FlyOut
            onChange={this.show("out")}
            checked={this.state.show === "out"}
          />
          <FlyLate
            onChange={this.show("late")}
            checked={this.state.show === "late"}
          />
          <FlyIn
            onChange={this.show("in")}
            checked={this.state.show === "in"}
          />
        </div>
        <FlySearch onChange={this.show("number")} />
        {/* <FlyTable
          filter={this.state.show}
          city={this.state.city}
        /> */}
      </div>
    );
  }
}
export default Flies;
