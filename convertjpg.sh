#!/bin/bash

# Das Zielverzeichnis für die konvertierten WebP-Dateien
output_dir="/home/peter/Bilder"

# Zielgröße für die WebP-Bilder (z.B., 800x600)
target_size="800x600"

# Qualitätseinstellung (0 bis 100, wobei 100 die beste Qualität ist)
quality=80

# Überprüfe, ob das Ausgabe-Verzeichnis existiert, andernfalls erstelle es
mkdir -p "$output_dir"

# Schleife durch alle JPEG-Dateien im aktuellen Verzeichnis
for jpg_file in *.jpg; do
  # Überprüfe, ob es sich um eine Datei handelt
  if [ -f "$jpg_file" ]; then
    # Definiere den Ausgabe-Dateinamen (WebP)
    webp_file="$output_dir/$(basename "$jpg_file" .jpg).webp"
    
    # Konvertiere das JPEG in WebP mit der Zielgröße und Qualitätseinstellung
    cwebp -resize "$target_size" -q "$quality" "$jpg_file" -o "$webp_file"
    
    echo "Konvertiere $jpg_file zu $webp_file"
  fi
done

echo "Konvertierung abgeschlossen."
