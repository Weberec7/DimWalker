
var h : int = 500;
var w : int= 300;
private var myChars:char[];
private var myString:String = "";
private var myname:String = "";
private var myscore:String = "";
private var mytime:String = "";
private var mylevel:String = "Level1";
private var LR:int = 1;

function Awake(){
fillHighScore("Level" + LR);
//if(delete)PlayerPrefs.DeleteAll();
//if(fillscores){
//PlayerPrefs.SetString("Level1","Kyle#342#65#");
////PlayerPrefs.SetString("Level2","Kyle#342#65#");
//PlayerPrefs.SetString("Level3","John#347#55#");
//PlayerPrefs.SetString("Level4","Sarah#32#95#");
//PlayerPrefs.SetString("Level5","Ec7#3#5#");
//}
}


function OnGUI () {
var x = Screen.width - 2*w-140;
var y = Screen.height/2 - h+20;
	// Make a background box
	GUI.Box (Rect ( x, y,2*w +120,2*h), "LEVEL LOADER");
	
	GUI.Box (Rect ( x, y-170,200,150), "HIGH SCORE");
	
	GUI.Box (Rect (x+60,y-130,80,20), mylevel);
	
	// High Score Header
	GUI.Box (Rect (x,y-100,180,20), "PLAYER  SCORE  TIME");
	
	// High Score field divided by //
	GUI.Box (Rect (x,y-70,180,20), myname + " // " + myscore + " // " + mytime+"s");
	
	// High Score Arrow Left Button
	if (GUI.Button (Rect (x,y-130,40,20), "<==")) {
	LR = getleft(LR);
		fillHighScore("Level"+ LR);
	}
	// High Score Arrow right button
	if (GUI.Button (Rect (x+160,y-130,40,20), "==>")) {
	LR = getright(LR);
		fillHighScore("Level"+ LR);
	}
	
	// Clear High Scores Button; Deletes all PlayerPrefs
	if (GUI.Button (Rect (x-140,y-130,120,20), "Clear HighScores")) {
	PlayerPrefs.DeleteAll();
	myname = "";
	myscore = "";
	mytime = "";
	PlayerPrefs.Save();
	}
	
	// Level 1 Button
	if (GUI.Button (Rect (x+10,y+40,200,50), "Level 1")) {
		wait();
		Application.LoadLevel (1);
	}

	// Level 2 Button
	if (GUI.Button (Rect (x+10,y+120,200,50),"Level 2")) {
		wait();
		Application.LoadLevel (2);
	}
	// Level 3 Button
	if (GUI.Button (Rect (x+10,y+200,200,50),"Level 3")) {
		wait();
		Application.LoadLevel (3);
	}
	// Level 4 Button
	if (GUI.Button (Rect (x+10,y+280,200,50),"Level 4")) {
		Application.LoadLevel (4);
	}
	// Level 5 Button
	if (GUI.Button (Rect (x+10,y+360,200,50),"Level 5")) {
		Application.LoadLevel (5);
	}
	// Quit button
	if (GUI.Button (Rect (x+10,y+440,200,50),"Quit")) {
		Application.Quit();
	}
}

function wait(){

yield WaitForSeconds(1);
}

// moves the level number left
function getleft(num:int) : int{
switch (num){
case 1: num = 5;break;
default: num = num-1;
}
return num;
}

//moves the level number right
function getright(num:int) : int{
switch (num){
case 5: num = 1;break;
default: num = num+1;
}
return num;
}

function fillHighScore(level:String){

var state:int =0;
mylevel = level;

//fills the HighScore based on level selected by the user
myChars = PlayerPrefs.GetString(level).ToCharArray();
	for ( var i = 0; i < myChars.Length; i++ ){
	
	if(myChars[i] != '#'){myString += myChars[i];continue;}
	else if(state == 0){myname = myString;myString ="";state =1;continue;}
	else if(state == 1){myscore = myString;myString ="";state =2;continue;}
	else if(state == 2){mytime = myString;myString ="";state =3;break;}
	else break;
}
}
