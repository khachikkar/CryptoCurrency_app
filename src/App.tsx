import React from 'react';
import './App.css';
import CryptoList from "./pages/cryptoList";

import {BrowserRouter, Route, Routes } from "react-router-dom";
import CryptoDetail from "./pages/cryptoDetail";
import {ROUTES} from "./util/constants/routes";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<CryptoList />} />
                <Route path={`${ROUTES.CRYPTO_DETAIL}/:id`} element={<CryptoDetail />} />
            </Routes>
        </BrowserRouter>
   {/*<CryptoList />*/}
    </div>
  );
}

export default App;
