import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Display from "./components/Display";
import Display2 from "./components/Display2";
import Display3 from "./components/Display3";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h1>Home</h1>
            </main>
          }
        />
        <Route path="/display" element={<Display />} />
        <Route path="/display2" element={<Display2 />} />
        <Route path="/display3" element={<Display3 />} />
      </Routes>
    </>
  );
}

export default App;
