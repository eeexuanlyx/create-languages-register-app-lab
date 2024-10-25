import React, { useRef } from "react";
import styles from "./User.module.css";

const UserLanguages = (props) => {
  const deleteLangRef = useRef();

  const deleteKnownLanguages = async () => {
    const id = props.id; // Get the user ID from props
    const language = deleteLangRef.current.value; // Get the language from ref
    console.log("Deleting Language:", { id, language });

    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "DELETE",
        body: JSON.stringify({
          user_id: id, // Use the user ID
          language: language, // Use the language
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `cannot delete language: ${errorData.message || res.statusText}`
      );
    }

    props.getKnownLanguages(); // Refresh the languages list
    deleteLangRef.current.value = "";
  };

  return (
    <div className={`row ${styles.user}`}>
      <div className="col-sm-3">{props.id}</div>
      <div className="col-sm-3">{props.language}</div>
      <div className="col-sm-3">{props.name}</div>

      <input
        type="text"
        ref={deleteLangRef}
        placeholder="language to delete"
        className="col-md-3"
      />
      <button className="col-sm-2" onClick={deleteKnownLanguages}>
        delete
      </button>
    </div>
  );
};

export default UserLanguages;
