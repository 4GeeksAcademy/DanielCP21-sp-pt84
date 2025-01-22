import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const location = useLocation()
	const { store, actions } = useContext(Context);
	const isRegisterPage = location.pathname

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Control de Usuarios</span>
				</Link>

				{isRegisterPage === '/register' ? (
					<div className="ml-auto">
						<Link to="/login">
							<button className="btn btn-primary">Iniciar sesión</button>
						</Link>
					</div>
				) : (
					isRegisterPage === '/private' ? (
						<div className="ml-auto">
							<Link to="/">
								<button className="btn btn-primary" onClick={()=>{actions.exit()}}>Cerrar sesión</button>
							</Link>
						</div>
					) :(
					<div className="ml-auto">
						<Link to="/register">
							<button className="btn btn-primary">Nuevo Usuario</button>
						</Link>
					</div>)
				)}
			</div>
		</nav>
	);
};
