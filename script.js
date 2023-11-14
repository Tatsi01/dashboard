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

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  soundctx = new getAudioContext();
 soundctx.suspend();
  mic = new p5.AudioIn();

  
  mic.start();

  
  recorder = new p5.SoundRecorder();

 
  recorder.setInput(mic);

 
  soundFile = new p5.SoundFile();
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
  print(recorder.record());
   userStartAudio();
  if ( mic.enabled) {

    recorder.record(soundFile);
    }
 if(recorder.record() == true)
 {
   recorder.stop();
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
  print(buffer / pointerSpeed);
  howLong = abs(buffer / pointerSpeed);
}
function pointer()
{
  fill("blue");
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
