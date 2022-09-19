/* helper functions */
export function deepCopyMap(height, width, map){
    const newMap = [];
    for(let i = 0; i < height; i++){
        newMap.push([]);
        for(let j = 0; j < width; j++){
            const { num, isMine, isExplored, isFlagged } = map[i][j];
            newMap[i].push({ num, isMine, isExplored, isFlagged });
        }
    }
    return newMap;
}

export function generateEmptyMap(height, width){
    const newMap = []
    for(let i = 0; i < height; i++){
        newMap.push([]);
        for(let j = 0; j < width; j++){
            newMap[i].push({
                num: 0,
                isMine: false, 
                isExplored: false,
                isFlagged: false
            })
        }
    }
    return newMap;
}

export function setMine(r, c, height, width, map){
    map[r][c].isMine = !map[r][c].isMine;
    // add one to num for surrounding grids
    for(let i = -1; i <= 1; i++)
        for(let j = -1; j <= 1; j++)
            if(inRange(r+i, c+j, height, width)){
                map[r][c].isMine ? 
                map[r+i][c+j].num++
                :
                map[r+i][c+j].num--
            }
}

export function generateRandomMap(height, width, numMine){
    if(numMine > width*height) throw new Error('too many mines');
    const map = generateEmptyMap(height, width);
    for(let i = 0; i < numMine; i++){
        let rand = Math.floor(Math.random()*height*width); // create random num
        let r = Math.floor(rand/width); // set row
        let c = rand%width; // set column
        if(map[r][c].isMine) i--;
        else setMine(r, c, height, width, map);
    }
    return map;
}

export function inRange(r, c, height, width){
    if(r >= 0 && r < height && c >= 0 && c < width) return true;
    else return false;
}

export function explore(r, c, height, width, map){
    const grid = map[r][c];
    if(grid.isExplored || grid.isFlagged) return;
    map[r][c].isExplored = true;
    if(map[r][c].num === 0){
        for(let i = -1; i <= 1; i++)
        for(let j = -1; j <= 1; j++)
        if(inRange(r+i, c+j, height, width)) explore(r+i, c+j, height, width, map);
    }
    if(map[r][c].isExplored && map[r][c].isMine) return false;
}

export function flag(r, c, map){
    const grid = map[r][c];
    if(grid.isExplored) return;
    map[r][c].isFlagged = !map[r][c].isFlagged;
}

export function isLose(height, width, map){
    for(let i = 0; i < height; i++)
        for(let j = 0; j < width; j++)
            if(map[i][j].isExplored && map[i][j].isMine) return true
    return false;
}

export function isWin(height, width, map){
    for(let i = 0; i < height; i++)
        for(let j = 0; j < width; j++)
            if(map[i][j].isExplored === map[i][j].isMine) return false;
    return true;
}

/*
class Map{
    constructor(height, width, numMine){
        this.height = height;
        this.width = width;
        this.map = [];
        for(let i = 0; i < height; i++){
            this.map.push([]);
            for(let j = 0; j < width; j++){
                this.map[i].push({
                    num: 0,
                    isMine: false, 
                    isExplored: false,
                    isFlagged: false
                })
            }
        }
        // if neeed to setupMine
        if(numMine){
            for(let i = 0; i < numMine; i++){
                let rand = Math.floor(Math.random()*this.height*this.width); // create random num
                let r = Math.floor(rand/this.width); // set row
                let c = rand%this.witdh; // set column
                if(this.map[r][c].isMine) i--;
                else this.setMine(r, c);
            }
        }
    }

    setMine(r, c){
        if(!this.inRange(r, c)) throw Error('Index Out of Boundary');
        this.map[r][c].isMine = !this.map[r][c].isMine;
        for(let i = -1; i < 2; i++)
            for(let j = -1; j < 2; j++)
                if(inRange(r+i, c+j)){
                    this.map[r][c].isMine ? 
                    this.map[r+i][c+j].num++
                    :
                    this.map[r+i][c+j].num--
                }
    }

    inRange(r, c){
        if(r >= 0 && r < this.height && c >= 0 && c < this.width) return true;
        else return false;
    }
};
*/