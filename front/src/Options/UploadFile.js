import React, { Component } from 'react';
import Papa from 'papaparse'

class UploadFile extends Component {

    loadData() {
        const file = this.div.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
               this.props.update(results.data);
               console.log(results.data)
            },
            error(error) {
                console.log(error);
            }
        });
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.loadData.bind(this)} ref={div => this.div = div} />
            </div>
        );
    }
}

export default UploadFile;