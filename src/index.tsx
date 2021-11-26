import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import ContactDetails from "./components/Details";
import ContactsList from "./components/List";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ContactsList />} />
        <Route path="details" element={<ContactDetails />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
