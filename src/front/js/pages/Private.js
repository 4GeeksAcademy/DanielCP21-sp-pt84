import React, { useContext } from 'react'
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Private = () => {
  const { store, actions } = useContext(Context);
  console.log("Info usuario", store.userInfo);
  
  return (
    <div className="text-center mt-5">
      <h1>Bienvenido {store.userInfo}</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
      <div className="alert alert-info">
        {store.message || "Loading message from the backend (make sure your python backend is running)..."}
      </div>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://start.4geeksacademy.com/starters/react-flask">
          Read documentation
        </a>
      </p>
    </div>
  )
}
