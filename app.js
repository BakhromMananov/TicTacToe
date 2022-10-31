const selectBox= document.querySelector('.select-box'),
selectXBtn=selectBox.querySelector('.playerX'),
selectOBtn=selectBox.querySelector('.playerO'),
playBoard=document.querySelector('.play-board'),
allBox=document.querySelectorAll('section span'),
players=document.querySelector('.players'),
resultBox=document.querySelector('.result-box'),
wonText=resultBox.querySelector('.won-text'),
replayBtn=resultBox.querySelector('button'); 

window.onload = () => {
    
 
    for(let i=0; i < allBox.length; i++) {
        allBox[i].setAttribute('onclick', 'clickedBox(this)')
    }

    
    selectXBtn.onclick= () => {
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
        players.setAttribute("class", "players active player"); 
        
    }

    selectOBtn.onclick= () => {
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
        
    }

}

let playerXIcon='X';
let playerOIcon='O'; 
let playerSign='X'
let runBot= true; 

function clickedBox(elem) {
   
    if(players.classList.contains('player')) {
        
        elem.innerHTML=`<i>${playerOIcon} </i>`;
        players.classList.add('active'); 
        playerSign = 'O';
        elem.setAttribute('id', playerSign); 
    } else {
        elem.innerHTML=`<i> ${playerXIcon} </i>`;
        players.classList.add('active'); 
        elem.setAttribute('id', playerSign)
    }
    selectWinner(); 
    players.style.pointerEvents='none'; 
    elem.style.pointerEvents='none';
    let randomDelayTime=((Math.random()*1000) +200 ).toFixed(); 
    setTimeout(() => {
        bot(runBot); 
    }, randomDelayTime)
    
}

function bot(runBot) {
    if (runBot) {
        playerSign = 'O'; 
    let array = [];
    for (let i=0; i <allBox.length; i++) {
        if(allBox[i].childElementCount==0) {
            array.push(i);
            console.log(i+ ' ' + 'has no children')
        }
    }

    let randomBox=array[Math.floor(Math.random() * array.length)]; 
    allBox[randomBox]
    if (array.length > 0) {
        if(players.classList.contains('player')) {
            allBox[randomBox].innerHTML=`<i>${playerXIcon} </i>`;
            players.classList.remove('active'); 
            playerSign = 'X';
            allBox[randomBox].setAttribute('id', playerSign); 
        } else {
            allBox[randomBox].innerHTML=`<i> ${playerOIcon} </i>`;
            players.classList.remove('active'); 
            allBox[randomBox].setAttribute('id', playerSign); 
        }
        selectWinner(); 
    }
    allBox[randomBox].style.pointerEvents='none'; 
    players.style.pointerEvents='auto';
    playerSign= 'X';
    } 
}


function getClass(idname) {
    return document.querySelector('.box' + idname).id;
}

function checkClass(val1, val2, val3, sign) {
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign ) {
        return true; 
    }
}

function selectWinner() {
    if(checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(6, 7, 8, playerSign) || checkClass(1, 4, 7, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign) || checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign)) {
        console.log(playerSign + ' ' + 'is the winner!')
        runBot = false; 
        bot(runBot); 
        setTimeout( () => {
            
        })
    }
}