import React, { PureComponent, Fragment } from "react";
import Maskin from "@maskin/core";

class Mask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.maskin = new Maskin(props.pattern);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pattern !== this.props.pattern) {
      this.maskin = new Maskin(prevProps.pattern);
    }
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
      value: this.maskin.output(e.target.value),
      rawValue: this.maskin.rawOutput(e.target.value)
    });
  }
}

Mask.defaultProps = {
  pattern: "",
  children: () => {}
};

export default Mask;
