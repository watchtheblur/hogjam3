var inherits = require('inherits');
var Entity = require('crtrdg-entity');

module.exports = Clock;

function Clock(options) {
  Entity.call(this);

  var self = this;

  this.level = 480;
  this.size = { y: 10 };

  if (options.hasOwnProperty("name")) {
    this.name = options.name;
  }
  if (options.hasOwnProperty("color")) {
    this.color = options.color;
  }
  if (options.hasOwnProperty("game")) {
    this.game = options.game;
  }
  if (options.hasOwnProperty("camera")) {
    this.camera = options.camera;
  }
  this.position = options.position;

  this.game.addIntervalEvent(this);

  this.everySecond = function() {
    if (this.level > 0) {
      this.level -= 1;
    }

    if (this.level == 0) {
      this.level = 480;
    }
    //console.log(this.name + " meter level: "+ this.level);
  };

  this.on('draw', function(c) {
    c.save();

    var gameTime = 480-this.level;

    var strAMPM = 'am';

    numHour = Math.floor(gameTime/20)+6;

    if (numHour >= 24) {
      numHour = numHour - 23;
    }

    var strHour = numHour;

    if (numHour >= 13) {
      strHour = numHour - 12;
      strAMPM = 'pm';
    }

    strGameTime = strHour + strAMPM;

    var label = strGameTime;
    //var label = 'Clock';
    var x_pos = this.position.x - this.camera.position.x;
    var y_pos = this.position.y - this.camera.position.y;

    var radius = 30;
    var startAngle = 0 * (Math.PI/240);
    var endAngle = gameTime * (Math.PI/240);
    var antiClockwise = true;

    c.fillStyle = "white";
    c.font = "12px Arial";
    c.fillText(label, x_pos - 13, y_pos + 3);

    c.beginPath();
    c.lineWidth = 6;
    c.strokeStyle = self.color;
    c.fillStyle = self.color;

    c.arc(
      self.position.x - self.camera.position.x,
      self.position.y - self.camera.position.y,
      radius,
      startAngle,
      endAngle,
      antiClockwise
    );

    c.stroke();

/*
    c.rect(
      self.position.x - self.camera.position.x + 35,
      self.position.y - self.camera.position.y,
      102,
      self.size.y + 2
    );
    c.stroke();

    c.fillRect(
      self.position.x - self.camera.position.x + 36,
      self.position.y - self.camera.position.y + 1,
      self.level,
      self.size.y
    );
    c.restore();
*/
  });
};

inherits(Clock, Entity);
