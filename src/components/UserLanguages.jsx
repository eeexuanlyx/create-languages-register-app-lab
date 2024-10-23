import React from "react";
import styles from "./User.module.css";

const UserLanguages = (props) => {
  return (
    <>
      <div className={`row ${styles.user}`}>
        <div className="col-sm-3">{props.id}</div>
        <div className="col-sm-3">{props.language}</div>

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
