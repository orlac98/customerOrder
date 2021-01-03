import React, {useState, Component} from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import spinner from "../spinner.gif";
import { Link } from "react-router-dom";
import axios from 'axios';
import Modal from "react-bootstrap/Modal";


//displaying db data using hooks

  //hooks used for inputs to db
  

const Orders = ({ posts }) => {
  const [order, setOrder] = useState([]);
  //modal set for false so it has ti be prompted to open
  const [isOpen, setIsOpen] = React.useState(false);
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
        setFileName("");

        //axios used to send to db
        //set message to show instead of console.log
        axios
        .post("/orders/add", formData)
        .then((res) => setMessage(res.data))
        .catch((err) => {
            console.log(err)
        });

        
    };


  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  //delete order by id
  //path to order and grab it by id to delete
  const deleteOrder = (id) => {
    axios.delete(`/orders/${id}`)
    .then((response) => (response.data));
    //filter by id 
  setOrder(order.filter((element) => element._id !== id));
  };



  return (
    //if theres no data to show spinner will play till it loads
    //images are stored in public/uploads when added and then displayed 
    //customer names are links so you can click them and will bring you to a page by id 
    //modal added with form, that submits to db 
    <MainContainer>
      {!posts.length ? (
        <img src={spinner} alt="loading.." />
      ) : (
        <div className="container-xl">
          <div className="table-wrapper">
          <div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Manage Customer Orders</h2>
					</div>
					<div className="col-sm-6">
					<button onClick={showModal}  className="btn ">Add Customer Order</button>
						
					</div>
				</div>
			</div>
        <div className="container">


      <Modal show={isOpen} onHide={hideModal}>
      <AddOrderContainer>
        <Modal.Header>
          <Modal.Title><h1> Add New Customer Order</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="container">
        
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
      </div></Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={hideModal}>Cancel</button>
         
        </Modal.Footer>
        </AddOrderContainer>
      </Modal>
    
    </div>
      
          <Table className="table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Product Number</th>
                <th>Product Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((order, key) => (
                <tr>
                  
                  <Link
                    to={{
                      pathname: `/order/${order._id}`
                    }}
                  >
                    <td>{order.name}</td>
                  </Link>
                  
                  <td>{order.email}</td>
                  <td>{order.productno}</td>
                  <td><img src={`/uploads/${order.image}`} alt="..."/>
                  </td>
                  <td>
                    {" "}
                    <Link
                      to={`/update/${order._id}`}
                      className="btn btn-outline-success"
                    >
                      {" "}
                      Edit Order
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => deleteOrder(order._id)} className="btn btn-outline-danger">
                      {" "}
                      Delete Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        </div>
      )}
     
    </MainContainer>
  );
};


export default Orders;

//main container
const MainContainer = styled.div`
  margin: 7rem 0;

  img {
    width: 10rem;
    display: block;
    margin: 0 auto;
  }

  td {
    color: #544348;
  }
  .table-wrapper {
    background: #fff;
    padding: 20px 25px;
    border-radius: 3px;
    min-width: 1000px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
  }
  .table-title {        
    padding-bottom: 15px;
    padding: 16px 30px;
    min-width: 100%;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
  }
  .table-title .btn {
    float: right;
    background: var(--magenta);
  }
`;
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