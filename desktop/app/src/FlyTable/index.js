import PropTypes from "prop-types";
import React, { Component } from "react";
import "FlyTable/css/index.css";
import i18n from "FlyTable/i18n/index.json";
/**
 * FlyTable
 */
class FlyTable extends Component {
  /**
   * @ignore
   */
  render() {
    return (
      <table className="flytable">
        <thead className="flytable__head">
          <tr>
            <th className="flytable__th">{i18n.number}</th>
            <th className="flytable__th">{i18n.time}</th>
            <th className="flytable__th">{i18n.title}</th>
            <th className="flytable__th">{i18n.vehicle}</th>
            <th className="flytable__th">{i18n.carrier__title}</th>
          </tr>
        </thead>
        <tbody>
          {this.props.source
            .sort((x, y) => x.time.getTime() - y.time.getTime())
            .filter()
            .map((x, i) => (
              <tr key={i} className="flytable__tr">
                <td className="flytable__td">{x.number}</td>
                <td className="flytable__td">
                  {this.props.formatTime(x.time)}
                </td>
                <td className="flytable__td">{x.title}</td>
                <td className="flytable__td">{x.vehicle}</td>
                <td className="flytable__td">{x.carrier__title}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}
FlyTable.propTypes = {
  source: PropTypes.array,
  formatTime: PropTypes.func
};
FlyTable.defaultProps = {};
export default FlyTable;
