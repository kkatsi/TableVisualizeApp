<?php
   $json = $_POST['json'];

    $test = json_decode($json);

    echo $title = 'Jsons/' . $test->title . '.json';

   /* sanity check */
   if (json_decode($json) != null)
   {
     $file = fopen($title,'w+');
     fwrite($file, $json);
     fclose($file);
   }
   else
   {
     // user has posted invalid JSON, handle the error 
   }
?>