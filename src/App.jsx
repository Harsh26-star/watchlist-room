import './App.css'
import { useEffect, useState } from 'react';
import Collection from './components/Collection';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import AddMediaForm from './components/AddMediaForm';

function App() {

  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addError, setAddError] = useState(null)
  const [delError, setDelError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/media')
      .then((res) => {
        if (!res.ok) throw new Error("Invalid server response");
        return res.json();
      })
      .then((res) => setItems(res))
      .catch((error) => { console.error(error); setError("Couldn't load your watchlist") })
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:3000/media/${id}`, {
        method: "DELETE"
      })
      if (!res.ok) { throw new Error("Couldn't delete at the moment") }
      const newItems = items.filter((item) => item.id !== id)
      setItems(newItems)
      setDelError(null)
    }
    catch {
      setDelError("Try again later")
    }
  }

  function handleSearch(e) {
    setQuery(e.target.value)
  }

  function handleFilter(status) {
    setStatusFilter(status)
  }

  async function handleAdd(media) {
    try {
      const res = await fetch("http://localhost:3000/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(media)
      })
      const saved = await res.json() // add a .catch() to counter the case when the res is not json
      if (!res.ok) {
        throw new Error(saved.error)
      }
      setItems([
        ...items, saved
      ])
      setAddError(null)
    } catch (error) {
      if (error instanceof TypeError) {
        setAddError("This title couldn't be added at this moment")
      } else {
        setAddError(error.message)
      }
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

  function handleEdit(id, newTitle) {
    const newItems = items.map((item) =>
      (item.id === id && newTitle.trim() !== "")
        ? { ...item, title: newTitle.trim() }
        : item
    )
    setItems(newItems)
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
        {addError && <p>{addError}</p>}

        {loading
          ? <div>Loading...</div>
          : error
            ? <div>{error}</div>
            : <>
              <Collection items={sortedItems} onDelete={handleDelete} noMatches={noMatches} onStatusChange={handleStatusChange} onEdit={handleEdit} />
              {delError && <p>{delError}</p>}
            </>
        }
      </main>
    </>
  )
}

export default App
