import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        ></Route>
        <Route
          path='/iniciar-sesion'
          element={<LogIn />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
