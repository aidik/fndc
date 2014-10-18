<?php
/******** Config File for download statistics *****/
// Everything must be inside the function, because within the dirlisting
// the globals term does not work correct :(
function survay_get_config () {
$config = array (
"SQLITE_FILE" => "sqlite:/opt/piratebox/share/survey_data.sqlite",
);
return $config ;
}
global $config;
?>