#pragma strict

// the textfield to update the time to
private var textfield:GUIText;
 
// time variables
public var allowedTime:int = 90;
private var currentTime = allowedTime;
private var paused:boolean = false;
 
function Awake()
{
    // retrieve the GUIText Component and set the text
    textfield = GetComponent(GUIText);
 
    UpdateTimerText();
 
    // start the timer ticking
    TimerTick();
}

function UpdateTimerText()
{
    // update the textfield
    textfield.text = currentTime.ToString();
}

function TimerTick()
{
    // while there are seconds left
    while(currentTime > 0  && !paused)
    {
    
        // wait for 1 second
        yield WaitForSeconds(1);
 
        // reduce the time
        currentTime--;
 
        UpdateTimerText();
        }
    
    }
    
function pause(){
paused = true;
}
function unpause(){
paused = false;
}
 
    // game over
 
