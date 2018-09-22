import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';


class RateField extends Component {
    render() {
        return (
            <div>
                <Rate/>
            </div>
        );
    }
}

RateField.propTypes = {

};

export default RateField;