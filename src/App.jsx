import './App.css';
import Navbar from './components/header/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/main/Home';
import Forbidden from './components/main/Forbidden';
import Add from './components/main/AddNewBook';
import Search from './components/main/BookSearch';
import Details from './components/main/BookDetails';
import BookEdit from './components/main/BookEdit';
import { useAuth } from './components/provider/useAuth';

function App() {
  const { writeAccess } = useAuth();
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={writeAccess ? <Add /> : <Forbidden />} />
            <Route path="/search" element={<Search />} />
            <Route path="/details/:id" element={<Details />} />
            <Route
              path="/edit/:id"
              element={writeAccess ? <BookEdit /> : <Forbidden />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
