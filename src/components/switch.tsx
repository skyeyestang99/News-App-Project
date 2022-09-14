import Switch from "react-switch";
import React, { Component } from "react";
//https://react-switch.netlify.app/

interface SwitchProps {}
interface SiwtchState {
  checked: boolean;
}

class MySwitch extends Component<SwitchProps, SiwtchState> {
  constructor(props: SwitchProps) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked: boolean) {
    this.setState({ checked });
  }

  render() {
    return (
      <div className="example">
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </div>
    );
  }
}

export default MySwitch;
