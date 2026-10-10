import MediaCard from './MediaCard'

function Collection({ items }) {
    return (
        <ul>
            {items.map((media) => (
                <li key={media.id}>
                    <MediaCard media={media} />
                </li>
            ))}
        </ul >
    )
}

export default Collection