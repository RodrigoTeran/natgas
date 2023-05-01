import { createContext, useState, Dispatch, SetStateAction } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IUser } from "./interfaces/User.interfaces";

import Home from "./pages/Home/Home";
import ErrorPage from "./pages/404/404";
import InfoRegistro from "./pages/InfoRegistro/InfoRegistro";
import LogIn from "./pages/LogIn/LogIn";
import AuthLayout from "./layouts/Auth/AuthLayout";
import Measurements from "./pages/Measurements/Measurements";
import Register from "./pages/Register/Register";
import Exercises from "./pages/Exercises/Exercises";
import Workouts from "./pages/Workouts/Workouts";
import AboutUs from "./pages/Welcome/AboutUs/AboutUs";
import ContactUs from "./pages/Welcome/ContactUs/ContactUs";
import FAQ from "./pages/Welcome/FAQ/FAQ";
import Welcome from "./pages/Welcome/Welcome";
import Bitacora from "./pages/Bitacora/Bitacora";
import AgregarEntrada from "./pages/Bitacora/pages/agregarEntrada/AgregarEntrada";
import Diets from "./pages/Dietas/Dietas";
import DietasFavs from "./pages/Dietas/DietasFavs";
import ActualizarMeasurements from "./pages/Measurements/actualizarMedidas/ActualizarMeasurements";
import { Progreso } from "./pages/Progreso/Progreso";
import InfoRegistroDos from "./pages/InfoRegistro/InfoRegistroDos";
import { Info } from "./pages/Dietas/Info";
import Profile from "./pages/Profile/Profile";
import ComingSoon from "./components/ComingSoon/ComingSoon";
import { ConsultarMedidas } from "./pages/Measurements/ConsultarMedidas/ConsultarMedidas";

export const AppContext = createContext<IAppContext>({} as IAppContext);

interface IAppContext {
	user: IUser | null;

	setUser: Dispatch<SetStateAction<IUser | null>>;
}

function App() {
	const [user, setUser] = useState<IUser | null>(null);

	return (
		<AppContext.Provider
			value={{
				user,

				setUser,
			}}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route path="/iniciar-sesion" element={<LogIn />}></Route>

						<Route path="/contact" element={<ContactUs />}></Route>

						<Route path="/medidas" element={<Measurements />}></Route>

						<Route
							path="/actualizar-medidas/consultar"
							element={<ConsultarMedidas />}
						></Route>

						<Route
							path="/actualizar-medidas"
							element={<ActualizarMeasurements />}
						></Route>

						<Route path="/faq" element={<FAQ />}></Route>

						<Route path="/inicio" element={<ComingSoon />}></Route>

						<Route path="/progreso" element={<Progreso />}></Route>

						<Route path="/dietas/favs" element={<DietasFavs />}></Route>

						<Route path="/dietas/info" element={<Info />}></Route>
						
						<Route path="/dietas" element={<Diets />}></Route>

						<Route path="/rutinas" element={<Workouts />}></Route>

						<Route path="/ejercicios" element={<Exercises />}></Route>

						<Route path="/sobre-nosotros" element={<AboutUs />}></Route>

						<Route path="/info-registro" element={<InfoRegistro />}></Route>
						<Route
							path="/info-registro-dos"
							element={<InfoRegistroDos />}
						></Route>

						<Route path="/bitacora" element={<Bitacora />}></Route>

						<Route path="/agregar-entrada" element={<AgregarEntrada />}></Route>

						<Route path="/perfil" element={<Profile />}></Route>

						<Route path="/" element={<Welcome />}></Route>

						<Route path="*" element={<ErrorPage />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;
