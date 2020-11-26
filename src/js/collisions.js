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

        function moveBallsOutofCollision(m1,m2) {
            var v = m1.velocity.sub(m2.velocity);
            var p = m1.position.sub(m2.position);
            var r = m1.radius + m2.radius;

            //b^2 -4ac
            var a = v.x * v.x + v.y * v.y;
            var b = (-2) * (p.x*v.x + p.y * v.y);
            var c = p.x * p.x + p.y * p.y - r * r;

            //
            var d = b*b - 4*a*c;
            // t1 and t2 from the quadratic formula (need only the positive solution)
            var t = (-b - Math.sqrt(d)) / (2*a);
            if (t < 0)
                t = (-b + Math.sqrt(d)) / (2*a);
            //cal
            var oldPos1 = m1.position.sub(m1.velocity.mult(t));
            var oldPos2 = m2.position.sub(m1.velocity.mult(t));

            var maxChange = m1.radius * 3;

            if((a == 0) ||
                (d < 0) ||
                (oldPos1.dist(m1.position) > maxChange) ||
                (oldPos2.dist(m2.position)) > maxChange){
                if(m1.position.dist(m2.position) == 0){
                    //move only one ball up
                    m1.position = m1.position.add(new PVector(0,-r));
                } else {
                    //move both ball
                    var diff = (r - m1.position.dist(m2.position)) / 2;
                    m1.position = m1.position.add(m1.position.sub(m2.position).normalize().mult(diff));
                    m2.position = m2.position.add(m2.position.sub(m1.position).normalize().mult(diff));
                }
            } else {
                m1.position = oldPos1;
                m2.position = oldPos2;
            }
        }

        Mover.prototype.collision = function (mover) {
            if(this.position.dist(mover.position) <= mover.radius + this.radius){
                moveBallsOutofCollision(this,mover);

                var positionSub = this.position.sub(mover.position);
                var distance = positionSub.length();
                /**/
                var coeff = this.velocity.sub(mover.velocity).dot(positionSub) / (distance * distance);
                this.velocity = this.velocity.sub(positionSub.mult(coeff));
                mover.velocity = mover.velocity.sub(positionSub.mult(-1).mult(coeff));
            }
        }


        Mover.prototype.update = function() {
            if(Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y*this.velocity.y) < 0.01){
                this.velocity = new PVector(0,0);
            }
            // Simulates Motion 101 from the vectors tutorial
            this.position.add(this.velocity);
            //Now we make sure to clear acceleration each time
            if(this.position.x <= this.radius || this.position.x >= width - this.radius){
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
            ellipse(this.position.x, this.position.y, this.radius, this.radius);
        };

        draw = function() {
            background(50, 50, 50);
            for(var i =0; i < movers.length;i++){
                //movers[i].move();
                movers[i].update();
                movers[i].display();
                //console.log(movers[i].position.x + " " + movers[i].position.y);
            }

        };

        // Moving bodies
        var movers = [];

        // Restart all the Mover objects randomly
        var resetMovers = function() {
            for (var i = 0; i < 3; i++) {
                movers[i] = new Mover(random(0.5, width),random(0.5, height),15);
            }
        };

        // Not working???
        var mousePressed = function() {
            resetMovers();
        };

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        function getRandomBetween(min, max) {
            return Math.random() * (max - min) + min;
        }

        resetMovers();
    }};

// Get the canvas that Processing-js will use
var canvas = document.getElementById("showcase4");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);
//Adapted from Dan Shiffman, natureofcode.com
