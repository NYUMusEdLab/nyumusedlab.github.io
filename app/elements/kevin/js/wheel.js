(function() {
    /**
     * Wheel constructor
     * @constructor
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Number} config.angle in degrees
     * @param {Number} config.radius
     * @param {Boolean} [config.clockwise]
     * @@shapeParams
     * @@nodeParams
     * @example
     * // draw a wedge that's pointing downwards
     * var wedge = new Wheel({
     *   radius: 40,
     *   fill: 'red',
     *   stroke: 'black'
     *   strokeWidth: 5,
     *   angleDeg: 60,
     *   rotationDeg: -120
     * });
     */
    Wheel = function(config) {
        this.___init(config);
    };

    Wheel.prototype = {
        _centroid: true,
        ___init: function(config) {
            // call super constructor
            Konva.Shape.call(this, config);
            this.className = 'Wheel';
            this.sceneFunc(this._sceneFunc);

            this.deltaAngle = 2 * Math.PI / this.spokes();

        },
        _sceneFunc: function(context) {
            context.beginPath();
            context.arc(0, 0, this.radius(), 0, Math.PI * 2, true);

            for (var spoke = 0; spoke < this.spokes(); spoke++) {
                var spokeX = this.radius() * Math.cos(spoke * this.deltaAngle);
                var spokeY = this.radius() * Math.sin(spoke * this.deltaAngle);
                context.moveTo( spokeX, spokeY);
                context.lineTo(-spokeX,-spokeY);
            }

            context.closePath();
            context.strokeShape(this);
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
    Konva.Util.extend(Wheel, Konva.Shape);

    // add getters setters
    Konva.Factory.addGetterSetter(Wheel, 'radius', 100);
    Konva.Factory.addGetterSetter(Wheel, 'spokes', 8);

    Konva.Collection.mapMethods(Wheel);
})();
