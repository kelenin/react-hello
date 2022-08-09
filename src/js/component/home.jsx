import React from "react";
import App from "./app.jsx";
import FormTodo from "./Formtodo.jsx";
import "../../styles/app.css";

//create your first component
const Home = () => {
	return (
		<div className="tex-center">
			<FormTodo />
		</div>
	);
};

export default Home;
