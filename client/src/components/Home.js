import React,{ useState, useEffect } from "react";
import Map from './map/Map';
import { generateRandomMap, explore, flag } from "../util/map-helper";

const allModes = [
    {type: "Easy", width: 10, height: 10, numMine: 12},
    {type: "Middle", width: 18, height: 18, numMine: 50},
    {type: "Difficult", width: 25, height: 25, numMine: 95},
    {type: "Custom"}
];

export default function Home(){
    /* for mode */
    const [mode, setMode] = useState("Easy");
    const [switchMode, setSwitchMode] = useState(false);
    useEffect(() => {
        if(mode === "Custom") setMapInfo({width:0, height:0, numMine:0, map:[]});
        else{
            const { width, height, numMine } = allModes.filter(obj => obj.type === mode)[0];
            setMapInfo({width, height, numMine, map: generateRandomMap(width, height, numMine)});
        }
    }, [mode]);

    const [isValid, setIsValid] = useState(true);

    const [mapInfo, setMapInfo] = useState({width:0, height:0, numMine:0, map:[]});
    const {width, height, numMine, map} = mapInfo;

    const handleChange = e => {
        const name = e.target.name;
        const value = Number(e.target.value);
        if(name === "width"){
            if(value <= 0 || value > 25 || numMine > value * height){
                setMapInfo({...mapInfo, [name]: value, map: []});
                setIsValid(false);
            } else{
                setMapInfo({...mapInfo, [name]: value, map: generateRandomMap(height, value, numMine)});
                setIsValid(true);
            }
        }
        if(name === "height"){
            if(value <= 0 || value > 25 || numMine > width * value){
                setMapInfo({...mapInfo, [name]: value, map: []});
                setIsValid(false);
            } else{
                setMapInfo({...mapInfo, [name]: value, map: generateRandomMap(value, width, numMine)});
                setIsValid(true);
            }
        }
        if(name === "numMine"){
            if(value <= 0 || value > width * height){
                setMapInfo({...mapInfo, [name]: value, map: []});
                setIsValid(false);
            } else{
                setMapInfo({...mapInfo, [name]: value, map: generateRandomMap(height, width, value)});
                setIsValid(true);
            }
        }
    };

    const handleLeftClick = (r, c) => {
        explore(r, c, height, width, map);
        setMapInfo({...mapInfo, map: map});
    };

    const handleRightClick = (r, c) => {
        flag(r, c, map);
        setMapInfo({...mapInfo, map: map});
    };

    const handleRestart = () => {
        setMapInfo({...mapInfo, map: generateRandomMap(height, width, numMine)});
    }

    const handleSave = () => {
        // post data
    }

    const handleSubmit = e => {
        e.preventDefault();
    };
    
    return <div id="home">
    <div className="home-title" onClick={() => setSwitchMode(!switchMode)}>
        { <>
        {
            allModes.filter(obj => obj.type === mode).map(obj => {
                const { type, width, height } = obj;
                return <h3 key={type} className="btn">{type} Mode ({width} x {height})</h3>
            })
        }
        {
            switchMode &&
            <div className="home-options">{
            allModes.filter(obj => obj.type !== mode).map(obj => {
                const { type, width, height } = obj;
                return <h3
                    key={type}
                    className="btn"
                    onClick={() => setMode(type)}
                >{type} Mode ({width} x {height})</h3>
            })
        }</div>
        }
        </>}
    </div>

    {   mode === "Custom" &&
        <form className="form">
            <h3>Please enter width, height, and num of mines!</h3>
            <h4>Note: the maximum width and height is 25</h4>
            <div className="form-section" onSubmit={handleSubmit}>
                <label htmlFor="width">Please Enter Map Width: </label>
                <input 
                    type="number" 
                    id="width"
                    name="width"
                    value={width || ''}
                    onChange={handleChange}
                    onWheel={(e) => e.target.blur()}
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
                    required
                />
            </div>
            <div className="form-section">
                <label htmlFor="numMine">Please Enter Number of Mines: </label>
                <input 
                    type="number" 
                    id="numMine"
                    name="numMine"
                    value={numMine || ''}
                    onChange={handleChange}
                    onWheel={(e) => e.target.blur()}
                    required
                />
            </div>
            <h4>*If you alter the width, height, or #mines, it would automatically re-create the map :(</h4>
        </form>
    }

    {
        isValid ?
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
        :
        <div>
            <h3>The map is invalid!!!</h3>

        </div>
    }
    </div>;
};