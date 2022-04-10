
import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';


const auth = getAuth (app)
function App() {
  const [validated, setValidated] = useState(false);
  const [registered,setRegistered]=useState(false)
  const [error,setError]=useState('');

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleEmailBlur=(event)=>{
  setEmail(event.target.value);
  }
  const handlePasswordBlur=(event)=>{
    setPassword(event.target.value);
  }
  const handleCheckRegistered =event=>{
    console.log(event.target.checked)
  }
  const handleSubmitForm =(event)=>{
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
    
      event.stopPropagation();
      return;
    }
    if(!/(?=.*?[0-9])/.test(password)){
      setError('Insert at least one digit')
      return
    }
    setError('')

    setValidated(true);

    createUserWithEmailAndPassword(auth,email,password)
    .then(result=>{
      const user =result.user;
      console.log(user);
    })
    .catch(error =>{
      console.error(error)
      setError(error.message)
    })
    event.preventDefault();

  }

  return (
    <div className="App">
      <div className='form-container mx-auto'>
        <h1 className='text-success mt-5'>Please Login First</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required/>
   <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required/>
    <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
          <p className='text-danger' >{error}</p>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check onChange={handleCheckRegistered} type="checkbox" label="Already Registered ?" />
  </Form.Group>
  </Form.Group>
  <Button variant="primary" type="submit">
    Register
  </Button>
</Form>
      </div>
      
    </div>
  );
}

export default App;
