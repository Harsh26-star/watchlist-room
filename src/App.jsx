import { useState } from 'react'
import './App.css'
import { mediaList } from './data/sampleMedia';

function App() {
  const medias = mediaList;
  return (
    <>
      <ul>
        {medias.map((media) => (
          <li key={media.id}>{media.title}</li>
        ))}
      </ul>
    </>
  )
}

export default App
