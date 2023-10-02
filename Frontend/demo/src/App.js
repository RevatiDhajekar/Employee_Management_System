import logo from './logo.svg';
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import Footer from './components/Footer';
import Header from './components/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddEmployee from './components/AddEmployee';

function App() {
  return (
    <div >
      <Router>
        <Header/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<ListEmployeeComponent/>}/>
            <Route path='/employees' element={<ListEmployeeComponent/>}/>
            <Route path='/add-employee' element={<AddEmployee/>}/>
            <Route path='/edit-employee/:id' element={<AddEmployee/>}> </Route>

          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
