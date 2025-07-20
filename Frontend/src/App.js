import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from './components/Navbar';
import React,{useState}from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Newstate from './context/Notestate';
import About from './components/About';
import Home from './components/Home';

import Login from './components/Login';
import Signup from './components/Signup';
import Alert from'./components/Alert';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
function App() {
  const [alert, setalert] = useState(null);

  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 3000);
  };
  return (
    // <NotesState showAlert={showAlert}>
    <Newstate showAlert={showAlert}>
      <Router>
        <NavBar />
        <Alert alert={alert} />

        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/yournotes"
            element={<Notes showAlert={showAlert} />}
          />
          <Route
            exact
            path="/createnotes"
            element={<AddNote showAlert={showAlert} />}
          />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup showAlert={showAlert} />}
          />
        </Routes>
      </Router>
    </Newstate>
    // </NotesState>
  );
};
export default App;