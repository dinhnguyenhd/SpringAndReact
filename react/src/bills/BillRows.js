import React from 'react';

class BillRows extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.row.name,
            code : this.props.row.code,
            price: this.props.row.price,
            quanlity : this.props.row.quanlity,
           
        }
    }
    render() {
        return (
            <tr>
                <td>{this.state.name}</td>
                <td>{this.state.code}</td>
                <td>{this.state.price}</td>
                <td>{this.state.quanlity}</td>
            </tr>
        )
    }
}
export default BillRows;