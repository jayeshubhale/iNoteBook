import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (messege, type) => {
    setAlert({
      msg: messege,
      type: type
    })
    setTimeout(() => {
      setAlert('null');
    }, 2000);
  }

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className='container'>
          <Routes>

            <Route path='/' element={<Home showAlert={showAlert} />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login showAlert={showAlert} />} />
            <Route path='/signup' element={<Signup showAlert={showAlert} />} />

          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
