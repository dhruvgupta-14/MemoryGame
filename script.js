const startBtn=document.querySelector('.startBtn');
const rules=document.querySelector('.rules');
const sec = document.querySelector('.sec');
const min = document.querySelector('.min');
const rulesBtn1=document.querySelector('.rulesBtn1');
const rulesBtn2=document.querySelector('.rulesBtn2');
const game=document.querySelector('.game');
const cards=document.querySelector('.cards');
const gameMoves=document.querySelector('.gameMoves');
const resultBox1=document.querySelector('.resultBox1');
const result=document.querySelector('.result');
const b2=document.querySelector('.b2');
const b1=document.querySelector('.b1');
const stops=document.querySelector('.stop');



// this is a fxn that return array of object when called
// data of cards
const getData =()=>[
  {'num':1,imgSrc:'./images/img-1.png'},
  {'num':2,imgSrc:'./images/img-2.png'},
  {'num':3,imgSrc:'./images/img-3.png'},
  {'num':4,imgSrc:'./images/img-4.png'},
  {'num':5,imgSrc:'./images/img-5.png'},
  {'num':6,imgSrc:'./images/img-6.png'},
  {'num':7,imgSrc:'./images/img-7.png'},
  {'num':8,imgSrc:'./images/img-8.png'},
  {'num':9,imgSrc:'./images/img-1.png'},
  {'num':10,imgSrc:'./images/img-2.png'},
  {'num':11,imgSrc:'./images/img-3.png'},
  {'num':12,imgSrc:'./images/img-4.png'},
  {'num':13,imgSrc:'./images/img-5.png'},
  {'num':14,imgSrc:'./images/img-6.png'},
  {'num':15,imgSrc:'./images/img-7.png'},
  {'num':16,imgSrc:'./images/img-8.png'},
];

function resetGame() {
  // Reset game variables
  cardMatch=0;
  minutes = 1;
  seconds = 60;
  moves = 0;
  arr = [];
  busy = false;
  cards.innerHTML='';
  gameMoves.textContent=`Moves: ${moves}`;
  min.textContent = minutes < 10 ? `0${minutes}` : minutes;
  sec.textContent = seconds < 10 ? `0${seconds}` : seconds;
  // Clear the interval if it exists
  }

function playGame(){
  manageTime();
  let cardMatch=0;
  let minutes = 1;
  let seconds = 60;
  let moves=0;
  let arr=[] // upto array java script store these variables in memory
  let busy=false; // most important aspect of this game

  function alertMessage(){
  if(seconds===0) resultBox1.textContent='Your Time is up ! 😖 '
  if(moves>=36) resultBox1.textContent='You have no moves left. ! 😖 '
   result.classList.add('resultActive')
   }

function manageTime() {
 // this is best way to clear interval as after every second function calling then came back to check condition if condition matches it clear interval
  const secInterval = setInterval(() => {
   manageSeconds();
   //restart btn on page
   stops.addEventListener('click',()=>{
    clearInterval(secInterval)
    resetGame();
    playGame();
    })
   if(cardMatch>=16){
    clearInterval(secInterval);
    resultBox1.textContent='You Win ! 😁 '
    result.classList.add('resultActive');
   } 
   if(moves>=36) clearInterval(secInterval);
   if (seconds === 0 && minutes === 0) {
      alertMessage();
      clearInterval(secInterval);
    }
  }, 1000);
}

  function manageSeconds() {
  // checking when seconds==0 min should dcrease
  if (seconds === 0) {
    if (minutes > 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds = 0; // Ensure it stays at 0 if time is up
    }
  }
  else {
    seconds--;
  }
  min.textContent = minutes < 10 ? `0${minutes}` : minutes;
  sec.textContent = seconds < 10 ? `0${seconds}` : seconds;
}


// randomize the data
const randomize=()=>{
  const data=getData();
  data.sort(()=>Math.random()-0.5);// short trick;
   return data;
}

 function countMoves(){
  moves++;
  gameMoves.textContent=`Moves: ${moves}`;
  if(moves==36) alertMessage();
}

function getOriginalImage(arr) {
  for (let i = 0; i < arr.length; i++) {
     arr[i].classList.remove('toggleimage');
    arr[i].querySelector('.back').classList.remove('toggleimage');
    arr[i].style.pointerEvents='auto'
    arr[i].classList.remove('box1');
    }
    arr.length=0;
    busy=false;// after checking make it false
     }

  function addEffect(arr){
   
    for(let i=0;i<2;i++) arr[i].classList.add('box1');
    setTimeout(()=>{
      getOriginalImage(arr)
    }, 100);
    
 }

function check() {
    
    let img1 = arr[0].querySelector('.front');
    let img2 = arr[1].querySelector('.front');
    if ( img1.src!== img2.src) {
      busy=true;// make it true
      console.log('not matched');
      setTimeout(()=>{
        addEffect(arr)
      }, 1400);
    } else {
      
      cardMatch+=2;
      busy=false;
      arr.length=0;
      console.log('matched');
    }
  
}

function store(image) {
  image.style.pointerEvents='none';
  countMoves();
  arr.push(image);
  if (arr.length === 2) {
     check();
  }
}


const cardGenerator=()=>{
  const data=randomize();
  data.forEach((items)=>{
    const image=document.createElement('div');
    const front=document.createElement('img');
    const back=document.createElement('img');
    image.classList.add('image');
    front.classList.add('front');
    back.classList.add('back');
    cards.appendChild(image);
    image.appendChild(front);
    image.appendChild(back);
    back.src='./images/question-mark.svg'
    front.src=items.imgSrc;
    // adding click function to image otherwise it came back to original posn
    image.addEventListener('click',()=>{
       if(busy) return;// if the game is in its 1.5 sec period we dont able to click  any card
       store(image);// fxn called to store image in array
       image.classList.add('toggleimage');
       const flip=()=>{
        back.classList.add('toggleimage');
      }
     setTimeout(flip,320)
    })
  })
}

// call to generate the card 
cardGenerator();


}

// start btn event listener
startBtn.addEventListener('click',()=>{
  rules.classList.add('rulesActive')
})

//exit btn dabba diya

rulesBtn2.addEventListener('click',()=>{
  rules.classList.remove('rulesActive');
})

//continue btn dabba diya
rulesBtn1.addEventListener('click',()=>{
  rules.classList.remove('rulesActive');
  game.classList.add('gameActive');
  playGame();
})


//exit Btn dabba diya
b2.addEventListener('click',()=>{
  result.classList.remove('resultActive');
  game.classList.remove('gameActive');
  resetGame();
})

//restart Button dabba diya
b1.addEventListener('click',()=>{
  result.classList.remove('resultActive');
  resetGame();
  playGame();
  
})









