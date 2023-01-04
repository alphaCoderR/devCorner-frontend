import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
  
  const authLinks = (
    <ul>
      <li>
        <Link to={user === null ? "#" : `/profile/${user._id}`}>
          <i className="fas fa-user" /> <span className="hide-sm">Profile</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/profiles">Connect</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link className="login" to="/login">
          Log In
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className={isAuthenticated ? "navbar navbarLoggedIn" : "navbar"}>
      <h1 style={{ color: "#feffff" }}>
        <Link class="Logo" to="/">
          <i class="fas fa-code"></i> DevCorner
        </Link>
      </h1>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

