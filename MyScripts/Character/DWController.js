
// Require a character controller to be attached to the same game object
@script RequireComponent(CharacterController)

public var idleAnimation : AnimationClip;
public var walkAnimation : AnimationClip;
public var portalAnimation : AnimationClip;
	@System.NonSerialized
 var movingplatformer : boolean = false;

//public var walkMaxAnimationSpeed : float = 4.0;
private var _animation : Animation;

enum CharacterState {
	Idle = 0,
	Walking = 1,
	movewithplatform = 2,
}

private var _characterState : CharacterState;

// The speed when walking
var walkSpeed = 20.0;

var inAirControlAcceleration = 3.0;

// The gravity for the character
var gravity = 20.0;
// The gravity in controlled descent mode
var speedSmoothing = 10.0;
var rotateSpeed = 100.0;
private var groundedTimeout = 0.25;
// The current move direction in x-z
private var moveDirection = Vector3.zero;
// The current vertical speed
private var verticalSpeed = 0.0;
// The current x-z move speed
private var moveSpeed = 0.0;
private var rotationX = Vector3.zero;

private var v = 0.0;
private var h = 0.0;

var groundNormal : Vector3 = Vector3.zero;

private var lastGroundNormal : Vector3 = Vector3.zero;

private var tr : Transform;



// The last collision flags returned from controller.Move
private var collisionFlags : CollisionFlags; 

private var isMoving = false;

private var inAirVelocity = Vector3.zero;

private var lastGroundedTime = 0.0;

private var isControllable = true;

function Awake ()
{
	moveDirection = transform.TransformDirection(Vector3.forward);
	_animation = GetComponent(Animation);
	if(!_animation)
		Debug.Log("No Animations");
	
	if(!idleAnimation) {
		_animation = null;
		Debug.Log("No idle animation");
	}
	if(!walkAnimation) {
		_animation = null;
		Debug.Log("No walk animation");
	}
			
}


function UpdateSmoothedMovementDirection ()
{
	//Am I grounded?
	var grounded = IsGrounded();
	
	//forward vector relative to DW
	var forward = transform.TransformDirection(Vector3.left);
	//Set vertical to 0
	forward.y = 0;
	forward = forward.normalized;

	//Rigt vector relative to DW
	var right = Vector3.up;

	//	am I moving?
	isMoving = Mathf.Abs (v) > 0.1;
	isMoving = Mathf.Abs (h) > 0.1;
		
	// v is for forward and backward direction;
	//h is for left and right directions; 
	//could be 1 or -1 one.  set by up,down,left,right functions

	var targetDirection =  v * forward;
	var targetRotation = h * right;
	
	// Grounded controls
	if (grounded)
	{
		moveDirection = targetDirection.normalized;
		// Smooth the speed based on the current target direction
		var curSmooth = speedSmoothing * Time.deltaTime;
		
		// Choose target speed
		var targetSpeed = targetDirection.magnitude;
	
		_characterState = CharacterState.Idle;
		
			targetSpeed *= walkSpeed;
			_characterState = CharacterState.Walking;
		
		moveSpeed = targetSpeed;
		rotationX = targetRotation*rotateSpeed;
		}
	// In air controls
	else
	{
		if (isMoving)
			inAirVelocity += targetDirection.normalized * Time.deltaTime * inAirControlAcceleration;
	}
}


function ApplyGravity ()
{
	if (isControllable)	// don't move player at all if not controllable.
	{
	
		if (IsGrounded ())
			verticalSpeed = 0.0;
		else
			verticalSpeed -= gravity * Time.deltaTime;
	}
}
class CharacterMotorMovement {

	// The gravity for the character
	var gravity : float = 10.0;
	
	// For the next variables, @System.NonSerialized tells Unity to not serialize the variable 
	// or show it in the inspector view.


	// The last collision flags returned from controller.Move
	@System.NonSerialized
	var collisionFlags : CollisionFlags; 

	// We will keep track of the character's current velocity,
	@System.NonSerialized
	var velocity : Vector3;
	
	// This keeps track of our current velocity while we're not grounded
	@System.NonSerialized
	var frameVelocity : Vector3 = Vector3.zero;
	
	@System.NonSerialized
	var hitPoint : Vector3 = Vector3.zero;
	
	@System.NonSerialized
	var lastHitPoint : Vector3 = Vector3(Mathf.Infinity, 0, 0);
}

var movement : CharacterMotorMovement = CharacterMotorMovement();

class CharacterMotorMovingPlatform {
	var enabled : boolean = true;
	
	@System.NonSerialized
	var hitPlatform : Transform;
	
	@System.NonSerialized
	var activePlatform : Transform;
	
	@System.NonSerialized
	var activeLocalPoint : Vector3;
	
	@System.NonSerialized
	var activeGlobalPoint : Vector3;
	
	@System.NonSerialized
	var activeLocalRotation : Quaternion;
	
	@System.NonSerialized
	var activeGlobalRotation : Quaternion;
	
	@System.NonSerialized
	var lastMatrix : Matrix4x4;
	
	@System.NonSerialized
	var platformVelocity : Vector3;
	
	@System.NonSerialized
	var newPlatform : boolean;
}

var movingPlatform : CharacterMotorMovingPlatform = CharacterMotorMovingPlatform();

function Update() {
var rayer : RaycastHit;

if(Physics.Raycast(transform.position, -Vector3.up, rayer, 2)){
Debug.DrawRay(transform.position,-Vector3.up*2,Color.green,1.0);
if(rayer.transform.parent.tag == "platform"){
movingPlatform.activePlatform = rayer.transform;
movingPlatform.activeLocalPoint = rayer.collider.bounds.max;
movingplatformer = true;
}
}
	
		if (movingPlatform.activePlatform != null && movingplatformer) {
		
		
		var newLocalPoint : Vector3 = movingPlatform.activePlatform.collider.bounds.max;
		//Debug.Log(newLocalPoint.y);
		//var newGlobalPoint : Vector3 = movingPlatform.activePlatform.TransformPoint(movingPlatform.activeLocalPoint);
		//Debug.Log("Active Local Point: " + movingPlatform.activeLocalPoint + " Active Global Point: " + movingPlatform.activeGlobalPoint + " New Global Point: " + newGlobalPoint);
		var moveDistance = (newLocalPoint - movingPlatform.activeLocalPoint);
		movingPlatform.activeLocalPoint = newLocalPoint;
		//Debug.Log("moveDistance: " + moveDistance);
		//if (moveDistance != Vector3.zero){
		_characterState = CharacterState.movewithplatform;
		//Debug.Log("MovingWithPlatform!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+moveDistance);
			//controller.Move(moveDistance);
			//transform.position = Vector3.Lerp(movingPlatform.activeLocalPoint, newLocalPoint, 0.75);
			//verticalSpeed = 0.0;
			transform.position += moveDistance;
			var rayhit : RaycastHit;
			if(!Physics.Raycast(transform.position, -Vector3.up, rayhit, 1)){
			movingplatformer = false;_characterState = CharacterState.Idle;
			//movingPlatform.activePlatform = null;
			}
			//MoveObject(tr, movingPlatform.activeLocalPoint, newLocalPoint, 3.0);
			//controller.transform.position +=moveDistance;
			
			//movement+=moveDistance/20;
			//}
			
		
		// Support moving platform rotation as well:
        var newGlobalRotation : Quaternion = movingPlatform.activePlatform.rotation * movingPlatform.activeLocalRotation;
        var rotationDiff : Quaternion = newGlobalRotation * Quaternion.Inverse(movingPlatform.activeGlobalRotation);
        
        var yRotation = rotationDiff.eulerAngles.y;
        if (yRotation != 0) {
	        // Prevent rotation of the local up vector
	        tr.Rotate(0, yRotation, 0);
        }
}

	UpdateSmoothedMovementDirection();
	
	// Apply gravity
	if(_characterState != CharacterState.movewithplatform)ApplyGravity ();

	// Calculate actual motion
	var movement = moveDirection * moveSpeed + Vector3 (0, verticalSpeed, 0);
	movement *= Time.deltaTime;
	
	// Move the controller
	 var controller : CharacterController = GetComponent(CharacterController);
	
	
	collisionFlags = controller.Move(movement);
	controller.transform.Rotate(rotationX * Time.deltaTime);
	
	// ANIMATION sector
	if(_animation) {
	
		if(_characterState == CharacterState.movewithplatform){
			_animation.Stop();
			}
			else if(controller.velocity.sqrMagnitude < 0.1) {
				_animation.CrossFade(idleAnimation.name);
				audio.loop =true;
					audio.Play();
			}
			
			 else if(_characterState == CharacterState.Walking) {
					_animation[walkAnimation.name].speed = Mathf.Clamp(controller.velocity.magnitude, 0.0, walkSpeed/5.0);
					_animation.CrossFade(walkAnimation.name);
					
				
			}
			
			else{_animation.Stop();audio.loop = false;audio.Stop();}

	}
	// ANIMATION sector
}
//hit.point.y > -0.0001 && hit.point.y != groundNormal.y &&
function OnControllerColliderHit (hit : ControllerColliderHit) {
Debug.Log("made it this far......*************************");
	if ( hit.moveDirection.y < 0 ) {
//		if ((hit.point - movement.lastHitPoint).sqrMagnitude > 0.001 || lastGroundNormal == Vector3.zero)
//groundNormal = hit.point;
			//Debug.Log("changing ground Normal: " + groundNormal + "  moveDirection: "+ hit.moveDirection);
//			}
//		else{
//			groundNormal = lastGroundNormal;
			//Debug.Log("Ground Normal Stayed the Same");
//		}
		if(hit.transform.parent.gameObject.tag=="platform")movingplatformer = true;
		movingPlatform.hitPlatform = hit.collider.transform;
		movingPlatform.activePlatform = hit.collider.transform;
		movingPlatform.activeLocalPoint = hit.collider.bounds.max;
		movingPlatform.activeGlobalPoint = hit.collider.bounds.max;
		
		movement.hitPoint = hit.point;
		movement.frameVelocity = Vector3.zero;
		//Debug.Log("Platform Name: " +movingPlatform.hitPlatform.name+"  movement.hitpoint:  "+ movement.hitPoint+" activeLocalPoint: " + movingPlatform.activeLocalPoint);
	}
	

	//Debug.Log("We had a collision... but did nothing"+Time.time + "hit.point:"+ hit.point + "groundNormal: " + groundNormal +"moveDirection: "+ hit.moveDirection);
}

function OnCollisionEnter(hit : Collision) {
if(Physics.Raycast(transform.position, -Vector3.up, 1)){movingPlatform.activePlatform = hit.gameObject.transform;
Debug.Log("Itsa Me!!!!!!!!!  On CollisionStay");
movingplatformer = true;
}
 } 

//private function MoveWithPlatform () : boolean {
//	return (
//		movingPlatform.enabled
//		&& IsGrounded()&&movingPlatform.activePlatform !=null);
//}

function IsGrounded () {
   var up = transform.TransformDirection(Vector3.up);
   var controller : CharacterController = GetComponent(CharacterController);
   var hit : RaycastHit;    
//   Debug.DrawRay(transform.position, -up * 1, Color.green);
//   Debug.Log(((collisionFlags & CollisionFlags.CollidedBelow) != 0) || Physics.Raycast(transform.position, -up, hit, 1)||controller.isGrounded);
	return (((collisionFlags & CollisionFlags.CollidedBelow) != 0)||Physics.Raycast(transform.position, -up, hit, 1)||controller.isGrounded);
//	var controller : CharacterController = GetComponent(CharacterController);
//	Debug.Log("*********IsGrounded?????  "+(Mathf.Floor((controller.bounds.min.y-11.58)*100) == Mathf.Floor(groundNormal.y*100)) +"  " + Mathf.Floor((controller.bounds.min.y-11.58)*100) + " " + Mathf.Floor(groundNormal.y*100));
//	return controller.isGrounded;
}

function TurnRight (){
h = 1;
}

function TurnLeft (){
h = -1;
}

function Forward (){
v = 1;
}

function Backward (){
v = -1;
}

function Stop (){
v = 0;
h = 0;
}

function MoveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) {
    var i = 0.0;
    var rate = 1.0/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        thisTransform.position = Vector3.Lerp(startPos, endPos, i);
        yield; 
    }
}
//function getActivePlatform():Transform{
//
//return movingPlatform.activePlatform;
//}