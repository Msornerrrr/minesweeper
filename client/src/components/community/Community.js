import React,{ useState, useEffect } from "react";
import Game from './Game';
import Map from '../map/Map';
import { deepCopyMap, explore, flag } from "../../util/map-helper";

// images imported
import loadingImage from "../../images/minesweeper-anime.png";

// Material UI
import { Rating, CircularProgress } from "@mui/material";

export default function Community(){
    const [data, setData] = useState([]);
    // initially start with loading data
    const [mode, setMode] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        setMode("loading");
        fetch(`/api/v1/maps?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setData(data.maps); // grab data in
                setTotalPages(Math.ceil(data.length / 8)); // grab num of pages in
                setMode("display"); // display the data now
            });
    }, [page]);

    const handleDelete = (id) => {
        // to the backend
        fetch(`/api/v1/maps/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        // change data
        setData(data.filter(map => map._id !== id));
    }

    // mapInfo store information of a selected map
    const [mapInfo, setMapInfo] = useState({});
    const {width, height, map} = mapInfo;

    const handlePlay = (id) => {
        setMode("play");
        const { title, difficulty, width, height, map } = data.filter(map => map._id === id)[0];
        setMapInfo({title, difficulty, width, height, map: deepCopyMap(height, width, map)});
    }

    const handleLeftClick = (r, c) => {
        explore(r, c, height, width, map);
        setMapInfo({...mapInfo, map: map});
    };

    const handleRightClick = (r, c) => {
        flag(r, c, map);
        setMapInfo({...mapInfo, map: map});
    };

    const handleRestart = () => {
        setMapInfo({});
        setMode("display");
    }

    const handleSave = () => {
        // post data
    }

    return <div id="community">
    { mode === "loading" &&
        <>
        <h2> Here you can view and play all maps craeted by user </h2>
        <img src={loadingImage} alt="loading anime gril" />
        <CircularProgress size={80} sx={{
            position: "relative",
            bottom: "200px"
        }}/>
        </>
    }
    { mode === "display" && 
        <>
        <h2> Here you can view and play all maps craeted by user </h2>
        <div className="map-galaery">
            {data.map(map => {
                const { _id, title, rating, difficulty, width, height } = map;
                return <Game 
                    key={_id} 
                    id={_id} 
                    title={title} 
                    rating={rating}
                    difficulty={difficulty} 
                    width={width} 
                    height={height} 
                    handleDelete={handleDelete} 
                    handlePlay={handlePlay}
                />
            })}
        </div>
        <ul className="pages">
            {page > 1 && <li className="btn" onClick={() => setPage(page-1)}>prev</li>}
            {[1, 2, 3].filter(p => p <= totalPages).map(p => {
                return <li 
                    key={p} 
                    className={page === p ? "btn active" : "btn"} 
                    onClick={() => setPage(p)}
                >{p}</li>;
            })}
            {totalPages > 3 && <li className="btn">...</li>}
            {page < totalPages && <li className="btn" onClick={() => setPage(page+1)}>next</li>}
        </ul>
        </>
    }
    { mode === "play" &&
        <>
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
        <div className="map-comment">
            <div className="rate-map">
                <h3>Rate Map: </h3>
                <Rating
                    name="rating-controlled"
                />
            </div>
            <div className="rate-difficulty">
                <h3>Rate Difficulty: </h3>
                <Rating
                    name="rating-controlled"
                />
            </div>
            <div>
                <h3>Leave a Comment:</h3>
            </div>
        </div>
        </>
    }
    </div>;
};