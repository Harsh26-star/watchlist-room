function SearchBar({ value, onChange, sort, onSort }) {
    return (
        <div>
            <input type="text" value={value} onChange={onChange} className="border my-5" />
            <select value={sort} onChange={(e) => onSort(e.target.value)}>
                <option value="title">Title(A-Z)</option>
                <option value="newest">Newest first</option>
            </select>
        </div>
    )
}

export default SearchBar
