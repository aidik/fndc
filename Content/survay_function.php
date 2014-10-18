<?php

require_once "survay_conf.php";


function survay_db_connect() {
  $config = survay_get_config();
  if ( ! $db = new PDO ( $config['SQLITE_FILE'] ) ) {
    print_r ( $db->errorInfo() ) ;
    die ( "Error, couldn't open database " );
  }
return $db;
}
function saveSurvay ( $post, $debug = false ) {

$clean_post =  sqlite_escape_array( $post );

$name = shorten(inp("Name", $clean_post), 255);
$email = shorten(inp("Email", $clean_post), 255);
$phone = shorten(inp("Phone", $clean_post), 30);
$system = shorten(inp("System", $clean_post), 1500);
$contact = inp("Contact", $clean_post, true);
$newsletter = inp("Newsletter", $clean_post, true);

if ( !$debug ) {
error_reporting(0);
}
$db = survay_db_connect();
$sth = $db->prepare ( 'INSERT OR IGNORE INTO results ( name, email, phone, system, contact, newsletter ) VALUES ( :name, :email, :phone, :system, :contact, :newsletter )');
  
  if ( !$sth ) {
    print_r ( $db->errorInfo());
    die ( "statement error" );
  }

$sth->bindParam ( ':name', $name );
$sth->bindParam ( ':email', $email );
$sth->bindParam ( ':phone' , $phone );
$sth->bindParam ( ':system', $system );
$sth->bindParam ( ':contact', $contact );
$sth->bindParam ( ':newsletter', $newsletter );


if ( ! $sth->execute () ) {
  if ( $debug )
    print_r ( $sth->errorInfo() );
  }
}



function sqlite_escape_array( $arr ) {

  foreach ( $arr as $key => $val )
    if ( is_string( $val ) )
      $arr[$key] = sqlite_escape_string( $val );

    else if ( is_array( $val ) )
      $arr[$key] = sqlite_escape_array( $val );

  return $arr;

}
 


function inp($name, $array, $bool = false){
  if (isset($array[$name]))
  {
    if ($bool == true)
    {
      if (strtolower($array[$name]) == "yes" || strtolower($array[$name]) == "true" || $array[$name] == 1 )
      {
        $check = true;
        //echo "SET BOOL FIELD: ".$check."<br>";
      }
      else
      {
        $check = false;
        //echo "SET BOOL FIELD: ".$check."<br>";
      }
    }
    else
    {
    $check = $array[$name];
    //echo "SET FIELD: ".$check."<br>";
    }
  }
  else
  {
    if ($bool == true)
    {
      $check = false;
      //echo "UNSET BOOL FIELD: ".$check."<br>";
    }
    else
    {
      $check = NULL;
      //echo "UNSET FIELD: ".$check."<br>";
    }
	
	//$check = "NotSet";	
  }
  return $check;
}

function shorten($str, $max)
{
  if (strlen($str) > $max)
  {
    return (substr($str, 0, $max));
  }
  else
  {
    return $str;
  }
}

?>
