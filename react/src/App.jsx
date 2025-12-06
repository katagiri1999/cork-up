import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Information from './views/information.jsx';
import Login from './views/login.jsx';
import Explorer from './views/explorer.jsx';

function NotFound() {
  return <h1>404</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/information" element={<Information />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;