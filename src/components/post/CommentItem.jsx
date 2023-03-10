import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Fab from '@material-ui/core/Fab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { removeComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, body, name, avatar, user, date },
  auth,
  removeComment
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{body}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <Fab variant="extended" style={{backgroundColor:"#f33",color:"whitesmoke"}} onClick={(event) => {removeComment(postId, _id)}}
          type="button">
      <DeleteOutlineIcon />
      
    </Fab>
          
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeComment })(CommentItem);

/*
<button
            onClick={(event) => {removeComment(postId, _id)}}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i> Delete
          </button>
 */