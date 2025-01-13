import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const VisitorForm = ({ addVisitor, hospitalId, loading }) => {
  const [formState, setFormState] = useState({
    name: "",
    contact: "",
    email: "",
    purpose: "",
    otherPurpose: "",
    visitPersonOrDepartment: "",
    expectedDuration: "",
    governmentId: "",
    idLast4Digits: "",
    checked: false,
    photo:
      "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg",
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePhotoChange = async (e) => {
    const pic = e.target.files[0];

    if (!pic) {
      console.warn("No file selected.");
      return;
    }

    if (pic.type !== "image/jpeg" && pic.type !== "image/png") {
      console.error(
        "Unsupported file type. Please select a JPEG or PNG image."
      );
      return;
    }

    try {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "anup_hvm");
      data.append("cloud_name", "anupshaw");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/anupshaw/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        console.error("Image upload failed. Please try again.");
        return;
      }

      const uploadPic = await res.json();

      setFormState((prevState) => ({
        ...prevState,
        photo: uploadPic.url.toString(),
      }));
    } catch (error) {
      console.error("An error occurred while uploading the image:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const visitor = { ...formState, hospital: hospitalId };

    if (visitor.purpose !== "Other") {
      visitor.otherPurpose = "";
    }

    addVisitor(visitor);

    setModalOpen(true);

    setFormState({
      name: "",
      contact: "",
      email: "",
      purpose: "",
      otherPurpose: "",
      visitPersonOrDepartment: "",
      expectedDuration: "",
      governmentId: "",
      idLast4Digits: "",
      checked: false,
      photo: null,
    });
  };

  const isFormComplete = () =>
    formState.name &&
    formState.contact &&
    formState.purpose &&
    (formState.purpose !== "Other" || formState.otherPurpose) &&
    formState.visitPersonOrDepartment &&
    formState.expectedDuration &&
    formState.governmentId &&
    formState.idLast4Digits &&
    formState.checked &&
    formState.photo;

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 500,
        margin: "auto",
        "@media (max-width: 600px)": {
          p: 2,
          maxWidth: "90%",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          Hospital Visitor Registration
        </Typography>

        {/* Form Fields */}
        <TextField
          label="Full Name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Contact Number"
          name="contact"
          value={formState.contact}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          inputProps={{
            pattern: "^[0-9]{10}$",
            title: "Contact number must be 10 digits.",
          }}
        />

        <TextField
          label="Email Address"
          name="email"
          value={formState.email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="purpose-label">Purpose of Visit</InputLabel>
          <Select
            labelId="purpose-label"
            id="purpose"
            name="purpose"
            value={formState.purpose}
            onChange={handleChange}
            label="Purpose of Visit"
            required
          >
            <MenuItem value="">-- Select Purpose --</MenuItem>
            <MenuItem value="Meeting a Patient">Meeting a Patient</MenuItem>
            <MenuItem value="Vendor/Delivery">Vendor/Delivery</MenuItem>
            <MenuItem value="Maintenance/Repairs">Maintenance/Repairs</MenuItem>
            <MenuItem value="Official Meeting with Staff">
              Official Meeting with Staff
            </MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        {formState.purpose === "Other" && (
          <TextField
            label="Please Specify"
            name="otherPurpose"
            value={formState.otherPurpose}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
        )}

        <TextField
          label="Person/Department to Visit"
          name="visitPersonOrDepartment"
          value={formState.visitPersonOrDepartment}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="expected-duration">Expected Duration</InputLabel>
          <Select
            labelId="expected-duration"
            label="Expected Duration"
            id="duration"
            name="expectedDuration"
            value={formState.expectedDuration}
            onChange={handleChange}
            required
          >
            <MenuItem value="">-- Select Duration --</MenuItem>
            <MenuItem value="Less than 30 minutes">
              Less than 30 minutes
            </MenuItem>
            <MenuItem value="30 minutes to 1 hour">
              30 minutes to 1 hour
            </MenuItem>
            <MenuItem value="1-2 hours">1-2 hours</MenuItem>
            <MenuItem value="More than 2 hours">More than 2 hours</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel label="governmentId">Government ID</InputLabel>
          <Select
            labelId="governmentId"
            label="Government ID"
            id="governmentId"
            name="governmentId"
            value={formState.governmentId}
            onChange={handleChange}
            required
          >
            <MenuItem value="">-- Select ID --</MenuItem>
            <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
            <MenuItem value="PAN Card">PAN Card</MenuItem>
            <MenuItem value="Driving License">Driving License</MenuItem>
            <MenuItem value="Passport">Passport</MenuItem>
            <MenuItem value="Voter ID">Voter ID</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Last 4 Digits of ID"
          name="idLast4Digits"
          value={formState.idLast4Digits}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{
            pattern: "^[0-9]{4}$",
            title: "Must be exactly 4 digits.",
          }}
          sx={{ mb: 2 }}
        />

        {/* Photo Upload Section */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">Upload Your Photo</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            required
            style={{ marginTop: "10px" }}
          />
          {formState.photo && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <img
                src={formState.photo}
                alt="Visitor Photo"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </Box>
          )}
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              name="checked"
              checked={formState.checked}
              onChange={handleChange}
              required
            />
          }
          label="I agree to follow hospital rules and provide accurate information."
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isFormComplete() || loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>

      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
            textAlign: "center",
            width: { xs: "80%", sm: "50%" },
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: { xs: 60, sm: 80 }, color: "green", mb: 2 }}
          />
          <Typography variant="h6" sx={{ mb: 1, fontSize: { xs: "1rem" } }}>
            Your form is submitted successfully!
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem" } }}>
            Just wait for approval.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default VisitorForm;
