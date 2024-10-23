import React from "react";
import { useState, useEffect, useRef } from "react";
import User from "./User";

const Display = () => {
  const [user, setUser] = useState([]);
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();

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
    </div>
  );
};

export default Display;
