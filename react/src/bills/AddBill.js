import React from 'react'
import { Table, Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import BillRows from './BillRows';

class AddBill extends React.Component {
  constructor(props) {
    super(props);
    this.changeName = this.changeName.bind(this);
    this.changeCustomer = this.changeCustomer.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.addItemsToList = this.addItemsToList.bind(this);
    this.changeIName = this.changeIName.bind(this);
    this.iCode = this.changeICode.bind(this);
    this.changeIPrice = this.changeIPrice.bind(this);
    this.changeIQuantity = this.changeIQuantity.bind(this);
    this.saveData = this.saveData.bind(this);

    this.state = {
      // ten hoa don :
      name: '',
      // Ten khach hang:
      customer: '',
      // Dia chi khach hang:
      address: '',
      // list san pham mua :
      list: [],
      showItems: false,
      // show popup form:
      show: false,
      // input name
      iName: '',
      // input code :
      iCode: '',
      // input price
      iPrice: '',
      // input quanlity:
      iQuantity: '',

    }
  }
  changeIName = (event) => {
    this.setState({
      iName: event.target.value
    })
  }
  changeICode = (event) => {
    this.setState({
      iCode: event.target.value
    })
  }
  changeIPrice = (event) => {
    this.setState({
      iPrice: event.target.value
    })
  }
  changeIQuantity = (event) => {
    this.setState({
      iQuantity: event.target.value
    })
  }
  changeName = (event) => {
    this.setState({
      name: event.target.value
    })
  }
  changeCustomer = (event) => {
    this.setState({
      customer: event.target.value
    })
  }
  changeAddress = (event) => {
    this.setState({
      address: event.target.value
    })
  }
  handleShow = () => {
    this.setState({
      show: true
    });
  };

  handleClose() {
    this.setState({ show: false });
  }
  addItemsToList = () => {
    //alert(' mai mua mi tom an ! ');
    var name = this.state.iName;
    var code = this.state.iCode;
    alert(' icode ' + code);
    var price = this.state.iPrice;
    var quantity = this.state.iQuantity;
    alert(' quanlity ' + quantity);
    var objects = { name, code, quantity, price, }
    var newList = this.state.list;
    newList.push(objects);
    this.setState({
      list: newList,
      showItems: true
    });
    console.log(newList);
    this.setState({
      show: false
    })
  };

  saveData = () => {
    //alert(' Ahuhu ');
    var axios = require('axios');
    axios.post('http://localhost:8090/bills/add',
      {

        "title": this.state.name,
        "items": this.state.list,
        "consumer": {
          "name": this.state.customer,
          "address": this.state.address
        }
      })
      .then(function (response) {
        console.log(response.status);
        if (response.status === 200) {
          alert(" Bạn đã thêm hóa đơn thành công ! ");
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <Container>
        <div class="panel panel-default">
          <Row>
            <div class="panel-heading" style={{ fontSize: 20, color: "#9932CC", backgroundColor: "#F8F8FF", marginTop: 5, marginBottom: 15 }}>Nhập Thông Tin Hóa Đơn </div>
          </Row>

          <div class="panel-body">
            <Row>
              <Col xs="12">
                <Form.Group controlId="formBasicNameBill">
                  <Form.Label>Nhập Tên Hóa Đơn </Form.Label>
                  <Form.Control type="text" placeholder="Enter bill name" onChange={this.changeName} required value={this.state.name} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <Form.Group controlId="formBasicCode">
                  <Form.Label>Nhập Tên Khách Hàng</Form.Label>
                  <Form.Control type="text" placeholder="Enter customer " onChange={this.changeCustomer} required value={this.state.customer} />
                </Form.Group>
              </Col>
              <Col xs="6">
                <Form.Group controlId="formBasicCode">
                  <Form.Label>Địa Chỉ Khách Hàng </Form.Label>
                  <Form.Control type="text" placeholder="Enter customer " onChange={this.changeAddress} required value={this.state.address} />
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: 20, marginBottom: 10 }}>
              {this.state.showItems &&
                <Table>
                  <thead>
                    <tr>
                      <th>Mã Hàng</th>
                      <th>Tên Mặt Hàng</th>
                      <th>Giá</th>
                      <th>Số Lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.list.map((item, value) => {
                      return (
                        <BillRows row={item} key={item.name} />
                      )
                    })}
                  </tbody>
                </Table>
              }
            </Row>
            <Row>
              <Button variant="outline-secondary" onClick={this.handleShow}>
                Thêm Mặt Hàng Vào Hóa Đơn
             </Button>
            </Row>
            <Row>
              <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title> Thêm Mặt Hàng Vào Hóa Đơn </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Row>
                        <Col xs="6">
                          <Form.Group controlId="iCode">
                            <Form.Label>Mã Hàng</Form.Label>
                            <Form.Control type="text" onChange={this.changeICode} value={this.state.iCode} />
                          </Form.Group>
                        </Col>
                        <Col xs="6">
                          <Form.Group controlId="iName">
                            <Form.Label>Tên Mặt Hàng</Form.Label>
                            <Form.Control type="text" onChange={this.changeIName} value={this.state.iName} />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <Form.Group controlId="iPrice">
                            <Form.Label>Giá </Form.Label>
                            <Form.Control type="number" onChange={this.changeIPrice} value={this.state.iPrice} />
                          </Form.Group>
                        </Col>
                        <Col xs="6">
                          <Form.Group controlId="iQuantity">
                            <Form.Label>Số Lượng </Form.Label>
                            <Form.Control type="text" onChange={this.changeIQuantity} value={this.state.iQuantity} />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Cancel
                </Button>
                    <Button variant="primary" onClick={this.addItemsToList}>
                      Thêm Mặt Hàng
                </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </Row>
            <Row style={{ marginTop: 10, marginBottom: 0 }}>
              <Button variant="outline-success" onClick={this.saveData} style={{ position: "absolute", right: 200 }}>
                Thêm
            </Button>
            </Row>
          </div>
        </div>
      </Container>
    )
  }
}
export default AddBill;