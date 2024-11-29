

export default function FeedBack({ message, status }) {
    return <div className={`feedBack ${status}`}>
        <p>{message}</p>
    </div>
}