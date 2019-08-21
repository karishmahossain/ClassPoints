import React, { Component } from 'react';
import Nav from './children/Nav'

require('./Pricing.css');

export default class Pricing extends Component {
  render() {
    return (
        <div>
            <Nav />
            <p>Yo</p>
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
    );
  }
}