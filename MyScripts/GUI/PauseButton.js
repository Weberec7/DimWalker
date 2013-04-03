#pragma strict

var paused : boolean = false;
 private var T :Touch;
var altTexture : Texture;
private var trueTexture : Texture;
var appcontrol : GameObject;

 function Awake (){
 // gets current texture and checks for alt texture
trueTexture = guiTexture.texture;
if(altTexture == null)altTexture = trueTexture;
}
 
function Update () {
//on button touch
 if (Input.touchCount>0){
   		T = Input.GetTouch(0);
   		if(T.phase == TouchPhase.Began && guiTexture.HitTest(T.position))
         {
// if not paused then pause the game and sounds; start pause music
  if(!paused){
   Time.timeScale = 0;
   paused=true;
   guiTexture.texture = altTexture;
   appcontrol.audio.Stop();
   audio.Play();
// if paused then unpause the game and resume background music
  }else{
   Time.timeScale = 1;
   audio.Stop();
   appcontrol.audio.Play();
   paused=false;
   guiTexture.texture = trueTexture;
  }
  }
 }
}