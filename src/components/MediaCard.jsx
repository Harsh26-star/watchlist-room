import { useState } from "react"
import { STATUSES } from "../constants"

const statusStyle = {
  completed: "bg-gray-800 text-green-400",
  watching: "bg-gray-800 text-blue-400",
  planned: "bg-gray-800 text-gray-200"
}



function MediaCard({ media, onDelete, onStatusChange, onEdit }) {

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(media.title)

  return (
    <div className="p-3 border-2 rounded-2xl">
      {isEditing
        ? <input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} />
        : <h2>{media.title}</h2>
      }
      <p>{media.type}</p>
      <select name="status" value={media.status} onChange={(e) => onStatusChange(media.id, e.target.value)}
        className={`px-2 inline-block py-1 rounded-full text-sm ${statusStyle[media.status] ?? "bg-gray-800 text-gray-200"}`}>
        {STATUSES.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <p>{media.description}</p>
      <button onClick={() => onDelete(media.id)}>Delete</button>
      {isEditing
        ? <div>
          <button
            onClick={() => {
              onEdit(media.id, draftTitle)
              setIsEditing(false)
            }
            }>Save</button>
          <button
            onClick={() => {
              setIsEditing(false)
            }
            }>Cancel</button>

        </div>
        : <button onClick={() => {
          setIsEditing(true)
          setDraftTitle(media.title)
        }
        }>Edit</button>
      }
    </div >
  )
}

export default MediaCard