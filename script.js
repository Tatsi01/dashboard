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
let graphX = [];
let graphY = [];
let countX = -1;
let countY = -1;
 let textCount = 0;
let drawingGraph = false;
let fileGlossary= 1;
let isRecording = false;
let hasRecorded = false;

function setup() {
  createCanvas(450, 450);
  background(255);
  for (let x = 25; countX < 17; x = x + 25) {
    countX++;
    countY = -1;
    graphX[countX] = x;
    for (let y = 0; countY < 16; y = y + 25) {
      countY++;
      graphY[countY] = y;
    }
  }
  print(graphX[17]);
  print(graphY[16]);
  button = createButton('graph');
  button.position(0, 0);
  button.mousePressed(graphin);
  buttonRec = createButton('record/stop record');
  buttonRec.position(50, 0);
  buttonRec.mousePressed(record(false)); 
  buttonPLay = createButton('play');
  buttonPLay.position(400, 0);
  buttonPLay.mousePressed(record(true)); 
  
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
  coordfile[0] = "0";
}

function record(play)
{
  if(isRecording ==false && hasRecorded == false && play == false)
  {
    userStartAudio();
    if ( mic.enabled ) {

      recorder.record(soundFile);
      isRecordig = true;
      }
    
  }
  if(isRecording == true && play == false)
  {
     isRecording = false;
    hasRecorded = true;
  }
  if(hasRecorded == true && play == true)
  {
    
  }
   
}

function graphin()
{
  let something = 425 / coordfile.length - 1;
  countX = 0;
  graphX = [];
  for (let x = 25; countX < coordfile.length ; x = x + something) {
    
     graphX[countX] = x;
    countX++;
  }
  graphMode = true;
  drawingGraph = true;
   background(255);
  print("new");
}
function draw() {
  
  
 
  //createCanvas(windowWidth,windowHeight);
  if(graphMode == false)
  {
    background(255);
    fill("yellow");
    rect(0,100,50,25);
    pointer();
    lerpLogic();
  }
  if(graphMode == true)
  {
    if(drawingGraph == true)
    {
      for (let i = 0; i < graphX.length  ; i++) {
        for (let j = 0; j < graphY.length   ; j++) {
          noFill();
           rect(graphX[i], graphY[j], 425 / coordfile.length-1,25)
          
          if(graphY[j] == 400)
          {
            
            strokeWeight(1);
            fill(0);
            textSize(9);
            
            text('x = ' + textCount, graphX[i], graphY[j] + 50);
            textCount++; 
          }
         
        }
       
      }
       drawingGraph = false;
    }
     if(drawingGraph == false)
     {
       stroke('blue')
       for (let i = 0; i < graphX.length   ; i++) {
         print(coordfile);
         if(coordfile[i + 1] != null)
         {
            line(graphX[i], coordfile[i], graphX[i + 1], coordfile[i + 1])
         }
        
       }
     }
  }
  
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
 
   
 
  if(playclip == true){
    soundFile.play(); // play the result!
     //saveSound(soundFile, 'mySound.wav');
     // save file
    
  }
  if(graphMode == false)
  {
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
      coordfile[fileGlossary] = xString;
    
      print(coordfile[fileGlossary]);
    fileGlossary++;
  }
  
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
