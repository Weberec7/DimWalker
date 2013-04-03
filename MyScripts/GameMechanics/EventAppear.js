#pragma strict
var one : GameObject;
var two : GameObject;
var three : GameObject;
var alttexture : Texture;
function Start () {
}
function Awake() {
one.active = false;
one.renderer.enabled = false;
two.active = false;
two.renderer.enabled = false;
three.active = false;
three.renderer.enabled = false;
}
function Update () {

}

function OnTriggerEnter(){
renderer.material.mainTexture = alttexture;
one.active = true;
one.renderer.enabled = true;
two.active = true;
two.renderer.enabled = true;
three.active = true;
three.renderer.enabled = true;
}