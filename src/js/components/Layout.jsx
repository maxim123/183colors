import React from "react";

import ColorBrowser from "./ColorBrowser.jsx";
import Footer from "./Footer.jsx";

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        // this.classes = this.classes.bind(this);
    }
    render() {
        return (
            <div>
                <h1>183colors</h1>
                <p>Red, green and blue are the primary colors that are mixed to display the color of a pixel on a computer monitor. Nearly every color of emitted light that a human can see can be created by combining these three colors in varying levels. The RGB model can be represented in decimal (using digits 0–9) or in hexadecimal (0–9, A–F).</p>
                <ColorBrowser/>
                <Footer/>
            </div>
        );
    }
}
