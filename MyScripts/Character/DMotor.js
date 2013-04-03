#pragma strict
private var grounded : boolean= false;
var RotationSpeed : float =100.0;
var MoveSpeed : float = 50.0;
var test : boolean = false;
private var direction : Vector3 = Vector3.zero;
private var rotation : Vector3 = Vector3.zero;
private var turn : boolean = false;
private var move : boolean = false;
private var idle : boolean = true;
var AniWalkSpeed : float = 4;
function Awake (){
animation["Walk-DMAN"].speed = AniWalkSpeed;
}
function Update () {
   //testGround();
   if(turn&&grounded){animation.Stop();transform.Rotate(rotation * Time.deltaTime*RotationSpeed);}
   else if(move&&grounded){animation.Play("Walk-DMAN");transform.Translate(direction * Time.deltaTime*MoveSpeed);}
   //else InitKinematic();
   //if(grounded){transform.Rotate(Vector3.up * Time.deltaTime*RotationSpeed);}
   //else if (idle&&grounded)Idle();animation.Stop();transform.Translate(direction * Time.deltaTime*MoveSpeed);
//for (var state : AnimationState in animation) {
//        state.speed = animationSpeed;
//    }
}
//animation.Play("Walk-DMAN");
function IsGrounded () {
	return grounded;
}

//******************************Physics Functions*****************************
function testGround (){
var down = transform.TransformDirection(Vector3.down);
var hit : RaycastHit;    
Debug.DrawRay(transform.position, down * 1, Color.green);

if(Physics.Raycast(transform.position, down, hit, 1)){   
           rigidbody.isKinematic =true;
           grounded = true;
   }
   else{grounded = false;}
}

function OnTriggerEnter (myTrigger : Collider) {
rigidbody.isKinematic = true;
grounded=true;
//Collider.isCollider = false;
}

//function onCollisionEnter(){isKinematic = False; onExit isColliderFalse;}


//**************************Movement Functions****************************
function TurnRight (){
turn = true;
rotation = Vector3.up;
//set animation; default should be idle;
}

function TurnLeft (){
turn = true;
rotation = Vector3.down;
}

function Forward (){
move = true;
direction = Vector3.left;
//yield WaitForSeconds(2);
//Stop();
}

function Backward (){
move = true;
direction = Vector3.right;
//yield WaitForSeconds(2);
//move=false;
}

function Stop (){
move = false;
turn = false;
idle = true;
animation.Stop();
direction = Vector3.zero;
}

function Idle (){
yield WaitForSeconds(16);
animation.Play("Idle-DMAN");
}

