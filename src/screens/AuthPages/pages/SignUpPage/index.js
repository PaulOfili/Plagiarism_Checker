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
  InputGroup,
  Row,
  Col,
  Alert
} from "reactstrap";
import { Radio, Button, Select, message } from 'antd';
import { auth, createUserDocument } from '../../../../config/Firebase/firebase';
import { lecturer_courses } from "../../../../config/constants"
import { loginUser } from '../../../../store/actions/auth';
import zxcvbn from 'zxcvbn';
import PasswordStrengthComponent from "../../../../components/PasswordStrengthCheckerComponent";

const { Option } = Select;

function SignUp() {

  const actionDispatch = useDispatch();
  const loginUserDispatch = useCallback((data) => actionDispatch(loginUser(data)), [actionDispatch]);

  const [ firstname, setFirstname ] = useState('');
  const [ lastname, setLastname ] = useState('');
  const [ matricNo, setMatricNo ] = useState('')
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordStrength, setPasswordStrength ] = useState(0);
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ accountType, setAccountType ] = useState('student');
  const [ courses, setCourses ] = useState([]);
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setError(null);

    if (name === 'firstname') {
      setFirstname(value);
    } else if(name === 'lastname') {
      setLastname(value);
    } else if(name === 'matricNo') {
      setMatricNo(value);
    } else if(name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
      setPasswordStrength(zxcvbn(password).score);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const onMultipleChangeHandler = (value) => {
    setCourses(value)
  }

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
        const userData = await createUserDocument(user, {
          accountType, 
          firstname, 
          lastname, 
          matricNo,
          courses
        });
        loginUserDispatch(userData);
      }
      catch(error) {
        message.error("An error occured. Please try again later.")
        setError(error.message)
      } finally {
        setLoading(false);
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
                  <Input name="firstname" value={firstname} onChange={onChangeHandler} placeholder="Firstname" type="text" required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input name="lastname" value={lastname} onChange={onChangeHandler} placeholder="Lastname" type="text" required />
                </InputGroup>
              </FormGroup>
              {
                accountType === "student" && (
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input name="matricNo" value={matricNo} onChange={onChangeHandler} placeholder="Matric Number" type="text" required />
                  </InputGroup>
                </FormGroup>
                )
              }  
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input name="email" value={email} onChange={onChangeHandler} placeholder="Email" type="email" autoComplete="new-email"/>
                </InputGroup>
              </FormGroup>
              {
                accountType === "lecturer" && (
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Select
                      mode="multiple"
                      size="large"
                      style={{ width: '100%', minHeight: '2.8rem' }}
                      placeholder="Please select your courses"
                      value={courses}
                      onChange={onMultipleChangeHandler}
                    >
                      {lecturer_courses.map(course => (
                        <Option key={course.key}>{course.value}</Option>
                      ))}
                    </Select>
                  </InputGroup>
                </FormGroup>
                )
              }
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input name="password" value={password} onChange={onChangeHandler} placeholder="Enter Password" type="password" autoComplete="new-password"/>
                </InputGroup>
                <PasswordStrengthComponent passwordStrength={passwordStrength} password={password}/>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
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