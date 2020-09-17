import React, {useReducer, useContext} from 'react';
import './styles.css';
import Tile from './Tile';
import {globalState} from './App';


function Board() {
    const context = useContext(globalState);
    return (
        <div className='boardStyle'>
            {context.state.board.map(row=> row.map(tile=><Tile number={tile}/>))}
        </div>
    )
}

export default Board
