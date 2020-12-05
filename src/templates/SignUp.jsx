import React, {useState, useCallback} from 'react';
import {TextInput, PrimaryButton} from "../components/UIkit";
import {signUp} from '../reducks/users/operations'
import {useDispatch} from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState(""),
        [username, setUsername] = useState("");

  const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
  },[setEmail]);

  const inputPassword = useCallback((e) => {
      setPassword(e.target.value)
  },[setPassword]);

  const inputConfirmPassword = useCallback((e) => {
      setConfirmPassword(e.target.value)
  },[setConfirmPassword]);

  const inputUsername = useCallback((e) => {
      setUsername(e.target.value)
  },[setUsername]);

  // const [inputValues, setInputValues] = useState({
  //   email:"",
  //   password:"",
  //   confirmPassword:"",
  //   username:""
  // })

  // const userInput = useCallback(
  //   (event) => {
  //     const target = event.target;
  //     const value = target.type === "checkbox" ? target.checked : target.value;
  //     // const value = target.value;
  //     const name = target.name;

  //     setInputValues({ ...inputValues, [name]: value });
      
  //   },
  //   [setInputValues],
  // )


  return(
    <div className="c-section-container">
      <h2 className="u-text-center u-text__headline">Register account</h2>
      <div className="module-spacer--medium" />
      <TextInput 
        fullWidth={true}
        label={"User Name"}
        multiline={false}
        required={true}
        row={1}
        defaultValue={username}
        type={"text"}
        onChange={inputUsername}
      />
      <TextInput 
        fullWidth={true}
        label={"Email"}
        multiline={false}
        required={true}
        row={1}
        defaultValue={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput 
        fullWidth={true}
        label={"password"}
        multiline={false}
        required={true}
        row={1}
        defaultValue={password}
        type={"password"}
        onChange={inputPassword}
      />
      <TextInput 
        fullWidth={true}
        label={"confirm Password"}
        multiline={false}
        required={true}
        row={1}
        defaultValue={confirmPassword}
        type={"password"}
        onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
              label={"Register"}
              // onClick={() => alert(username)}
              onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
          />
          <div className="module-spacer--small" />
          
      </div>
      {/* <div>asdf{inputValues && {inputValues.usename}</div> */}
    </div>

    
  )
}

export default SignUp