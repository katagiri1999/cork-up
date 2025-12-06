import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Information from './views/information.jsx';
import Login from './views/login.jsx';
import Menu from './views/menu.jsx';

function NotFound() {
  return <h1>404 Page Not Found</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/information" element={<Information />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;