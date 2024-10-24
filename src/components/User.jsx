import React, { useState } from "react";
import styles from "./User.module.css";
import UpdateModal from "./UpdateModal";

const User = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <>
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          name={props.name}
          age={props.age}
          country={props.country}
          getData={props.getData}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <div className={`row ${styles.user}`}>
        <div>{props.id}</div>
        <div className="col-sm-3">{props.name}</div>
        <div className="col-sm-3">{props.age}</div>
        <div className="col-sm-2">{props.country}</div>
        <button className="col-sm-2" onClick={() => setShowUpdateModal(true)}>
          update
        </button>
        <button className="col-sm-2" onClick={() => props.deleteUser(props.id)}>
          delete
        </button>
      </div>
    </>
  );
};

export default User;
