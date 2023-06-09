import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone';
import "../../styles/dropzone.css"

const ContactForm = () => {
  const { actions } = useContext(Context);
  const [formValues, setFormValues] = useState({
    image: null,
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  const {image, name, address, phone, email } = formValues;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (acceptedFiles) => {
    setFormValues({ ...formValues, image: acceptedFiles[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.addContact();
    navigate('/contact');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="imageUpload">
        <Form.Label>Upload Image</Form.Label>
        <Dropzone onDrop={handleImageChange} accept="image/*" multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Uploaded" />
              ) : (
                <p>Drag 'n' drop an image here, or click to select a file</p>
              )}
            </div>
          )}
        </Dropzone>
      </Form.Group>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleChange}
          name="name"
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={handleChange}
          name="address"
        />
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={handleChange}
          name="phone"
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          name="email"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;


