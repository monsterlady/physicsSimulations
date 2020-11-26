var w = 600,h = 600;
var sketchProc = function(processingInstance) {
    with (processingInstance) {
        size(w, h);
        frameRate(144);

        // ProgramCodeGoesHere

        //struct
        function Mover(x,y,mass) {
            this.position = new PVector(x,y);
            this.velocity = new PVector(random(-1,1),random(-1,1));
            this.mass = mass;
            this.radius = this.mass * 3;
        }

        Mover.prototype = Object.create(Mover.prototype);
        Mover.prototype.constructor = Mover;

        Mover.prototype.collision = function (mover) {
            if(this.position.dist(mover.position) <= mover.radius + this.radius){
                console.log("Collision Happened ! ");
                //TODO handle

            }
        }

        Mover.prototype.update = function() {
            if(Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y*this.velocity.y) < 0.01){
                this.velocity = new PVector(0,0);
            }
            // Simulates Motion 101 from the vectors tutorial
            this.position.add(this.velocity);
            //Now we make sure to clear acceleration each time
            if(this.position.x <= this.radius || this.position.x >= width - this.radius ){
                this.position.x = (this.position.x <= this.radius) ? this.radius : width - this.radius
                this.velocity.x = -this.velocity.x;
            }

            if(this.position.y <= this.radius || this.position.y >= height -this.radius){
                this.position.y = (this.position.y <= this.radius) ? this.radius : height - this.radius;
                this.velocity.y = -this.velocity.y;
            }
        };

        Mover.prototype.display = function() {
             stroke(0);
             strokeWeight(2);
            fill(255, 255, 255, 127);
            // Scale the size according to the mass, as a simple visualization of mass
            ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
        };

        draw = function() {
            background(50, 50, 50);

            for (var i=0; i<movers.length; i++){
                for (var j=i+1; j<movers.length; j++){
                    movers[i].collision(movers[j]);
                }
            }

            for(var i =0; i < movers.length;i++){
                movers[i].update();
            }

            for(var i =0; i < movers.length;i++){
                movers[i].display();
            }

        };

        // Moving bodies
        var movers = [];

        // Restart all the Mover objects randomly
        var resetMovers = function() {
            for (var i = 0; i < 3; i++) {
                movers[i] = new Mover(random(0.5, width),random(0.5, height),10);
            }
        };

        // Not working???
        var mousePressed = function() {
            resetMovers();
        };

        resetMovers();

    }};

// Get the canvas that Processing-js will use
var canvas = document.getElementById("showcase4");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);
//Adapted from Dan Shiffman, natureofcode.com
