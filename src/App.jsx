import './App.css'
import { useState } from 'react';
import { mediaList } from './data/sampleMedia';
import Collection from './components/Collection';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import AddMediaForm from './components/AddMediaForm';

function App() {

  const [items, setItems] = useState(mediaList)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all");

  function handleDelete(id) {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  function handleSearch(e) {
    setQuery(e.target.value)
  }

  function handleFilter(status) {
    setStatusFilter(status)
  }

  function handleAdd(title) {
    if(title.trim() !== "") {setItems([
      ...items,
      {
        id: Date.now(),
        title: title.trim(),
        type: "movie",
        status: "planned",
        description: ""
      }
    ])}
  }

  const visibleItems = items.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesQuery && matchesStatus
  })

  return (
    <>
      <main className='max-w-5xl mx-auto px-5'>
        <Header />
        <StatusFilter value={statusFilter} onChange={handleFilter} />
        <SearchBar value={query} onChange={handleSearch} />
        <AddMediaForm onAdd={handleAdd}/>
        <Collection items={visibleItems} onDelete={handleDelete} />
      </main>
    </>
  )
}

export default App
