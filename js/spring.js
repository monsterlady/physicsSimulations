var w = 1800,h = 600;
var sketchProc = function(processingInstance) {
    with (processingInstance) {
        size(w, h);
        frameRate(144);

        // ProgramCodeGoesHere
    }};

// Get the canvas that Processing-js will use
var canvas = document.getElementById("showcase1");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);
//Adapted from Dan Shiffman, natureofcode.com