import { useState } from "react"

function AddMediaForm({ onAdd }) {

    const [newMedia, setNewMedia] = useState({
        title: "",
        type: "movie",
        status: "planned",
        description: ""
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            onAdd(newMedia)
            setNewMedia({
                title: "",
                type: "movie",
                status: "planned",
                description: ""
            })
        }}>
            <input type="text" value={newMedia.title} onChange={(e) => setNewMedia({
                ...newMedia,
                title: e.target.value
            })} className="border my-2" />
            <select value={newMedia.type} onChange={(e) => setNewMedia({
                ...newMedia,
                type: e.target.value

            })}>
                <option value="movie">movie</option>
                <option value="anime">anime</option>
                <option value="video">video</option>
            </select>
            <select value={newMedia.status} onChange={(e) => setNewMedia({
                ...newMedia,
                status: e.target.value

            })}>
                <option value="planned">planned</option>
                <option value="watching">watching</option>
                <option value="completed">completed</option>
            </select>
            <textarea value={newMedia.description} onChange={(e) => setNewMedia({
                ...newMedia,
                description: e.target.value

            })} className="border mx-2"></textarea>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddMediaForm
