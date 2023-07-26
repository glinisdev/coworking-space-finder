import styles from './page.module.css'

const placesMock = [
    {
        id: 1,
        name: 'TEST NAME',
        description: '',
    }
]

const Search = () => {
    return (
        <div className={styles.list}>
            {placesMock.map((place) => (
                <div key={place.id}>{place.id}</div>
            ))}
        </div>
    )
}

export default Search;