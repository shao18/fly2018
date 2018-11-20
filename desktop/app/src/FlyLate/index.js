import PropTypes from "prop-types";
import React, { Component } from "react";
import "FlyLate/css/index.css";
import i18n from "FlyLate/i18n/index.json";
import img from "FlyLate/img/clock.svg";
/**
 * Button
 */
class FlyLate extends Component {
  /**
   * @ignore
   */
  render() {
    return (
      <label className={`flylate flylate_checked-${this.props.checked}`}>
        <img className="flylate__img" src={img} alt="" />
        <div className="flylate__alt">{i18n.img}</div>
        <input
          type="checkbox"
          className="flylate__checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
      </label>
    );
  }
}
FlyLate.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func
};
FlyLate.defaultProps = {};
export default FlyLate;
