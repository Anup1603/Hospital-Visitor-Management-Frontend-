import React, { useState } from "react";
import "./VisitorFormStyle.css";

const VisitorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    photo: null,
    purpose: "",
    otherPurpose: "",
    visitPerson: "",
    expectedDuration: "",
    governmentId: "",
    idLast4Digits: "",
    agreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a formatted object for submission
    const submittedData = {
      ...formData,
      photo: formData.photo ? formData.photo.name : null,
    };

    console.log("Form Submitted:", submittedData);
    alert("Form submitted successfully!");

    // Reset form
    setFormData({
      name: "",
      contact: "",
      email: "",
      photo: null,
      purpose: "",
      otherPurpose: "",
      visitPerson: "",
      expectedDuration: "",
      governmentId: "",
      idLast4Digits: "",
      agreement: false,
    });
  };

  return (
    <div className="visitor-form-container">
      <form className="visitor-form" onSubmit={handleSubmit}>
        <h2>Hospital Visitor Registration</h2>

        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact Number */}
        <div className="form-group">
          <label htmlFor="contact">Contact Number:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email Address (Optional) */}
        <div className="form-group">
          <label htmlFor="email">Email Address (Optional):</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Photo Capture (Optional) */}
        <div className="form-group">
          <label htmlFor="photo">Upload Photo (Optional):</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Purpose of Visit */}
        <div className="form-group">
          <label htmlFor="purpose">Purpose of Visit:</label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
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

        {/* Description for "Other" Purpose */}
        {formData.purpose === "Other" && (
          <div className="form-group">
            <label htmlFor="otherPurpose">Please Specify:</label>
            <input
              type="text"
              id="otherPurpose"
              name="otherPurpose"
              value={formData.otherPurpose}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Person/Department to Visit */}
        <div className="form-group">
          <label htmlFor="visitPerson">Person/Department to Visit:</label>
          <input
            type="text"
            id="visitPerson"
            name="visitPerson"
            value={formData.visitPerson}
            onChange={handleChange}
            required
          />
        </div>

        {/* Expected Duration */}
        <div className="form-group">
          <label htmlFor="expectedDuration">Expected Duration:</label>
          <select
            id="expectedDuration"
            name="expectedDuration"
            value={formData.expectedDuration}
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

        {/* Government ID Selection */}
        <div className="form-group">
          <label htmlFor="governmentId">Government ID:</label>
          <select
            id="governmentId"
            name="governmentId"
            value={formData.governmentId}
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

        {/* Last 4 Digits of ID */}
        <div className="form-group">
          <label htmlFor="idLast4Digits">Last 4 Digits of ID:</label>
          <input
            type="text"
            id="idLast4Digits"
            name="idLast4Digits"
            value={formData.idLast4Digits}
            onChange={handleChange}
            required
          />
        </div>

        {/* Terms and Conditions */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              required
            />
            I agree to follow hospital rules and provide accurate information.
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VisitorForm;
