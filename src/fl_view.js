$(function() {
  // initial settings
  // fl_init()

  $('#myTab a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })
  
  var hover = $('#hover')
  var footer = $('#footer')
  var screen_info = $('#screen_info')
  var navbar = $('.navbar')
  var arrowup = $('.arrow-up')
  var credit = $('.credit')
  var editor = $('.panel')
  var editor_input = $('.editor-input')
  
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
    if (use_storage()) {
      localStorage.setItem("editor.x", editor.offset().left);
      localStorage.setItem("editor.y", editor.offset().top);
      localStorage.setItem("editor.w", editor.width());
      localStorage.setItem("editor.h", editor.height());
    }
  });

  editor_input.change(function( event ) {
    if (use_storage()) {
      localStorage.setItem("editor.input", editor_input.val());
      // console.log("Text input modified to "+editor_input.val())
    }
  })

  $('.panel-heading').dblclick(function( event ) { 
        editor.css({
          position: "absolute",
          top: "1%",
          left: "1%",
          width: "98%",
          "max-width": "98%",
          height: "98%",
          "max-height": "98%"
        }).show(); 
  })


  

  if (use_storage()) {
    console.log('window.localStorage is available!')
    var ui = []

    // reset controls
    if ($.urlParam('reset') == 'true') {
        console.log('Reset window.localStorage')
        localStorage.setItem("editor.x", 100);
        localStorage.setItem("editor.y", 100);
        localStorage.setItem("editor.w", 360);
        localStorage.setItem("editor.h", 270);
        localStorage.setItem("editor.input", '');
        // jQuery.param.querystring(window.location.href, '#test');
        window.location = "index.html"
    } else {

      if ($.urlParam('editor.x')) {
        ui['editor.x'] = $.urlParam('editor.x');
        localStorage.setItem("editor.x", ui['editor.x']);
      }

      if ($.urlParam('editor.y')) {
        ui['editor.y'] = $.urlParam('editor.y');
        localStorage.setItem("editor.y", ui['editor.y']);
      }

      if ($.urlParam('editor.w')) {
        ui['editor.w'] = $.urlParam('editor.w');
        localStorage.setItem("editor.w", ui['editor.w']);
      }

      if ($.urlParam('editor.h')) {
        ui['editor.h'] = $.urlParam('editor.h');
        localStorage.setItem("editor.h", ui['editor.h']);
      }
    }

    for (var i = 0; i < localStorage.length; i++){
          var key = localStorage.key(i)
          var val = localStorage.getItem(key)
          ui[key] = val
          console.log('\t'+key+'='+val)
    }

    // position .container or .editor
    editor.css({
      position: "absolute",
      top: ui['editor.y'] + "px",
      left: ui['editor.x']  + "px",
      width: ui['editor.w'] + "px",
      height: ui['editor.h'] + "px"
    }).show();

    screen_info.text(ui['editor.w']+'✕'+ui['editor.h']+' — '+ui['editor.x']+'x '+ui['editor.y']+'y')

    editor_input.val(ui['editor.input'])
    

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