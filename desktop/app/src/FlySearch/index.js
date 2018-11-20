import PropTypes from "prop-types";
import React, { Component } from "react";
import "FlySearch/css/index.css";
import i18n from "FlySearch/i18n/index.json";
/**
 * Button
 */
class FlySearch extends Component {
  /**
   * @ignore
   */
  render() {
    return (
      <input
        className="flysearch"
        type="search"
        onChange={this.props.onChange}
        placeholder={i18n.img}
      />
    );
  }
}
FlySearch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func
};
FlySearch.defaultProps = {};
export default FlySearch;
