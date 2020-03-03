import React, { Component} from "react";
import { Redirect } from "react-router-dom";
class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
    this.props.changeToken(false);
  }

  render() {
    return (
      <React.Fragment>
            {alert("  logged Out successfully ")}
                        {/* {window.location.replace='/'} */}
            <Redirect to="/"></Redirect>
            
      </React.Fragment>
    );
  }
}

export default Logout;