import "./App.css";
import Navbar from "./components/header/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/main/Home";
import Add from "./components/main/AddNewBook"

function App() {
  return (
    
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
