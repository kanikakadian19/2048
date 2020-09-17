import React,{useReducer, useEffect} from 'react'
import Board from './Board';
import './styles.css';
import Modal from 'react-responsive-modal';
import {moveLeft, moveRight, moveUp, moveDown, newTile, gameStatus, decide, getFreshBoard} from './logic';
const intialState = {
    board : getFreshBoard(),
    gameOver : false,
    gameWin : false
};

const reducer = (state, action) => {
    let game;
    switch(action.move){
        case 'UP': 
            game = decide(state.board,moveUp(state.board));
            return { 
                board : game[0],
                gameOver : game[1],
                gameWin : game[2]
            };
        case 'DOWN': 
            game = decide(state.board,moveDown(state.board));
            return { 
                board : game[0],
                gameOver : game[1],
                gameWin : game[2]
            };
        case 'LEFT': 
            game = decide(state.board,moveLeft(state.board));
            return { 
                board : game[0],
                gameOver : game[1],
                gameWin : game[2]
            };
        case 'RIGHT': 
            game = decide(state.board,moveRight(state.board));
            return { 
                board : game[0],
                gameOver : game[1],
                gameWin : game[2]
            };
        case 'NEW_TILE': return { ...state,
            board : newTile(state.board)
        };
        case 'RESET': return {
            board: getFreshBoard(),
            gameOver: false,
            gameWin: false,
        };
        default: return state.board;
    }
}
export const globalState = React.createContext();

function App() {
    const [State, Dispatch] = useReducer(reducer, intialState);    
    
    const keyPressHandle = (e) =>{
        //console.log(e);
        switch(e.code){
            case 'ArrowLeft': Dispatch({move:'LEFT'}); break;
            case 'ArrowRight': Dispatch({move:'RIGHT'}); break;
            case 'ArrowUp': Dispatch({move:'UP'}); break;
            case 'ArrowDown': Dispatch({move:'DOWN'}); break;
        }
    }

    useEffect(()=>{
        window.addEventListener('keydown', keyPressHandle);
        return (()=>{
            window.removeEventListener('keydown',keyPressHandle);
        })
    },[])


    return (
        <div className='App'>
            <h1 className='coolHeading'>{'<'}TWO ZERO FOUR EIGHT{' />'}</h1>
            <globalState.Provider value={{state:State,dispatch:Dispatch}}>
                <div className='appContainer'>
                    <div className='boardContainer'> 
                        <Board/>
                    </div>
                    <div>
                       <div className='buttonsContainer'>
                        <button className='btn' onClick={()=>Dispatch({move:'LEFT'})}>LEFT</button>
                        <button className='btn' onClick={()=>Dispatch({move:'UP'})}>UP</button>
                        <button className='btn' onClick={()=>Dispatch({move:'DOWN'})}>DOWN</button>
                        <button className='btn' onClick={()=>Dispatch({move:'RIGHT'})}>RIGHT</button>    
                        </div>
                        <button className='btn btn-newgame' onClick={()=>{Dispatch({move:'RESET'})}}>NEW GAME</button>
                    </div>
                    <p className='bottom-text'>Made with ❤ in ReactJS.<br/>Best experience on web devices. Use arrow keys for moving tiles.</p>
                </div>     
            </globalState.Provider>
            <Modal classNames={{modal:'mOverlay'}} center={true} showCloseIcon={false} open={State.gameWin} onClose={()=>Dispatch({move:'RESET'})}>
                <h1> Winner Winner<br/> Chicken Dinner </h1>
                <button className='btn btn-newgame' onClick={()=>{Dispatch({move:'RESET'})}}>NEW GAME</button>
            </Modal>
            <Modal classNames={{modal:'mOverlay'}} center={true} showCloseIcon={false} open={State.gameOver} onClose={()=>Dispatch({move:'RESET'})}>
                <h1> Game Over </h1>
                <button className='btn btn-newgame' onClick={()=>{Dispatch({move:'RESET'})}}>NEW GAME</button>
            </Modal>
        </div>
    )
}
export default App