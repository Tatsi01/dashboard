let colorlist = ['gold', 'yellow', 'turquoise', 'red']
let hi = true;
let time1 = 0;
let startingtime = null;
let isLerping = false;
let startValue = 0;
let endValue= 0;
let howLong = 0;
let pointerCoordx = 25;
let pointeCoordy = 170;
let lerpResult = 0;
let pointerSpeed = 150; 
let mic, recorder, soundFile;
let soundctx;
let afbsduh = false;
let playclip = false;
let test = 100;
let coordfile;
let xString = "";
let graphMode = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  button = createButton('graph');
  button.position(0, 0);
  button.mousePressed(changeBG);

  soundctx = new getAudioContext();
 soundctx.suspend();
  mic = new p5.AudioIn();

  
  mic.start();

  
  recorder = new p5.SoundRecorder();

 
  recorder.setInput(mic);

 
  soundFile = new p5.SoundFile();
  
}
function preload()
{
  coordfile = loadStrings("coords-save.txt");
}
function graphin()
{
  graphMode = true;
}
function draw() {
  
  background(255);
  //createCanvas(windowWidth,windowHeight);
  fill("yellow");
  rect(0,100,50,25);
  pointer();
  lerpLogic();
  time1 = time1 + deltaTime / 1000;
  //time1 = time1 / 10;
  if(isLerping == true)
  {
     
    pointerCoordx = lerpResult ;
  }
}
function lerpLogic()
{
  if(isLerping == true)
   {

       if(startingtime == null){
         lerpResult = lerpn(startValue,endValue,howLong,time1);
         startingtime = time1;
       }
       else
       {

         lerpResult = lerpn(startValue,endValue,howLong,startingtime);

       }


   }
}

function lerpn( valueToLerp,  goal,duration  ,  startTime){
  if(time1 < startTime + duration){
    let as = startTime + duration - time1;
    as = as / duration;
    as = 1 - as;
    //print(valueToLerp);
    //print(goal);
   // print(as);
    let result = lerp(valueToLerp, goal, as);
    
    return result;
  }
  else {
    //print("huh");
    isLerping = false;
    startingtime = null;
    return goal;
  }
}
function mouseClicked()
{
 
   userStartAudio();
  if ( mic.enabled && afbsduh == false) {

    recorder.record(soundFile);
    afbsduh = true;
    
    }
 
  if(playclip == true){
    soundFile.play(); // play the result!
     //saveSound(soundFile, 'mySound.wav');
     // save file
    
  }
  if(isLerping == true)
  {
    isLerping = false;
    
    startingtime = null;
  }
  isLerping = true;
  startValue = pointerCoordx;
  endValue = mouseX;
  let buffer = mouseX - pointerCoordx;
  howLong = abs(buffer / pointerSpeed);
  xString = mouseX;
  coordfile[1] = xString;
  print(coordfile[1]);
}
function mouseReleased()
{

  if(afbsduh == true && playclip == false)
   {

     recorder.stop();

     playclip = true;
    
   }
}


function pointer()
{
  fill('blue');
  beginShape();
  vertex(pointerCoordx,pointeCoordy);
  vertex(pointerCoordx,pointeCoordy - 40);
  vertex(pointerCoordx + 5,pointeCoordy -40);
  vertex(pointerCoordx - 2.5,pointeCoordy - 50);
  vertex(pointerCoordx - 10,pointeCoordy -40);
  vertex(pointerCoordx - 5,pointeCoordy -40);
  vertex(pointerCoordx - 5, pointeCoordy);
  endShape(CLOSE);
}
