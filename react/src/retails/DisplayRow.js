import React from 'react';
import { Button } from 'react-bootstrap';

class DisplayRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.row.id,
            name: this.props.row.name,
            code: this.props.row.code,
            quantity: this.props.row.quantity,
            price: this.props.row.price
        }
    }

    handleRemove = (rowId) => {
        this.props.removeNow(rowId);

    }
    handleUpdate = (row) => {
        this.props.updateNow(row);

    }
    render() {
        return (
            <tr>
                <td>{this.state.name}</td>
                <td>{this.state.code}</td>
                <td>{this.state.quantity}</td>
                <td>{this.state.price}</td>
                <td>
                <Button variant="outline-danger" onClick={this.handleRemove.bind(this)}>Xóa </Button>
                </td>
                <td>
                <Button variant="outline-danger" onClick={this.handleUpdate.bind(this)}>Cập nhật </Button>
                </td>
            </tr>
        )
    }
}
export default DisplayRow;