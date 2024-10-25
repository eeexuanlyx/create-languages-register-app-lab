import React from "react";
import styles from "./User.module.css";

const Languages = (props) => {
  return (
    <>
      <div className={`row ${styles.book}`}>
        <div className="col-sm-3">{props.language}</div>
        <button
          className="col-sm-3"
          onClick={() => props.deleteLanguage(props.language)}
        >
          delete
        </button>
      </div>
    </>
  );
};

export default Languages;
