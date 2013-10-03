$(function() {
  // initial settings
  // fl_init()
  
  var hover = $('#hover')
  var footer = $('#footer')
  var screen_info = $('#screen_info')
  var navbar = $('.navbar')
  var arrowup = $('.arrow-up')
  var credit = $('.credit')
  var editor = $('.panel')
  
  navbar.hide();

  editor.draggable( { handle: ".panel-heading",scroll: false,containment: "window" } );

  editor.resizable({ handles: "se" })

  hover.mouseenter(function() {
      navbar.finish().fadeIn(200);
      arrowup.finish().fadeOut(200);
  });

  hover.mouseleave(function() {
      navbar.finish().delay(100).fadeOut(200);
      arrowup.finish().fadeOut(200);
  });

  arrowup.delay(3000).fadeOut(3000);

  footer.mouseenter(function() {
      credit.finish().fadeIn(200);
  });

  footer.mouseleave(function() {
      credit.finish().fadeOut(3000);
  });
  credit.delay(3000).fadeOut(3000);
  
  editor.mousemove(function( event ) {
    screen_info.text(editor.width()+'✕'+editor.height()+' — '+editor.offset().left+'x '+editor.offset().top+'y')
    if (supports_html5_storage()) {
      localStorage.setItem("editor.x", editor.offset().left);
      localStorage.setItem("editor.y", editor.offset().top);
      localStorage.setItem("editor.w", editor.width());
      localStorage.setItem("editor.h", editor.height());
    }
  });


  if (supports_html5_storage()) {
    console.log('window.localStorage is available!')

    var ed_x = localStorage.getItem("editor.x");
    var ed_y = localStorage.getItem("editor.y");
    var ed_w = localStorage.getItem("editor.w");
    var ed_h = localStorage.getItem("editor.h");
    
    for (var i = 0; i < localStorage.length; i++){
          var key = localStorage.key(i)
          var val = localStorage.getItem(key)
          console.log('\t'+key+'='+val)
      }

    // position .container or .editor
    editor.css({
      position: "absolute",
      top: ed_y + "px",
      left: ed_x  + "px",
      width: ed_w + "px",
      height: ed_h + "px"
    }).show();

    screen_info.text(ed_w+'✕'+ed_h+' — '+ed_x+'x '+ed_y+'y')
    

  } else {
    console.log('no native support for HTML5 storage :(')

    screen_info.text('Editor')
  }

  editor.hover(function() {
      editor.css('z-index', '0')
      editor.removeClass('panel-default').addClass('panel-muted')
      $(this).css('z-index', '1')
      $(this).removeClass('panel-muted').addClass('panel-default')
  });

  
});