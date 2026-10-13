import './App.css'
import { useState } from 'react';
import { mediaList } from './data/sampleMedia';
import Collection from './components/Collection';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {

  const [items, setItems] = useState(mediaList)
  const [query, setQuery] = useState("")

  function handleDelete(id) {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  function handleSearch(e) {
    setQuery(e.target.value)
  }

  return (
    <>
      <main className='max-w-5xl mx-auto px-5'>
        <Header />
        <SearchBar value={query} onChange={handleSearch}/>
        <p>Searching for: {query}</p>
        <Collection items={items} onDelete={handleDelete}/>
      </main>
    </>
  )
}

export default App
