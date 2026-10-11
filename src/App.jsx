import './App.css'
import { useState } from 'react';
import { mediaList } from './data/sampleMedia';
import Collection from './components/Collection';
import Header from './components/Header';

function App() {

  const [items, setItems] = useState(mediaList);

  function handleDelete(id) {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  return (
    <>
      <main className='max-w-5xl mx-auto px-5'>
        <Header />
        <Collection items={items} onDelete={handleDelete}/>
      </main>
    </>
  )
}

export default App
