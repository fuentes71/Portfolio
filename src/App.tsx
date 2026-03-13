import { Terminal } from './components/Terminal';
import { ModernPortfolio } from './components/ModernPortfolio';
import { usePortfolioStore } from './core/store/usePortfolioStore';

function App() {
  const { isTerminalComplete, setTerminalComplete } = usePortfolioStore();

  return (
    <div className="w-full h-full overflow-y-auto">
      {!isTerminalComplete ? (
        <Terminal onComplete={() => setTerminalComplete(true)} />
      ) : (
        <ModernPortfolio />
      )}
    </div>
  );
}

export default App;
