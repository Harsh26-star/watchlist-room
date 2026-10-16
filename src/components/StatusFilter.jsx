const statuses = ["all", "planned", "watching", "completed"]

function StatusFilter({ value, onChange }) {

  return (
    <div>
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`px-2 py-1 rounded-full mx-1 capitalize ${value === status ? 'bg-white text-black' : 'bg-red-600 text-yellow-500'}`}>
          {status}
        </button>
      ))}
    </div>
  )
}

export default StatusFilter
