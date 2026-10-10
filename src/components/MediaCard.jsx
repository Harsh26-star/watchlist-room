function MediaCard({ media }) {
  return (
    <div className="p-3 border-2 rounded-2xl">
      <h2>{media.title}</h2>
      <p>{media.type}</p>
      <p>{media.status}</p>
      <p>{media.description}</p>
    </div>
  )
}

export default MediaCard
