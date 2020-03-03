import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg }) => {
  let myClass = '';
  if (msg === "File with same name already exist's" || msg === "No file uploaded! Please choose file to upload" || msg === "There was problem with server"||msg==="User with same Enrollment already exist's"||msg==='Please fill all the fields')
  {
    myClass = 'alert alert-danger alert-dismissible fade show';
  }
  else {
    myClass='alert alert-success alert-dismissible fade show'
  }
    let remove = (e) => {
        e.target.parentElement.parentElement.remove();
    }
    
  return (
   
    <div className={myClass} color="red" role='alert'>
      {msg}
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
        onClick={remove}
      >
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;