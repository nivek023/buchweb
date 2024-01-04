import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/header/Navbar.jsx';
import Home from './components/main/Home.jsx';
import Forbidden from './components/main/Forbidden.jsx';
import Add from './components/main/AddNewBook.jsx';
import Search from './components/main/BookSearch.jsx';
import Details from './components/main/BookDetails.jsx';
import BookEdit from './components/main/BookEdit.jsx';
import { useAuth } from './components/provider/useAuth.js';
import Login from './components/header/Login.jsx';

function App() {
  const { writeAccess } = useAuth();
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/add"
              element={writeAccess ? <Add /> : <Forbidden />}
            />
            <Route path="/search" element={<Search />} />
            <Route path="/details/:id" element={<Details />} />
            <Route
              path="/edit/:id"
              element={writeAccess ? <BookEdit /> : <Forbidden />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
