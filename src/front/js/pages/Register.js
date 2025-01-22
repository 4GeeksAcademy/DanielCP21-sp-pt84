import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
    const { store, actions } = useContext(Context);

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData( { ...userData, [name]: value } )

        actions.setUser({ [name]: value })
    }

    const sendData = () => {
        if (store.email && store.password) {
			actions.register(store.email, store.password)
            console.log("Datos enviados:", store.email, store.password);

			actions.clearUser()
        } else {
            console.log("Faltan datos. Completa el formulario.");
        }
    }

    useEffect(() => {
        if (store.email === "" && store.password === "") {
            setUserData({ email: "", password: "" });
        }
    }, [store.email, store.password]);
    
    return (
    <div className="text-center mt-5">
        <h1>Registro de usuario</h1>
        
        <div className="input-group input-group-lg mb-3 mx-auto" style={{width: "33vw"}}>
            <span className="input-group-text" id="imput-email">Email</span>
            <input type="text" className="form-control" name="email" aria-describedby="imput-email" value={userData.email} onChange={handleChange}/>
        </div>
        <div className="input-group input-group-lg mb-3 mx-auto" style={{width: "33vw"}}>
            <span className="input-group-text" id="imput-password">Password</span>
            <input type="text" className="form-control" name="password" aria-describedby="imput-password" value={userData.password} onChange={handleChange} />
        </div>
        <Link to="/login">
            <button className="btn btn-primary" onClick={() => {sendData()}}>Crear usuario</button>
        </Link>    
    </div>
  )
}
