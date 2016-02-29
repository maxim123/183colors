import React from "react";
import ReactCSS from "reactcss";
import Hue from "./Hue.jsx";
import Saturation from "./Saturation.jsx";
import color from "../helpers.js";

export default class ColorPicker extends ReactCSS.Component {
    constructor(props) {
        super();

        this.state = color.toState(props.color, 0);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        this.state = color.toState(this.props.color, 0);
    }

    handleChange(data) {
    data = color.simpleCheckForValidColor(data);
    if (data) {
      var colors = color.toState(data, data.h || this.state.oldHue);
      this.setState(colors);
      this.props.onChangeComplete && this.debounce(this.props.onChangeComplete, colors);
      this.props.onChange && this.props.onChange(colors);
    }
  }

    classes() {
        return {
            "default": {

                hue: {
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: '100%',
                  width: '24px',
                //   marginLeft: '10px',
                  border: '1px solid #B3B3B3',
                  boxSizing: 'border-box',
                //   borderBottom: '2px solid #F0F0F0',
                },
                saturation: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 34,
                  height: '100%',
                  border: '1px solid #B3B3B3',
                  boxSizing: 'border-box',
                },
                colorPicker: {
                    height: '200px',
                    position: 'relative',
                    maxWidth: '260px',
                    margin: '0 auto',
                }
            }
        };
    }

    render() {

        return (
            <div is="color-picker" style={this.classes().default.colorPicker}>
                <div style={this.classes().default.saturation}>
                    <Saturation {...this.state} onChange={this.handleChange} />
                </div>
                <div style={this.classes().default.hue}>
                    <Hue is="Hue" direction="vertical" vertical={true} onChange={this.handleChange} {...this.state} />
                </div>
            </div>
        );
    }
}
