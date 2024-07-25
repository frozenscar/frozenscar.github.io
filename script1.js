const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
var lines = null;
document.addEventListener('DOMContentLoaded', () => {
    // URL of the file you want to fetch
    const fileUrl = 'ActionValues3.txt';

    // Fetch the file content
    fetch(fileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(fileContent => {
            lines = fileContent.trim().split('\n');
            lines = lines.map(str => str.split(" "));
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});

let currentPlayer = 'X';
var gameOver = false

function handleClick(event) {
    


    const cell = event.target;
    
    
    if (cell.textContent === '') {
        
        cell.textContent = currentPlayer;
        console.log(getCellContents());
        const matchedSubArray = lines.find(subArray => subArray[0] === getCellContents())
        
        
        cells.forEach((el)=>el.style.backgroundColor="white");

        var mx = -3000;
        var pos = 2;
        var best_tile = -1;
       
        if (checkWin(currentPlayer)) {
            
            alert(`${currentPlayer} wins!`);
            board.removeEventListener('click', handleClick);
            return
        } else if ([...cells].every(cell => cell.textContent !== '')) {
            
            alert('It\'s a draw!');
            board.removeEventListener('click', handleClick);

            return
        }
        matchedSubArray.pop()
        while(pos<matchedSubArray.length)
        {
            if (parseFloat(matchedSubArray[pos])>mx)
            {
                console.log(matchedSubArray[pos]+" is greater than"+ mx)
                mx = parseFloat(matchedSubArray[pos]);
                best_tile = parseFloat(matchedSubArray[pos-1]);
            }
            pos+=3
        }
        //alert(best_tile+1)
        const valuesTxt =  document.getElementById("values");
        
        console.log(matchedSubArray)
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O')
        {
            cells[best_tile].click()
        }
        lightness=90
        cells[best_tile].style.backgroundColor = `hsl(120, 100%, ${lightness}%)`
        matchedSubArray.shift()
        valuesTxt.textContent = matchedSubArray;
    }


}

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].textContent === player);
    });
}

function getCellContents() {
    return [...cells].map(cell => cell.textContent === '' ? '-' : cell.textContent).join('');
}

function restartGame() {
    cells.forEach(cell => cell.textContent = '');
    board.addEventListener('click', handleClick);
    currentPlayer = 'X';
}



board.addEventListener('click', handleClick);
restartButton.addEventListener('click', restartGame);
