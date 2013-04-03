#pragma strict
private var x : Transform;
function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) { x = other.transform.parent.transform;other.transform.parent = gameObject.transform; } 

function OnTriggerExit (other : Collider) { other.transform.parent = x; }