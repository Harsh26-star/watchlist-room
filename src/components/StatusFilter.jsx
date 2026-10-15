function StatusFilter({ value, onChange }) {
  return (
    <div>
        <button onClick={() => onChange("all")} className={`px-2 py-1 rounded-full mx-1 ${value === "all" ? 'bg-white text-black' : 'bg-red-600 text-yellow-500'}`}>All</button>
        <button onClick={() => onChange("planned")} className={`px-2 py-1 rounded-full mx-1 ${value === "planned" ? 'bg-white text-black' : 'bg-red-600 text-yellow-500'}`}>Planned</button>
        <button onClick={() => onChange("watching")} className={`px-2 py-1 rounded-full mx-1 ${value === "watching" ? 'bg-white text-black' : 'bg-red-600 text-yellow-500'}`}>Watching</button>
        <button onClick={() => onChange("completed")} className={`px-2 py-1 rounded-full mx-1 ${value === "completed" ? 'bg-white text-black' : 'bg-red-600 text-yellow-500'}`}>Completed</button>
    </div>
  )
}

export default StatusFilter
