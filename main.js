song = "";

function preload()
{
	song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	// this line loads the poseNet model
	poseNet.on('pose', gotPoses);
	// taking the results from posenet model and giving it to gotposes function
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	scoreRightWrist = results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x; // in this line we are right wristx postion
	rightWristY = results[0].pose.rightWrist.y; // in this line we are right wristy postion
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x; // in this line we are left wristx postion
	leftWristY = results[0].pose.leftWrist.y; // in this line we are left wristy postion
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0,0, 600, 500);
// function image is setting the video on the canvas at 0,0,600,500 are width and height of the webcamra video
// fill makes it so you can make an entire area a certain color
fill("#FF0000");
stroke("#FF0000");
// stroke makes the border color a color youy pick

if(scoreRightWrist > 0.2){
	circle (rightWristX,rightWristY,20);
	
	if(rightWristY >0 && rightWristY <= 100)
{
	document.getElementById("speed").innerHTML = "speed = 0.5x";
	song.rate(0.5);
}
else if(rightWristY >100 && rightWristY <= 200)
{
	document.getElementById("speed").innerHTML = "speed = 1x";
	song.rate(1);
}
else if(rightWristY >200 && rightWristY <= 300)
{
	document.getElementById("speed").innerHTML = "speed = 1.5x";
	song.rate(1.5);
}
else if(rightWristY >300 && rightWristY <= 400)
{
	document.getElementById("speed").innerHTML = "speed = 2x";
	song.rate(2);
}
else if(rightWristY >400 && rightWristY <= 500)
{
	document.getElementById("speed").innerHTML = "speed = T0 F@$t";
	song.rate(45.987216498712948761289754987129347892178698712639);
}
}


	if (scoreLeftWrist > 0.2)
	// dublebllbble slash dubleleeee slash scotrer terllws uys iodf tgheb bodfy pawr4k is preedsant im fronbt4 ofcvn wedbhcamj ifsea nitas cvasvlue is moert than 0 poimnnnt 2
    // score tells us if the body part is present in front of the webcam if the value is more than 0 point 2*
	{
		circle(leftWristX, leftWristY,20);
	InNumberleftWrist = Number(leftWristY);
	remove_decimals = floor(InNumberleftWrist);
	volume = remove_decimals/500;
	document.getElementById("volume").innerHTML = "Volume = " + volume;
	song.setVolume(volume);
	}

	 
}

function play()
{
	song.play(); // song is  var holing the song that will be edited,play is a pre difined funtion that plays the song
	song.setVolume(1); // setvolume sets the volume
	song.rate(1); //rate makes it so you can controll how fast the song plays
}
