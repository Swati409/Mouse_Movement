let btnstart  = document.querySelector("#btnstart");
let btnstop  = document.querySelector("#btnstop");
let btnrecord  = document.querySelector("#btnrecord");
let btnplay  = document.querySelector("#btnplay");
let btnreset  = document.querySelector("#btnreset");


var inc = 10;

let container = document.querySelector("#playarea");

let theThing = document.getElementById('img');

let imgpos1 = FindPosition(theThing);
let start = false;

let arr = [];

var path = new Array();
var posX, posY;
var index = 0;
var num = 0;

var animate = null;
let movementTrack = [];


btnstart.addEventListener("click",start_func,false);
btnstop.addEventListener("click",stop_func,false);
btnrecord.addEventListener("click",record,false);
btnplay.addEventListener("click",play,false);
btnreset.addEventListener("click",reset,false);
container.addEventListener("mousemove", getclickposition, false);

window.onload = init; // init function called during onload of page

// init function calls in the start on page load
// start is false
// record is false
function init()
{
    start = false;
    record = false;
    theThing.style.position = 'relative';
    theThing.style.top = 0 - container.clientHeight + "px";
    theThing.style.left = 0 + "px";
}

// start function called after clicking on start  button
function start_func() {
    start =  true;

    btnstart.style.background = "blue";
    btnstart.style.color = "white";

    btnstop.style.background = "";
    btnstop.style.color = "";

    btnrecord.style.background = "";
    btnrecord.style.color = "";

    btnreset.style.background ="";
    btnreset.style.color = "";

    btnplay.style.background ="";
    btnplay.style.color = "";

 }

// stop function - sets the start parameter to fasle
 function stop_func(){
    btnstart.style.background = "";
    btnstart.style.color = "";

    start = false;

    btnstop.style.background = "blue";
    btnstop.style.color = "white";

    btnrecord.style.background = "";
    btnrecord.style.color = "";

    btnreset.style.background ="";
    btnreset.style.color = "";

    btnplay.style.background ="";
    btnplay.style.color = "";
}


function getclickposition(e){

    // let parentPosition = FindPosition(e.currentTarget);
    // let imgposition = FindPosition(theThing);
    // let parentPosition1 = getPos(theThing);

    var xPoss = e.clientX - imgpos1[0] + (theThing.clientWidth / 2);
    var yPoss = e.clientY - imgpos1[1] +  (theThing.clientWidth / 2);
    if (start){
        theThing.style.left =  xPoss  + "px";
        theThing.style.top =  yPoss + "px";
    }
    if (record)
    {
        movementTrack.push({ x: xPoss  , y: yPoss  });
        theThing.style.left =  xPoss  + "px";
        theThing.style.top =  yPoss + "px";
        
    }
    
}

// find the position of an element
function FindPosition(oElement)
{
  if(typeof( oElement.offsetParent ) != "undefined")
  {
    for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
    {
       
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
      return [ posX, posY ];
    }
    else
    {
      return [ oElement.x, oElement.y ];
    }
}

// start recording
function record()
{
    record = true;
    btnstart.style.background = "";
    btnstart.style.color = "";

    btnstop.style.background = "";
    btnstop.style.color = "";

    btnrecord.style.background = "blue";
    btnrecord.style.color = "white";

    btnreset.style.background ="";
    btnreset.style.color = "";

    btnplay.style.background ="";
    btnplay.style.color = "";

}

// reset recording
function reset()
{
    movementTrack = [];
    arr = []
    clearTimeout(animate);

    btnstart.style.background = "";
    btnstart.style.color = "";

    btnstop.style.background = "";
    btnstop.style.color = "";

    btnrecord.style.background = "";
    btnrecord.style.color = "";

    btnplay.style.background ="";
    btnplay.style.color = "";

    btnreset.style.background ="blue";
    btnreset.style.color = "white";


}

// play recorded positions
function play()
{
    record = false;
    btnstart.style.background = "";
    btnstart.style.color = "";

    btnstop.style.background = "";
    btnstop.style.color = "";

    btnrecord.style.background = "";
    btnrecord.style.color = "";

    btnreset.style.background ="";
    btnreset.style.color = "";

    btnplay.style.background ="blue";
    btnplay.style.color = "white";

    num = 0;
    console.log("movement track length: " + movementTrack.length);
    arr = []
    handler(movementTrack.length);
}

function moveTo(x, y) // Cursor picture movement
{
    theThing.style.left =  x + 'px';
    theThing.style.top = y + "px";
     

   // console.log("from moveto x:" + theThing.style.left);
}

var handler = function(count) {
    var caller = arguments.callee;
    var a = 0;
    a += 1; 
    //Infinite
    if (count == -1) {
        window.setTimeout(function() {
            moveTo(movementTrack[count].x, movementTrack[count].y);
            caller(count);
        }, 1000);
    }
    if (count > 0) {
        if (count == 0) return;
        //alert("check" + count  );
        
        arr.push(count);
       // alert("array length: " + arr.length);

        moveTo(movementTrack[arr.length - 1].x, movementTrack[arr.length - 1].y);
        window.setTimeout(function() {
            caller(count-1);
           
        }, 1000);   
       
    }
    if (count == null) {moveTo(movementTrack[count].x, movementTrack[count].y); }
};
