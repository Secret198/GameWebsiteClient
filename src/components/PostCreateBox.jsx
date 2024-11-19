

export default function PostCreateBox({ submitPost }) {
    return (
        <div>
            <h1>Poszt létrehozása</h1>
            <form onSubmit={submitPost}>
                <textarea name="post" id="post" placeholder="Poszt szövege" rows="20" cols="70" required></textarea>
                <input type="file" id="image" name="image" />
                <button type="submit">Közzététel</button>
            </form>
        </div>
    )
}