import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/Login';
import RegistrationForm from './Components/Registration';
import Home from './Components/Home';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />

      </Routes>
    </Router>

  );
}

export default App;
