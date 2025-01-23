

export default function FilterOptions({changeSortBy, changeSortDir, search, mode}){
    return (
        <>
            <select name="sortBy" id="sortBy" onChange={changeSortBy} defaultValue={"id"}>
                <option value="id">Relevencia idk??</option>
                <option value="created_at">Dátum</option>
                {mode == "post" && <option value="likes">Like</option>}
            </select>
            <select name="sortDir" id="sortDir" onChange={changeSortDir} defaultValue={"asc"}>
                <option value="asc">Növekvő</option>
                <option value="desc">Csökkenő</option>
            </select>
            <form onSubmit={search}>
                <input type="text" name="searchBar" id="searchBar" />
                <button type="submit">Keresés</button>
            </form>
        </>
    )
}