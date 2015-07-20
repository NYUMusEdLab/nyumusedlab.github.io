(function() {
    SpiralWedge = function(config) {
        this.initWedge(config);
    };

    SpiralWedge.prototype = {
        _centroid: true,

        initWedge: function(config) {
            Konva.Shape.call(this, config); // call super constructor

            this.className = 'SpiralWedge';

            this.sceneFunc(this._sceneFunc);

            this.spiral = {
                center       : { x: 0, y: 0},
                pitchDegrees :  5.6,
                amplitude    : 10,
                numDivisions : 16
            }

            var wedgeAngle = 2 * Math.PI / this.spiral.numDivisions;
            var pitchFactor = Math.tan(Math.PI * this.spiral.pitchDegrees / 180);
            var ring = this.ring();
            var position = this.degree();


            var thetas = [
                (position + 0) * wedgeAngle + 2 * Math.PI * (ring + 0),
                (position + 0) * wedgeAngle + 2 * Math.PI * (ring + 1),
                (position + 1) * wedgeAngle + 2 * Math.PI * (ring + 1),
                (position + 1) * wedgeAngle + 2 * Math.PI * (ring + 0)
            ];

            var radii = new Array(4);

            for (var i = 0; i < 4; i++) {
                radii[i] = this.spiral.amplitude * Math.exp(pitchFactor * thetas[i]);
            }


            this.corners = new Array(4);

            for (var i = 0; i < 4; i++) {
                this.corners[i] = {
                    x : this.spiral.center.x + radii[i] * Math.cos(thetas[i]),
                    y : this.spiral.center.y + radii[i] * Math.sin(thetas[i])
                }
            }
        },

//        _sceneFunc: function(context) {
//            context.beginPath();
//            context.arc(0, 0, 100, 0, 2 * Math.PI, false);
//            context.closePath();
//            context.fillStrokeShape(this);
//
//            console.log('drawing x:' + this.attrs.x + ' y:' + this.attrs.y);
//        },

        _sceneFunc: function(context) {
//            var corners = new Array(4);
//
//            for (var i = 0; i < 4; i++) {
//                corners[i] = {
//                    x : this.x()  + radii[i] * Math.cos(thetas[i]),
//                    y : this..y() + radii[i] * Math.sin(thetas[i])
//                }
//            }
            context.beginPath();

            var STEPS_PER_ROTATION = 160;
            var increment = 2 * Math.PI / STEPS_PER_ROTATION;

            for (var i = 0; i < 4; i++) {
                if (i == 0) {
                    context.moveTo(this.corners[i].x,this.corners[i].y);
                } else {
                    context.lineTo(this.corners[i].x,this.corners[i].y);
                }
            }

            context.closePath();
            context.fillStrokeShape(this);
        }

    };

    Konva.Util.extend(SpiralWedge, Konva.Shape);

    // add getters setters
    Konva.Factory.addGetterSetter(SpiralWedge, 'degree',0);
    Konva.Factory.addGetterSetter(SpiralWedge, 'ring',4);
    Konva.Factory.addGetterSetter(SpiralWedge, 'clockwise',false);

    Konva.Collection.mapMethods(SpiralWedge);
})();
