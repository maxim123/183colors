import React from "react";
import tinycolor from "tinycolor2";

export default class CoolPicsInput extends React.Component {
    constructor(props) {
        super(props);

        const {r, g, b} = tinycolor(this.props.color).toRgb();

        this.state = {
            inputValue: "" + r + " " + g + " " + b
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.color !== prevProps.color) {
            const {r, g, b} = tinycolor(this.props.color).toRgb();
            this.setState({
                inputValue: "" + r + " " + g + " " + b,
                invalidInput: false
            });
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
     * Validates string input of form [255, 255, 255].
     * If invalid, returns error object.
     * Otherwise, returns a tinycolor object.
     */
    validateInput(input) {

        function isValidRGBComponent(component) {
            if (isNaN(component)) {
                return false;
            } else {
                const numericalValue = parseInt(component);
                return numericalValue >= 0 && numericalValue <= 255;
            }
        }

        // trim surrounding whitespace
        const triple = input.trim();
        const components = triple.split(/\s+/).map(component => parseInt(component));
        if ((components.length !== 3) ||
            (!components.every(isValidRGBComponent))) {
            return { error: true };
        } else {
            const [ r, g, b ] = components;
            return { color: tinycolor({r, g, b}) };
        }
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
                <label>CoolPics format {invalidInput}</label>
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
