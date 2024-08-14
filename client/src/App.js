import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import LandPage from './Components/LandPage';
import ViewEmployee from './Components/ViewEmployee';
import EditEmployee from './Components/EditEmployee';
import CreateEmployee from './Components/CreateEmployee';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandPage />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path = '/sign-in' element={<SignIn/>}/>
      <Route path = '/add' element ={<CreateEmployee/>}/>
      <Route path = '/view' element = {<ViewEmployee/>}/>
      <Route path = '/edit/:id' element = {<EditEmployee/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
