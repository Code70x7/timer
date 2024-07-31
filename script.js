//create DOM selectors for class use in constructor function
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');
// const bodyColor = document.querySelector('body');

// getting perimeter through math
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;
//optional functions - instantiating new class "stand in CLASSSSSSS"
//where we actually create the timer
const timer = new Timer(durationInput, startButton, pauseButton, {
    //callback functions
    onStart(totalDuration) {
        //tracks how much total time was inputed
        // then later in onTick can use it
        duration = totalDuration;
    },
    //creating math for dashoffset - animation of circle
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset',
            perimeter * timeRemaining / duration - perimeter
        );
    },
    onComplete() {
        //setting the background color
        document.body.style.backgroundColor = "aqua";

    }
});