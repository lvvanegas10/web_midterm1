import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Input } from 'antd';
const { TextArea } = Input;

class InputField extends Component {

  
    onChange(newSpec){
        this.props.spec(newSpec.target.value);
    }

    render() {
        return (
            <div id="input-field">
                <TextArea defaultValue={this.props.defaultValue} rows={15} onChange={this.onChange.bind(this)}/>
            </div>
        );
    }
}

InputField.propTypes = {
    spec: PropTypes.func
};

export default InputField;