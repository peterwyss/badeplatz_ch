<?php
    $_url = "http://de.wikipedia.org/wiki/Hauptseite";

    $_buffer = implode('', file($_url));
    echo $_buffer;
 
?>
