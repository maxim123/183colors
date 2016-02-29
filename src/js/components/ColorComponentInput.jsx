import React from "react";

export default class ColorComponentInput extends React.Component {
    constructor(props) {
        super(props);

        this.min = 0;
        this.max = 255;
        this.state = {
            inputValue: props.value
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.value !== prevProps.value) {
            this.setState({
                inputValue: this.props.value
            });
        }
    }

    handleInputChange(event) {

        const inputValue = event.target.value;
        const { error, value } = this.validateInput(inputValue);
        if (!error) {
            this.props.onChange(value);
        }
        this.setState({inputValue});
        // this.setState({inputValue});
    }

    /**
     * Validates string input.
     */
    validateInput(input) {

        if (isNaN(input)) {
            return { error: true };
        }

        const numericalValue = parseInt(input);
        const valid = numericalValue >= this.min && numericalValue <= this.max;
        return {error: !valid, value: numericalValue};
    }

    render() {

        return (
            <input class="color-component-input"
                type="number"
                onChange={this.handleInputChange}
                value={this.state.inputValue}
                min={this.min}
                max={this.max}
            />
        );
    }
}
