import './App.css'
import { mediaList } from './data/sampleMedia';
import Collection from './components/Collection';
import Header from './components/Header';

function App() {
  return (
    <>
      <main className='max-w-5xl mx-auto px-5'>
        <Header />
        <Collection items={mediaList} />
      </main>
    </>
  )
}

export default App
