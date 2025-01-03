import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VisitorForm from "./components/VisitorForm";

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

      console.log("Hospital ID from URL:", hospitalId);

      // Fetch hospital data
      const hospitalRes = await axios.get(
        `https://hvm-backend.onrender.com/api/hospital/${hospitalId}`
      );
      console.log("Hospital Data:", hospitalRes.data);
      setHospitalData(hospitalRes.data);

      // Fetch visitor data
      const visitorRes = await axios.get(
        `https://hvm-backend.onrender.com/api/visitors/${hospitalId}`
      );
      console.log("Visitor Data:", visitorRes.data);

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
        `https://hvm-backend.onrender.com/api/visitors/${hospitalId}`,
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

      console.log("New Visitor Added:", res.data);
      setFormData((prev) => [...prev, res.data]);
    } catch (error) {
      console.error(
        "Error adding visitor:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h1>Hospital Name : {hospitalData.hospitalName}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <VisitorForm
          formData={formData}
          addVisitor={addVisitor}
          hospitalId={hospitalId}
        />
      )}
    </div>
  );
}

export default App;
