import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:hospitalId" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
