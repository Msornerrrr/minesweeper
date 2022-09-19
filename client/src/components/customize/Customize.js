import React,{ useState } from "react";
import Map from '../map/Map';
import { generateEmptyMap, setMine} from "../../util/map-helper";

// image imported
import designSuccess from '../../images/minesweeper-design.png';

// Material UI
import { Rating, Typography } from '@mui/material';

export default function Customize(){
    const [show, setShow] = useState('show-btn');
    const [mapInfo, setMapInfo] = useState({
        width: 5,
        height: 5,
        title: '',
        difficulty: 2.5,
        map: generateEmptyMap(5, 5)
    });
    const {width, height, title, difficulty, map} = mapInfo;

    const handleChange = e => {
        const name = e.target.name;
        let value = e.target.value;
        switch(name){
            case "width":
                setMapInfo({...mapInfo, [name]: Number(value), map: generateEmptyMap(height, value)});
                break;
            case "height":
                setMapInfo({...mapInfo, [name]: Number(value), map: generateEmptyMap(value, width)});
                break;
            case "title":
                setMapInfo({...mapInfo, [name]: value});
                break;
            /*
            case "difficulty":
                setMapInfo({...mapInfo, [name]: Number(value)});
            */
            default:
                break;
        }
    };

    const handleLeftClick = (r, c) => {
        setMine(r, c, height, width, map);
        setMapInfo({...mapInfo, map: map});
    }

    const handleSubmit = e => {
        e.preventDefault();
        // post data
        fetch('/api/v1/maps', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, difficulty, width, height, map })
        });
        setShow('show-success');
    };

    const handleRecreate = () => {
        // clear text in textfield
        setMapInfo({
            width: 5,
            height: 5,
            title: '',
            difficulty: 2.5,
            map: generateEmptyMap(5, 5)
        });
        setShow("show-btn");
    }

    return <div id="customize">
        { show === 'show-btn' &&
        <>
            <h3>Here you can customize and create your map!</h3>
            <div className="btn" onClick={() => setShow('show-form')}>
                <p>Let's set your own map!</p>
                <p className="icon">⬇</p>
            </div>
        </> }
        { show === 'show-form' && 
            <form className="form" onSubmit={handleSubmit}>
                <h3>Please enter width and height for your map!</h3>
                <div className="form-section">
                    <label htmlFor="width">Please Enter Map Width: </label>
                    <input 
                        type="number" 
                        id="width"
                        name="width"
                        value={width || ''}
                        onChange={handleChange}
                        onWheel={(e) => e.target.blur()}
                        min="1"
                        max="25"
                        required
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="height">Please Enter Map Height: </label>
                    <input 
                        type="number" 
                        id="height"
                        name="height"
                        value={height || ''}
                        onChange={handleChange}
                        onWheel={(e) => e.target.blur()}
                        min="1"
                        max="25"
                        required
                    />
                </div>
                <h4>*You better not change width and height after you decided to save the map, otherwise you have to plant your map again :(</h4>
                <Map 
                    width={width} 
                    height={height} 
                    map={map} 
                    handleLeftClick={handleLeftClick}
                    isActivated={false}
                />

                <hr />

                <h3>Now give it a title and set the difficulty</h3>
                <div className="form-section">
                    <label htmlFor="title">Please Enter Map Title: </label>
                    <input 
                        type="text" 
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        placeholder="title here"
                        maxLength="18"
                        required
                    />
                </div>
                <div className="form-section">
                    <Typography component="legend">Please Set Map Difficulty: </Typography>
                    <Rating
                        name="difficulty-controlled"
                        precision={0.5}
                        size="large"
                        value={difficulty}
                        onChange={(event, newValue) => {
                            setMapInfo({...mapInfo, "difficulty": newValue});
                        }}
                    />
                </div>
                <button className="btn">Save Map!</button>
            </form>
        }
        { show === "show-success" &&
            <>
            <h2>Your Map Has Been Successfully Submitted and Saved!</h2>
            <img src={designSuccess} alt="minesweeper genius" />
            <h3>Now you could find your map in the community</h3>
            <div className="recreate btn" onClick={handleRecreate}>Create Another!</div>
            </>
        }
    </div>;
};