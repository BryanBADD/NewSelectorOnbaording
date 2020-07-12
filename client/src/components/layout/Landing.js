import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  
  render() {
    
    return (
      <div className="container col-lg-12">
        <div className="row center-align">
          <img className="mb-4 usf-image" src="images/logo.png" alt=""></img>
        </div>
        <div className="row center-align">
          <h4>Helping Selectors Make it</h4>
        </div>
        <div className="row center-align">
          <form className="form-signin">
            {/* <div className="col-lg-6"> */}
              {/* <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large"
              >
                Register
              </Link> */}
            {/* </div> */}
            <div className="col-lg-6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-lg btn-primary btn-block form-control center-align"
              >
                Log In
              </Link>
              </div>
            </form>
          </div>
      </div>
    );
  }
}
export default Landing;