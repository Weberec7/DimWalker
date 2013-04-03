#pragma strict

private var T :Touch;
var targetItem : GameObject;
var altTexture : Texture;
private var trueTexture : Texture;

function Awake (){
trueTexture = guiTexture.texture;
if(altTexture == null)altTexture = trueTexture;
}


function Update(){
	
   if (Input.touchCount>0){
   		T = Input.GetTouch(0);
   		if(T.phase == TouchPhase.Began && guiTexture.HitTest(T.position))
         {
          guiTexture.texture = altTexture;
            targetItem.gameObject.SendMessage("Backward");
         
      }
         if(T.phase == TouchPhase.Ended && guiTexture.HitTest(T.position))
         {
           
            guiTexture.texture = trueTexture;
            targetItem.gameObject.SendMessage("Stop");
         
      }
   }
 }
//if (Input.GetButton('a')){
//rigidbody.AddRelativeTorque(Vector3.down* ShipRotationPosSpeed);
   // }