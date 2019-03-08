import React from 'react';
import { Table, Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import DisplayRow from './DisplayRow';

class DisplayList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateDataTable = this.updateDataTable.bind(this);
        this.changeCodeSearch = this.changeCodeSearch.bind(this);
        this.changeNameSearch = this.changeNameSearch.bind(this);
        this.seachRetails = this.seachRetails.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.changeCode = this.changeCode.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.handleUpdateData = this.handleUpdateData.bind(this);
        this.state = {
            list: [],
            showMore: false,
            show: false,
            page: 0,
            name: '',
            code: '',
            updateId: '',
            updateName: '',
            updateCode: '',
            updateQuantity: '',
            updatePrice: '',
            answer: false,
            total: 0,
        }
    }
    handleUpdate = (object) => {
        this.setState({
            show: true,
            updateId: object.id,
            updateCode: object.code,
            updateName: object.name,
            updateQuantity: object.quantity,
            updatePrice: object.price
        });
    }

    handleUpdateData = (event) => {
        this.setState({
            show: false
        });
        var axios = require('axios');
        axios.put('http://localhost:8090/goods/update', {
            id: this.state.updateId,
            name: this.state.updateName,
            code: this.state.updateCode,
            quantity: this.state.updateQuantity,
            price: this.state.updatePrice
        })
            .then((response) => {
                //debugger;
                var newList = this.state.list;
                for (let index = 0; index < newList.length; index++) {
                    var element = newList[index];
                    if (element.id === this.state.updateId) {
                        element.name = this.state.updateName;
                        element.code = this.state.updateCode;
                        element.price = this.state.updatePrice;
                        element.quantity = this.state.updateQuantity;
                    }
                }
                this.setState({
                    list: []
                });
                this.setState({
                    list: newList
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleShow = () => {
        this.setState({
            show: true
        });
    };

    handleClose() {
        this.setState({ show: false });
    }

    changeNameSearch = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    changeCodeSearch = (event) => {
        this.setState({
            code: event.target.value
        })
    }

    changeName = (event) => {
        this.setState({
            updateName: event.target.value
        })
    }
    changeCode = (event) => {
        this.setState({
            updateCode: event.target.value
        })
    }
    changeQuantity = (event) => {
        this.setState({
            updateQuantity: event.target.value
        })
    }
    changePrice = (event) => {
        this.setState({
            updatePrice: event.target.value
        })
    }

    seachRetails = (event) => {
        var code = this.state.code;
        var page = this.state.page;
        var name = this.state.name;
        const axios = require('axios');
        axios.get('http://localhost:8090/goods/search/' + code + '/' + name)
            .then((response) => {
                var record = parseInt(response.data);
                console.log('Tong so record ' + response.data);
                // alert(' hic ' + record);
                if (record > 0) {
                    this.setState({
                        answer: false,
                        total: record
                    });
                    if (record - 2 > 0) {
                        this.setState({
                            showMore: true
                        })
                    }
                } else {
                    this.setState({
                        answer: true,
                        total: 0,
                    });
                }

            }).catch(function (error) {
                console.log(error);
            });
        axios.get('http://localhost:8090/goods/search/' + code + '/' + name + '/' + page)
            .then((response) => {
                this.setState({
                    list: response.data
                });
                //alert(" this.state.list.length" + this.state.list.length);
                if (this.state.list.length === 0) {
                    this.setState({
                        answer: true
                    });
                } else {
                    this.setState({
                        answer: false
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });

        event.preventDefault();

    }

    updateDataTable = (id) => {
        var pos = -1;
        this.state.list.forEach((element, index) => {

            if (element.id === id) {
                pos = index;
            }
        });
        if (pos > -1) {
            this.state.list.splice(pos, 1);
            var newList = this.state.list;
            this.setState({
                list: newList
            })
            // call API to delete it base on ID:
            var axios = require('axios');
            axios.delete('http://localhost:8090/goods/delete/' + id)
                .then((response) => {

                    if (response.status === 200) {
                        alert(' Xoa Thanh Cong ');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    showMore = (event) => {
        event.preventDefault();
         // alert(' show more ');
        var code = this.state.code;
        var newPage = this.state.page + 1;
        this.setState({
            page: newPage
        })
        var name = this.state.name;
        const axios = require('axios');
        axios.get('http://localhost:8090/goods/search/' + code + '/' + name + '/' + newPage)
            .then((response) => {
                var newList = this.state.list.concat(response.data);
                this.setState({
                    list: newList
                });
                if (newList.length < this.state.total) {
                    this.setState({
                        showMore: true
                    })
                }
                else {
                    this.setState({
                        showMore: false
                    })
                };
            })
            .catch(function (error) {
                console.log(error);
            });

    
    }


    render() {
        return (
            <Container>
                <div class="panel panel-default">
                    <Row style={{ marginTop: 10, marginBottom: 0 }}>
                        <div class="panel-heading" style={{ fontSize: 20, color: "#9932CC", backgroundColor: "#F8F8FF", marginTop: 5, marginBottom: 15 }}>Tìm Kiếm Hàng Hóa</div>
                    </Row>
                    <Row>
                        <div class="panel-body">

                            <Form>
                                <Row>
                                    <Col xs="6">
                                        <Form.Group controlId="formBasicCode">
                                            <Form.Label>Code </Form.Label>
                                            <Form.Control type="text" placeholder="Enter your code" onChange={this.changeCodeSearch} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs="6">
                                        <Form.Group controlId="formBasicName">
                                            <Form.Label>Enter Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter name" onChange={this.changeNameSearch} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 20, marginBottom: 20 }}>
                                    <Col xs="12">
                                    <Button variant="outline-success" type="submit" onClick={this.seachRetails}>
                                            Search
                                    </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Row>
                </div>
                <Row>
                    {this.state.answer &&
                        <p><i>Không tìm thấy hàng hóa thõa mãn điều kiện tìm kiếm của bạn ! Vui lòng thử lại !</i></p>
                    }
                </Row>
                <Row style={{ marginTop: 20, marginBottom: 20 }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Tên </th>
                                <th>Code</th>
                                <th>Số Lượng</th>
                                <th>Giá</th>
                                <th colSpan="2">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.list.map((item, value) => {
                                return (
                                    <DisplayRow row={item} rowId={item.id} key={item.id}
                                        removeNow={() => { this.updateDataTable(item.id) }}
                                        updateNow={() => { this.handleUpdate(item) }}
                                    />
                                )
                            })}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    {this.state.showMore &&
                        <Button variant="outline-primary" onClick={this.showMore.bind(this)}>Show More</Button>
                    }
                </Row>
                <Row>
                    <>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Cập nhật hàng hóa </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Row>
                                        <Col xs="6">
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Tên Hàng</Form.Label>
                                                <Form.Control type="text" placeholder="Enter name" onChange={this.changeName} value={this.state.updateName} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs="6">
                                            <Form.Group controlId="formBasicCode">
                                                <Form.Label>Code </Form.Label>
                                                <Form.Control type="text" placeholder="Enter your code" onChange={this.changeCode} value={this.state.updateCode} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="6">
                                            <Form.Group controlId="formBasicQuantity">
                                                <Form.Label>Số lượng </Form.Label>
                                                <Form.Control type="number" placeholder="Enter Quantity" onChange={this.changeQuantity} value={this.state.updateQuantity} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs="6">
                                            <Form.Group controlId="formBasicPrice">
                                                <Form.Label>Giá</Form.Label>
                                                <Form.Control type="number" step="any" placeholder="Enter price" onChange={this.changePrice} value={this.state.updatePrice} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Hủy
                            </Button>
                                <Button variant="primary" onClick={this.handleUpdateData}>
                                    Cập nhật
                             </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                </Row>
            </Container>

        )
    }
}
export default DisplayList;