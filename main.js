song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
    song =loadSound("Undertale - Megalovania (320 kbps).mp3 (read-only)")
}




function setup(){
    canvas = createCanvas(500,600); 
    canvas.center();

    video.createCapture(VIDEO);
    video.hide();
  
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
 
}
function draw(){
image(video,0,0,600,500);

fill("#FFFF00");
stroke("#FFFF00");

if(scoreleftWrist > 0.2){
circle(leftWristX,leftWristY,20);
InNumberleftwristY = Number(leftWristY);
removedecimals = floor(InNumberleftwristY);
leftWrist_divide_thousand = removedecimals/1000;
volume = leftWrist_divide_thousand*2;
document.getElementById("volume").innerHTMl ="Volume = " + volume;
song.setVolume(volume)
}
}


function play(){
song.play();
song.setVolume(1);
song.rate(1);
}

function modelLoaded(){
    console.log("POSENET INITIALIZED");
}
function gotPoses(results){
    if(results > 0){
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist =" + scoreleftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;    
        console.log("The X for left wrist is "+leftWristX+"   "+"The Y for left wrist is "+leftWristY);
        rightWristX=results[0].pose.rifhtWrist.x;
        rightWristY=results[0].pose.rightWrist.y;    
        console.log("The X for right wrist is "+rightWristX+"   "+"The Y for right wrist is "+rightWristY);
    }
}
function stop(){
    song.stop();
    song.setVolume(0);
    song.rate(0);
}