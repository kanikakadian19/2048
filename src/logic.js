const rows = 4;
const cols = 4;
const winTile = 2048;
export const newTile = board => {
    const freelist = [];
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;++j){
            if(board[i][j]===0) freelist.push([i,j]);
        }
    }
    const randomPos = Math.floor(Math.random()*(freelist.length)); 
    board[freelist[randomPos][0]][freelist[randomPos][1]] = 2;
    return board;
}
export const getFreshBoard = () => newTile([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);

const equal = (array1, array2) => {
    if (!Array.isArray(array1) && !Array.isArray(array2)) {
        return array1 === array2;
    }
    if (array1.length !== array2.length) {
        return false;
    }
    for (var i = 0, len = array1.length; i < len; i++) {
        if (!equal(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}

const gameOver = (oldBoard) =>{
    if(equal(oldBoard,moveLeft(oldBoard)) && equal(oldBoard,moveRight(oldBoard))
        && equal(oldBoard,moveDown(oldBoard)) && equal(oldBoard,moveUp(oldBoard)) ){
            return true;
    }else{
        return false;
    }
}
const gameWin = (board) => {
    let win = false;
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;++j){
            if(board[i][j]===winTile) win = true;
        }
    }
    return win;
}

export const decide = (oldBoard, newBoard) => {
    if(equal(oldBoard,newBoard)===true){
        return [newBoard,gameOver(oldBoard,newBoard),gameWin(newBoard)];
    }
    const freelist = [];
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;++j){
            if(newBoard[i][j]===0) freelist.push([i,j]);
        }
    }
    if(freelist.length===0) return [newBoard,gameOver(newBoard),gameWin(newBoard)];
    else return [newTile(newBoard),gameOver(newBoard),gameWin(newBoard)];
}

export const moveLeft = board => {
    const newboard = [];
    for(let i=0;i<rows;++i){
        let newRow = [];
        for(let j=0;j<cols;++j){
            if(board[i][j]!==0){
                if(newRow.length>0 && newRow[newRow.length-1]===board[i][j]){
                    newRow.pop();
                    newRow.push(2*board[i][j]);
                }else{
                    newRow.push(board[i][j]);
                }
            }
        }
        while(newRow.length<4) newRow.push(0);
        newboard.push(newRow);
    }    
    return newboard;
}

export const moveRight = board => {
    const newboard = [];
    for(let i=0;i<rows;++i){
        let newRow = [];
        for(let j=cols-1;j>=0;--j){
            if(board[i][j]!==0){
                if(newRow.length>0 && newRow[newRow.length-1]===board[i][j]){
                    newRow.pop();
                    newRow.push(2*board[i][j]);
                }else{
                    newRow.push(board[i][j]);
                }
            }
        }
        while(newRow.length<4) newRow.push(0);
        newboard.push(newRow.reverse());
    }    
    return newboard;
}

const flipMatrix = matrix => (
    matrix[0].map((column, index) => (
      matrix.map(row => row[index])
    ))
  );
  
const rotateRight = matrix => (
    flipMatrix(matrix.reverse())
  );
  
const rotateLeft = matrix => (
    flipMatrix(matrix).reverse()
  );

export const moveUp = board => {
    return rotateRight(moveLeft(rotateLeft(board)));
}

export const moveDown = board => {
    return rotateRight(moveRight(rotateLeft(board)));
}
