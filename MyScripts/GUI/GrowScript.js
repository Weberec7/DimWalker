#pragma strict
private var T :Touch;
var targetItem : GameObject;
var altTexture : Texture;
var growSound : AudioClip;
public var activate : boolean = false;
private var trueTexture : Texture;
private var sound: boolean = true;
private var dwcontroller : DWController;
public var activeplatform : Transform;
function Start () {

}

function Awake (){
trueTexture = guiTexture.texture;
if(altTexture == null)altTexture = trueTexture;
dwcontroller = targetItem.GetComponent("DWController");
}


function Update(){

activeplatform = dwcontroller.movingPlatform.activePlatform.parent;
if(activeplatform != null && activeplatform.tag == "platform"){
if(activate)activeplatform.localScale += Vector3(0,.005,0);
activeplatform.localScale.y = Mathf.Clamp(activeplatform.localScale.y, 0.0, 0.2);
if(activeplatform.localScale.y==0.2)sound =false;
   if (Input.touchCount>0){
   		T = Input.GetTouch(0);
   		if(T.phase == TouchPhase.Began && guiTexture.HitTest(T.position))
         {
         activate = true;
            guiTexture.texture = altTexture;
            if(sound)audio.Play();
         
      }
         if(T.phase == TouchPhase.Ended && guiTexture.HitTest(T.position))
         {
         activate = false;
            guiTexture.texture = trueTexture;
            audio.Stop();
      }
   }
}
}