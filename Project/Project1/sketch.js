window.onload = function() {

   var canvas = document.getElementById("canvas");
   var ctx = canvas.getContext("2d");

   var pi = Math.PI;

   var centerX, centerY;
   var part_num = 6000;

   var mousedown = false;
   var X, Y;
   /*===========================================================================*/

   /*===========================================================================*/
   var P = [];
   var part = function(x, y, vx, vy, r, red, green, blue, alpha, col) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.r = r;
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.alpha = alpha;
      this.col = col;

   };

   function rand(min, max) {
      return Math.random() * (max - min) + min;
   }

   function dist(dx, dy) {
      return Math.sqrt(dx * dx + dy * dy);
   }

   function size() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
   }
   size();
   X = centerX;
   Y = centerY;



   function init() {
      var x, y, vx, vy, r, red, green, blue, alpha, col;
      for (var i = 0; i < part_num; i++) {
         x = rand(10, canvas.width);
         y = rand(10, canvas.height);
         vx = rand(-1, 10);
         vy = rand(-1, 10);
         r = rand(1, 3);
         red = Math.round(rand(15, 20,));
         green = Math.round(rand(10, 255));
         blue = Math.round(rand(18, 255));
         alpha = 5;
         col = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";

         P.push(new part(x, y, vx, vy, r, red, green, blue, alpha, col));
      }
   }

   function bg() {
      ctx.fillStyle = "#5A0AAA";
      ctx.fillRect(0,0, canvas.width, canvas.height);
      //ctx.clearRect(0, 0, canvas.width, canvas.height);
   }

   function bounce(b) {

      if (b.x < b.r) {
         b.x = b.r;
         b.vx *= -1;
      }
      if (b.x > canvas.width - b.r) {
         b.x = canvas.width - b.r;
         b.vx *= -1;
      }

      if (b.y - b.r < 0) {
         b.y = b.r;
         b.vy *= -1;
      }
      if (b.y > canvas.height - b.r) {
         b.y = canvas.height - b.r;
         b.vy *= -1;
      }
   }

   function attract(p) {

      var dx = (p.x - X),
         dy = (p.y - Y),
         dist = Math.sqrt(dx * dx + dy * dy),
         angle = Math.atan2(dy, dx);

      if (dist > 10 && dist < 30) {
         if (!mousedown) {
            p.vx -= (20 / (p.r * dist)) * Math.cos(angle);
            p.vy -= (20 / (p.r * dist)) * Math.sin(angle);
         } else if (mousedown) {
            p.vx += (250 / (p.r * dist)) * Math.cos(angle);
            p.vy += (250 / (p.r * dist)) * Math.sin(angle);
         }
      }

   }

   function draw() {
      var p;
      for (var i = 0; i < P.length; i++) {
         p = P[i];

         if(mouseover) attract(p);
         bounce(p);

         p.x += p.vx;
         p.y += p.vy;

         p.vx *= .975;
         p.vy *= .975;

         ctx.fillStyle=p.col;
         ctx.fillRect(p.x,p.y,p.r,p.r);
         //ctx.beginPath();
         ctx.fillStyle = p.col;
         ctx.arc(p.x, p.y, p.r, 0, 2 * pi);
         //ctx.fill();


      }
      ctx.strokeStyle = (!mousedown) ? "black" : "black";

         ctx.beginPath();
         ctx.moveTo(X, Y );
         ctx.lineTo(X, Y );
         ctx.moveTo(X, Y);
         ctx.lineTo(X, Y);
         ctx.stroke();


   }

   function loop() {
      bg();
      draw();

      window.requestAnimationFrame(loop);
   }

   window.onresize = size;

   window.onmousemove = function(e) {
      X = e.clientX;
      Y = e.clientY;
   }

   window.onmousedown = function() {
      mousedown = true;
   }

   window.onmouseup = function() {
      mousedown = false;
   }

   var mouseover=false;

   window.onmouseover = function() {
      mouseover = true;
   }

   window.onmouseout = function(){
      mouseover=false;
   }

   init();
   loop();
}
