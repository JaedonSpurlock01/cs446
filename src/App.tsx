import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home-page";
import CreatePage from './pages/create-page';
import AccountPage from './pages/account-page';
import ViewPage from './pages/view-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
