import React from "react";
import { useState, useEffect, useRef } from "react";
import User from "./User";
import Languages from "./Languages";
import UserLanguages from "./UserLanguages";

const Display = () => {
  const [user, setUser] = useState([]);
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();

  const [languages, setLanguages] = useState([]);
  const langRef = useRef();

  const idLangRef = useRef();
  const knownLangRef = useRef();
  const [knownLanguages, setKnownLanguages] = useState([]);

  const getKnownLanguages = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages"
      );

      if (!res.ok) {
        throw new Error("getting data error");
      }

      const data = await res.json();
      setKnownLanguages(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addUserLanguages = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: idLangRef.current.value,
          language: knownLangRef.current.value,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("cannot add language");
    }
    getKnownLanguages();
    idLangRef.current.value = "";
    knownLangRef.current.value = "";
  };

  const deleteKnownLanguages = async (language) => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "DELETE",
        body: JSON.stringify({
          language: language,
          user_id: id,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      throw new Error("cannot delete language");
    }
    getKnownLanguages();
  };

  const getLanguage = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");

      if (!res.ok) {
        throw new Error("getting data error");
      }

      const data = await res.json();
      setLanguages(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addLanguage = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: langRef.current.value,
      }),
    });

    if (!res.ok) {
      throw new Error("cannot add language");
    }
    getLanguage();
    langRef.current.value = "";
  };

  const deleteLanguage = async (language) => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/languages/" + language,
      {
        method: "DELETE",
        body: JSON.stringify({ language: language }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      throw new Error("cannot delete language");
    }
    getLanguage();
  };

  useEffect(() => {
    getLanguage();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users");

      if (!res.ok) {
        throw new Error("getting data error");
      }

      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addUser = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", //header needed eveytime u use GET
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        age: ageRef.current.value,
        country: countryRef.current.value,
      }),
    });

    if (!res.ok) {
      throw new Error("cannot add user");
    }
    getData();
    nameRef.current.value = "";
    ageRef.current.value = "";
    countryRef.current.value = "";
  };

  const deleteUser = async (id) => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users/", {
      method: "DELETE",
      body: JSON.stringify({ user_id: id }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("cannot delete book");
    }
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <div className="row">
        <input
          type="text"
          ref={nameRef}
          placeholder="name"
          className="col-md-3"
        />
        <input
          type="text"
          ref={ageRef}
          placeholder="age"
          className="col-md-3"
        />
        <input
          type="text"
          ref={countryRef}
          placeholder="country"
          className="col-md-3"
        />
        <button className="col-md-3" onClick={addUser}>
          add
        </button>
      </div>

      <div className="row">
        <div className="col-md-3">Name</div>
        <div className="col-md-3">Age</div>
        <div className="col-md-3">Country</div>
        <div className="col-md-2"></div>
        <div className="col-md-2"></div>
      </div>
      {user.map((item) => {
        return (
          <User
            key={item.id}
            id={item.id}
            name={item.name}
            age={item.age}
            country={item.country}
            deleteUser={deleteUser}
            getData={getData}
          />
        );
      })}
      <br></br>
      <input
        type="text"
        ref={langRef}
        placeholder="language"
        className="col-md-3"
      />
      <button className="col-md-3" onClick={addLanguage}>
        add
      </button>
      <div className="col-md-3">Languages</div>
      {languages.map((item) => {
        return (
          <Languages
            key={item.id}
            id={item.id}
            language={item.language}
            deleteLanguage={deleteLanguage}
          />
        );
      })}
      <br></br>
      <div className="col-md-3">User's Known Languages</div>
      <input
        type="text"
        ref={idLangRef}
        placeholder="id"
        className="col-md-3"
      />
      <input
        type="text"
        ref={knownLangRef}
        placeholder="language"
        className="col-md-3"
      />
      <button className="col-md-3" onClick={addUserLanguages}>
        add
      </button>
      {knownLanguages.map((item) => {
        return (
          <UserLanguages
            key={item.id}
            id={item.user_id}
            language={item.languages}
            getKnownLanguages={getKnownLanguages}
            deleteKnownLanguages={deleteKnownLanguages}
          ></UserLanguages>
        );
      })}
    </div>
  );
};

export default Display;
