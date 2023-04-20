import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from "recoil";
import Form from "./components/Form";

const App = () => {
  return (
    <div>    
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path='/' element={<Form />}/>
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
  </div>
  )
}

export default App
