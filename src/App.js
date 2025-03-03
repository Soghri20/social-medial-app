import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile'


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home-page" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path='/profile/:userId' element={<Profile />} />
      </Route>
        
    </Routes>
  </Router>
  );
}

export default App;
