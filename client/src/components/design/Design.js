import React,{ useEffect, useState } from "react";
import Map from '../map/Map';
import { generateEmptyMap, setMine} from "../../util/map-helper";
import { checkType, checkRange } from "../../util/input-valid";

// image imported
import designSuccess from '../../images/minesweeper-design.png';

// Material UI
import { Slider, TextField, Rating } from "@mui/material";

// all modes for Customize
const MODES = {
    BEFORECREATE: 'before-create',
    INCREATE: 'in-create',
    AFTERCREATE: 'after-create'
}

export default function Design(){
    const [mode, setMode] = useState(MODES.BEFORECREATE);

    const [displayInfo, setDisplayInfo] = useState({ width: 5, height: 5 });

    const [mapInfo, setMapInfo] = useState({
        width: 5,
        height: 5,
        title: '',
        difficulty: 2.5,
        hint: '',
        map: generateEmptyMap(5, 5)
    });
    const {width, height, title, difficulty, hint, map} = mapInfo;
    useEffect(() => {
        let { width, height } = displayInfo;

        /* data validation */
        width = checkRange(checkType(width)); // check type then check range
        height = checkRange(checkType(height));

        setMapInfo(prevInfo => {
            return {...prevInfo, width, height, map: generateEmptyMap(height, width)};
        });
    }, [displayInfo]);

    const changeWidth = e => {
        setDisplayInfo({...displayInfo, width: e.target.value});
    }

    const changeHeight = e => {
        setDisplayInfo({...displayInfo, height: e.target.value});
    }

    const changeTitle = e => {
        const value = e.target.value;
        setMapInfo({...mapInfo, title: value});
    }

    const changeHint = e => {
        const value = e.target.value;
        setMapInfo({...mapInfo, hint: value});
    }

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
            body: JSON.stringify({ title, difficulty, hint, width, height, map })
        });
        setMode(MODES.AFTERCREATE);
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
        setMode(MODES.BEFORECREATE);
    }

    return <div id="design">
        { mode === MODES.BEFORECREATE &&
        <>
            <h2>Here you can design and create your map!</h2>
            <div className="btn" onClick={() => setMode(MODES.INCREATE)}>
                <p>Let's set your own map!</p>
                <p className="icon">⬇</p>
            </div>
        </> }
        { mode === MODES.INCREATE && 
            <form className="form" onSubmit={handleSubmit}>
                <h2>Generate the size to whatever you want!</h2>
                <div className="form-section">
                    <TextField
                        required
                        className="textfield"
                        value={displayInfo.width}
                        onChange={changeWidth}
                        id="width-outlined"
                        label="Width (max:25)"
                        size="small"
                    />
                    <Slider
                        className="slider"
                        min={1}
                        max={25}
                        step={1}
                        value={width}
                        onChange={changeWidth}
                        marks={true}
                        valueLabelDisplay="auto"
                    />
                </div>
                <div className="form-section">
                    <TextField
                        required
                        className="textfield"
                        value={displayInfo.height}
                        onChange={changeHeight}
                        id="height-outlined"
                        label="Height (max:25)"
                        size="small"
                    />
                    <Slider
                        className="slider"
                        min={1}
                        max={25}
                        step={1}
                        value={height}
                        onChange={changeHeight}
                        marks={true}
                        valueLabelDisplay="auto"
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

                <h2>Now give it a title and rate the difficulty</h2>
                <div className="form-section">
                    <TextField
                        required
                        className="textfield centered"
                        value={title}
                        onChange={changeTitle}
                        id="title-outlined"
                        label="Title (3 ~ 25 characters)"
                        inputProps={{
                            maxLength: 25,
                        }}
                    />
                </div>
                <div className="form-section">
                    <h3>How difficult do you think your map is: </h3>
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
                <div className="form-section">
                    <TextField
                        className="textfield centered"
                        value={hint}
                        onChange={changeHint}
                        id="title-outlined"
                        label="Hint (3 ~ 89 characters) (optional)"
                        rows={2}
                        inputProps={{
                            maxLength: 89,
                        }}
                    />
                </div>
                <button className="btn">Save Map!</button>
            </form>
        }
        { mode === MODES.AFTERCREATE &&
            <>
            <h2>Your Map Has Been Successfully Submitted and Saved!</h2>
            <img src={designSuccess} alt="minesweeper genius" />
            <h3>Now you could find your map in the community</h3>
            <div className="recreate btn" onClick={handleRecreate}>Create Another!</div>
            </>
        }
    </div>;
};