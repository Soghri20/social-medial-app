import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route element={<Layout />}>
          <Route path="/home-page" element={<HomePage />} />
        </Route>
    </Routes>
  </Router>
  );
}

export default App;
