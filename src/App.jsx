import './App.css'
import { useState } from 'react';
import { mediaList } from './data/sampleMedia';
import Collection from './components/Collection';
import Header from './components/Header';

function App() {

  const [items, setItems] = useState(mediaList);

  return (
    <>
      <main className='max-w-5xl mx-auto px-5'>
        <Header />
        <Collection items={items} />
      </main>
    </>
  )
}

export default App
