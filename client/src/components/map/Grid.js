export default function Grid({id, grid, isActivated}){
    return <div style={{
            backgroundColor: isActivated ? 
                grid.isExplored ? "aliceblue" : "beige"
                : 
                "aliceblue",
            cursor: grid.isExplored ? "default" : "pointer"
        }} id={id}>
        {
            isActivated ? 
                grid.isExplored ?
                    grid.isMine ? 
                        '💣' 
                    : 
                        grid.num === 0 ? '' : grid.num
                :
                    grid.isFlagged ? '🚩' : ''
            :
                grid.isMine ? '💣' : ''
        }
    </div>
}
