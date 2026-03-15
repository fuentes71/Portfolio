import { Terminal } from './components/Terminal';
import { ModernPortfolio } from './components/ModernPortfolio';
import { usePortfolioStore } from './core/store/usePortfolioStore';

function App() {
  const { isTerminalComplete, setTerminalComplete } = usePortfolioStore();

  return (
    <div className="app-container">
      {!isTerminalComplete ? (
        <Terminal onComplete={() => setTerminalComplete(true)} />
      ) : (
        <ModernPortfolio />
      )}
    </div>
  );
}

export default App;
