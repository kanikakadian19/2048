import React from 'react'
import './styles.css';


function Tile(props) {
    if(props.number===0){
        return(
            <div className={`tileStyle tileStyle-active-${props.number}`}>
            </div>
        )
    }else{
        return(
            <div className={`tileStyle tileStyle-active-${props.number}`}>
                <h1 className='tileFont'>{props.number}</h1>
            </div>
        )
    }
}

export default Tile
