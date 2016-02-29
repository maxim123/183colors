import React from "react";
import tinycolor from "tinycolor2";

export default class CSSHexInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: tinycolor(this.props.color).toHexString().toUpperCase()
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.color !== prevProps.color) {
            // update only if different color
            // var currentValue = "#" + this.state.inputValue.replace("#", "");
            if (this.props.color.toUpperCase() !== this.state.inputValue.toUpperCase()) {
                this.setState({
                    inputValue: tinycolor(this.props.color).toHexString().toUpperCase(),
                    invalidInput: false
                });
            }
        }
    }

    handleInputChange(event) {

        const inputValue = event.target.value;
        const { error, color } = this.validateInput(inputValue);
        if (!error) {
            this.props.setColor("#" + color.toHex());
        }
        this.setState({inputValue, invalidInput: error});
        // this.setState({inputValue});
    }

    /**
     * Validates string input of form 0xFFFFFF.
     * If invalid, returns error object.
     * Otherwise, returns a tinycolor object.
     */
    validateInput(input) {

        // function isValidRGBComponent(component) {
        //     if (isNaN(component)) {
        //         return false;
        //     } else {
        //         const numericalValue = parseInt(component);
        //         return numericalValue >= 0 && numericalValue <= 255;
        //     }
        // }

        // remove #
        const hexColor = input.replace("#", "");

        // check if of length 6 and contains only A-F
        const valid = /^[0-9A-F]{6}$/i.test(hexColor);
        return { error: !valid, color: tinycolor(hexColor)};
    }

    render() {
        const colorValue = this.props.color;
        const {
            r,
            g,
            b
        } = tinycolor(colorValue).toRgb();

        const coolPicsStyles = {
            borderColor: colorValue
        };

        let invalidInput;
        if (this.state.invalidInput) {
            invalidInput = <span class="cool-pics-invalid">(invalid input)</span>;
        }

        return (
            <div class="cool-pics-input">
                <label>CSS Hex {invalidInput}</label>
                <input
                    type="text"
                    onChange={this.handleInputChange}
                    style={coolPicsStyles}
                    value={this.state.inputValue}
                />
            </div>
        );
    }
}
