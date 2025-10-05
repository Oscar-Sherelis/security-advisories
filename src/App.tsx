import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { AdvisoriesOverview } from './pages/AdvisoriesOverview';
import { SearchView } from './pages/SearchView';

function App() {
  const [currentView, setCurrentView] = useState<'overview' | 'search'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'overview' ? <AdvisoriesOverview /> : <SearchView />}
      </main>
    </div>
  );
}

export default App;