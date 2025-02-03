import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Header } from "./components";
import Navbar from "./components/Navbar";
import SpeedTest from "./components/LibrasSpeed";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        {/* <Header /> */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/speed" element={<SpeedTest />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
