import './App.css'
import { mediaList } from './data/sampleMedia';
import MediaCard from './components/MediaCard';

function App() {
  return (
    <>
      <ul>
        {mediaList.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </ul >
    </>
  )
}

export default App
