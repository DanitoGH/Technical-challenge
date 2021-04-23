import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import './App.css';
import { Row, Container, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useForm } from "react-hook-form";
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications';

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/auth/register', data)
    .then(res =>  {
       console.log(res.data)
       NotificationManager.success('User Registration', 'User successfully created.')
    })
    .catch(err => {
      const errorMsg = err.response.data.error.message
      NotificationManager.error('Error message',  errorMsg)
    })
  }

  return (
     <Container className="marginTop">
       <NotificationContainer />
      <Row>
      <Col md={{ span: 4, offset: 4 }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
           name="phone_number"
           type="number"
           placeholder="Enter number..."
           autoComplete="off" 
           {...register("phone_number", {
              required: true , 
              minLength: { value: 10},
              maxLength: { value: 10,}
            }
          )}
         />
        {errors.phone_number && <label className="text-danger font-weight-bold small">Error: invalid phone number entered!</label>}
       </Form.Group>
       <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          name="password"
          type="password"
          placeholder="Enter password..." 
          autoComplete="off" 
          {...register("password", {
            required: true , 
            minLength: { value: 2},
          }
        )}
       />
      {errors.password && <label className="text-danger font-weight-bold small">Please enter a valid password!</label>}
      </Form.Group>
      <Button variant="primary" block type="submit" mt="3">
        Submit
      </Button>
      </Form>
     </Col>
    </Row>
  </Container>
  );
}

export default App;
