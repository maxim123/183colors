import React from "react";

export default class ColorComponentHexInput extends React.Component {
    constructor(props) {
        super(props);

        this.min = 0;
        this.max = 255;
        this.state = {
            // convert to hex
            inputValue: this.formatHex(this.props.value.toString(16))
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    formatHex(value) {
        return "0x" + ("00" + value).slice(-2);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.value !== prevProps.value) {
            // update only if different color
            var currentValue = this.state.inputValue.replace("0x", "");
            if (this.props.value !== parseInt(currentValue, 16)) {
                this.setState({
                    // convert to hex
                    inputValue: this.formatHex(this.props.value.toString(16))
                });
            }
        }
    }

    handleInputChange(event) {

        const inputValue = event.target.value;
        const { error, hexValue } = this.validateInput(inputValue);
        if (!error) {
            const decValue = parseInt(hexValue, 16);
            this.props.onChange(decValue);
        }
        this.setState({inputValue});
        // this.setState({inputValue});
    }

    /**
     * Validates string input.
     */
    validateInput(input) {

        var hexPortion = input.replace("0x", "");
        const dec = parseInt(hexPortion, 16);
        if (isNaN(dec) || dec < this.min || dec > this.max) {
            return {error: true};
        }

        const valid = hexPortion === dec.toString(16);
        return {error: !valid, hexValue: hexPortion};
    }

    render() {

        return (
            <input class="color-component-input"
                type="text"
                onChange={this.handleInputChange}
                value={this.state.inputValue}
            />
        );
    }
}
