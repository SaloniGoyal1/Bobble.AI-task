import React, { Component } from "react";
import Facebook from "react-facebook-login";
import "./App.css";
import logo from './logo.png';

const validForm = ({ dataError, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(dataError).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

// check that entered email is email or not 
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const responseFacebook = (response) => {
  console.log(response);
};

const handleSubmit = () => {
  alert("Thank you for signing up");
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      dataError: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let dataError = { ...this.state.dataError };

    // Basic conditions for input data
    switch (name) {
      case "firstName":
        dataError.firstName =
          value.length < 3 ? "Minimum 3 characaters required" : "";
        break;
      case "lastName":
        dataError.lastName =
          value.length < 3 ? "Minimum 3 characaters required" : "";
        break;
      case "email":
        dataError.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        dataError.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ dataError, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { dataError } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
        <img src={logo} alt="Logo" />
          <h4>Sign Up</h4>
          <h1>Create your Account</h1>
          <span className="subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span><br/><br/>
          <Facebook
            appId="1415095728879794"
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="btn sign-up-btn"
          />
          <p style={{display: "flex",justifyContent: "space-evenly"}}>
            <hr style={{color: "black",height: ".0001rem", width: "40%",}}/>
            or
            <hr style={{color: "black",height: ".0001rem", width: "40%",}}/>
          </p>
          {/* Form Start */}
          <form onSubmit={handleSubmit} action="https://reqres.in" method="POST">
            {/* First Name */}
            <div className="firstName">
              <input
                className={dataError.firstName.length > 0 ? "error" : null}
                placeholder="First Name" type="text" name="firstName" onChange={this.handleChange}
              />
              {dataError.firstName.length > 0 && (
                <span className="error">{dataError.firstName}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="lastName">
              <input
                className={dataError.lastName.length > 0 ? "error" : null}
                placeholder="Last Name" type="text" name="lastName" onChange={this.handleChange}
              />
              {dataError.lastName.length > 0 && (
                <span className="error">{dataError.lastName}</span>
              )}
            </div>
            
            {/* Email */}
            <div className="email">
              <input
                className={dataError.email.length > 0 ? "error" : null}
                placeholder="Email" type="email" name="email" onChange={this.handleChange}
              />
              {dataError.email.length > 0 && (
                <span className="error">{dataError.email}</span>
              )}
            </div>
            
            {/* Password */}
            <div className="password">
              <input
                className={dataError.password.length > 0 ? "error" : null}
                placeholder="Password" type="password" name="password" onChange={this.handleChange}
              />
              {dataError.password.length > 0 && (
                <span className="error">{dataError.password}</span>
              )}
            </div>
            <div className="signup">
              <small>By clicking Sign Up you agree to our <a href="#">Terms of Use</a> and our <a href="#">Privacy Policy</a></small>
              <button type="submit">SIGN UP</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;