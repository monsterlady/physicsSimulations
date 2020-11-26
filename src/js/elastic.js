var w = 600,h = 600;
var sketchProc = function(processingInstance) {
    with (processingInstance) {
        size(w, h);
        frameRate(144);

        // ProgramCodeGoesHere
        // Adapted from Dan Shiffman, natureofcode.com
        function  getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }


        var Mover = function(postion) {
            // Set mass equal to 10 for simplicity
            this.mass = 15;
            this.position = postion;
            this.velocity = new PVector(0, 0);
            this.acceleration = new PVector(0, 0);
        };

// Simulates Newton's second law
// Receive a force, divide by mass, add to acceleration
        Mover.prototype.applyForce = function(force) {
            var f = PVector.div(force, this.mass);
            this.acceleration.add(f);
        };

        Mover.prototype.update = function() {
            // Simulates Motion 101 from the vectors tutorial
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            // Now we make sure to clear acceleration each time
            this.acceleration.mult(0);
        };

        Mover.prototype.display = function() {
            stroke(0);
            strokeWeight(2);
            fill(255, 255, 255, 127);
            // Scale the size according to the mass, as a simple visualization of mass
            ellipse(this.position.x, this.position.y, this.mass*3, this.mass*3);
        };

// Even though we've said we shouldn't check velocity directly,
// there are some exceptions. Here we change it as a quick and easy
// way to bounce our mover off the edges.
        Mover.prototype.checkEdges = function() {
            if (this.position.x > width) {
                this.position.x = width;
                this.velocity.x *= -1;
            } else if (this.position.x < 0) {
                this.velocity.x *= -1;
                this.position.x = 0;
            }
            if (this.position.y > height) {
                this.velocity.y *= -1;
                this.position.y = height;
            }
        };

        var m = new Mover(new PVector(getRandomInt(400),getRandomInt(400)));
        var m1 = new Mover(new PVector(getRandomInt(400),getRandomInt(400)))
        var wind = new PVector(0.01, 0);
        var gravity = new PVector(0, 0.1);

        draw = function() {
            background(50, 50, 50);

            //m.applyForce(wind);

            for(var i =0; i < movers.length;i++){
                movers[i].applyForce(gravity);
                movers[i].update();
                movers[i].display();
                movers[i].checkEdges();
            }
        };

        // Moving bodies
        var movers = [];

        // Restart all the Mover objects randomly
        var resetMovers = function() {
            for (var i = 0; i < 2; i++) {
                movers[i] = new Mover(new PVector(width / 2,i == 0 ?50 : i*300));
            }
        };

// Not working???
        var mousePressed = function() {
            resetMovers();
        };

        resetMovers();
    }};

// Get the canvas that Processing-js will use
var canvas = document.getElementById("showcase2");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);
//Adapted from Dan Shiffman, natureofcode.com