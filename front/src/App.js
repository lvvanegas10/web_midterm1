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
        "name": "data"
    },
    "mark": "bar",
    "encoding": {
        "y": { "field": "a", "type": "ordinal" },
        "x": { "field": "b", "type": "quantitative" }
    }
}

const dmyData = [
    { "a": "A", "b": 28 }, { "a": "B", "b": 55 }, { "a": "C", "b": 43 },
    { "a": "D", "b": 91 }, { "a": "E", "b": 81 }, { "a": "F", "b": 53 },
    { "a": "G", "b": 19 }, { "a": "H", "b": 87 }, { "a": "I", "b": 52 }
];


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spec: dspec,
            data: dmyData,
            error: false,
            errorData:false,
            name: ''
        };
    }

    onChange(pN){
        this.setState({
            name: pN
        });
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

    onNewData(newData) {
        try {
            let newDataJSON = JSON.parse(newData);
            this.setState({
                errorData: false,
                data: newDataJSON
            });
            this.showError(this.props);
        } catch (e) {
            this.setState({
                errorData:true
            });
            this.showErrorData(this.props); // error in the above string (in this case, yes)!
        }
    }

    showError(props) {
        const error = props.error;
        if (error) {
            return <Alert message="Error JSON is not valid" type="error" showIcon />;
        }
        return <div></div>;
    }

    showErrorData(props) {
        const error = props.error;
        if (error) {
            return <Alert message="Error CSV is not valid" type="error" showIcon />;
        }
        return <div></div>;
    }

    render() {
        return (
            <div className="App">
                <Save changeName={this.onChange.bind(this)} data={this.state.data} spec={this.state.spec}/>
                <RateField name={this.state.name}/>
                <UploadFile update={this.onNewData.bind(this)} />
                <this.showError error={this.state.error} />
                <InputField defaultValue={JSON.stringify(dspec)} spec={this.onNewSpec.bind(this)} />
                <Vizualization spec={this.state.spec} data={this.state.data}/>
            </div>
        );
    }
}

export default App;
