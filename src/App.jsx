import React, { useEffect, useState } from "react";
import VisitorForm from "./components/VisitorForm";

function App() {
  const [formData, setFormData] = useState([]);

  async function getData() {
    try {
      const res = await fetch("https://hvm-backend.onrender.com/api/visitors");
      const data = await res.json();

      if (!res.ok) throw new Error("Error fetching data from backend");

      setFormData(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const addVisitor = async (visitor) => {
    try {
      const res = await fetch("https://hvm-backend.onrender.com/api/visitors", {
        method: "POST",
        body: JSON.stringify(visitor),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("ERROR: Insertion failed");

      const data = await res.json();
      setFormData((prev) => [...prev, data]);
      console.log("Data submitted successfully...");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <VisitorForm formData={formData} addVisitor={addVisitor} />
    </div>
  );
}

export default App;
