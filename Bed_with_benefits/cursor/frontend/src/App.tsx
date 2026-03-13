import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ListingPage } from './pages/ListingPage';
import { TripsPage } from './pages/TripsPage';
import { AuthPage } from './pages/AuthPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listing/:id" element={<ListingPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

