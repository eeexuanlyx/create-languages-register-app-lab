import React from "react";
import styles from "./User.module.css";

const UserLanguages = (props) => {
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
  };

  return (
    <>
      <div className={`row ${styles.user}`}>
        <div className="col-sm-3">{props.id}</div>
        <div className="col-sm-3">{props.language}</div>
        <input
          type="text"
          ref={props.userIdRef}
          placeholder="id"
          className="col-md-3"
        />
        <input
          type="text"
          ref={props.knownLangRef}
          placeholder="language"
          className="col-md-3"
        />
        <button
          className="col-md-3"
          onClick={() => addUserLanguages(props.knownLangRef)}
        >
          add
        </button>
        <div className="row">
          <div className="col-md-3">User ID</div>
          <div className="col-md-3">Known Languages</div>
        </div>
        <button
          className="col-sm-2"
          onClick={() => props.deleteKnownLanguages(props.id)}
        >
          delete
        </button>
      </div>
    </>
  );
};

export default UserLanguages;
