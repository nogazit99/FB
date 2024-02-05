import './style.css'; // Import the CSS file

function PostItem({ text, picture, author, date }) {
    return (
        <div className="card" style={{ width: '50rem' }}>
            <div className="card-body">
                <p className="card-text">{text}</p>
            </div>
            <img src={picture} className="card-img-top" alt="..." />
            
        </div>
    );
}


export default PostItem;