import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Signup from './components/signup'
import Showpage from "./components/Showpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/show" element={<Showpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
