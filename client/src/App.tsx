import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import InfoRegistro from "./pages/InfoRegistro/InfoRegistro";
import LogIn from "./pages/LogIn/LogIn";
import Measurements from "./pages/Measurements/Measurements";
import Register from "./pages/Register/Register";
import AboutUs from "./pages/Welcome/AboutUs/AboutUs";
import ContactUs from "./pages/Welcome/ContactUs/ContactUs";
import FAQ from "./pages/Welcome/FAQ/FAQ";
import Welcome from "./pages/Welcome/Welcome";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/iniciar-sesion" element={<LogIn />}></Route>

				<Route path="/contact" element={<ContactUs />}></Route>

				<Route path="/medidas" element={<Measurements />}></Route>

				<Route path="/faq" element={<FAQ />}></Route>

				<Route path="/sobre-nosotros" element={<AboutUs />}></Route>

				<Route path="/registro" element={<Register />}></Route>

				<Route path="/info-registro" element={<InfoRegistro />}></Route>

				<Route path="/home" element={<Home />}></Route>

				<Route path="/" element={<Welcome />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
