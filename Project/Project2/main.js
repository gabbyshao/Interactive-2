$(document).ready(function(){
    // toggle class to animate rotation
    $('.rotator').mouseenter(function() {
      $(this).find(".bar").css({'transform': "rotate(5000deg)"});
        // $("#Abar").toggleClass("rotate");

    });

    $('.rotator').mouseleave(function() {
      $(this).find(".bar").css({'transform': "rotate(-5000deg)"});
        // $("#Abar").toggleClass("rotate");

    });

    var audioElement = document.createElement('audio');
              audioElement.setAttribute('src', 'AlbertAmmons.mp3');

              // audioElement.addEventListener('ended', function() {
              //     this.play();
              // }, false);

              $(".A").mouseenter(function(){
                  audioElement.play();
                  // alert("message?: DOMString");
              });
              $(".A").mouseleave(function(){
                  audioElement.pause();
                  // alert("message?: DOMString");
              });
