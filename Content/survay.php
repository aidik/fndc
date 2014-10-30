<?php
if (isset($_POST['submit'])) 
{
  require_once "survay_function.php";
  
  saveSurvay($_POST);

}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width">
	<meta http-equiv="cache-control" content="no-cache">
	<title>FreeNAS Distribution Center</title>
	<link rel="icon" href="favicon.ico">
	<link rel="stylesheet" href="css/bootstrap.css">
	<link rel="stylesheet" href="css/bootstrap-theme.css">
	<link rel="stylesheet" href="css/font.css">
	<link rel="stylesheet" href="css/structure.css">
</head>
<body>

		<span id="vc_count"></span>
    <div id="top-nav" class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
	<a href="/Content/" class="brand navbar-brand fn-logo"><span>D</span>istribution <span>C</span>enter</a>
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="/" class="active">Home</a></li>
						<!--<li><a href="/Shared/text/">Text</a></li>-->
						<!--<li><a href="/Shared/audio/">Audio</a></li>-->
						<!--<li><a href="/Shared/video/">Video</a></li>-->
						<!--<li><a href="/Shared/software/">Apps</a></li>-->
						<li><a href="/Shared/">List All Content</a></li>
						<li><a href="/content/stats.html">Show Statistics</a></li>
						<!--<li><a href="/content/about.html">About</a></li>-->
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>


<div class="container">

	<div class="lb-content">
		<section id="content">
	<!-- visitor counter --> 
  		
      <?php
      if (isset($_POST['submit'])){ ?>
      <div id="welcome">
				<div class="container">
					<h1 class="fn-small-logo">Thank you for filling out our survey.</h1>
				</div>
			</div>

    <?php }

      elseif (isset($_GET['download'])){ ?>
      <div id="welcome">
				<div class="container">
					<h1 class="fn-small-logo">Thank you for downloading FreeNAS.</h1>
					<p>Now before this technology once reserved for high-end storage appliances & the labs of computing gurus is downloaded.<br />
          What about telling us someting about yourself?</p>
				</div>
			</div>

    <?php }
     else{ ?>
      <div id="welcome">
				<div class="container">
					<h1 class="fn-small-logo">We appreciate your will to share.</h1>
					<p>Your feedback will allow us to make FreeNAS better and keep in touch with you and your storage need.</p>
				</div>
			</div>
    <?php } ?>
       
            <?php
      if (!isset($_POST['submit'])){ ?>
			<div class="container">
					
    <div id="files-top" class="card">
      <h2>Survey</h2>            
      <form action="#" method="post" id="survayForm">	
        <label for="Field1">Name:
        </label>	
        <input type="text" tabindex="1" maxlength="255" value="" name="Name" id="Field1">  
        <label for="Field2">Email:
        </label>	
        <input type="text" tabindex="1" maxlength="255" value="" name="Email" id="Field2">  
        <label for="Field3">Phone:
        </label>	
        <input type="text" tabindex="1" maxlength="255" value="" name="Phone" id="Field3">  
        <label for="Field4">Tell us about your system.
        </label>	
        <textarea tabindex="1" cols="50" rows="10" spellcheck="true" name="System" id="Field4"></textarea>	 	
        <fieldset>	 
          <legend>Can we contact you?
          </legend>	 
          <div>	   
            <input type="checkbox" tabindex="1" value="Yes" checked name="Contact" id="Field5">	   
            <label for="Field5">Yes, call me with profesional storage sollution.</label>
            <br />         
            <input type="checkbox" tabindex="1" value="Yes" checked name="Newsletter" id="Field6">      
            <label for="Field6">Yes, send me FreeNAS Newsletter.</label>	 
          </div>	
        </fieldset>  
        <button class="btn button-bg btn-survay" type="submit" 	name="submit">Send
        </button>
    </form>					
  </div>
					<div id="jquery-testing">
					</div>



			</div>
      <?php } ?>
		</section>
	<div class="starter-template">

	<footer id="footer">
		<div class="container">
			<p class="to-top"><a href="#header">Back to top</a></p>
			<p><b>FreeNAS Distribution Center</b> is using <i>The LibraryBox Project</i> Software Licensed under GPLv2 and Content released under a Creative Commons NC-BY license.<br />
      <b>FreeNAS</b> itself is released under BSD License.</p>
			<small>See http://www.gnu.org/licenses/gpl-2.0.html and http://creativecommons.org/licenses/by-nc/4.0/ for license details.</small>
		</div>
	</footer>

	<script src="js/jquery.min.js"></script>
	<script src="js/main.js"></script>
<!--	<script src="js/files-top.js"></script> -->
	<script src="js/vc_tally.js"></script>
	<script src="js/bootstrap.min.js"></script>
</body>
</html>