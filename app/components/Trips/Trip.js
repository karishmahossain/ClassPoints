// Include React
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Auth from './utils/Auth';
import Nav from './children/Nav'

require('./login.css');

export default class Signup extends Component { 

	constructor(props) {
    super(props);
    this.state = {
    	rank: '',
    	name: '',
    	points: '',
    	qrcode: '',
    };

   
    this.handleNameValidation = this.handleNameValidation.bind(this);
    this.handlePointValidation = this.handlePointValidationn.bind(this);
   
    this.signUpStudent = this.signUpStudent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameValidation(event) {
  	// username is passed in
  	const usernameVal = this.refs.username.value,
  				usernameForm = this.refs.usernameForm,
  				usernameFeedback = this.refs.usernameFeedback;
  	// username is updated in state
  	this.setState({
  		'username': usernameVal
  	});

    // username is checked to see if it matches certain length. If not, the screen will indicate it as such.
    if (usernameVal.length < 6) {
    	usernameForm.classList.remove("has-success");
      usernameForm.classList.add("has-error");
      usernameFeedback.textContent = "username must be at least 6 characters long";
    } else {
      usernameForm.classList.remove("has-error");

      usernameForm.classList.add("has-success");
      usernameFeedback.textContent = "Username valid!";
    }
  }

	handlePointValidation(event) {

		// password is passed in
		const passwordVal = this.refs.password.value;
		const passwordForm = this.refs.passwordForm;
		const passwordFeedback = this.refs.passwordFeedback;

		this.setState({
	  	'password': passwordVal
	  });

		const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
	  if (!passwordRegEx.test(passwordVal)) {
	    passwordForm.classList.remove("has-success");
	    passwordForm.classList.add("has-error");
	    passwordFeedback.textContent = "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and must be at least 8 characters long.";
	  } else {
	    passwordForm.classList.remove("has-error");

	    passwordForm.classList.add("has-success");
	    passwordFeedback.textContent = "Password set correctly!";    
	  }
	}


  signUpStudent(userData) {
  	axios.post("/apis/users/signup", {
      name: userData.name,
      points: userData.points,
      
    }).then(function(data) {
      console.log("data stuff", data.data);
      if (data.duplicateUser) {
        // Replace with Modal
        alert("Sorry, that username has been taken");
      } else if (data.data.success) {
        console.log("yay!")
        this.props.authenticate();
        this.setState({
          redirectToReferrer: true
        });
      }
    }.bind(this)).catch(function(err) {
      console.log(err);
    });
  }

	handleSubmit(event) {
		event.preventDefault();

  	const name = this.state.name;
  	const points = this.state.points;

		let userData = {
      name: name,
      points: points
    };

    if (!userData.name || !userData.points) {
      return alert("Please don't leave fields blank");
    }

    // If we have an email and password, run the signUpStudent function
    this.signUpStudent(userData);

    this.setState({
    	name: '',
    	points: '',
      redirectToReferrer: false
    });
	}

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/Trips' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }
    
    return (
    	<div>
        <Nav
          authenticated={this.props.authenticated}
          authenticate={this.props.authenticate}
          deAuthenticate={this.props.deAuthenticate}
          logout={this.props.logout}
        />  
				<div id="registration-container" className="container-fluid">
				    <section className="container">
						<div className="container-page">		
						<form onSubmit={this.handleSubmit.bind(this)}>		
							<div className="col-md-6">
								<h3 className="dark-grey">Registration</h3>
								
								<div id="name-form" ref="nameForm" className="form-group col-lg-12">
									<label>Name</label>
									<input type="" name="" ref="name" className="form-control" id="name-input" value={this.state.username} onChange={this.handleNameValidation}/>
									<small id="name-feedback" ref="nameFeedback" className=""></small>
								</div>
								
								<div id="points-form" className="form-group col-lg-12" ref="pointsForm">
									<label>Points</label>
									<input type="points" name="" ref="points" className="form-control" id="points-input" value={this.state.points} onChange={this.handlePointsValidation} />
									<small id="password-feedback" ref="passwordFeedback" className=""></small>
								</div>
								
							</div>
						
							<div className="col-md-6">
								<h3 className="dark-grey">Terms and Conditions</h3>
								<p>
									By clicking on "Register" you agree to The Company's' Terms and Conditions
								</p>
								<p>
									While rare, prices are subject to change based on exchange rate fluctuations - 
									should such a fluctuation happen, we may request an additional payment. You have the option to request a full refund or to pay the new price. (Paragraph 13.5.8)
								</p>
								<p>
									Should there be an error in the description or pricing of a product, we will provide you with a full refund (Paragraph 13.5.6)
								</p>
								<p>
									Acceptance of an order by us is dependent on our suppliers ability to provide the product. (Paragraph 13.5.6)
								</p>
								
								<button type="submit" className="btn btn-primary signup">Register</button>
							</div>
						</form>
						</div>
					</section>
				</div>
			</div>
		)
	}
}