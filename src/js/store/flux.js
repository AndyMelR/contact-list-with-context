
const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contactList: [],
			idDelete: "",
			contactToEdit: {}
		},
		actions: {
			getData: async() => {
        try {const response = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda/agenda_andrea");
        const data = await response.json();
        setStore ({contactList : data})
        return data;
      }
      catch (error) {
        console.log("Error loading products from backend", error);
				
			}
    },
			addContact: user => {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST", 
					body: JSON.stringify(user), 
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response => console.log("Success:", response))
					.catch(error => console.error("Error:", error));
			},
			addidDelete: id => {
				setStore({ idDelete: id });
			},
			removeContact: () => {
				const store = getStore();
				fetch("https://assets.breatheco.de/apis/fake/contact/" + store.idDelete, {
					method: "DELETE"
				}).then(res => {
					if (res.ok) {
						getActions().getData();
					}
				});
			},
			editContact: (id, contact) => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contact)
				})
					.then(res => res.json())
					.then(results => console.log(setStore({ contact: results }), "estoy en setStore"))
					.catch(error => console.log("Error", error));
			},
			getContact: contact => {
				setStore({ contactToEdit: contact });
			}
		}
	};
};

export default getState;