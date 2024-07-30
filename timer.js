//creating a class in a separate file / timer implementation
//this is the class definition- we put this in a different file to clean up
class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        // Taking arguments and assigning to instance variables
        //so we can use them in methods in the class (all about this.)
        //this.durationInput is a DOM element 
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        //optional - if there is an object in callbacks it will trigger
        if (callbacks) {
            //callbacks.onStart is the reference to what was passed in
            // here we are assigning them to an instance variable
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
            //callbacks.onComplete example of going to instantiation of new class
            //and hitting the object, dot notation - getting the method
        }

        this.startButton.addEventListener('click', this.start.bind(this));
        this.pauseButton.addEventListener('click', this.pause.bind(this));
    }
    start = () => {
        if (this.onStart) {
            //this callback (totalDuration) how long time will go in total
            this.onStart(this.timeRemaining);
        }
        // so that there isn't a 1 second delay (the 2nd this.interval takes care of that)
        this.tick()
        // when changing the interval- change in the tick function as well
        //this.interval name makes it so we can use it in pause =()=>function
        this.interval = setInterval(this.tick, 20);
        // the 20 is 20 milliseconds that's why we do the -.02 down below
        //1,000 milliseconds = 1 second
    };

    pause = () => {
        clearInterval(this.interval);
    }
    // reach into the DOM and -1 from the input 
    tick = () => {
        if (this.timeRemaining <= 0) {
            //uses pause function for final stop
            this.pause();
            // changing the color
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            //this.timeRemaining() doesn't need () cuz of the "get"
            this.timeRemaining = this.timeRemaining - .02;
            //this.timeRemaining - .02 is the argument for "set timeRemaining(time)""
            if (this.onTick) {
                //calling onTick- pass in time remaining
                //points to onTick(timeRemaining)-will receive it
                // will determine what the offset /at each tick
                this.onTick(this.timeRemaining);
            }
        }
    }
    // store information on how much time is remaining - in our DOM 
    //get and set makes it so we can use the parsing and countdown in different 
    //places, besides just in the tick() method. 
    get timeRemaining() {
        //parses the input - float will give us a decimal (INT will not)
        return parseFloat(this.durationInput.value);
    }
    set timeRemaining(time) {
        //takes the updated time
        this.durationInput.value = time.toFixed(2);
    }

//setter updates value    getter = retrieves the value
//this.timeRemaining = this.timeRemaining -1 