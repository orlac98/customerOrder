import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";

const AddOrder = () => {
    //hooks used for inputs to db
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [productno, setProductno] = useState("");
    const [fileName, setFileName] = useState("");
    const [message, setMessage] = useState('')

    //function to grab value for image
    const onChangeFile = e => {
      setFileName(e.target.files[0]);
    }

    


    //when button is clicked 
    const changeOnClick = e => {
        e.preventDefault();

        const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("productno", productno);
    formData.append("image", fileName);

       

        setName("");
        setEmail("");
        setProductno("");

        //axios used to send to db
        //set message to show instead of console.log
        axios
        .post("/orders/add", formData)
        .then((res) => setMessage(res.data))
        .catch((err) => {
            console.log(err)
        });
    };



  return (
    <AddOrderContainer>
      <div className="container">
        <h1> Add New Customer Order</h1>
        <span className="message">{message}</span>
        <form onSubmit={changeOnClick} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e)=> setProductno(e.target.value)}
              className="form-control"
              placeholder="Enter Product Number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="file"> Choose Product Image</label>
            <input type="file" filename="image"
            className="form-control-file"
            onChange={onChangeFile}/>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Order
          </button>
        </form>
      </div>
    </AddOrderContainer>
  );
};

export default AddOrder;

//main container
const AddOrderContainer = styled.div`
  margin: 3rem auto;
  padding: 4rem;
  width: 31.25rem;

  h1{
      font-width: 900;
      color: var( --magenta);
      text-align: center;

  }

  .btn-primary {
      margin-top: 2rem;
      background: var(--magenta);
      border: none;
    &:hover{
        background: var(--lightMagenta);
    }
  }

  .message {
    font-weight: 900;
    color: var(--lightMagenta);
    text-align: center;

}
`;
