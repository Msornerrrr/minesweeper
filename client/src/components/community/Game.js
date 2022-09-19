// Material UI
import { Rating } from '@mui/material';

export default function Game({ id, title, rating, difficulty, height, width, handleDelete, handlePlay }){
    return <div className="game-map">
        <div className='cancel' onClick={() => { handleDelete(id) }}>X</div>
        <h3> {title} </h3>
        <div className='rating'>
            <h4>Rating: </h4>
            <div>
                <Rating
                    name='rating-display'
                    value={rating}
                    readOnly
                />
                <p>(0)</p>
            </div>
        </div>
        <div className='difficulty'>
            <h4>Difficulty: </h4>
            <div>
                <Rating
                    name='difficulty-display'
                    value={difficulty}
                    readOnly
                />
                <p>(1)</p>
            </div>
        </div>
        <h4> # Rows: {height} </h4>
        <h4> # Columns: {width} </h4>
        <div className='play' onClick={() => { handlePlay(id) }}>Play</div>
    </div>;
};