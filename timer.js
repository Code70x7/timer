//creating a class in a separate file
class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
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
        }

        this.startButton.addEventListener('click', this.start.bind(this));
        this.pauseButton.addEventListener('click', this.pause.bind(this));
    }
    start = () => {
        if (this.onStart) {
            //this is the argument for the callback function (totalDuration)
            this.onStart(this.timeRemaining);
        }
        this.tick()
        // when changing the interval- change change in the tick function as well
        this.interval = setInterval(this.tick, 20);
    };

    pause = () => {
        clearInterval(this.interval);
    }

    tick = () => {
        if (this.timeRemaining <= 0) {
            //uses pause function for final stop
            this.pause();
            // changing the color
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - .02;
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
    }
    get timeRemaining() {
        //parses the input
        return parseFloat(this.durationInput.value);
    }
    set timeRemaining(time) {
        //takes the updated time
        this.durationInput.value = time.toFixed(2);
    }

};