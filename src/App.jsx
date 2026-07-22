import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/ui/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authenticate from "./Pages/Authenticate";
import AnimePage from "./components/ui/animePage";


export default function App(){
	return(
		<>
		<ToastContainer 
			theme="dark"
			/>
		<Routes>
			<Route path="/" element = {<Landing />}>
					<Route index element = {<Home />}/>
					<Route path="/anime/:id" element={<AnimePage />}/>
			</Route>
				



			<Route path="/auth" element = {<Authenticate />}>
					<Route path="signup" element = {<SignUp />} />
					<Route path="login" element = {<Login />} />
			</Route>	
		</Routes>
		</>
	)
}