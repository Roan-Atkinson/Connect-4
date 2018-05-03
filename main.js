$(document).ready(function() {
   console.log('GAME LOADED');
   document.getElementById('console').innerHTML = 'Current Turn: Red';
});

gameActive = true;
currTurn = 'R';
rSquares = [];
ySquares = [];
gobalIDtemp = 0

function clicked(id) {
   sqaure = document.getElementById(id);
   consoleDisplay = document.getElementById('console');
   if (!gameActive) return;
   if (currTurn == 'R') {
      if ($.inArray(id, ySquares) != -1) {
         consoleDisplay.innerHTML = 'Can\'t be on same place as: Yellow';
         setTimeout(function() {
            consoleDisplay.innerHTML = 'Current Turn: Red';
         }, 2000);
         return;
      }
      if ($.inArray(id, rSquares) != -1) {
         consoleDisplay.innerHTML = 'Can\'t place in the same square';
         setTimeout(function() {
            consoleDisplay.innerHTML = 'Current Turn: Red';
         }, 2000);
         return;
      }
   } else {
      if ($.inArray(id, rSquares) != -1) {
         consoleDisplay.innerHTML = 'Can\'t be on same place as: Red';
         setTimeout(function() {
            consoleDisplay.innerHTML = 'Current Turn: Yellow';
         }, 2000);
         return;
      }
      if ($.inArray(id, ySquares) != -1) {
         consoleDisplay.innerHTML = 'Can\'t place in the same square';
         setTimeout(function() {
            consoleDisplay.innerHTML = 'Current Turn: Yellow';
         }, 2000);
         return;
      }
   }

   fall(id);
   id = gobalIDtemp;
   gobalIDtemp = 0;

   possibleWinningSquareCombos = genWinningCombos(id);

   if (currTurn == 'R') {
      rSquares.push(id);
      document.getElementById(id).style.color = '#cc0000';
      currTurn = 'Y';
      consoleDisplay.innerHTML = 'Current Turn: Yellow';
      for (i = 0; i < possibleWinningSquareCombos.length; i++) {
         counter = 0
         for (var j = 0; j < possibleWinningSquareCombos[i].length; j++) {
            if (rSquares.indexOf(possibleWinningSquareCombos[i][j]) != -1) {
               counter++
               if (counter == 4) {
                  gameOver('R', possibleWinningSquareCombos[i]);
                  return;
               }
            }
         }
      }
   } else {
      ySquares.push(id)
      document.getElementById(id).style.color = '#cccc00';
      currTurn = 'R';
      consoleDisplay.innerHTML = 'Current Turn: Red';
      for (i = 0; i < possibleWinningSquareCombos.length; i++) {
         counter = 0
         for (var j = 0; j < possibleWinningSquareCombos[i].length; j++) {
            if (ySquares.indexOf(possibleWinningSquareCombos[i][j]) != -1) {
               counter++
               if (counter == 4) {
                  gameOver('Y', possibleWinningSquareCombos[i]);
                  return;
               }
            }
         }
      }
   }

   if (rSquares.length + ySquares.length == 16) {
      draw();
   }

}


function genWinningCombos(id) {
   validSquareIDs = [0,1,2,3,10,11,12,13,20,21,22,23,30,31,32,33];
   arr = [];

   arr.push([id, id+1, id+2, id+3])
   arr.push([id-3, id-2, id-1, id])
   arr.push([id-2, id-1, id, id+1])
   arr.push([id-1, id, id+1, id+2])
   arr.push([id, id+10, id+20, id+30])
   arr.push([id-30, id-20, id-10, id])
   arr.push([id+20, id+10, id, id-10])
   arr.push([id+10, id, id-10, id-20])
   arr.push([id, id+11, id+22, id+33])
   arr.push([id-33, id-22, id-11, id])
   arr.push([id-22, id-11, id, id+11])
   arr.push([id-11, id, id+11, id+22])
   arr.push([id, id+9, id+18, id+27])
   arr.push([id-27, id-18, id-9, id])
   arr.push([id-18, id-9, id, id+9])
   arr.push([id-9, id, id+9, id+18])

   arrsToRemove = [];
   for (i = 0; i < arr.length; i++) {
      for (j = 0; j < arr[i].length; j++) {
         if (!validSquareIDs.includes(arr[i][j])) {
            arrsToRemove.push(arr[i]);
            break;
         }
      }
   }
   for (i = 0; i < arrsToRemove.length; i++) {
      index = arr.indexOf(arrsToRemove[i]);
      arr.splice(index, 1);
   }
   return arr;
}


function fall(id) {
   validSquareIDs = [0,1,2,3,10,11,12,13,20,21,22,23,30,31,32,33];
   if ((id + 10) > 33 || rSquares.includes(id + 10) || ySquares.includes(id + 10)) {
      gobalIDtemp = id;
   } else {
      id = id + 10;
      fall(id);
   }
}


function gameOver(winner, squares) {
   if (winner == 'R') {
      winner = 'Red';
   } else {
      winner = 'Yellow';
   }
   pageConsole = document.getElementById('console');
   pageConsole.innerHTML = winner + ' wins';
   pageConsole.style.color = 'red';
   gameActive = false;
   for (var i = 0; i < squares.length; i++) {
      document.getElementById(squares[i]).style.backgroundColor = '#33cc33';
   }
   document.getElementById('mask').style.display = 'block';
}

function draw() {
   pageConsole = document.getElementById('console');
   pageConsole.innerHTML = 'Draw';
   pageConsole.style.color = 'red';
   gameActive = false;
   document.getElementById('mask').style.display = 'block';
}
