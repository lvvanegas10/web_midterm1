import React, { Component } from 'react';
import vegaEmbed from 'vega-embed';

class View extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        console.log(this.props.data, "aaaaaaaaaaaaaa");
        console.log(this.state.data, "aaaaaaaaaaaaaa");

        var config = {
            background: "#ffffff",
            axis: {
                labelFont: "serif",
                labelFontSize: 16,
                tickWidth: 3,
                tickColor: "red"
            }
        };
        var spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
            "description": "A simple bar chart with embedded data.",
            "data": this.props.data,
            "mark": "bar",
            "encoding": {
                "x": { "field": "a", "type": "ordinal" },
                "y": { "field": "b", "type": "quantitative" },
                "tooltip": { "field": "b", "type": "quantitative" }
            }
        }
        vegaEmbed('#vis', spec, { config: config, tooltip: { theme: 'dark' }, defaultStyle: true }).then(function (result) {
            console.log(result);
        }).catch(console.error);
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default View;