import React, { Component } from 'react';
import PropTypes from 'prop-types';
import vegaEmbed from 'vega-embed';
import { Alert } from 'antd';


const myData = [
    { "a": "A", "b": 28 }, { "a": "B", "b": 55 }, { "a": "C", "b": 43 },
    { "a": "D", "b": 91 }, { "a": "E", "b": 81 }, { "a": "F", "b": 53 },
    { "a": "G", "b": 19 }, { "a": "H", "b": 87 }, { "a": "I", "b": 52 }
];


class Visualization extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false
        }
    }

    updateVega() {
        const embed_opt = { 'mode': 'vega-lite' };

        vegaEmbed(this.div, this.props.spec, embed_opt)
            .catch(error => console.log(error, "ERROR"))
            .then((res) => {
                let name = 'data'
                if(this.props.spec.data.name !== undefined){
                    name = this.props.spec.data.name;
                }

                console.log('aaa', name)
                res.view.insert(name, this.props.data).run();
                this.setState({
                    error: false
                });
                this.showError(this.props);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true
                });
                this.showError(this.props);
            });
    }

    showError(props) {
        const error = props.error;
        if (error) {
            return <Alert message="Error SPEC is not valid" type="error" showIcon />;
        }
        return <div></div>;
    }

    componentDidMount() {
        this.updateVega();
    }

    componentWillUpdate(prevProps) {
        if (this.props.spec !== prevProps.spec) {
            this.updateVega();
        }        
    }

    render() {
        return (
            <div>
                <this.showError error={this.state.error} />
                <div ref={div => this.div = div}>
                </div>
            </div>
        )
    }
}

Visualization.propTypes = {
    spec: PropTypes.object
};

export default Visualization;