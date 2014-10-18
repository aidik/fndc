var $j = jQuery.noConflict();
var release = "9.2.1.8";
var nightlyCode = "";
var hash = {
    "iso"   : "b64c3a43d25da9b7dad2738c4b3ad2e1cbdd95d59857d6d4087c0a78b96734bf",
    "usb"  : "1b6a1fd2f12c4b49a76ff56fc9286ffe15e8235c940fdd67d4cdefb59a50d2cd",
    "gui"  : "338604ae08bdf13abaa878592647d4ca4b7cbefa3bc681319cbc412ecb708da7",
    "img"  : "28983f355fb769ac2321938f3a4ec012754614fa42c4b061350b86fd6dffff92"
    }




$j(document).ready(function() {
	selectType('iso', 64);
  
  // toggle nav on-click	
	$j('#menu-icon').click(function () {
		$j('#top-nav ul').slideToggle(500);
		console.log('clicked menu icon');
	});

	// get forban
	$j.get('/forban_link.html', function(data) {
		$j('div#forban_link').html(data);
	});
	
	// get station counter
	$j.get('/station_cnt.txt', function(data) {
		$j('div#station').html(data);
	});

 	// tells you there is a ShoutBox error
 	$j('div#shoutbox').ajaxError(function() {
 		$(this).text( "Triggered ajaxError handler on shoutbox" );
 	});

	// submits new text to ShoutBox
	$j("#sb_form").submit(function(event) {

		event.preventDefault();
		post_shoutbox();
	});

	$j.getJSON("/config.json" , function(data) {
		var showbox = data.librarybox.module.shoutbox.status;
		if (showbox) {
			display_shoutbox();
		} else {
			document.getElementById("chatcontainer").style.display="none";
		}
	});

});

function refresh_shoutbox () {
	$j.get('/chat_content.html', function(data) {
		$j('div#shoutbox').html(data);
	});
}

function refresh_time_sb () {
    // Refresh rate in milli seconds
    mytime=setTimeout('display_shoutbox()', 10000);
  }

  function post_shoutbox () {
  	$j.post("/cgi-bin/psowrte.py" , $j("#sb_form").serialize())
  	.success(function() { 
  		refresh_shoutbox(); 
  	});
  	$j('#shoutbox-input .message').val('');
  }

  function display_shoutbox() {
  	refresh_shoutbox();
  	refresh_time_sb();
  }

  function fnGetDomain(url) {
  	return url.match(/:\/\/(.[^/]+)/)[1];
  }

  function copyHashToClipboard(id) {
  text = $j("#" + id).text();
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

  function selectType(type, bit) {
  button = $j("#btn-download");
  typeName = "";
  
  switch (type) {
            case "iso":
                  typeName = "ISO Image";
                  break;
            case "usb":
                  typeName = "USB Image";
                  break;
            case "gui":
                  typeName = "GUI Upgrade";
                  break;
            case "img":
                  typeName = "IMG File";
                  break;                  
            }
  $j("#fake-input").html(typeName + "<span class='caret'></span>");
  button.attr("data-bit", bit);
  button.attr("data-file", type);
  button.attr("data-release", release);
  button.removeClass('disabled');
  button.attr("title", "FreeNAS " + release + "-RELEASE x" + bit + " " + typeName);
  $j("#installHash").text(hash[type]);
  
}

  function redirect() {
    window.location.href = "survay.php?download=yes";
  }

  function downloadFile(t) {
    bit = t.attr("data-bit");
    type = t.attr("data-file");
    release = t.attr("data-release");
    fileName = "";
    
    //FreeNAS-9.2.1.8-RELEASE-x64.iso
    //FreeNAS-9.2.1.8-RELEASE-x64.usb
    //FreeNAS-9.2.1.8-RELEASE-x64.GUI_Upgrade.txz
    //FreeNAS-9.2.1.8-RELEASE-x64.img.xz

    
    switch (type) {
          case "iso":
                fileName = "FreeNAS-" + release + "-RELEASE-x" + bit + "." + type;
                break;
          case "usb":
                fileName = "FreeNAS-" + release + "-RELEASE-x" + bit + "." + type;
                break;
          case "gui":
                fileName = "FreeNAS-" + release + "-RELEASE-x" + bit + ".GUI_Upgrade.txz";
                break;
          case "img":
                fileName = "FreeNAS-" + release + "-RELEASE-x" + bit + "." + type + ".xz";
                break;                  
          }


    window.open("/dl_statistics_counter.php?DL_URL=/Shared/" + fileName, '_self');
       
    var millisecondsToWait = 1000;
    setTimeout(function() {redirect();}, millisecondsToWait);
    }