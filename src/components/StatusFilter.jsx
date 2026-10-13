function StatusFilter({ value, onChange }) {
  return (
    <div>
        <button onClick={() => onChange("all")} className={`${value === "all" ? 'bg-white text-black' : 'bg-red-600 text-yellow-500'}`}>All</button>
        <button onClick={() => onChange("planned")} className={`${value === "planned" ? 'bg-white text-black' : 'bg-red-600 text-yellow-500'}`}>Planned</button>
        <button onClick={() => onChange("watching")} className={`${value === "watching" ? 'bg-white text-black' : 'bg-red-600 text-yellow-500'}`}>Watching</button>
        <button onClick={() => onChange("completed")} className={`${value === "completed" ? 'bg-white text-black' : 'bg-red-600 text-yellow-500'}`}>Completed</button>
    </div>
  )
}

export default StatusFilter
