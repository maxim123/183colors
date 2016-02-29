import React from "react";
import tinycolor from "tinycolor2";
import RCSlider from "rc-slider";
import 'rc-slider/assets/index.css';

// custom
import ColorComponentInput from "./ColorComponentInput.jsx";
import ColorComponentHexInput from "./ColorComponentHexInput.jsx";
import ColorPicker from "./ColorPicker.jsx";
import CoolPicsInput from "./CoolPicsInput.jsx";
import CSSHexInput from "./CSSHexInput.jsx";

export default class ColorBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.setColor = this.setColor.bind(this);
        this.setRed = this.setRed.bind(this);
        this.setGreen = this.setGreen.bind(this);
        this.setBlue = this.setBlue.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.state = {
            displayColorPicker: false,
            color: "#5CACF0"
        };
    }

    setColor(color) {
        this.setState({color: color});
    }
    setRed(redValue) {
        let color = tinycolor(this.state.color);
        const {r, g, b} = color.toRgb();
        color = tinycolor({r: parseInt(redValue), g, b});
        this.setState({color: "#" + color.toHex()});
    }
    setGreen(greenValue) {
        let color = tinycolor(this.state.color);
        const {r, g, b} = color.toRgb();
        color = tinycolor({r, g: parseInt(greenValue), b});
        this.setState({color: "#" + color.toHex()});
    }
    setBlue(blueValue) {
        let color = tinycolor(this.state.color);
        const {r, g, b} = color.toRgb();
        color = tinycolor({r, g, b: parseInt(blueValue)});
        this.setState({color: "#" + color.toHex()});
    }
    handleColorChange(color) {
        this.setState({ color: color.hex });
    }

    render() {

        const colorStyles = {
            backgroundColor: this.state.color
        };

        const { r, g, b } = tinycolor(this.state.color).toRgb();

        return (
            <div class="color-browser">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div class="swatch">
                                    <div class="color" style={colorStyles}></div>
                                </div>
                                <ColorPicker color={this.state.color} onChange={this.handleColorChange}/>
                            </td>
                            <td>
                                <table class="rgb-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>dec</th>
                                            <th>hex</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="red-row">
                                            <td>Red</td>
                                            <td>
                                                <RCSlider className="red-slider" tipFormatter={null} onChange={this.setRed} min={0} max={255} value={r}/>
                                            </td>
                                            <td>
                                                <ColorComponentInput onChange={this.setRed} value={r}/>
                                            </td>
                                            <td>
                                                <ColorComponentHexInput onChange={this.setRed} value={r}/>
                                            </td>
                                        </tr>
                                        <tr class="green-row">
                                            <td>Green</td>
                                            <td>
                                                <RCSlider className="green-slider" tipFormatter={null} onChange={this.setGreen} min={0} max={255}  value={g}/></td>
                                            <td>
                                                <ColorComponentInput onChange={this.setGreen} value={g}/>
                                            </td>
                                            <td>
                                                <ColorComponentHexInput onChange={this.setGreen} value={g}/>
                                            </td>
                                        </tr>
                                        <tr class="blue-row">
                                            <td>Blue</td>
                                            <td>
                                                <RCSlider className="blue-slider" tipFormatter={null} onChange={this.setBlue} min={0} max={255} value={b}/>
                                            </td>
                                            <td>
                                                <ColorComponentInput onChange={this.setBlue} value={b}/>
                                            </td>
                                            <td>
                                                <ColorComponentHexInput onChange={this.setBlue} value={b}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="cool-pics-color">
                                    <CoolPicsInput
                                        color={this.state.color}
                                        setColor={this.setColor}
                                    />
                                </div>
                                <div class="css-hex-color">
                                    <CSSHexInput
                                        color={this.state.color}
                                        setColor={this.setColor}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/*}<ColorPicker type="photoshop"/>*/}
            </div>
        );
    }
}
