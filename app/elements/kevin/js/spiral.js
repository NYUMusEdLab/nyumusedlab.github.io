(function() {
    Spiral = function(config) {
        this.___init(config);
    };

    Spiral.prototype = {
        _centroid: true,
        ___init: function(config) {
            // call super constructor
            Konva.Shape.call(this, config);
            this.className = 'Spiral';
            this.sceneFunc(this._sceneFunc);
//            this.pitchDegrees = 8.6;
//            this.pitchFactor(.09);

            this.isArchimedean = false;
        },
        _sceneFunc: function(context) {
            context.beginPath();
//            context.arc(0, 0, this.getRadius(), 0, Konva.getAngle(this.getAngle()), this.getClockwise());
//            context.lineTo(0, 0);

            if (this.isArchimedean) {
                var centerX = 200;
                var centerY = 200;
                context.moveTo(centerX, centerY);

                var STEPS_PER_ROTATION = 60;
                var increment = 2*Math.PI/STEPS_PER_ROTATION;
                var theta = 0;

                while( theta < 40*Math.PI) {
                    var newX = centerX + theta * Math.cos(theta);
                    var newY = centerY + theta * Math.sin(theta);
                    context.lineTo(newX, newY);
                    theta = theta + increment;
                }
            } else {
                var centerX = 500;
                var centerY = 500;
                var pitchFactor = Math.tan(Math.PI * this.pitchDegrees() / 180);

                var STEPS_PER_ROTATION = 160;
                var increment = 2 * Math.PI / STEPS_PER_ROTATION;
                var theta = this.turns() * 2 * Math.PI;

                while (theta > 0) {
                    var radius = this.radius() * Math.exp(pitchFactor * theta);
                    var newX = centerX - radius * Math.cos(theta);
                    var newY = centerY + radius * Math.sin(theta);

                    if (theta == 0) {
                        context.moveTo(newX,newY);
                    } else {
                        context.lineTo(newX,newY);
                    }

                    theta -= increment;
                }
            }

            context.closePath();
            context.fillStrokeShape(this);
        },
        // implements Shape.prototype.getWidth()
        getWidth: function() {
            return this.getRadius() * 2;
        },
        // implements Shape.prototype.getHeight()
        getHeight: function() {
            return this.getRadius() * 2;
        },
        // implements Shape.prototype.setWidth()
        setWidth: function(width) {
            Konva.Node.prototype.setWidth.call(this, width);
            if (this.radius() !== width / 2) {
                this.setRadius(width / 2);
            }
        },
        // implements Shape.prototype.setHeight()
        setHeight: function(height) {
            Konva.Node.prototype.setHeight.call(this, height);
            if (this.radius() !== height / 2) {
                this.setRadius(height / 2);
            }
        }
    };
    Konva.Util.extend(Spiral, Konva.Shape);

    // add getters setters
    Konva.Factory.addGetterSetter(Spiral, 'radius',      0);
    Konva.Factory.addGetterSetter(Spiral, 'pitchDegrees',8.0);
    Konva.Factory.addGetterSetter(Spiral, 'turns',       5);
    Konva.Factory.addGetterSetter(Spiral, 'clockwise',   false);

    Konva.Collection.mapMethods(Spiral);
})();
