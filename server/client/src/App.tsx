import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ApiKeys from './pages/ApiKeys';
import Ads from './pages/Ads';
import PinConfig from './pages/PinConfig';
import UserPins from './pages/UserPins';
import Docs from './pages/Docs';

const pages: Record<string, React.FC> = {
  dashboard: Dashboard,
  keys: ApiKeys,
  ads: Ads,
  pin: PinConfig,
  'user-pins': UserPins,
  docs: Docs,
};

export default function App() {
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  if (!isAuthenticated) return <Login />;

  const Page = pages[activePage] || Dashboard;

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 p-7 overflow-y-auto max-h-screen">
        <Page />
      </main>
    </div>
  );
}
