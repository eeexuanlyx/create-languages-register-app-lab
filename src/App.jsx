import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import UserList from "./components/UserList";
import LanguageList from "./components/LanguageList";
import UserAndLanguages from "./components/UserAndLanguages";

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
        <Route path="/UserList" element={<UserList />} />
        <Route path="/LanguageList" element={<LanguageList />} />
        <Route path="/UserAndLanguages" element={<UserAndLanguages />} />
      </Routes>
    </>
  );
}

export default App;
