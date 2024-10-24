import React from "react";
import Languages from "./Languages";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Display2 = () => {
  const [languages, setLanguages] = useState([]);
  const langRef = useRef();
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
  return (
    <div>
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
      {languages.map((item, idx) => {
        return (
          <Languages
            key={idx}
            id={item.id}
            language={item.language}
            deleteLanguage={deleteLanguage}
          />
        );
      })}
    </div>
  );
};

export default Display2;
