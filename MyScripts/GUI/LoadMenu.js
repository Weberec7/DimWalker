#pragma strict


 private var T :Touch;
var altTexture : Texture;
private var trueTexture : Texture;

 function Awake (){
trueTexture = guiTexture.texture;
if(altTexture == null)altTexture = trueTexture;
}
 
function Update () {

if (Input.touchCount>0){
   		T = Input.GetTouch(0);
   		if(T.phase == TouchPhase.Began && guiTexture.HitTest(T.position))
         {
// change texture and load menu(0)
         guiTexture.texture = altTexture;
         wait();
         Application.LoadLevel(0);
         
      }
         if(T.phase == TouchPhase.Ended && guiTexture.HitTest(T.position))
         {
            guiTexture.texture = trueTexture;
      }
   }
 }
 
 function wait(){
 
 yield WaitForSeconds(2);
 }
