import React, { useState } from 'react';

// Component to display the table
const PokemonTable = () => {
  let data = require('./data2.json');
  let [expand, setExpand] = useState(true);
  const [expandedRows, setExpandedRows] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAllRows = () => {
    const newExpandedRows = {};
    data.forEach(pokemon => {
      setExpand(!expand);
      newExpandedRows[pokemon.id] = expand;
    });
    setExpandedRows(newExpandedRows);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredData = data.filter((pokemon) => 
    pokemon.name.toLowerCase().includes(searchQuery) ||
    pokemon.chineseTraditional.toLowerCase().includes(searchQuery) ||
    pokemon.chineseSimplified.toLowerCase().includes(searchQuery) ||
    pokemon.pinyin.toLowerCase().includes(searchQuery)||
    pokemon.jyutping.toLowerCase().includes(searchQuery)
  );
  
  return (
    <div className='table-responsive custom-table-responsive'>
        <h1>Chinese Translation of Pokémon</h1>
        <p>This page contains localization information for Gen 1 Pokémon. Info retrieved from <a href='https://bulbapedia.bulbagarden.net/wiki/List_of_Chinese_Pok%C3%A9mon_names'>Bulbapedia</a>.
            Use the box below to filter by the English or Chinese name, Pinyin, or Jyutping.
        </p>
        <p>Click on a row to expand more details explaining the translation.</p>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <input 
        type="text" 
        placeholder="Search..." 
        value={searchQuery} 
        onChange={handleSearchChange} ></input>
        <button className={`button-expand-${expand}`} onClick={() => toggleAllRows()}>{expand ? 'Expand' : 'Collapse'} All</button>
        </div>
        <table class='table custom-table'>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Sprite</th>
          <th scope="col">Name</th>
          <th scope="col">Traditional</th>
          <th scope="col">Simplified</th>
          <th scope="col">Pinyin</th>
          <th scope="col">Jyutping</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((pokemon, i) => (
          <>
            <tr key={pokemon.id} className='pokemon-entry' onClick={() => toggleRow(pokemon.id)}>
                <td style={{textAlign: 'center'}}>{pokemon.id}</td>
                <td style={{display: 'flex', 'justifyContent': 'space-around'}}><img src={'static/pokemon/' + pokemon.id + '.png'} alt={pokemon.name} /></td>
                <td>{pokemon.name}</td>
                <td>{pokemon.chineseTraditional}</td>
                <td>{pokemon.chineseSimplified}</td>
                <td>{pokemon.pinyin}</td>
                <td>{pokemon.jyutping}</td>
            </tr>
            {(expandedRows[pokemon.id] && pokemon.data !== '') && (
            <tr key={i+1 + '-data'} className='pokemon-info'>
                <td colSpan={7} dangerouslySetInnerHTML={{__html: pokemon.data}}></td>
            </tr>
            )}
            {(i !== filteredData.length - 1) && (
                <tr className='spacer'>
                    <td colSpan={7}></td>
                </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default PokemonTable;
