(function() {
    /**
     * IWheel constructor
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
     * var wedge = new IWheel({
     *   radius: 40,
     *   fill: 'red',
     *   stroke: 'black'
     *   strokeWidth: 5,
     *   angleDeg: 60,
     *   rotationDeg: -120
     * });
     */
    IWheel = function(config) {
        this.initIWheel(config);

        this.drawables = [
            {
                draw : function (a,b,c) {
                    return function() {
                        this.prototype._templates[0].formula(a,b,c);
                    }
                }
            }
        ];
    };

    IWheel.prototype = {

        initIWheel: function(config) {
            // call super constructor
            Konva.Shape.call(this, config);
            this.className = 'IWheel';
            this.sceneFunc(this._sceneFunc);

        },

        _primes : [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009],

        nthPrime: function(n) {

            n = Math.floor(Math.abs(n));

            return this._primes[n];
        },

        isPrime: function(num) {
            var isPrime = false;

            for (var i = 0; i < this._primes.length; i++) {
                var nextPrime = this._primes[i];

                if (num >= nextPrime) {
                    isPrime = (num == nextPrime);
                    break;
                }
            }

            return isPrime;
        },

        roll: function() {

            var roll  = Math.random();
            var roll2 = Math.random();

            var step = this.nthPrime(100 * roll);
            var thetaX   = Math.floor(Math.abs(roll - roll2) * 10);
            var exponent = Math.floor(roll2 * 10);

//            this.attrs.stroke = '#' + roll .toString(16).substring(2, 8);
            this.attrs.fill   = '#' + roll2.toString(16).substring(2, 8);

            this.attrs.step   = step;
            this.attrs.thetaX = thetaX;
            this.attrs.exp = exponent;
            this.attrs.template = Math.floor((roll * 10)) % this._templates.length;

        },

        _sceneFunc: function(context) {
            context.beginPath();

            var step = this.step();

            for (var degrees = 0; degrees < step * 360; degrees += step) {
                var theta = degrees * Math.PI / 180;

                var r = this._templates[this.template()].formula.call(this,theta);

                var x = this.zoom() * r * Math.cos(theta);
                var y = this.zoom() * r * Math.sin(theta);

                if (degrees == 0) {
                    context.moveTo( x, y);
                } else {
                    context.lineTo( x, y);
                }
            }

            context.closePath();

            context.fillStrokeShape(this);
        },

        _templates : [
            {
                forumlaText : 'a *  cos ^c ( b * theta)',

                formula : function(theta) {
                    var thetaMultiplier = this.thetaX(),
                        exponent = this.exp();

                    var radius = Math.pow(Math.cos(thetaMultiplier * theta), exponent);

                    return radius;
                }
            },
            {
                forumlaText : 'a *  cos ^c ( b * theta)',

                formula : function(theta) {
                    var thetaMultiplier = this.thetaX(),
                        exponent = this.exp();

                    var radius = Math.log(thetaMultiplier * Math.cos(theta));

                    return radius;
                }
            }
        ],

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
    Konva.Util.extend(IWheel, Konva.Shape);

    // add getters setters
    Konva.Factory.addGetterSetter(IWheel, 'step'    ,   1);
    Konva.Factory.addGetterSetter(IWheel, 'zoom'    , 300);
    Konva.Factory.addGetterSetter(IWheel, 'thetaX'  ,   2);
    Konva.Factory.addGetterSetter(IWheel, 'exp'     ,   2);
    Konva.Factory.addGetterSetter(IWheel, 'template',   0);

    Konva.Collection.mapMethods(IWheel);
})();
