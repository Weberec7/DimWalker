#pragma strict
private var T :Touch;
var targetItem : GameObject;
var altTexture : Texture;
private var dwcontroller : DWController;
var spawn : GameObject;
private var trueTexture : Texture;
public var activeplatform : Transform;
private var platformcontroller : platformactive;
var activate : boolean =false;
//private var once : boolean = true;


function Awake () {
trueTexture = guiTexture.texture;
if(altTexture == null)altTexture = trueTexture;
dwcontroller = targetItem.GetComponent(DWController);
}

function Update () {

activeplatform = dwcontroller.movingPlatform.activePlatform;
platformcontroller = activeplatform.parent.gameObject.GetComponent(platformactive);

if(activeplatform != null && activeplatform.parent.tag == "platform"){
   if (Input.touchCount>0){
   		T = Input.GetTouch(0);
   		if(T.phase == TouchPhase.Began && guiTexture.HitTest(T.position))
         {
            if(platformcontroller.once){
            platformcontroller.once =false;
            createAll();
            
            }
      }
         if(T.phase == TouchPhase.Ended && guiTexture.HitTest(T.position))
         {
            guiTexture.texture = trueTexture;
      }
   }
}
if (activate&&platformcontroller.once){
platformcontroller.once = false;
createAll();
}

}
function createAll(){
var instance1 : GameObject = Instantiate(spawn, activeplatform.collider.bounds.max, Quaternion.Euler(90,0,0));
         instance1.transform.parent = GameObject.Find("ImageTarget").transform;
         instance1.transform.position += Vector3(-0.05745466,-0.05245466,0)*200;
         instance1.transform.localScale *= 200;
         instance1.transform.localScale.y += .02;
         instance1.GetComponent(platformactive).once = false;
var instance2 : GameObject = Instantiate(spawn, activeplatform.collider.bounds.max, Quaternion.Euler(-90,0,0));
         instance2.transform.parent = GameObject.Find("ImageTarget").transform;
         instance2.transform.position += Vector3(-0.05745466,-0.05245466,-0.104777)*200;
         instance2.transform.localScale *= 200;
         instance2.transform.localScale.y += .02;
         instance2.GetComponent(platformactive).once = false;
var instance3 : GameObject = Instantiate(spawn, activeplatform.collider.bounds.max, Quaternion.Euler(90,0,90));
         instance3.transform.parent = GameObject.Find("ImageTarget").transform;
         instance3.transform.position += Vector3(-0.104777,-0.05245466,-0.05745466)*200;
         instance3.transform.localScale *= 200;
         instance3.transform.localScale.y += .02;
         instance3.transform.localScale.x -= .0005;
         instance3.GetComponent(platformactive).once = false;
var instance4 : GameObject = Instantiate(spawn, activeplatform.collider.bounds.max, Quaternion.Euler(-90,0,-90));
         instance4.transform.parent = GameObject.Find("ImageTarget").transform;
         instance4.transform.position += Vector3(0,-0.05245466,-0.05745466)*200;
         instance4.transform.localScale *= 200;
         instance4.transform.localScale.y += .02;
         instance4.transform.localScale.x -= .0005;
         instance4.GetComponent(platformactive).once = false;

}

