const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			todos: [
				
			],
			nextKey: 0
		},
		actions: {
			// Use getActions to call a function within a fuction
			getToDos: async () => {
				const url = 'https://playground.4geeks.com/apis/fake/todos/user/jdurtka'
				const response = await fetch(url);
				const todos = await response.json();
				try {
					if(!response.ok) {
						throw new Error('there was an error', response.status)
					}
					return todos
				} catch(error) {
					console.log('there was an error',error)
				}
			},
			setToDos: (toDos) => {
				setStore({todos: toDos})
			},
			addToDo: () => {
			},
			deleteToDo: (e) => {
				setToDos(toDos.filter(item => item.id != e.target.parentNode.id))
			},
			setNextKey: (nextKey) => {
				setStore({key: nextKey})
			}
		}
	};
};

export default getState;
