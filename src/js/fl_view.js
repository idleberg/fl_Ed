$(function() {
  // initial settings
  // fl_init()

  // init Bootstrap tooltips
  $('[data-toggle="tooltip"]').tooltip();

  console.log('fl_Ed | αlpha zero');
  console.log('https://github.com/idleberg/fl_Ed');
  console.log('');

  $('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  // $('#reset-window-lock').click(function() {
  //   if (this.checked) {
  //     console.log('unlocking')
  //     $('#reset-window').removeAttr('disabled');
  //   } else {
  //     console.log('locking')
  //     $('#reset-window').attr('disabled', true);
  //   }
  // })
  
  var hover        = $('#hover'),
      footer       = $('#footer'),
      screen_info  = $('#screen_info'),
      navbar       = $('.navbar'),
      arrowup      = $('.arrow-up'),
      credit       = $('.credit'),
      checks       = $('input[type="checkbox"]'),
      editor       = $('#editor'),
      editor_input = $('.editor-input');
  
  // navbar.hide();

  editor.draggable( {
    handle: ".panel-heading",
    scroll: false,
    containment: "window",
    drag: function (){
      update_pos(editor, screen_info, "Dragging…");
    }
  } );

  editor.resizable({
    handles: "se",
    resize: function( event, ui ) {
      update_pos(editor, screen_info, "Resizing…");
    }
  });

  // $( ".selector" ).on( "resize", function( event, ui ) {} );

  hover.mouseenter(function() {
      // navbar.finish().fadeIn(200);
      arrowup.finish().fadeOut(200);
  });

  hover.mouseleave(function() {
      // navbar.finish().delay(100).fadeOut(200);
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


  editor_input.keyup(function() {
    if (use_storage()) {
      localStorage.setItem("editor.input", editor_input.val());
      if(debug) console.info("Typing…");
    }
  });


  checks.click(function() { 
    var name = $(this).attr('name');
    // console.log(name)

    if ($(this).is(':checked')) {
      if(debug) console.info("Checked "+name);
      localStorage.setItem("editor."+name, true);
    } else {
      if(debug) console.info("Unchecked "+name);
      localStorage.setItem("editor."+name, false);
    }
  });

  $('.panel-heading').dblclick(function() { 
      $('.panel').toggleClass('panel-fullscreen');
      screen_info.text(editor.width()+'✕'+editor.height()+' — '+editor.offset().left+'x '+editor.offset().top+'y');
      if ($('.panel-fullscreen').is(":visible")) {
        localStorage.setItem("editor.fullscreen", true);
      } else {
        localStorage.setItem("editor.fullscreen", false);
      }
      if(debug) console.info("Toggle fullscreen");
  });

  // todo: dry!
  $('.toggle-fullscreen').click(function() { 
      $('.panel').toggleClass('panel-fullscreen');
      screen_info.text(editor.width()+'✕'+editor.height()+' — '+editor.offset().left+'x '+editor.offset().top+'y');
      if ($('.panel-fullscreen').is(":visible")) {
        localStorage.setItem("editor.fullscreen", true);
      } else {
        localStorage.setItem("editor.fullscreen", false);
      }
      if(debug) console.info("Toggle fullscreen");
  });

  $( window ).resize(function() {
    screen_info.text(editor.width()+'✕'+editor.height()+' — '+editor.offset().left+'x '+editor.offset().top+'y');
  });

  if (use_storage()) {
    console.info('\tlocalStorage is available!');
    var ui = [];

    // reset controls
    if ($.urlParam('reset') == 'true' || $.urlParam('reset') == '1') {
        console.info('Reset window.localStorage');
        // localStorage.setItem("editor.x", default_x);
        // localStorage.setItem("editor.y", default_y);
        // localStorage.setItem("editor.w", default_w);
        // localStorage.setItem("editor.h", default_h);
        // localStorage.setItem("editor.input", default_input);
        // localStorage.setItem("editor.fullscreen", false);
        set_defaults();
        window.location = "index.html";
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

    // Set default windows position to localStorage if not available
    if (localStorage.length === 0) {
      set_defaults();
    }

    // Read window position from localStorage
    for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i),
            val = localStorage.getItem(key);
        ui[key] = val;
        console.log('\t'+key+'='+val);
    }
    

    // position .container or .editor
    editor.css({
      position: "absolute",
      top:    ui['editor.y'] + "px",
      left:   ui['editor.x'] + "px",
      width:  ui['editor.w'] + "px",
      height: ui['editor.h'] + "px"
    }).show();

    if (ui['editor.fullscreen'] == 'true') {
      $('.panel').toggleClass('panel-fullscreen');
      screen_info.text(editor.width()+'✕'+editor.height()+' — '+editor.offset().left+'x '+editor.offset().top+'y');
    } else {
      screen_info.text(ui['editor.w']+'✕'+ui['editor.h']+' — '+ui['editor.x']+'x '+ui['editor.y']+'y');
    }

    editor_input.val(ui['editor.input']);

    if (ui['editor.check1'] == 'true') {
      $('input[name="check1"]').attr('checked', 'checked');
    }
    if (ui['editor.check2'] == 'true') {
      $('input[name="check2"]').attr('checked', 'checked');
    }
    

  } else {
    console.warn('no native support for HTML5 storage :(');

    screen_info.text('Editor');
  }

  editor.hover(function() {
      editor.css('z-index', '0');
      editor.removeClass('panel-default').addClass('panel-muted');
      $(this).css('z-index', '1');
      $(this).removeClass('panel-muted').addClass('panel-default');
  });

  $('.export_data').click(function (event) {

    var data = {};
    for (var i = 0; i < localStorage.length; i++){
          var key   = localStorage.key(i),
                val = localStorage.getItem(key);
          data[key] = val;
    }

    json = JSON.stringify(data, null, " ");
    base64 = window.btoa(json);
    hash = CryptoJS.SHA1(base64).toString().substring(0,7);
    file = 'fl_Ed-'+hash+'.json';
    console.info('Exporting settings to '+file);

    var dl = document.createElement('a');
    dl.setAttribute('href', 'data:application/octet-stream;base64,' + base64);
    dl.setAttribute('download', file);
    dl.click();
  });

  $('.close').click(function (event) {
    $(editor).fadeOut('fast');
    if(debug) console.info('Hide editor');
  });

    $('.lock-editor','.unlock-editor').click(function (event) {
      if ($('.lock-editor').is(":visible")) {
        $(this).switchClass('.lock-editor','.unlock-editor').html('<i class="fa fa-fw fa-dot-circle-o"></i>');
        $(editor).resizable("disable").draggable("disable");
      } else {
        $(this).switchClass('.unlock-editor','.lock-editor').html('<i class="fa fa-fw fa-circle-o"></i>');
        $(editor).resizable("enable").draggable("enable");
      }

  });

  $('.toggle-editor').click(function (event) {
    $(editor).fadeToggle('fast');
    if(debug) console.info('Toggle editor');
  });

  $('.close-menu').click(function (event) {
    $('.navmenu').offcanvas('hide');
  });

});