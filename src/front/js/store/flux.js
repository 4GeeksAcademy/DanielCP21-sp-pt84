const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user:{
				email: "",
				password: ""
			},
			userInfo: null,
			msgUserPassWrong: null
		},
		actions: {
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
				return data
			},

			login: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				})
				
				if(resp.status === 401){	   
					return resp.status 
				}			   
				else if(resp.status === 400){			   
					return resp.status
				}	   

				const data = await resp.json()
				localStorage.setItem("token", data.token)
				getActions().getMyInfo()
				return resp.status
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
				getStore().userInfo = data.User
				return data
			},

			exit: () => {
				localStorage.removeItem("token")
			}
		}
	}
}

export default getState
