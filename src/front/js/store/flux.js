const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user:{
				email: "",
				password: ""
			}
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green")
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			setUser: (data) => {
                const store = getStore();
                setStore({ ...store, ...data });
            },

			clearUser: () => {
                setStore({ email: "", password: "" });
            },

			register: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "/register", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				})

				if(!resp.ok) throw Error("Hubo un problema con la petición de /register")

				if(resp.status === 400){	   
					throw("Hubo un problema con los datos enviados para el registro")   
				}

				const data = await resp.json()
				console.log("Return register()", data)
				return data
			},

			login: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				})

				if(!resp.ok) throw Error("Hubo un problema con la petición de /login")
				
				if(resp.status === 401){	   
					throw("Token no válido")   
				}			   
				else if(resp.status === 400){			   
					throw ("Email o contraseña incorrecto")			   
				}	   

				const data = await resp.json()
				localStorage.setItem("token", data.token)
				console.log("Return login()", data)
				return data
			},

			getMyInfo: async () => {
				const token = localStorage.getItem("token")
				const resp = await fetch(process.env.BACKEND_URL + "/private", {
					method: "GET",
			        headers: { 
						"Content-Type": "application/json",
				        "Authorization": "Bearer " + token
					}
				})
				
			
				if(!resp.ok) {
					throw Error("Hubo un problema con la petición de /private")
			   	} else if(resp.status === 401) {
					throw Error("No se recibió ningún token")
				} else if(resp.status === 422) {
					throw Error("Token inválido")
			   	}

				const data = await resp.json()
				console.log("Return getMyInfo", data)
				return data
			},

			exit: () => {
				localStorage.removeItem("token")
			}
		}
	}
}

export default getState
