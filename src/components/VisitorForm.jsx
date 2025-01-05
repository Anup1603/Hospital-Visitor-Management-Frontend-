import React, { useState } from "react";
import "./VisitorFormStyle.css";

const VisitorForm = ({ addVisitor, hospitalId, loading }) => {
  const [formState, setFormState] = useState({
    name: "",
    contact: "",
    email: "",
    photo: null,
    purpose: "",
    otherPurpose: "",
    visitPersonOrDepartment: "",
    expectedDuration: "",
    governmentId: "",
    idLast4Digits: "",
    checked: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormState({ ...formState, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const visitor = { ...formState, hospital: hospitalId };

    // Optional: If 'Other Purpose' is selected
    if (visitor.purpose !== "Other") {
      visitor.otherPurpose = "";
    }

    // Handle visitor submission
    addVisitor(visitor);

    alert("Visitor Form filled successfully!");

    // Reset form
    setFormState({
      name: "",
      contact: "",
      email: "",
      photo: null,
      purpose: "",
      otherPurpose: "",
      visitPersonOrDepartment: "",
      expectedDuration: "",
      governmentId: "",
      idLast4Digits: "",
      checked: false,
    });
  };

  return (
    <div className="visitor-form-container">
      <form className="visitor-form" onSubmit={handleSubmit}>
        <h2>Hospital Visitor Registration</h2>

        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Number:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formState.contact}
            onChange={handleChange}
            pattern="^\d{10}$"
            title="Contact number must be 10 digits."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address (Optional):</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Upload Photo (Optional):</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Purpose of Visit:</label>
          <select
            id="purpose"
            name="purpose"
            value={formState.purpose}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Purpose --</option>
            <option value="Meeting a Patient">Meeting a Patient</option>
            <option value="Vendor/Delivery">Vendor/Delivery</option>
            <option value="Maintenance/Repairs">Maintenance/Repairs</option>
            <option value="Official Meeting with Staff">
              Official Meeting with Staff
            </option>
            <option value="Other">Other</option>
          </select>
        </div>

        {formState.purpose === "Other" && (
          <div className="form-group">
            <label htmlFor="otherPurpose">Please Specify:</label>
            <input
              type="text"
              id="otherPurpose"
              name="otherPurpose"
              value={formState.otherPurpose}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="visitPersonOrDepartment">
            Person/Department to Visit:
          </label>
          <input
            type="text"
            id="visitPersonOrDepartment"
            name="visitPersonOrDepartment"
            value={formState.visitPersonOrDepartment}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expectedDuration">Expected Duration:</label>
          <select
            id="expectedDuration"
            name="expectedDuration"
            value={formState.expectedDuration}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Duration --</option>
            <option value="Less than 30 minutes">Less than 30 minutes</option>
            <option value="30 minutes to 1 hour">30 minutes to 1 hour</option>
            <option value="1-2 hours">1-2 hours</option>
            <option value="More than 2 hours">More than 2 hours</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="governmentId">Government ID:</label>
          <select
            id="governmentId"
            name="governmentId"
            value={formState.governmentId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select ID --</option>
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Driving License">Driving License</option>
            <option value="Passport">Passport</option>
            <option value="Voter ID">Voter ID</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="idLast4Digits">Last 4 Digits of ID:</label>
          <input
            type="text"
            id="idLast4Digits"
            name="idLast4Digits"
            value={formState.idLast4Digits}
            onChange={handleChange}
            pattern="^\d{4}$"
            title="Must be exactly 4 digits."
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              id="checked"
              name="checked"
              onChange={handleChange}
              required
            />
            I agree to follow hospital rules and provide accurate information.
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default VisitorForm;
