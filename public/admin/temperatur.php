<?php
echo __FILE__;
$url = "https://hydroproweb.zh.ch/Listen/AktuelleWerte/AktWassertemp.html";
$response = file_get_contents($url);

if ($response === FALSE) {
    die('Fehler beim Abrufen der Webseite');
}

libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($response);
libxml_clear_errors();

$xpath = new DOMXPath($dom);
$table = $xpath->query('//table')->item(0);

if (!$table) {
    die('Tabelle nicht gefunden');
}

$rows = $table->getElementsByTagName('tr');
$data = array();

foreach ($rows as $row) {
    $cols = $row->getElementsByTagName('td');
    if ($cols->length > 0 && strpos($cols->item(0)->textContent, "Zürichsee-Oberrieden") !== false) {
        try {
            $ort = trim($cols->item(0)->textContent);
            $datum_uhrzeit = explode("\n", trim($cols->item(2)->textContent));
            $datum = count($datum_uhrzeit) > 1 ? trim($datum_uhrzeit[1]) : "Datum nicht verfügbar";
            $uhrzeit = count($datum_uhrzeit) > 0 ? trim($datum_uhrzeit[0]) : "Uhrzeit nicht verfügbar";
            $temperatur = trim($cols->item(3)->textContent);

            $data = array(
                'Ort' => $ort,
                'Datum' => $datum,
                'Uhrzeit' => $uhrzeit,
                'Temp. aktuell' => $temperatur
            );
        } catch (Exception $e) {
            echo "Fehler beim Verarbeiten der Zeile: ", $e->getMessage();
        }
        break;  // Da nur eine Zeile benötigt wird, kann die Schleife hier beendet werden
    }
}

// Speichern der aktuellen Temperatur von Oberrieden im JSON-Format
if (!empty($data)) {
    $json_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    file_put_contents('/home/httpd/vhosts/peter-wyss.ch/badeplatz.ch/puplic/admin/oberrieden_temperatur.json', $json_data);
    echo "Die aktuelle Temperatur von Oberrieden wurde in 'oberrieden_temperatur.json' gespeichert.";
} else {
    echo "Die gewünschte Zeile wurde nicht gefunden.";
}

?>
