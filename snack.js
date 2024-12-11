let inputdir = { x: 0, y: 0 };
const foodsound=  new Audio('eatsound.mp3');
  const gameover = new Audio('gameover.mp3');
  const movesound = new Audio('movesound.mp3');
const musicsound = new Audio('soundmusic.mp3');

let speed =4;
let lastPantTime =0;
let snackarr= [ {x:6,y:7}];
let score= 0;


let food = {x:13,y:15};

let scoreElement= document.createElement("div");
    scoreElement.style.position="fixed";
    scoreElement.classList.add("score");
    document.body.appendChild(scoreElement);

function main(ctime)
{

    window.requestAnimationFrame(main);
  //  console.log(ctime);
    if((ctime-lastPantTime)/1000<1/speed)
    {
        return;
    }
    
        lastPantTime=ctime;
        gameengine();
    
}

function iscolide(array)
{
    
    for(let i=1; i<array.length; i++)
    {
        if(array[i].x===array[0].x&& array[i].y=== array[0].y)
        {
            return true;
        }
    }

    if(array[0].x>=18 || array[0].y>=18 || array[0].x<=0 || array[0].y<=0)
    {
        return true;
    }
}
function gameengine()
{

    // update the food and snack

    if(iscolide(snackarr))
    {
       gameover.play();
       musicsound.pause();
        inputdir={x:0,y:0};
    alert("Game Over! press any key to play again your score is:"+score);
    snackarr= [ {x:6,y:7}];
    musicsound.play();
    removescore();
    }
   
    for (let i = snackarr.length - 2; i >= 0; i--) {
        snackarr[i + 1] = { ...snackarr[i] };
    }
    
    // Move the head of the snake
    snackarr[0].x += inputdir.x;
    snackarr[0].y += inputdir.y;
    
    //console.log(snackarr); // Check updated positions
    
    // Check if snake eats food
    if (snackarr[0].y === food.y && snackarr[0].x === food.x) {
        foodsound.play();
        addscore();
        console.log(score);
        // Snake grows by adding a new head at the front
        snackarr.unshift({ x: snackarr[0].x + inputdir.x, y: snackarr[0].y + inputdir.y });
    
        // Randomly place new food, ensuring it doesn't overlap with the snake's body
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    
        // Ensure food doesn't spawn on the snake's body
        
    }
    

    // display the food and snack
let bourd= document.querySelector(".border");
bourd.innerHTML='';

snackarr.forEach((objects,index)=>{
newSnackElement= document.createElement("div");
newSnackElement.style.gridRowStart=objects.x;
newSnackElement.style.gridColumnStart=objects.y;


if(index===0)
{
    newSnackElement.classList.add("snackhead");
}
else
{
    newSnackElement.classList.add("snackbody");
}
bourd.appendChild(newSnackElement);

});
newfoodElement = document.createElement("div");
newfoodElement.style.gridRowStart=food.x;
newfoodElement.style.gridColumnStart=food.y;

newfoodElement.classList.add("food");
bourd.appendChild(newfoodElement);
}
window.requestAnimationFrame(main);


document.addEventListener("DOMContentLoaded",()=>{
    musicsound.play();
    });

document.addEventListener("keydown", e => {
    movesound.play();  // sound for every key press
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir = { x: -1, y: 0 };  // Up direction
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputdir = { x: 1, y: 0 };   // Down direction
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir = { x: 0, y: -1 };  // Left direction
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputdir = { x: 0, y: 1 };   // Right direction
            break;
        default:
            break;
    }
});

    console.log(" new"+scoreElement);
function addscore()
{    
    scoreElement.innerHTML="";
    score++;
    scoreElement.innerHTML='Score: '+score;
 
}
function removescore()
{
    
    scoreElement.innerHTML='';
    score=0;
}
//setInterval(addscore,1000);
