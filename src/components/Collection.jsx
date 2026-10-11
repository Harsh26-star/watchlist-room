import MediaCard from './MediaCard'

function Collection({ items, onDelete }) {
    return (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {items.map((item) => (
                <li key={item.id}>
                    <MediaCard media={item} onDelete={onDelete} />
                </li>
            ))}
        </ul >
    )
}

export default Collection