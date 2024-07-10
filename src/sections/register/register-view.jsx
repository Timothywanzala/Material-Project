import React, { useState } from "react";

export default function EventView() {
  const [values, setValues] = useState({
    eventName: "",
    eventDate: "",
    programName: "",
    deliveryMode: "",
    rmInvolved: "",
    contactPerson: "",
    contactPersonDesignation: "",
    contactPersonEmail: "",
    contactPersonPhoneNumber: "",
    coordinatingStaff: ""
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
    if (
      values.eventName &&
      values.eventDate &&
      values.programName &&
      values.deliveryMode &&
      values.rmInvolved &&
      values.contactPerson &&
      values.contactPersonDesignation &&
      values.contactPersonEmail &&
      values.contactPersonPhoneNumber &&
      values.coordinatingStaff
    ) {
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
              <h3>Welcome {values.contactPerson}</h3>
              <div>Your registration was successful!</div>
            </div>
          )}
          {!valid && (
            <>
              <input
                style={styles.formField}
                type="text"
                placeholder="Event Name"
                name="eventName"
                value={values.eventName}
                onChange={handleInputChange}
              />
              {submitted && !values.eventName && (
                <span style={styles.errorMessage}>Please enter an event name</span>
              )}

              <input
                style={styles.formField}
                type="date"
                placeholder="Event Date"
                name="eventDate"
                value={values.eventDate}
                onChange={handleInputChange}
              />
              {submitted && !values.eventDate && (
                <span style={styles.errorMessage}>Please enter an event date</span>
              )}

              <select
                style={styles.formField}
                name="programName"
                value={values.programName}
                onChange={handleInputChange}
              >
                <option value="">Select FL Program Name</option>
                <option value="Money Talk">Money Talk</option>
                <option value="FIP">FIP</option>
                <option value="Townhall">Townhall</option>
                <option value="Webinar">Webinar</option>
              </select>
              {submitted && !values.programName && (
                <span style={styles.errorMessage}>Please select a program name</span>
              )}

              <input
                style={styles.formField}
                type="text"
                placeholder="Delivery Mode"
                name="deliveryMode"
                value={values.deliveryMode}
                onChange={handleInputChange}
              />
              {submitted && !values.deliveryMode && (
                <span style={styles.errorMessage}>Please enter a delivery mode</span>
              )}

              <select
                style={styles.formField}
                name="rmInvolved"
                value={values.rmInvolved}
                onChange={handleInputChange}
              >
                <option value="">Select RM Involved</option>
                <option value="Kevin Mugarura">Kevin Mugarura</option>
                <option value="Kirumira Benjamin">Kirumira Benjamin</option>
                {/* Add other RMs as needed */}
              </select>
              {submitted && !values.rmInvolved && (
                <span style={styles.errorMessage}>Please select an RM</span>
              )}

              <input
                style={styles.formField}
                type="text"
                placeholder="Contact Person"
                name="contactPerson"
                value={values.contactPerson}
                onChange={handleInputChange}
              />
              {submitted && !values.contactPerson && (
                <span style={styles.errorMessage}>Please enter a contact person</span>
              )}

              <input
                style={styles.formField}
                type="text"
                placeholder="Contact Person's Designation"
                name="contactPersonDesignation"
                value={values.contactPersonDesignation}
                onChange={handleInputChange}
              />
              {submitted && !values.contactPersonDesignation && (
                <span style={styles.errorMessage}>Please enter contact person’s designation</span>
              )}

              <input
                style={styles.formField}
                type="email"
                placeholder="Contact Person's Email"
                name="contactPersonEmail"
                value={values.contactPersonEmail}
                onChange={handleInputChange}
              />
              {submitted && !values.contactPersonEmail && (
                <span style={styles.errorMessage}>Please enter contact person’s email</span>
              )}

              <input
                style={styles.formField}
                type="text"
                placeholder="Contact Person's Phone Number"
                name="contactPersonPhoneNumber"
                value={values.contactPersonPhoneNumber}
                onChange={handleInputChange}
              />
              {submitted && !values.contactPersonPhoneNumber && (
                <span style={styles.errorMessage}>Please enter contact person’s phone number</span>
              )}

              <select
                style={styles.formField}
                name="coordinatingStaff"
                value={values.coordinatingStaff}
                onChange={handleInputChange}
              >
                <option value="">Select Coordinating Staff</option>
                <option value="Aisha Nakanwagi">Aisha Nakanwagi</option>
                <option value="Anna Maria Sanyu">Anna Maria Sanyu</option>
                <option value="Apollo Mbowa">Apollo Mbowa</option>
                <option value="Jackline Nagasha">Jackline Nagasha</option>
              </select>
              {submitted && !values.coordinatingStaff && (
                <span style={styles.errorMessage}>Please select coordinating staff</span>
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
};
