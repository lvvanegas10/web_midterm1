import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rate, Input, Form, Button } from 'antd';


class RateField extends Component {
    constructor(props){
        super(props);

        this.state ={
            empty: true
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

    sendRate(){

    }
    
    render() {
        return (
            <div>

                <Input  placeholder="Username" onChange={this.inputValue.bind(this)}/>

                <Rate value={5} required />

                <Button
                    type="primary"
                    disabled={this.state.empty}
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