import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Container style={{ marginTop:50, marginLeft:100 }}>
        <div className="App">
          <Row style={{ marginLeft: 100, marginBottom: 10 }}>
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
              <ul class="navbar-nav">
                <li class="nav-item" style={{ minWidth: 100, marginRight: 20, marginLeft :100 }}>
                  <Link to="/home" >Home</Link>
                </li>
                <li class="nav-item" style={{ minWidth: 100, marginRight: 20 }}>
                  <Link to="/retail/list">Seach Retail</Link>
                </li>
                <li class="nav-item" style={{ minWidth: 100, marginRight: 20 }}>
                  <Link to="/retail/add">Add Retail </Link>
                </li>
                <li class="nav-item" style={{ minWidth: 100, marginRight: 20 }}>
                  <Link to="/bill/add">Add Bill </Link>
                </li>
              </ul>
            </nav>
          </Row>
        </div>
      </Container>
    );
  }
}

export default App;
