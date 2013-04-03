#pragma strict
public var DW : GameObject;
private var dwcontroller:DWController;
var once : boolean = true;
function Start () {

}

function Awake(){

dwcontroller = DW.GetComponent("DWController");
}

function Update () {

}


function OnCollisionEnter(hit : Collision) {

Debug.Log("hi");
if(hit.gameObject == DW){

if(Physics.Raycast(transform.position, Vector3.up, 1)){dwcontroller.movingPlatform.activePlatform = transform.parent.transform;
Debug.Log("Itsa Me!!!!!!!!!  On CollisionStay");
dwcontroller.movingplatformer = true;
}
 } 
 }