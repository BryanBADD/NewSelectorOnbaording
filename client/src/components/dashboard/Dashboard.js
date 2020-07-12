import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

let userRole = "";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
    const { user } = this.props.auth;
    console.log(user.role);
    if (user.role === "admin") {userRole = "Administrator"};
    if (user.role === "supervisor") {userRole = "Supervisor"};
    if (user.role === "trainee") {userRole = "New Selector"};

return (
      <div className="container valign-wrapper">
        <div className="row">
        <div style={{paddingTop: "50px"}} className="row center-align">
          <img className="mb-4 " src="images/logo.png" alt=""></img>
        </div>
          <div className="col s12 center-align">
            <h4 style={{marginBottom: "0"}}><b>Hello</b> {user.name.split(" ")[0]}</h4>
              <p style={{fontSize: ".75rem", margin: "0"}}>You are logged in as a(n) {userRole}</p>
              <p>Add a new Training Supervisor</p>
              <p>Add a new Selector</p>
              <p>Edit Module Quizzes</p>
              <p>Review Metrics</p>
            <form className="form-signin">
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-lg btn-primary btn-block form-control center-align"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);