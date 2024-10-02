import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { TablePage } from './pages/TablePage';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/data-table" element={<TablePage />} />
      </Routes>
    </Router>
  );
};
