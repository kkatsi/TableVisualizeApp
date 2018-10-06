<?php
header('Access-Control-Allow-Origin: *');

// sleep(3);


$list = array();

$dir          = "Jsons/"; //path

class obj{};


if (isset($_GET['title']))
    $items = $_GET['title'];
   
if ( isset($items) )
    echo file_get_contents('Jsons/' . $items . '.json');
else 
    if(is_dir($dir)){
        if($dh = opendir($dir)){
        while(($file = readdir($dh)) != false){
            
            $newobj = new obj;

            if($file == "." or $file == ".."){
                //...
            } else { //create object with two fields
                $newobj->title = substr($file, 0, -5);
                array_push($list, $newobj);
            }
        }
    }

    echo json_encode($list);
    }
?>