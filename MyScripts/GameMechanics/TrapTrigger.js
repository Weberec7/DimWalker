#pragma strict
var texture : GUITexture;
function Start () {

}

function Update () {

}

function OnTriggerEnter(){
texture.enabled = true;
audio.Play();
yield WaitForSeconds(4);
Application.LoadLevel(Application.loadedLevel);
}