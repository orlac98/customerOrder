import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import spinner from "../spinner.gif";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const Order = (props) => {
  //hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [productno, setProductno] = useState("");
  const [image, setImage] = useState("");

  

  useEffect(() => {
    axios
      //props pass from app.js to order.js
      .get(`/orders/${props.match.params.id}`)
      .then((res) => [
        setName(res.data.name),
        setEmail(res.data.email),
        setProductno(res.data.productno),
        setImage(res.data.image)
      ])
      .catch((error) => console.log(error));
  }, [props]);

  return (
    //display info on page
    //if name/email/productno isnt loaded spinner will show
    <MainContainer>
      {!name || !email || !productno || !image ? (
        <img src={spinner} alt="loading.. " />
      ) : (
        // <>
        <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Product Number</th>
                <th>Product Image</th>
               
              </tr>
            </thead>
            <tbody>
                <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{productno}</td>
                <td><img src={`/uploads/${image}`} alt="..."/>
                </td>
                
                </tr>
            </tbody>
            </Table>

            
      
      )}
       <Link to ="/" type="submit" className="btn btn-primary">
            Back To Home
          </Link>
    </MainContainer>
  );
};

export default Order;

// main container
const MainContainer = styled.div`
  margin: 6rem auto;
  padding: 3rem 14rem;

  h2 {
    text-align: center;
    font-weight: 900;
    color: var(--darkMagenta);
  }

  img {
    //   width: 1.5rem;
      display: block;
      margin: auto;
  }

  .btn-primary {
    margin-top: 2rem;
    background: var(--magenta);
    border: none;
  &:hover{
      background: var(--lightMagenta);
  }
}
`;
