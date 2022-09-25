import { useState, useEffect } from "react";
import Grid from "./Grid";
import { isLose, isWin } from "../../util/map-helper";

// all modes in Map
const MODES = {
    BEFOREGAME: "before-game",
    INGAME: "in-game",
    WIN: "win",
    LOSE: "lose"
}

export default function Map({width, height, map, handleLeftClick, handleRightClick, isActivated, handleRestart, handleSave}){
    const [mode, setMode] = useState(MODES.BEFOREGAME);
    useEffect(() => {
        setMode(MODES.BEFOREGAME);
    }, [map]);

    const [initTime, setInitTime] = useState(0);
    useEffect(() => {
        if(mode === MODES.INGAME) setInitTime(Date.now())
    }, [mode]);

    const [time, setTime] = useState(0);
    useEffect(() => {
        const intervalID = setInterval(() => {
            if(mode === MODES.INGAME){
                const delta = Date.now() - initTime;
                setTime(Math.floor(delta/100));
            } else clearInterval(intervalID);
        }, 100);    
        return () => {clearInterval(intervalID)}
    }, [initTime, time, mode])

    const handleClick = e => {
        if(e.target.nodeName !== 'DIV') return;
        const row = Math.floor(e.target.id / width);
        const col = e.target.id % width;
        if(e.type === "click"){
            handleLeftClick(row, col);
        }
        else if(e.type === "contextmenu"){
            e.preventDefault();
            handleRightClick(row, col);
        }
        // only for play mode
        if(isActivated){
            if(isWin(height, width, map)) setMode(MODES.WIN);
            else if(isLose(height, width, map)) setMode(MODES.LOSE);
            else setMode(MODES.INGAME);
        }
    }

    // used for return
    const gridList = [];
    for(let i = 0; i < height; i++)
        for(let j = 0; j < width; j++)
            gridList.push(<Grid 
                key={i*width+j}
                id={i*width+j}
                grid={map[i][j]}
                isActivated={isActivated}
            />);

    return  <div id="map">
    {
        isActivated && map.length !== 0 && 
        <div className="map-title">
            {mode === MODES.BEFOREGAME && "click any grid to start the game!"}
            {mode === MODES.INGAME && <>
                <p>Time: {Math.floor(time/10)}. {time%10}</p>
            </>}
            {mode === MODES.LOSE && <>
                <p>😫😫😫😫😫 You Lose! 😫😫😫😫😫</p>
                <p>Your Time: {Math.floor(time/10)}. {time%10}</p>
            </>}
            {mode === MODES.WIN && <>
                <p>🎉🎉🎉🎉🎉 You Win! 🎉🎉🎉🎉🎉</p>
                <p>Your Time: {Math.floor(time/10)}. {time%10}</p>
            </>}
        </div>
    }

    <div 
        className="map-container" 
        style={{
            width: width*30,
            height: height*30,
        }}
        onClick={handleClick}
        onContextMenu={handleClick}
    > {gridList} </div>

    {
        isActivated && (mode === MODES.WIN || mode === MODES.LOSE) &&  
        <div className="map-ending">
            <div className="btn" onClick={() => {
                handleSave();
            }}>Save</div>
            <div className="btn" onClick={() => {
                handleRestart();
                setMode(MODES.BEFOREGAME);
            }}>Restart</div>
        </div>
    }
    </div>
}