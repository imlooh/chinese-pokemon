import { useEffect } from 'react';
import PokemonTable from './PokemonTable';
import './App.css';

function App() {
  useEffect(() => {
    document.title = "Chinese Pokemon Names"
  }, []);

  return (
    <div className='content'>
      <div className="container">
        <PokemonTable />
      </div>
    </div>
  );
}

export default App;
