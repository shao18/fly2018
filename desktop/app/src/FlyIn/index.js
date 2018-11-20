import PropTypes from "prop-types";
import React, { Component } from "react";
import "FlyIn/css/index.css";
import i18n from "FlyIn/i18n/index.json";
import img from "FlyIn/img/down.svg";
/**
 * Button
 */
class FlyIn extends Component {
  /**
   * @ignore
   */
  render() {
    return (
      <label className={`flyin flyin_checked-${this.props.checked}`}>
        <img className="flyin__img" src={img} alt="" />
        <div className="flyin__alt">{i18n.img}</div>
        <input
          type="checkbox"
          className="flyin__checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
      </label>
    );
  }
}
FlyIn.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func
};
FlyIn.defaultProps = {};
export default FlyIn;
