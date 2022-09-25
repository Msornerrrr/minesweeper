// Material UI
import { Rating } from '@mui/material';

export default function Game({ id, title, rating, difficulty, hint, height, width, handleDelete, handlePlay }){
    return <div className="game-map">
        <div className='cancel' onClick={() => { handleDelete(id) }}>X</div>
        <h3> {title} </h3>
        <h4>Creator: </h4>
        <div className='section'>
            <h4>Rating: </h4>
            <div>
                <Rating
                    name='rating-display'
                    precision={0.5}
                    value={rating}
                    readOnly
                />
                <p>(0)</p>
            </div>
        </div>
        <div className='section'>
            <h4>Difficulty: </h4>
            <div>
                <Rating
                    name='difficulty-display'
                    precision={0.5}
                    value={difficulty}
                    readOnly
                />
                <p>(1)</p>
            </div>
        </div>
        <h4> Size: {width} x {height} </h4>
        <div className='play' onClick={() => { handlePlay(id) }}>Play</div>
    </div>;
};