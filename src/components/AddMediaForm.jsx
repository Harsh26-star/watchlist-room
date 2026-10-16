import { useState } from "react"
import { STATUSES } from "../constants"

const mediaInfo = {
    title: "",
    type: "movie",
    status: "planned",
    description: ""
}

function AddMediaForm({ onAdd }) {

    const [newMedia, setNewMedia] = useState(mediaInfo)

    function handleChange(e) {
        setNewMedia({
            ...newMedia,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            onAdd(newMedia)
            setNewMedia(mediaInfo)
        }}>
            <input type="text" name="title" value={newMedia.title} onChange={handleChange} className=" border my-2" />
            <select name="type" value={newMedia.type} onChange={handleChange}>
                <option value="movie">movie</option>
                <option value="anime">anime</option>
                <option value="video">video</option>
            </select>
            <select name="status" value={newMedia.status} onChange={handleChange}>
                {STATUSES.map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
            <textarea name="description" value={newMedia.description} onChange={handleChange} className="border mx-2"></textarea>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddMediaForm
