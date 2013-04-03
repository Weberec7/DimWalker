#pragma strict
var level: int = 1;
private var me:boolean = false;
function Awake () {
}

function Update () {
trueme();
if (me)Application.LoadLevel (level);
}

function trueme (){
yield WaitForSeconds(2);
me = true;
}