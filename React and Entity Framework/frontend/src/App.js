import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import CRUD from './CRUD';
import Update from './Update';


function App() {

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CRUD />}></Route>
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
