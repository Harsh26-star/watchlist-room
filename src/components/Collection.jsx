import MediaCard from './MediaCard'

function Collection({ items, onDelete, noMatches, onStatusChange,}) {

    if (noMatches) {
        return <p>No items match your search or filter</p>
    }
    if (items.length === 0) {
        return <p>Your watchlist is empty</p>
    }
    return (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {items.map((item) => (
                <li key={item.id}>
                    <MediaCard media={item} onDelete={onDelete} onStatusChange={onStatusChange} />
                </li>
            ))}
        </ul >
    )
}

export default Collection