import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../src/axiosInstance";
import VisitorForm from "./components/VisitorForm";
import { Box, CircularProgress, Typography } from "@mui/material";

function App() {
  const { hospitalId } = useParams();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hospitalData, setHospitalData] = useState({});

  const getData = async () => {
    try {
      if (!hospitalId) {
        console.error("Hospital ID is not available in the URL.");
        return;
      }

      // Fetch hospital data
      const hospitalRes = await axios.get(`/api/hospital/${hospitalId}`);
      setHospitalData(hospitalRes.data);

      // Fetch visitor data
      const visitorRes = await axios.get(`/api/visitors/${hospitalId}`);

      setFormData(visitorRes.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [hospitalId]);

  const addVisitor = async (visitor) => {
    try {
      if (!hospitalId) {
        console.error("Hospital ID is not yet available.");
        return;
      }

      // Post visitor data to the backend
      const res = await axios.post(
        `/api/visitors/${hospitalId}`,
        {
          ...visitor,
          hospital: hospitalId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setFormData((prev) => [...prev, res.data]);
    } catch (error) {
      console.error(
        "Error adding visitor:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", fontSize: "30px" }}
      >
        <p style={{ fontWeight: "normal" }}>Welcome to </p>
        {hospitalData.hospitalName}{" "}
      </Typography>

      {/* Loading or Visitor Form */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <VisitorForm
          formData={formData}
          addVisitor={addVisitor}
          hospitalId={hospitalId}
        />
      )}
    </Box>
  );
}

export default App;
