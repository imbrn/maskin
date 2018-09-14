import React, { PureComponent, Fragment } from "react";
import Maskin from "@maskin/core";

class Mask extends PureComponent {
  constructor(props) {
    super(props);

    this.mask = Maskin(props.pattern);
    const originalValue = props.defaultValue || "";
    const initialResult = this.mask(originalValue, {
      default: true,
      raw: true
    });

    this.state = {
      originalValue,
      value: initialResult.default,
      rawValue: initialResult.raw
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pattern !== this.props.pattern) {
      this.mask = Maskin(prevProps.pattern);
      this.updateValues();
    }

    if (prevState.originalValue !== this.state.originalValue) {
      this.updateValues();
    }
  }

  updateValues() {
    const result = this.mask(this.state.originalValue, {
      default: true,
      raw: true
    });

    this.setState({
      value: result.default,
      rawValue: result.raw
    });
  }

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        {children({
          value: this.state.value,
          rawValue: this.state.rawValue,
          handleChange: this.handleChange
        })}
      </Fragment>
    );
  }

  handleChange(e) {
    this.setState({
      originalValue: e.target.value
    });
  }
}

Mask.defaultProps = {
  pattern: "",
  children: () => {}
};

export default Mask;
