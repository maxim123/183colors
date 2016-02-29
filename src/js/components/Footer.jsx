import React from "react";
export default class ColorComponentSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <footer>
                Created by <a href="http://umich.edu/~maximal/" target="_blank">
                    {"Maxim Aleksa '17"}
                </a>.
                View <a href="https://github.com/maxim123/183colors" target="_blank">
                    source code
                </a>.
            </footer>
        );
    }
}
