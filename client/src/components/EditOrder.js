import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const EditOrder = props => {
    //hooks used for inputs to db
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [productno, setProductno] = useState("");
    const [message, setMessage] = useState('');
    const [fileName, setFileName] = useState("");


    
        //function to grab value for image
        const onChangeFile = (e) => {
            setFileName(e.target.files[0]);
          };

    //when button is clicked 
    const changeOnClick = (e)=> {
        e.preventDefault();



      const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("productno", productno);
    formData.append("image", fileName);

       

        setName("");
        setEmail("");
        setProductno("");

        //axios used to make request to update the db
        //set message to show instead of console.log
        axios
        .put(`/orders/update/${props.match.params.id}`, formData)
        .then((res)=> setMessage(res.data))
        .catch((err) => {
            console.log(err)
        });
    }

    useEffect(() => {
        axios
          //props pass from app.js to order.js
          .get(`/orders/${props.match.params.id}`)
          .then((res) => [
            setName(res.data.name),
            setEmail(res.data.email),
            setProductno(res.data.productno),
            setFileName(res.data.originalname)
          ])
          .catch((error) => console.log(error));
      }, []);



  return (
    <EditOrderContainer>
       
      <div className="container">
      
        <h1> Edit Customer Order</h1>
        <span className="message">{message}</span>
        <form onSubmit={changeOnClick} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              className="form-control"
              placeholder="Enter Customer Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Customer Email</label>
            <input
              type="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Email Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="productno">Product Number</label>
            <input
              type="text"
              value={productno}
              onChange={(e) => setProductno(e.target.value)}
              className="form-control"
              placeholder="Enter Product Number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="file"> Choose Product Image</label>
            <input type="file"  filename="image"
            className="form-control-file"
            onChange={onChangeFile}/>
          </div>


          <button type="submit" className="btn btn-primary">
            Update Order
          </button>
          <Link to ="/" type="submit" className="btn btn-danger">
            Back To Home
          </Link>
        </form>
      </div>
    </EditOrderContainer>
  );
};

export default EditOrder;

//main container
const EditOrderContainer = styled.div`
  margin: 3rem auto;
  padding: 4rem;
  width: 41.25rem;

  h1{
      font-width: 900;
      color: var( --magenta);
      text-align: center;

  }

  .btn-primary {
      margin-top: 2rem;
      background: var(--magenta);
      border: none;
      float: right;
    &:hover{
        background: var(--lightMagenta);
    }
  }

  .message {
      font-weight: 900;
      color: var(--lightMagenta);
      text-align: center;

  }
  

  .btn-danger{
    margin-top: 2rem;
    background: var(--lightMagenta);
    border: none;
    float: left;
  &:hover{
      background: var(--lightMagenta);
  }
}
  
`;
