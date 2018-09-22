import React, { Component } from 'react';
import { message, Input, Button } from 'antd';

class Save extends Component {

    constructor(props) {
        super(props);

        this.state = {
            empty: true,
            empty2: true,
            name: '',
            autor: '',
            doc: [],
            csv: []
        }
    }

    inputValue(event) {
        console.log(event.target.value)
        if (event.target.value !== '') {
            this.setState({
                empty: false,
                name: event.target.value
            });
        }
        else {
            this.setState({
                empty: true
            });
        }
    }

    inputValue2(event) {
        console.log(event.target.value)
        if (event.target.value !== '') {
            this.setState({
                empty2: false,
                autor: event.target.value
            });
        }
        else {
            this.setState({
                empty2: true
            });
        }
    }

    sendRate() { 
        fetch('/vis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                autor: this.state.autor,
                doc: JSON.stringify(this.props.spec),
                csv: JSON.stringify(this.props.data)
            })
        })
            .then(res => res)
            .then(json => {
                console.log(json)
                message.success('Saved');
                this.props.changeName(this.state.name);
            });
    }


    render() {
        return (
            <div>
                <Input placeholder="Name of project" onChange={this.inputValue.bind(this)} />
                <Input placeholder="Autor" onChange={this.inputValue2.bind(this)} />
                <Button
                    type="primary"
                    disabled={this.state.empty || this.state.empty2}
                    onClick={this.sendRate.bind(this)}
                >
                    Save
                    </Button>
            </div>
        );
    }
}

export default Save;