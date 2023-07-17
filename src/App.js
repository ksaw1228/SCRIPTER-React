
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import YourComponent from './YourComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/react/:id" element={<YourComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
