import React from "react";
import UserLanguages from "./UserLanguages";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Display3 = () => {
  const userIdRef = useRef();
  const knownLangRef = useRef();
  const [knownLanguages, setKnownLanguages] = useState([]);

  const getKnownLanguages = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: props.id,
          }),
        }
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
          user_id: userIdRef.current.value,
          language: knownLangRef.current.value,
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

  useEffect(() => {
    getKnownLanguages();
  }, []);

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
      {knownLanguages.map((item) => {
        return (
          <UserLanguages
            key={item.id}
            id={item.user_id}
            language={item.languages}
            getKnownLanguages={getKnownLanguages}
            deleteKnownLanguages={deleteKnownLanguages}
            userIdRef={userIdRef}
            knownLangRef={knownLangRef}
          ></UserLanguages>
        );
      })}
    </div>
  );
};

export default Display3;
