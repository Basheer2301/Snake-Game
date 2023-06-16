//variables
let ltime=0;
let speed=6;
let gameOver=false
const snakebody=[{x:11,y:11}]
let food={x:10,y:15}
const board=document.querySelector('.board');
let inputDir={x:0,y:0}
let lastDir={x:0,y:0}
let score=0

//functions
function main(ctime){
    if(over()){
        return alert("TRY AGAIN YOU LOSER...!!");
    }
    window.requestAnimationFrame(main);
    if((ctime-ltime)/1000<1/speed)  return;
    ltime=ctime;   
    board.innerHTML=''
    update();
    over();
    draw(board);
   
    
}
function hasFood(snake){
    if(snake.x===food.x && snake.y===food.y){
        const newSegment={food}
        snakebody.push(newSegment)
        food.x=Math.floor(Math.random()*21)+1;
        food.y=Math.floor(Math.random()*21)+1;
        score++;
    }
}
function over(){
    if(end() || eatenSelf(snakebody))    return true;
}
function update(){
    let dir=getDir();
    for(let i=snakebody.length-2;i>=0;i--){
        snakebody[i+1]={...snakebody[i]};
    }
    snakebody[0].x+=dir.x;
    snakebody[0].y+=dir.y;
    hasFood(snakebody[0]);
   
}
function draw(board){
    snakebody.forEach(cord=>{
        const snakeElement=document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.style.gridRowStart=cord.y;
        snakeElement.style.gridColumnStart=cord.x;
        board.append(snakeElement)
    });
    const foodElement=document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridRowStart=food.y; 
    foodElement.style.gridColumnStart=food.x;
    board.append(foodElement)
    scorebox.innerHTML="Score: " +score
}
function end(){
    if(snakebody[0].x<1 || snakebody[0].y>21 || snakebody[0].x>21 || snakebody[0].y<1)  return true;
}
function eatenSelf(snake){
    if(snake.length<4) return false;
    for(let i=4;i<snake.length;i++){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y)    return true;
    }
    return false;
}
function getDir() {  
    lastDir=inputDir;
    return inputDir;
}


//Main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    const key=e.key
    switch(key){
        case "ArrowUp":
            if(inputDir.y!== 0)    break
            inputDir={x:0,y:-1}
            break
        case "ArrowDown":
            if(inputDir.y!== 0)     break
            inputDir={x:0,y:1}
            break
        case "ArrowLeft":
            if(inputDir.x!== 0)    break
            inputDir={x:-1,y:0}
            break
        case "ArrowRight":
            if(inputDir.x!== 0)    break
            inputDir={x:1,y:0}
            break
       
    }
})
