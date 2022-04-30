import React from "react";

//include images into your bundle
import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [listname, setListName] = useState("");
	const [todolist, setTodoList] = useState([]);
	const getTodos = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Yasmany")
			.then((response) => response.json())
			.then((result) => setTodoList(result))
			.catch((error) => console.log("error", error));
	};
	const addTodo = (item) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify([...todolist, { label: item, done: false }]);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Yasmany",
			requestOptions
		)
			.then((response) => (response.status === 200 ? getTodos() : ""))
			.catch((error) => console.log("error", error));
	};
	const deleteTodo = (newList) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(newList);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Yasmany",
			requestOptions
		)
			.then((response) =>
				response.status === 200 ? setTodoList(newList) : ""
			)
			.catch((error) => console.log("error", error));
	};
	const completeTodo = () => {};

	useEffect(() => {
		getTodos();
	}, []);
	console.log(todolist);

	return (
		<>
			<main>
				<h1> Todos</h1>
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Todo-list"
						onChange={(event) => {
							setListName(event.target.value);
						}}
						value={listname}
						onKeyUp={(e) => {
							if (e.key == "Enter" && listname !== "") {
								addTodo(listname);
								setListName("");
							}
						}}
					/>
					<button
						onClick={() => {
							//check is input is empty
							if (listname !== "") {
								addTodo(listname);
								setListName("");
							}
						}}
						className="btn btn-outline-secondary"
						type="button">
						Add task
					</button>
				</div>
				<ul>
					{todolist.map((item, index) => {
						return (
							<li className="newtodos" key={index}>
								{item.label}
								<button
									onClick={() =>
										deleteTodo(
											todolist.filter((item, i) => {
												return index !== i;
											})
										)
									}>
									X
								</button>
							</li>
						);
					})}
				</ul>
			</main>
			<span>{todolist.length} item left</span>
		</>
	);
};

export default Home;
