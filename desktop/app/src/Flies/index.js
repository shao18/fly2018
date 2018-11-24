import "Flies/css/index.css";
import FlyIn from "FlyIn";
// /import FlyLate from "FlyLate";
import FlyOut from "FlyOut";
import FlySearch from "FlySearch";
import FlyTable from "FlyTable";
import React, { Component } from "react";
import sun from "Flies/img/sun.svg";

/**
 * Get Time in timezone
 */
function getTZTime(tzOffset, local = new Date()) {
  const off = local.getTimezoneOffset() * 60 * 1000;
  const timeStamp = local.getTime() + off;
  const nd = new Date();
  nd.setTime(timeStamp + 1000 * 60 * tzOffset);
  return nd;
}
/**
 * Format date as YYYY-MM-DD
 */
function formatDate(time) {
  let mm = time.getMonth() + 1;
  if (mm < 10) mm = `0${mm}`;
  let dd = time.getDate();
  if (dd < 10) dd = `0${dd}`;
  return `${time.getFullYear()}-${mm}-${dd}`;
}

/**
 * Format date as YYYY-MM-DD
 */
function formatTime(time) {
  let hh = time.getHours();
  if (hh < 10) hh = `0${hh}`;
  let mm = time.getMinutes();
  if (mm < 10) mm = `0${mm}`;
  return `${hh}:${mm}`;
}
/**
 * Flies list
 * @reactProps {string} iata Code of airport
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
      show: "all",
      iata: props.iata,
      // eslint-disable-next-line
      change: props.change || (e => {console.log(e)}),
      departure: null,
      arrival: null,
      title: "",
      search: ""
    };
    this.show = this.show.bind(this);
    this.search = this.search.bind(this);
  }

  show(what) {
    return e => {
      this.setState(
        { show: e.target.checked ? what : "all" },
        this.state.change(this.value)
      );
    };
  }

  search(e) {
    this.setState({ search: e.target.value, show: "num" });
  }

  info(type) {
    if (!this.state[type]) {
      return [];
    }
    return this.state[type].schedule.map(
      ({
        [type]: time,
        thread: { number, title, carrier: { title: carrier__title }, vehicle }
      }) => ({
        type,
        time: new Date(time),
        number,
        title,
        vehicle,
        carrier__title
      })
    );
  }

  get arrival() {
    return this.info("arrival");
  }

  get departure() {
    return this.info("departure");
  }

  get num() {
    // eslint-disable-next-line
    return this.all.filter(x => x.number.indexOf(this.state.search.toUpperCase()) > -1);
  }

  get late() {
    return [];
  }

  get all() {
    return this.info("arrival").concat(this.info("departure"));
  }

  /**
   * Expose data for external usage for react component.
   */
  get value() {
    return {
      iata: this.state.iata,
      title: this.state.title,
      table: this.state.table,
      show: this.state.show
    };
  }

  /**
   * Redraw table data on create component
   */
  componentDidMount() {
    this.loadFlyTable({ iata: this.state.iata });
  }

  /**
   * Load weather from openweathermap.org
   */
  loadFlyTable({ iata, evt = "departure" }) {
    // City = "s9600396";
    const key = "a5c4937c-81d4-4228-a37b-efa73fe721f9";
    const date = formatDate(getTZTime(180));
    if (evt !== "arrival") {
      clearTimeout(this.state.timeout);
      setTimeout(() => {
        this.loadFlyTable({ iata, evt: "arrival" });
      });
      this.setState({
        timeout: setTimeout(() => {
          this.loadFlyTable({ iata });
        }, 1000 * 60 * 30)
      });
    }
    fetch(
      /* Code: s9600396*/
      /* Station_type: airport*/
      /* Transport_type: plane*/
      `https://cors.io/?https://api.rasp.yandex.net/v3.0/schedule/?apikey=${key}&format=json&lang=ru_RU&station=${iata}&transport_types=plane&date=${date}&event=${evt}&system=iata&show_systems=all`,
      {
        mode: "cors"
      }
    )
      .then(resp => {
        // eslint-disable-next-line
        console.log('resp',resp);
        if (resp.ok) {
          return resp.json();
        }
      })
      .then(json => {
        const { station: { station_type_name, title } } = json;

        this.setState(
          {
            table_date: new Date(),
            [evt]: json,
            title: `${station_type_name} ${title}`
          },
          () => {
            // eslint-disable-next-line
          console.log('val',this);
            this.state.change(this.value);
          }
        );
      })
      .catch(e => {
        // eslint-disable-next-line
      console.log('err',e);
      });
  }

  /**
   * @ignore
   */
  render() {
    return (
      <div className="flies">
        <img src={sun} alt="" className="flies__sun" />
        <h1 className="flies__title">{this.state.title}</h1>
        <div className="flies__buttons">
          <FlyOut
            onChange={this.show("departure")}
            checked={this.state.show === "departure"}
          />
          {/* <FlyLate
            onChange={this.show("late")}
            checked={this.state.show === "late"}
          /> */}
          <FlyIn
            onChange={this.show("arrival")}
            checked={this.state.show === "arrival"}
          />
        </div>
        <FlySearch onChange={this.search} />
        <FlyTable source={this[this.state.show]} formatTime={formatTime} />
      </div>
    );
  }
}
export default Flies;
