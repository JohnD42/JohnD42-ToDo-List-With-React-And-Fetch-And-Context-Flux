const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			todos: [],
			input: '',
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
			updateToDosAPI: () => {
				fetch('https://playground.4geeks.com/apis/fake/todos/user/jdurtka', {
					method: "PUT",
					body: JSON.stringify(getStore().todos),
					headers: {
						"Content-Type": "application/json"
					}
					})
					.then(resp => {
						if(!resp.ok) {
							throw new Error ('error occurred',resp.status)
						}
						console.log(resp.json()); 
					})
					.catch(error => {
						console.log(error);
					});
					
				},
			addToDo: (e) => {
				if(e.key === 'Enter') {
					if(getStore().input !== '') {
						getActions().setToDos(getStore().todos.concat([{done: false, label: getStore().input, id:getStore().nextKey}]))
						getActions().setInput('')
						getActions().setNextKey(Math.max.apply(Math, getStore().todos.map((item) => item.id )) + 1);
						getActions().updateToDosAPI()
					}
				}
			},
			deleteToDo: (e) => {
				setStore({todos: (getStore().todos.filter(item => item.id != e.target.parentNode.id))})
				getActions().updateToDosAPI()
			},
			setNextKey: (key) => {
				setStore({nextKey: key})
			},
			setInput: (newInput) => {
				setStore({input: newInput})
			}
		}
	};
};

export default getState;
