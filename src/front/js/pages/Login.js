import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData( { ...userData, [name]: value } )
    
        actions.setUser({ [name]: value })
    }

    const sendData = async () => {
        if (store.email && store.password) {
            const resp = await actions.login(store.email, store.password)
            if ( resp === 200 ){
                console.log("Datos enviados:", store.email, store.password);
                store.userInfo = store.email
                actions.clearUser()
                navigate("/private")
            }else if(resp === 400){
                store.msgUserPassWrong = <p className="text-danger">Usuario o contraseña incorrectos</p>
                actions.clearUser()
            }
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
        <h1>Iniciar Sesión</h1>
        
        <div className="input-group input-group-lg mb-3 mx-auto" style={{width: "33vw"}}>
            <span className="input-group-text" id="imput-email">Email</span>
            <input type="text" className="form-control" name="email" aria-describedby="imput-email" value={userData.email} onChange={handleChange}/>
        </div>
        <div className="input-group input-group-lg mb-3 mx-auto" style={{width: "33vw"}}>
            <span className="input-group-text" id="imput-password">Password</span>
            <input type="text" className="form-control" name="password" aria-describedby="imput-password" value={userData.password} onChange={handleChange} />
        </div>
        
        { store.msgUserPassWrong !== null ? store.msgUserPassWrong : "" }

        <button className="btn btn-primary" onClick={() => {sendData()}}>Iniciar sesión</button>
    </div>
  )
}
