import React, { useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// reactstrap components
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert
} from "reactstrap";

import { Button } from 'antd';
import { auth, getUserDocument } from '../../../../config/Firebase/firebase';
import { loginUser } from '../../../../store/actions/auth';

function SignIn() {

  const actionDispatch = useDispatch();
  const loginUserDispatch = useCallback((data) => actionDispatch(loginUser(data)), [actionDispatch]);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setError(null);

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const signInWithEmailAndPasswordHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const userData = await getUserDocument(user.uid);
      console.log(userData)
      setLoading(false);
      loginUserDispatch(userData);
    }
    catch(error) {
      console.log(error)
      setLoading(false);
      setError(error.message)
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form">
              {error && 
                <Alert color="danger">
                  {error}
                </Alert>
              }
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input name="email" value={email} onChange={onChangeHandler} placeholder="E.g: paulofili@gmail.com" type="email" autoComplete="new-email" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input name="password" value={password} onChange={onChangeHandler} placeholder="Enter Password" type="password" autoComplete="new-password"/>
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button onClick={signInWithEmailAndPasswordHandler} className="my-4" loading={loading} type="primary" size="large">
                  Sign in
                </Button>
              </div>
              <Row className="mt-3">
                  <Col className="text-left">
                  <span>Don't have an account? </span>
                  <Link to='/auth/register'>Register Here</Link>
                  </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default SignIn;
