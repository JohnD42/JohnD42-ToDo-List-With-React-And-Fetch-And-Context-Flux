import React from "react";
import "../../styles/home.css";
import injectContext, { Context } from '../store/appContext'
import { useContext, useState } from 'react'
import Input from '../component/Input.jsx'
import ToDo from '../component/ToDo.jsx'
import Footer from '../component/Footer.jsx'



const Home = () => {

	const { store, actions } = useContext(Context);

	return (
	<div className="text-center">
		<h1 className="display-1">todos</h1>
		<div className="row">
			<div className="bordered col-2 mx-auto g-0 list">
				<Input input={store.input} setInput={actions.setInput} addToDo={actions.addToDo}/>
				<ul>
					{store.todos.map(todo => <ToDo label={todo.label} id={todo.id} deleteToDo={actions.deleteToDo}/>)}
					<Footer toDos={store.todos}/>
				</ul>
			</div>
		</div>
	</div>
	)
};

export default injectContext(Home);