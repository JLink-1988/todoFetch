import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [item, setItem] = useState("");
	const [todoList, setTodolist] = useState([]);
	console.log(todoList);

	const getTodos = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Yasmany")
			.then((res) => res.text())
			.then((result) => setTodolist(result))
			.catch((error) => console.log("error", error));
	};
	const addTodo = () => {
		if (item.length > 0) {
			setTodolist([...todoList, item]);
			setItem("");
		}
	};
	const editTodo = () => {
		
	};
	const deleteTodo = () => {};
	const completeTodo = () => {};
	const addUser = () => {};
	const deleteUser = () => {};
	const handleChange = (event) => {
		setItem(event.target.value);
	};
	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="container">
			<div>TODO LIST</div>
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Add a task"
					onChange={handleChange}
					value={item}
				/>
				<button
					className="btn btn-outline-secondary"
					type="button"
					onClick={addTodo}>
					Button
				</button>
			</div>
			<ul>
				{ todoList.map((task, index) => {
					return (
						<li key={index}>
							{task.label}
							<div
								className="d-flex justify-content"
								onClick={() => {
									setTodolist(
										todoList.filter((el, i) => i !== index)
									);
								}}>
								❌
							</div>
						</li>
					);
				}) }
			</ul>
		</div>
	);
};

export default Home;
