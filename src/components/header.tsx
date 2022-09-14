import Switch from "react-switch";
import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface HeaderState {
  checked: boolean;
}
interface HeaderProps {}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked: boolean) {
    this.setState({ checked });
  }
  render() {
    console.log(window.location);
    return (
      <Navbar bg="headColor" variant="dark" sticky="top">
        <Navbar.Collapse>
          <Form className="d-flex">
            <Form.Control
              type="Enter Keyword"
              placeholder="Enter Keyword"
              className="me-2"
              aria-label="Enter Keyword"
            />
          </Form>
          <Nav>
            <Router>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/world">World</Nav.Link>
              <Nav.Link href="/politics">Politcs</Nav.Link>
              <Nav.Link href="/business">Business</Nav.Link>
              <Nav.Link href="/technology">Technology</Nav.Link>
              <Nav.Link href="/sport">Sport</Nav.Link>
              <Nav.Link href="/style">Style</Nav.Link>
            </Router>
          </Nav>
          {/* <Nav>
              <Nav.Link href='#NYT'>NYTimes</Nav.Link>
              <Nav.Link href='#Guardian'>Guardian</Nav.Link>
            </Nav> */}
          <span className="NYTimes">NY Times</span>
          <Switch
            checked={this.state.checked}
            onChange={this.handleChange}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
          <span className="Guardian">Guardian</span>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
