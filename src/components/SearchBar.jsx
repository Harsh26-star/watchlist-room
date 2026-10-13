function SearchBar({ value, onChange }) {
    return (
        <input type="text" value={value} onChange={onChange} className="border my-5"/>
    )
}

export default SearchBar
