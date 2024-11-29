

export default function PostUpdateBox(props) {
    return (
        <div>
            <h1>Poszt szerkesztése</h1>
            <form onSubmit={props.updatePost}>
                <textarea name="post" id="post" placeholder="Poszt szövege" rows="20" cols="70" required defaultValue={props.post}></textarea>
                <button type="submit">Frissítés</button>
            </form>
        </div>
    )
}