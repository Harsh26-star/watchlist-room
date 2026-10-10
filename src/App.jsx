import './App.css'
import { mediaList } from './data/sampleMedia';
import Collection from './components/Collection';

function App() {
  return (
    <>
      <Collection items={mediaList}/>
    </>
  )
}

export default App
