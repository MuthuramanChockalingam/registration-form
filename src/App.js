import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const region = { 
    America: ['California', 'Texas', 'Washington'],
    India: ['AndhraPradesh', 'Kerala', 'TamilNadu'],
  };
  const countries = Object.keys(region);
  const states = region[countries[0]];
  const initialValues = { name: "", email: "", mobile: "", country: countries[0], state: states[0], message: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.mobile) {
      errors.mobile = "mobile is required";
    } else if (values.mobile.length < 10) {
      errors.mobile = "Mobile number must be 10 digits";
    } else if (values.mobile.length > 10) {
      errors.mobile = "Mobile number cannot exceed more than 10 digits";
    }
    if (!values.message) {
      errors.message = "Message is required";
    }
    return errors;
  };

  return (
    <div className="container">
      {
        Object.keys(formErrors).length === 0 && isSubmit &&
        <div className="ui message success">Submitted successfully</div>
      }

      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.name}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Mobile</label>
            <input
              type="number"
              name="mobile"
              placeholder="Mobile"
              value={formValues.mobile}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.mobile}</p>
          <div className="field">
            <label>Country</label>
            <select
              type="select"
              name="country"
              placeholder="Country"
              value={formValues.country}
              onChange={handleChange}
            >
            {countries.map((value) => <option value={value} key={value}>{value}</option>)}
            </select>
          </div>
          <p></p>
          <div className="field">
          <label>Country</label>
          <select
            type="select"
            name="state"
            placeholder="State"
            value={formValues.state}
            onChange={handleChange}
          >
          {states.map((value) => <option value={value} key={value}>{value}</option>)}
          </select>
        </div>
        <p></p>
          <div className="field">
            <label>Message</label>
            <input
              type="text"
              name="message"
              placeholder="Message"
              value={formValues.message}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.message}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
