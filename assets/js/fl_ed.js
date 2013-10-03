$(function() {
  // initial settings
  $( ".navbar" ).hide();

  $( ".panel" ).draggable( { handle: ".panel-heading",scroll: false,containment: "window" } );

  // $( ".panel" ).resizable({helper: ".panel-footer"})

  $('#hover').mouseenter(function() {
      $( ".navbar" ).finish().fadeIn(200);
  });

  $('#hover').mouseleave(function() {
      $( ".navbar" ).finish().delay(100).fadeOut(200);
       $('.arrow-up').finish().fadeOut(200);
  });

  $('.arrow-up').delay(3000).fadeOut(3000);

  var credit = $('.credit')

  $('#footer').mouseenter(function() {
      credit.finish().fadeIn(200);
  });

  $('#footer').mouseleave(function() {
      credit.finish().fadeOut(3000);
  });
  credit.delay(3000).fadeOut(3000);

  var editor = $('.panel');
  
  editor.mousemove(function( event ) {
    $('#footer_text').text(editor.width()+' ✕ '+editor.height()+' @ '+editor.offset().left+'x '+editor.offset().top+'y')
    if (Modernizr.localstorage) {
      // window.localStorage is available!
      localStorage.setItem("editor.x", editor.offset().left);
      localStorage.setItem("editor.y", editor.offset().top);
      localStorage.setItem("editor.w", editor.width ());
      localStorage.setItem("editor.h", editor.height());
    }
  });

  if (Modernizr.localstorage) {
    // window.localStorage is available!
    console.log('localStorage.previousSession:')
    var edx = localStorage.getItem("editor.x");
    var edy = localStorage.getItem("editor.y");
    var edw = localStorage.getItem("editor.w");
    var edh = localStorage.getItem("editor.h");

    // position .container or .panel
    editor.css({
      position: "absolute",
      top: edy + "px",
      left: edx  + "px"
    }).show();

    $('#footer_text').text(edw+' ✕ '+edh+' @ '+edx+'x '+edy+'y')
    
    console.log('\tx-position: '+edx+'px')
    console.log('\ty-position: '+edy+'px')
    console.log('\twidth: '+edw+'px')
    console.log('\theight: '+edh+'px')
  } else {
    // no native support for HTML5 storage :(
    // maybe try dojox.storage or a third-party solution
    console.log('no native support for HTML5 storage :(')
    $('#footer_text').text('358 ✕ 282 @ 378x 90y')
  }


  
});