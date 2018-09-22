import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message, Rate, Input, Form, Button } from 'antd';


class RateField extends Component {
    constructor(props){
        super(props);

        this.state ={
            empty: true,
            rate:0,
            name: ''
        }
    }

    inputValue(event){
        console.log(event.target.value)
        if(event.target.value !== ''){
            this.setState({
                empty: false
            });
        }
        else{
            this.setState({
                empty: true
            });
        }
    }

    sendRate() { 
        fetch(`/vis/${this.props.name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rate: this.state.rate,
                autor: this.state.name,                
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json.average);
                message.success(`Success: the average is ${json["average"]}`);
            });
    }

    render() {
        return (
            <div>

                <Input  placeholder="Username" onChange={this.inputValue.bind(this)}/>

                <Rate value={5} required />

                <Button
                    type="primary"
                    disabled={this.state.empty || this.props.name === ''}
                    onClick={this.sendRate.bind(this)}
                >
                    Send
                    </Button>                    
            </div >
        );
    }
}

RateField.propTypes = {

};

export default RateField;