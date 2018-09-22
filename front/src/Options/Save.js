import React, { Component } from 'react';
import { Button } from 'antd';

class Save extends Component {
    render() {
        return (
            <div>
                <Button>Save Spec and data</Button>
                <Button>Save Visualization</Button>
            </div>
        );
    }
}

export default Save;