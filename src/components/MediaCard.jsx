function MediaCard({ media }) {
  return (
    <div>
      <h2>{media.title}</h2>
      <p>{media.type}</p>
      <p>{media.status}</p>
      <p>{media.description}</p>
    </div>
  )
}

export default MediaCard
