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
  const [sortBy, setSortBy] = useState("title")

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

  function handleAdd(media) {
    if (media.title.trim() !== "") {
      setItems([
        ...items,
        {
          id: Date.now(),
          title: media.title.trim(),
          type: media.type,
          status: media.status,
          description: media.description
        }
      ])
    }
  }

  function handleStatusChange(id, newStatus) {
    const newItems = items.map((item) =>
      (item.id === id)
        ? { ...item, status: newStatus }
        : item
    )
    setItems(newItems)
  }

  function handleSort(sort) {
    setSortBy(sort)
  }

  const visibleItems = items.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesQuery && matchesStatus
  });

  const sortedItems = [...visibleItems].sort((a, b) =>
    sortBy === "title"
      ? a.title.localeCompare(b.title)
      : b.id - a.id
  );

  const noMatches = items.length > 0 && visibleItems.length === 0;

  return (
    <>
      <main className='max-w-5xl mx-auto px-5'>
        <Header />
        <StatusFilter value={statusFilter} onChange={handleFilter} />
        <SearchBar value={query} onChange={handleSearch} onSort={handleSort} sort={sortBy} />
        <AddMediaForm onAdd={handleAdd} />
        <Collection items={sortedItems} onDelete={handleDelete} noMatches={noMatches} onStatusChange={handleStatusChange} />
      </main>
    </>
  )
}

export default App
