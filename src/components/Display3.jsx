import React from "react";
import UserLanguages from "./UserLanguages";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Display3 = () => {
  const userId = useRef(null);
  const langUser = useRef(null);
  const userIdRef = useRef();
  const knownLangRef = useRef();
  const [knownLanguages, setKnownLanguages] = useState([]);

  const getKnownLanguages = async () => {
    try {
      const usersRes = await fetch(import.meta.env.VITE_SERVER + "/lab/users");
      const usersData = await usersRes.json();

      const languagesPromises = usersData.map(async (user) => {
        const languagesRes = await fetch(
          import.meta.env.VITE_SERVER + "/lab/users/languages",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id }),
          }
        );
        const languagesData = await languagesRes.json();
        const thelanguages =
          languagesData.length > 0 ? languagesData.join(",") : "no languages";
        return { id: user.id, name: user.name, language: thelanguages };
      });

      const languagesArray = await Promise.all(languagesPromises);
      setKnownLanguages(languagesArray); // Completely replace the old state
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getKnownLanguages();
  }, []);

  const addUserLanguages = async () => {
    userId.current = userIdRef.current.value;
    langUser.current = knownLangRef.current.value;
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId.current,
          language: langUser.current,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("cannot add language");
    }
    getKnownLanguages();

    userIdRef.current.value = "";
    knownLangRef.current.value = "";
  };

  return (
    <div>
      <input
        type="text"
        ref={userIdRef}
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
      <div className="row">
        <div className="col-md-3">User ID</div>
        <div className="col-md-3">Known Languages</div>
      </div>
      {JSON.stringify(knownLanguages)}
      {knownLanguages.map((item, idx) => {
        return (
          <UserLanguages
            key={idx}
            id={item.id}
            language={item.language}
            name={item.name}
            getKnownLanguages={getKnownLanguages}
          ></UserLanguages>
        );
      })}
    </div>
  );
};

export default Display3;
