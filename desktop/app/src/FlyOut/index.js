import PropTypes from "prop-types";
import React, { Component } from "react";
import "FlyOut/css/index.css";
import i18n from "FlyOut/i18n/index.json";
import img from "FlyOut/img/up.svg";
/**
 * Button
 */
class FlyOut extends Component {
  /**
   * @ignore
   */
  render() {
    return (
      <label className={`flyout flyout_checked-${this.props.checked}`}>
        <img className="flyout__img" src={img} alt="" />
        <div className="flyout__alt">{i18n.img}</div>
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
FlyOut.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func
};
FlyOut.defaultProps = {};
export default FlyOut;
