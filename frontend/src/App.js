import React from 'react';
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

var page=0;

// if page=0 ==>login else registerr


function App() {
return (
	<div className="App">
	{page===1?<Login />: <Register />}
	</div>
);
}

export default App;
