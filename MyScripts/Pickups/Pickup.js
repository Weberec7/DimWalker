
// the particles animator component
private var ObjectMaterial:MeshRenderer;

// colours for each type of pickup
public var points:Texture;
public var fast:Texture;
public var slow:Texture;

public var cpoints: int=3;
public var cfast: int=3;
public var cslow: int=4;

// variable to hold the type
@System.NonSerialized
public var type:int;

// min and max rotation speeds
public var minRotationSpeed:float = 50;
public var maxRotationSpeed:float = 100.0;

// calculated rotation speed
private var rotationSpeed:float;


function Awake()
{
	// calculate a random rotation speed 
	rotationSpeed = Random.Range(minRotationSpeed, maxRotationSpeed);
	
	// retrieve the Mesh Renderer Component from the Object
	ObjectMaterial = GetComponent(MeshRenderer);
	
	// set a random type to begin
	SetType();
	
}


function Update () 
{
	//Rotate by random rotation speed
	transform.Rotate(Vector3.forward* Time.deltaTime*rotationSpeed);
	
}

function SetType()
{
	// generate a random number between 1 and 10
	var max = cpoints+cfast+cslow;
	var n:float = Random.Range(1,max);
	
	// set the type
	if (n <= cpoints) 
	{
		type = 1;
		ObjectMaterial.material.mainTexture = points;
	}
	else if (n <= cpoints+cfast) 
	{
		type = 2;
		ObjectMaterial.material.mainTexture = fast;
	}
	else 
	{
		type = 3;
		ObjectMaterial.material.mainTexture = slow;
	}
}
function OnTriggerEnter (other : Collider) {
var me = this.gameObject;

    SendMessageUpwards("Collected", me);
    Debug.Log("Well a collision has occured :/");
}