import React, { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { Radio, Button } from 'antd';
import { auth, generateUserDocument } from '../../../../config/Firebase/firebase';
import { loginUser } from '../../../../store/actions/auth';
import zxcvbn from 'zxcvbn';
import PasswordStregthComponent from "../../../../components/passwordStrengthComponent";

function SignUp() {

  const actionDispatch = useDispatch();
  const loginUserDispatch = useCallback((data) => actionDispatch(loginUser(data)), [actionDispatch]);

  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordStrength, setPasswordStrength ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ accountType, setAccountType ] = useState('student');
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setError(null);

    if (name === 'username') {
      setUsername(value);
    } else if(name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
      setPasswordStrength(zxcvbn(password).score);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const onRadioChangeHandler = (event) => {
    const { value } = event.target;
    setAccountType(value)
  }
  
  const validateCredentials = () => {
    return password === confirmPassword;
  }

  const signUpWithEmailAndPasswordHandler = async (event) => {

    event.preventDefault();
    
    if (validateCredentials()) {
      setLoading(true);

      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        const userData = await generateUserDocument(user, {accountType, username});
        setLoading(false);
        loginUserDispatch(userData);
      }
      catch(error) {
        console.log(error)
        setLoading(false);
        setError(error.message)
      }
    } else {
      setError('Password Mismatch');
    }
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up with credentials</small>
            </div>
            <Form role="form">
            {error && 
                <Alert color="danger">
                  {error}
                </Alert>
              }
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input name="username" value={username} onChange={onChangeHandler} placeholder="Firstname" type="text" required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input name="email" value={email} onChange={onChangeHandler} placeholder="Email" type="email" autoComplete="new-email"/>
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
                <PasswordStregthComponent passwordStrength={passwordStrength} password={password}/>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input name="confirmPassword" value={confirmPassword} onChange={onChangeHandler} placeholder="Confirm Password" type="password" autoComplete="new-password"/>
                </InputGroup>
              </FormGroup>
              
              <div className="text-center">
              <Radio.Group onChange={onRadioChangeHandler} value={accountType}>
                <Radio value='student'>I am a Student</Radio>
                <Radio value='lecturer'>I am a Lecturer</Radio>
              </Radio.Group>
              </div>
              <div className="text-center">
                <Button className="mt-4" size="large" type="primary" loading={loading} onClick={signUpWithEmailAndPasswordHandler}>
                  Create account
                </Button>
              </div>
              <Row className="mt-4">
                  <Col>
                  <span>Already have an account? </span>
                  <Link to='/auth/lohgin'>Login</Link>
                  </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );

}

export default SignUp;