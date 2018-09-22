import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Alert } from 'antd';
import InputField from './Editor/InputField'
import UploadFile from './Options/UploadFile'
import RateField from './Options/RateField'
import Save from './Options/Save'
import Vizualization from './Editor/Vizualization'


const dspec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
    "description": "A simple bar chart with embedded data.",
    "data": {
        "name": "myData"
    },
    "mark": "bar",
    "encoding": {
        "y": { "field": "a", "type": "ordinal" },
        "x": { "field": "b", "type": "quantitative" }
    }
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spec: dspec,
            error: false
        };
    }

    onNewSpec(newSpec) {
        try {
            let newSpecJSON = JSON.parse(newSpec);
            this.setState({
                error: false,
                spec: newSpecJSON
            });
            this.showError(this.props);
        } catch (e) {
            this.setState({
                error:true
            });
            this.showError(this.props); // error in the above string (in this case, yes)!
        }
    }

    showError(props) {
        const error = props.error;
        if (error) {
            return <Alert message="Error JSON is not valid" type="error" showIcon />;
        }
        return <div></div>;
    }

    render() {
        return (
            <div className="App">
                <RateField />
                <Save />
                <UploadFile />
                <this.showError error={this.state.error} />
                <InputField defaultValue={JSON.stringify(dspec)} spec={this.onNewSpec.bind(this)} />
                <Vizualization spec={this.state.spec} />
            </div>
        );
    }
}

export default App;
