import React,{ useState, useEffect } from "react";
import Map from './map/Map';
import { generateRandomMap, explore, flag } from "../util/map-helper";
import { checkType, checkRange } from "../util/input-valid";

// Material UI
import { Slider, TextField } from "@mui/material";

// all modes for Home
const allModes = [
    {type: "Easy", width: 10, height: 10, numMine: 12},
    {type: "Middle", width: 18, height: 18, numMine: 50},
    {type: "Difficult", width: 25, height: 25, numMine: 95},
    {type: "Custom", width: 5, height: 5, numMine: 1}
];

/*
const MODES = {
    EASY: { width: 10, height: 10, numMine: 12 },
    MIDDLE: { width: 18, height: 18, numMine: 50 },
    DIFFICULT: { width: 25, height: 25, numMine: 95 },
    CUSTOM: { width: 5, height: 5, numMine: 1 }
}
*/

export default function Play(){
    const [mode, setMode] = useState("Custom");
    const [switchMode, setSwitchMode] = useState(false);
    useEffect(() => {
        const { width, height, numMine } = allModes.filter(obj => obj.type === mode)[0];
        setDisplayInfo({ width, height, numMine });
        // setMapInfo({ width, height, numMine, map: generateRandomMap(width, height, numMine) });
    }, [mode]);

    // displayed map info, may be invalid
    const [displayInfo, setDisplayInfo] = useState({ width: 0, height: 0, numMine: 0 });

    // keep track of actual map information
    const [mapInfo, setMapInfo] = useState({ width: 0, height: 0, numMine: 0, map: [] });
    const { width, height, numMine, map } = mapInfo;
    useEffect(() => {
        let { width, height, numMine } = displayInfo;

        /* data validation */
        width = checkRange(checkType(width)); // check type then check range
        height = checkRange(checkType(height));
        numMine = checkType(numMine);
        if(width * height < numMine) numMine = width * height;

        /* safely update map info */
        setMapInfo({ width, height, numMine, map: generateRandomMap(height, width, numMine) });
    }, [displayInfo]);

    const changeWidth = e => {
        setDisplayInfo({...displayInfo, width: e.target.value});
    }

    const changeHeight = e => {
        setDisplayInfo({...displayInfo, height: e.target.value});
    }

    const changeMines = e => {
        setDisplayInfo({...displayInfo, numMine: e.target.value});
    }

    const handleLeftClick = (r, c) => {
        explore(r, c, height, width, map);
        setMapInfo({...mapInfo, map});
    };

    const handleRightClick = (r, c) => {
        flag(r, c, map);
        setMapInfo({...mapInfo, map});
    };

    const handleRestart = () => {
        setMapInfo({...mapInfo, map: generateRandomMap(height, width, numMine)});
    }

    const handleSave = () => {
        // post data
    }
    
    return <div id="play">
    <div className="play-title" onClick={() => setSwitchMode(!switchMode)}>
        {
            allModes.map(opt => {
                const { type, width: localWidth, height: localHeight } = opt;
                if(type === mode){
                    return <h3 
                        key={type} 
                        className="btn selected" 
                        onClick={() => setMode(type)}
                    >{type} Mode ({width} x {height})</h3>
                } else{
                    return <h3 
                        key={type} 
                        className="btn"
                        onClick={() => setMode(type)}
                    >{type} Mode ({localWidth} x {localHeight})</h3>
                }
            })
        }
    </div>

    {   mode === "Custom" &&
        <form className="form">
            <h2>Customize the size to whatever you want!</h2>
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

            <div className="form-section">
                <TextField
                    required
                    className="textfield"
                    value={displayInfo.numMine}
                    onChange={changeMines}
                    id="numMine-outlined"
                    label={`# Mines (max: ${width*height})`}
                    size="small"
                />
                <Slider
                    className="slider"
                    min={1}
                    max={width*height}
                    step={1}
                    value={numMine}
                    onChange={changeMines}
                    marks={[
                        {
                            value: Math.floor(width*height*0.05),
                            label: `${Math.floor(width*height*0.05)}`
                        },
                        {
                            value: Math.floor(width*height*0.2),
                            label: `${Math.floor(width*height*0.2)}`
                        }
                    ]}
                    valueLabelDisplay="auto"
                />
                <p>* reasonable range [{Math.floor(width*height*0.05)}, {Math.floor(width*height*0.2)}]</p>
            </div>
            <h4>*If you alter the width, height, or #mines, it would automatically re-create the map :(</h4>
        </form>
    }

    <Map
        width={width} 
        height={height} 
        map={map} 
        handleLeftClick={handleLeftClick}
        handleRightClick={handleRightClick}
        handleRestart={handleRestart}
        handleSave={handleSave}
        isActivated={true}
    />
    </div>;
};