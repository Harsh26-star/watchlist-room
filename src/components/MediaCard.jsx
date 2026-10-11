const statusStyle = {
  completed :"bg-gray-800 text-green-400",
  watching : "bg-gray-800 text-blue-400",
  planned : "bg-gray-800 text-gray-200"
}

function MediaCard({ media, onDelete }) {

  return (
    <div className="p-3 border-2 rounded-2xl">
      <h2>{media.title}</h2>
      <p>{media.type}</p>
      <span className={`px-2 inline-block py-1 rounded-full text-sm ${statusStyle[media.status] ?? "bg-gray-800 text-gray-200"}`}>{media.status}</span>
      <p>{media.description}</p>
      <button onClick={() => onDelete(media.id)}>Delete</button>
    </div>
  )
}

export default MediaCard