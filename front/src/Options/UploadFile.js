import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import Papa from 'papaparse'
class UploadFile extends Component {

    handleFiles = files => {
        let fileJson = Papa.parse(files);

        console.log(fileJson)
    }

    render() {
        return (
            <div>
               <Input type="file" id="csvfile" onChange={this.handleFiles}/> 
            </div>
        );
    }
}

UploadFile.propTypes = {

};

export default UploadFile;