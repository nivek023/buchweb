import './App.css'
import Navbar from './components/header/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/main/Home'
import Add from './components/main/AddNewBook'
import Search from './components/main/BookSearch'
import Details from './components/main/BookDetails'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/search" element={<Search />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
