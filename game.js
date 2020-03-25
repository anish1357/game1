


let canvas = document.getElementById("myCanvas");
let ctx=canvas.getContext("2d");
let x=canvas.width/2;
let y=canvas.height-30;
let dx =2;
let dy=-2;
let radius=10;


let m=0;
let n=149;
let o=221;
let barheight=10;
let barwidth=75;
let barx=(canvas.width-barwidth)/2;
let rightPressed = false;
let leftPressed = false;


let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let score=0;

let bricks=[];
for(let c=0;c<brickColumnCount;c++){
    bricks[c]=[];
    for(let r=0;r<brickRowCount;r++)
    bricks[c][r]={x:0,y:0, status:1};
}


document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown",keyDown ,false);
document.addEventListener("keyup",keyUp ,false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        barx = relativeX - barwidth/2;
    }
}

function keyDown(e)
{
    if(e.key=="Right"||e.key=="ArrowRight")
    rightPressed=true;
    else if(e.key=="Left"||e.key=="ArrowLeft")
    leftPressed=true;
}

function keyUp(e)
{
    if(e.key=="Right"||e.key=="ArrowRight")
    rightPressed=false;
    else if(e.key=="Left"||e.key=="ArrowLeft")
    leftPressed=false;
}
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
          var b = bricks[c][r];
          if(b.status == 1) {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
              dy = -dy;
              b.status = 0;
              score++;
              if(score == brickRowCount*brickColumnCount) {
                alert("YOU WIN, CONGRATS!");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
              }
            }
          }
        }
      }
    }

function drawBall(m,n,o)
{
      ctx.beginPath();
      ctx.arc(x,y,radius,0,Math.PI*2);
      ctx.fillStyle="rgb(m,n,0)"
      ctx.fill();
      ctx.closePath();


}
function drawBar()
{
    ctx.beginPath();
    ctx.rect(barx,canvas.height-barheight,barwidth,barheight);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status==1)
            {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function countscore()
{
    ctx.font="16px Arial";
    ctx.fillStyle="#0095DD";
    ctx.fillText("SCORE:"+score*10 ,8,20);

}
function draw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawBar();
    drawBricks();
    collisionDetection();
    countscore();
    if(x+dx>canvas.width||x+dx<radius)
    dx=-dx;

    if(y+dy >canvas.height-radius)
    { 
         if(x>barx&&x<barx+barwidth)
            dy=-dy;
      else{ 
           alert("GAME OVER");
           document.location.reload();
           clearInterval(interval);
          }
    }
    if(y+dy<radius)
    dy=-dy;
   

    if(rightPressed&&barx<canvas.width-barwidth)
        barx+=3
    else if(leftPressed&&barx>0)
        barx-=3;

    x+=dx;
    y+=dy;

}
var interval=setInterval(draw,10);


function changecolor()
{
  let  a=Math.floor(Math.random() * 256);
  let  b=Math.floor(Math.random() * 256);
  let  c=Math.floor(Math.random() * 256);
clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
requestAnimationFrame(drawBall);
drawBall(a,b,c);
}


