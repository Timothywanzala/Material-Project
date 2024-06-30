import React, { useState } from "react";

export default function RegisterView() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.firstName && values.lastName && values.email) {
      setValid(true);
    }
    setSubmitted(true);
  };

  return (
    <div style={styles.body}>
      <div style={styles.formContainer}>
        <form style={styles.registerForm} onSubmit={handleSubmit}>
          {submitted && valid && (
            <div style={styles.successMessage}>
              <h3>Welcome {values.firstName} {values.lastName}</h3>
              <div>Your registration was successful!</div>
            </div>
          )}
          {!valid && (
            <>
              <input
                style={styles.formField}
                type="text"
                placeholder="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
              />
              {submitted && !values.firstName && (
                <span style={styles.errorMessage}>Please enter a first name</span>
              )}

              <input
                style={styles.formField}
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
              />
              {submitted && !values.lastName && (
                <span style={styles.errorMessage}>Please enter a last name</span>
              )}

              <input
                style={styles.formField}
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
              />
              {submitted && !values.email && (
                <span style={styles.errorMessage}>Please enter an email address</span>
              )}

              <button style={styles.formField} type="submit">
                Register
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

const styles = {
  body: {
    display: 'flex',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    maxWidth: '600px', /* Setting a max width */
    width: '100%', /* Ensuring full width responsiveness */
    backgroundColor: 'white',
    margin: 'auto',
    borderRadius: '12px', /* Adding curved edges */
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
    padding: '10px',
  },
  registerForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: '10px',
  },
  successMessage: {
    fontFamily: '"Roboto", sans-serif',
    padding: '15px',
    color: 'white',
    textAlign: 'center',
  },
  formField: {
    margin: '10px 0',
    padding: '15px',
    fontSize: '16px',
    border: '0',
    fontFamily: '"Roboto", sans-serif',
    backgroundColor: '#f2f2f2',
  },
  errorMessage: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '14px',
    color: 'red',
    marginBottom: '15px',
  },
  button: {
    background: '#4caf50',
    color: 'white',
    cursor: 'pointer',
  },
  buttonDisabled: {
    cursor: 'default',
  },
}  