import React from "react";
import styled from "styled-components";
import logo from "../../logo.gif";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";



export const Navbar = () => {

  
  return (

    <NavbarContainer>
      <nav
        className="navbar navbar-expand-lg navbar-light px-5 py-2"
        justify-content-between
      >
        <Link className="navbar-brand ml-5" to="/">
          <img style={{ width: "90px" }} src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link ml-5" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            
           
          </ul>
         
        </div>
      </nav>
    </NavbarContainer>
  );
};

export default Navbar;

//mainNavbar container
const NavbarContainer = styled.div`
  background: var(--magenta);
  .nav-link {
    color: #fff !important;
    &:hover {
      background: var(--lightMagenta);
    }
  }
`;
