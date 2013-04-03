#pragma strict
var nextlevel:int;
var thislevel:int;
var SCORE:GUIText;
var TIMER:GUIText;
var Complete:GUITexture;
var TryAgain:GUITexture;
var portalsound:AudioClip;

private var myChars:char[];
private var myString:String = "";
private var myname:String = "Ethan";
private var myscore:String = "";
private var mytime:int = 0;
private var prevtime:int = 0;
private var DW:GameObject;

 private var activate:boolean;
function Awake () {
Complete.enabled=false;
TryAgain.enabled=false;
activate = false;
//portalsound = this.GetComponent(AudioSource);
}

function Update () {
if(activate){
transform.Rotate(Vector3.left*50);
//DW.transform. += Vector3.left;
DW.transform.localScale -=Vector3(.00001,.0001,.0001);
}
}

function OnTriggerEnter (other : Collider) {
var once =0;
//makes sure the DW character is the reason for the collision
if(other.gameObject.name == "DW" && once ==0){
// stops the time tick; saves the current score if it is faster; displays
// Complete! or TryAgain plus their corresponding sound
// Plays the portal sound
// activates Update rotations on portal and character
// waits 3 seconds then loads the next level
once =1;
activate = true;
DW = other.gameObject;
TIMER.SendMessage("pause");
SaveScore();
if(mytime>0){Complete.enabled=true;Complete.audio.Play();}
else {TryAgain.enabled=true;TryAgain.audio.Play();}
audio.PlayOneShot(portalsound);
//DW.SendMessage("portal");
yield WaitForSeconds(3);
Application.LoadLevel (nextlevel);

}
}

function SaveScore(){
// gets the previous time and compares it to the last score
// if faster time then saves in the format name#score#time#

getprevtime();
myscore = SCORE.text;
mytime= parseInt(TIMER.text);
if(mytime>prevtime){
myString = myname+"#"+myscore+"#"+mytime+"#";
PlayerPrefs.DeleteKey("Level"+thislevel);
PlayerPrefs.SetString("Level"+thislevel,myString);
}
PlayerPrefs.Save();
}

function getprevtime(){
// pulls the the time out of the desired string
var stringer = "";
var state = 0;
var myChars = PlayerPrefs.GetString("Level"+thislevel).ToCharArray();
for (var i = 0; i < myChars.Length; i++){
	
	if(myChars[i] != '#'){stringer += myChars[i];continue;}
	else if(state == 0){state =1;stringer = "";continue;}
	else if(state == 1){state =2;stringer = "";continue;}
	else if(state == 2){prevtime = parseInt(stringer);stringer = "";state =3;break;}
	else break;
}

}

