import { useState } from "react"

function AddMediaForm({ onAdd }) {

    const [newTitle, setNewTitle] = useState("")

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            onAdd(newTitle)
            setNewTitle("")
        }}>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="border my-2"/>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddMediaForm
