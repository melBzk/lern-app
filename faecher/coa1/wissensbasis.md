# COA1 – Wissensbasis

Zusammenfassung der 12 Themenblöcke aus dem COA1-Inhaltsplan (PC-Technik: Hardware, Systemstart, Betriebssystem, Netzwerk und Sicherheit). Grundlage: **HERDT-Verlag, *PC-Technik – Grundlagen* (2020)**, Kapitel 2–21 (Seitenzahlen = PDF-Seiten), sowie der **COA1-Inhaltsplan** (Screenshots 23.11.2026). Begleitend: COA1_Lernquiz.html.
Als „Ergänzung“ markierte Punkte stammen nicht aus dem Buch; Themen, die nicht im Buch stehen, sind als **Platzhalter** markiert und werden nach dem Unterricht ergänzt **(Unterricht)**.

## 0. Prüfungsfallen & Selbstcheck (Blöcke 1–12)

### Zahlen, die man kennen muss

| Thema | Werte | Zusatz |
|---|---|---|
| Netzteil-Spannungen | 3,3 V · 5 V · 12 V | aus 230 V / 50 Hz Wechselspannung |
| Grafik-Leistung | PEG 75 W + 6-pol. 75 W + 8-pol. 150 W | normaler PCIe-Slot: 25 W |
| USB-Raten | 2.0: 480 Mbit/s · 3.0: 5 · 3.1: 10 · 3.2: 20 · USB4: 40 Gbit/s | USB 2.0 praktisch ≈ 37 MB/s |
| SATA | 150 · 300 · 600 MB/s | SATA-SSD praktisch ≈ 550 MB/s |
| RAM | DDR3 240 Pins 1,5 V · DDR4 288 Pins 1,2 V | 32-Bit-Grenze: 4 GB RAM |
| Formfaktoren | ATX 305×244 · µATX 244×244 · ITX 170×170 mm | E-ATX 305×330 mm (Server) |
| MBR vs. GPT | MBR: 2 TB, 4 primär · GPT: 128 Partitionen | GPT gehört zu UEFI |
| FAT32 | max. 4 GB pro Datei | größer → exFAT oder NTFS |
| IP | APIPA 169.254.x.x · privat 10. / 172.16–31. / 192.168. | IPv4 32 Bit · IPv6 128 Bit |

### Prüfungsfallen

- Von Neumann = **ein** Speicher für Daten und Programme; Harvard = getrennt.
- Höherer Takt ≠ automatisch schnellere CPU (Kerne, Cache, IPC zählen).
- LGA: Pins im Sockel · PGA: Pins an der CPU.
- Cache = SRAM · Arbeitsspeicher = DRAM.
- DDR3 passt nicht in DDR4-Slots (Kerbe).
- RAID ist kein Backup.
- Neue CPU auf altem Board → oft erst BIOS-Update.
- BIOS-Update nie unterbrechen; „Never touch a running system“.
- Clear CMOS / Batterie raus löscht auch BIOS-Passwörter.
- F8 für den abgesicherten Modus geht ab Windows 8 nicht mehr.
- FAT32: keine Dateien > 4 GB.
- 169.254.x.x = DHCP-Problem (APIPA).
- Inkrementell: alle Teilsicherungen nötig · differenziell: nur die letzte.
- Systemwiederherstellung ist keine Datensicherung.
- Wurm verbreitet sich selbst, Trojaner nicht.

### FALLE-Boxen aus den Blöcken

> **FALLE (Block 1):** **Harvard-Architektur** = getrennte Speicher für Daten und Programme. Von Neumann = **ein** gemeinsamer Speicher. Der Bus ist dort der Flaschenhals.

> **FALLE (Block 2):** Ein ATX-Board passt **nicht** in ein Mini-ITX-Gehäuse – umgekehrt passt Mini-ITX meist in ein ATX-Gehäuse.

> **FALLE (Block 4):** ESD-Schäden sind oft **unsichtbar** – ein Bauteil kann später ausfallen. Nylon-Kleidung erzeugt über 20.000 V.

> **FALLE (Block 5):** Cache = **SRAM**, Arbeitsspeicher = **DRAM** – nicht vertauschen. Flash ist **nicht flüchtig**, RAM schon.

> **FALLE (Block 6):** **RAID ersetzt kein Backup** – gelöschte oder verschlüsselte Dateien sind auf allen Platten gleichzeitig weg.

> **FALLE (Block 7):** **F8** beim Start funktioniert ab Windows 8 nicht mehr.

> **FALLE (Block 8):** Eine 6-GB-Datei passt **nicht** auf einen FAT32-Stick (max. 4 GB je Datei) – exFAT oder NTFS nehmen.

> **FALLE (Block 11):** RAID, Systemwiederherstellung und reine Cloud-Synchronisation sind **keine** Datensicherung. Bei Plattenfehlern zuerst lesbare Daten sichern, dann prüfen (chkdsk, **S.M.A.R.T.**).

> **FALLE (Block 12):** Wurm = verbreitet sich **allein**; Virus braucht eine Wirtsdatei; Trojaner verbreitet sich **nicht** selbst, sondern wird ausgeführt.

### MERKE-Boxen aus den Blöcken

> **MERKE (Block 1):** Touchscreen und Multifunktionsgerät sind **Ein- und Ausgabegeräte** zugleich. Ergonomischer Arbeitsplatz (Kap. 11.6): blendfrei, Bildschirmoberkante auf Augenhöhe, genug Abstand.

> **MERKE (Block 3):** USB arbeitet **seriell** mit Hub-Struktur – bis zu **127 Geräte** je Controller. Thunderbolt kennt nur die Kette (Daisy-Chain).

> **MERKE (Block 4):** Prüfung nach Reparatur (DIN VDE 0701-0702): **Sichtprüfung · Messung · Funktionskontrolle**.

> **MERKE (Block 8):** **NTFS** kann: Zugriffsrechte, Verschlüsselung (EFS, nicht in Home), Komprimierung, Kontingente, Journaling, Mounten. Linux: **ext4** · macOS: **APFS**.

> **MERKE (Block 11):** Inkrementell = schnell sichern, langsam wiederherstellen. Differenziell = umgekehrt.

### Kann ich das? – Selbstcheck

- EVA-Prinzip und Von-Neumann-Einheiten erklären
- Mainboard-Komponenten und Anschlüsse benennen
- Formfaktoren und Gehäuse zuordnen
- CPU-Einheiten (ALU, FPU, Steuerwerk, Cache) erklären
- CISC/RISC, Kerne/Threads, 64-Bit, Virtualisierung erklären
- USB-Versionen mit Datenrate nennen
- CPU auswählen, einbauen, Fehler eingrenzen
- RAM-Typen, Dual Channel, Cache-Hierarchie erklären
- HDD, SSD, NVMe vergleichen; RAID-Level nennen
- Startvorgang mit POST, CMOS, Bootreihenfolge beschreiben
- BIOS-Update vorbereiten und durchführen
- BIOS und UEFI, MBR und GPT vergleichen
- Windows-Architektur und Dateisysteme erklären
- Windows installieren und aktivieren
- IP-Einstellungen, DHCP, DNS, APIPA erklären
- Sicherungsarten und Strategien vergleichen
- Malware-Arten und Schutzmaßnahmen nennen
- Binärzahlen, Speichergrößen, Windows 11 → nach dem Unterricht **(Unterricht)**

### Offene Platzhalter (nach dem Unterricht ergänzen)

- Block 2: Binärzahlen (Bit und Byte · Umrechnung binär ↔ dezimal · Hexadezimal) **(Unterricht)**
- Block 2: Speichergrößen (Einheiten KB, MB, GB, TB · Faktor 1000 oder 1024 · Bit vs. Byte bei Datenraten) **(Unterricht)**
- Block 9: Windows 11 im Grafikmodus installieren (Mindestanforderungen · Ablauf · Unterschiede zu Windows 10) **(Unterricht)**

## 1. Block 1 – Computersystem und EVA

*Wie ein Computer grundsätzlich arbeitet – Minimales Computersystem · EVA-Prinzip · Ein- und Ausgabegeräte.*
Buch: Kap. 2.1–2.2 (S. 5–7) · Kap. 11 (S. 112–124)

> **KERN:** Jeder Computer arbeitet nach dem **EVA-Prinzip**: Eingabe → Verarbeitung → Ausgabe. Das Grundmodell dafür ist die **Von-Neumann-Architektur**.

### Das EVA-Prinzip

| Schritt | Bedeutung | Beispiele |
|---|---|---|
| **Eingabe** | Daten gelangen in den Rechner. | Tastatur, Maus, Scanner, Mikrofon |
| **Verarbeitung** | CPU rechnet mit Daten aus dem Arbeitsspeicher. | CPU, RAM |
| **Ausgabe** | Ergebnis wird sichtbar oder gespeichert. | Monitor, Drucker, Lautsprecher |

### Von-Neumann-Architektur – vier Funktionseinheiten

| Einheit | Aufgabe |
|---|---|
| **Rechenwerk** | ALU (rechnen, vergleichen), FPU (Kommazahlen), Register |
| **Steuerwerk** | steuert alle Abläufe, Befehlsdecoder |
| **Speicher** | **ein** gemeinsamer Speicher für Daten **und** Programme |
| **Ein-/Ausgabe** | Verbindung zur Außenwelt |

- Verbunden über den **Systembus** = Datenbus (bidirektional) + Adressbus + Steuerbus.
- Verarbeitung **streng nacheinander** (sequenziell).
- Rechen- und Steuerwerk sitzen im PC gemeinsam in der **CPU**; ihre Befehle bilden den **Befehlssatz**.

> **FALLE:** **Harvard-Architektur** = getrennte Speicher für Daten und Programme. Von Neumann = **ein** gemeinsamer Speicher. Der Bus ist dort der Flaschenhals.

### Ein- und Ausgabegeräte

| Gerät | Wichtig zu wissen |
|---|---|
| **Tastatur** | MF-102-Layout; Anschluss USB (Standard), PS/2 (lila), Bluetooth, Funk-Dongle (nicht Bluetooth-kompatibel) |
| **Maus / Trackball** | heute optisch oder Laser; Maus PS/2 = grün |
| **Scanner** | Hand-, Einzugs-, Flachbettscanner · Auflösung in **dpi** (optisch vs. interpoliert) · Treiberschnittstelle **TWAIN** |
| **Drucker** | Nadel (Durchschläge, laut) · Tinte (günstig in der Anschaffung, teure Tinte) · **Laser** (Xerografie, braucht RAM für die ganze Seite) · Thermosublimation (Foto) |
| **Monitor** | LCD: Diagonale in Zoll, Seitenverhältnis 16:9 / 16:10 / 21:9, Reaktionszeit (ms), Kontrast, Bildwiederholrate (Hz), Pixelfehler · Paneltypen TN, IPS, VA |

> **MERKE:** Touchscreen und Multifunktionsgerät sind **Ein- und Ausgabegeräte** zugleich. Ergonomischer Arbeitsplatz (Kap. 11.6): blendfrei, Bildschirmoberkante auf Augenhöhe, genug Abstand.

## 2. Block 2 – Mainboard, Gehäuse, Anschlüsse

*Externe Anschlüsse · Gehäuse · Hauptplatine · Komponenten · Binärzahlen · Speichergrößen.*
Buch: Kap. 2.3–2.13 (S. 8–30) · CPU-Grundlagen → Block 3 · Speichermedien → Block 6

> **KERN:** Das **Mainboard** verbindet alle Bauteile über Leiterbahnen und verteilt die Spannungen. Sein **Formfaktor** bestimmt, welches Gehäuse und Netzteil passt.

### Komponenten des Mainboards

| Komponente | Beschreibung |
|---|---|
| **CPU-Sockel** | **LGA** = Pins im Sockel (Intel) · **PGA** = Pins an der CPU (AMD bis AM4) |
| **RAM-Slots** | DIMM-Steckplätze, farbig für Dual Channel |
| **Chipsatz** | früher North-/Southbridge, heute **PCH**; RAM-Controller in der CPU |
| **BIOS/UEFI-Chip** | Flash-ROM mit Startroutinen, „flashbar“ |
| **PCIe-Slots** | x1 bis x16; PEG-Slot für Grafik (75 W) |
| **SATA · M.2** | Anschlüsse für Laufwerke und SSDs |
| **Stromanschlüsse** | 24-pol. ATX + 4/8-pol. CPU-Strom |
| **Front-Panel** | Einschalter, Reset, LEDs, Front-USB |

### Externe Anschlüsse (I/O-Blende)

| Anschluss | Zweck |
|---|---|
| **USB 2.0 / 3.x / USB-C** | Peripherie, Speicher |
| **RJ45** | Netzwerk (Gigabit-Ethernet) |
| **HDMI · DisplayPort · DVI** | Monitor, digital |
| **VGA** | Monitor, analog (alt) |
| **Klinke · S/PDIF** | Audio analog / digital |
| **PS/2** | grün = Maus, lila = Tastatur |
| eSATA · FireWire · seriell · parallel | veraltet („Legacy“) |

### Formfaktoren & Gehäuse

| Formfaktor | Maße | Einsatz |
|---|---|---|
| **E-ATX** | 305 × 330 mm | Server, 2 Sockel |
| **ATX** | 305 × 244 mm | Standard-PC |
| **microATX** | 244 × 244 mm | Büro-PC |
| **Mini-ITX** | 170 × 170 mm | Mini-PC, Thin Client |

- Gehäuse: Big-, Midi-, Mini-Tower, Desktop, ITX, **19-Zoll-Rack** (Höhe in HE).

> **FALLE:** Ein ATX-Board passt **nicht** in ein Mini-ITX-Gehäuse – umgekehrt passt Mini-ITX meist in ein ATX-Gehäuse.

### Netzteil (Kap. 2.12)

- Schaltnetzteil: 230 V Wechselspannung → Gleichspannung **3,3 V · 5 V · 12 V**.
- PEG-Zusatzstecker: 6-polig +75 W, 8-polig +150 W.

### USV (Kap. 2.13)

- Unterbrechungsfreie Stromversorgung: überbrückt Stromausfälle per Akku, Zeit zum sicheren Herunterfahren.

### Binärzahlen

> **PLATZHALTER:** **Nicht im Buch.** Nach dem Unterricht ergänzen: Bit und Byte · Umrechnung binär ↔ dezimal · Hexadezimal. **(Unterricht)**

### Speichergrößen

> **PLATZHALTER:** **Nicht im Buch.** Nach dem Unterricht ergänzen: Einheiten KB, MB, GB, TB · Faktor 1000 oder 1024 · Bit vs. Byte bei Datenraten. **(Unterricht)**

## 3. Block 3 – CPU und Schnittstellen

*Mikroprozessoren und externe Schnittstellen – Kernkomponenten CPU · Arbeitsweise · moderne CPUs · Hersteller · Technologie · Schnittstellen.*
Buch: Kap. 2.1, 2.6 (S. 5–6, 12–13) · Kap. 3 (S. 31–47) · Kap. 9 (S. 94–100)

> **KERN:** Die CPU-Leistung hängt **nicht nur vom Takt** ab, sondern auch von Kernen, Threads, Cache, Befehlen pro Takt und Architektur.

### Kernkomponenten der CPU

| Kürzel | Aufgabe |
|---|---|
| **IDU** | Befehlsdecoder: Befehl → Mikrocode |
| **EXU** | Ausführungseinheit |
| **COL** | Kontrolleinheit (Ablauf) |
| **BIL** | Bussteuereinheit |
| **ALU** | Rechnen (+ − × ÷) und Logik (UND, ODER, NICHT) |
| **FPU** | Fließkomma-Berechnungen |
| **DC / CC** | Daten- / Befehls-Cache |
| **Register** | kleinste, schnellste Speicher im Kern |

### Arbeitsweise

1. **Fetch** – Befehl holen
2. **Decode** – entschlüsseln
3. **Execute** – ausführen
4. **Write** – zurückschreiben

- **CISC**: großer Befehlssatz (x86/x64 – Intel, AMD) · **RISC**: wenige einfache Befehle (ARM).
- **Takt** in GHz = Referenztakt × Multiplikator; **Turbo** erhöht kurzzeitig.
- **Multicore** + **Hyper-Threading/SMT**: „8 Kerne / 16 Threads“.
- **64-Bit** (AMD64 2003, Intel64 2004) hebt die 4-GB-RAM-Grenze auf; braucht 64-Bit-Treiber.
- **Pipelining / superskalar**: mehrere Befehle überlappend bzw. pro Takt.

### Technologie

| Begriff | Bedeutung |
|---|---|
| **Fertigung** | Strukturbreite in nm; **Die** = nacktes Plättchen; **Heatspreader** = Metalldeckel |
| **TDP** | Abwärme in Watt – danach wird die Kühlung ausgelegt |
| **Virtualisierung** | Intel VT-x / AMD-V, im BIOS aktivieren |
| **Hypervisor** | **Typ 1** direkt auf Hardware (Hyper-V Server, ESXi) · **Typ 2** im OS (VirtualBox, VMware Workstation) |

### Moderne CPUs und Hersteller (Stand Buch 2020)

| Hersteller | Einstieg | Mittelklasse | Oberklasse | Server | Sockel (Buch) |
|---|---|---|---|---|---|
| **Intel** | Celeron, Pentium, Core i3 | Core i5 | Core i7, i9 | Xeon | LGA 1200 |
| **AMD** | Athlon, Ryzen 3 | Ryzen 5 | Ryzen 7, 9, Threadripper | EPYC | AM4 |

### Externe Schnittstellen

| Schnittstelle | Datenrate (theoretisch) | Bemerkung |
|---|---|---|
| **USB 1.1** | 12 Mbit/s | Plug & Play, Hot-Plugging |
| **USB 2.0** Hi-Speed | 480 Mbit/s | praktisch ca. 37 MB/s |
| **USB 3.0 / 3.1 Gen 1** | 5 Gbit/s | SuperSpeed |
| **USB 3.1 Gen 2** | 10 Gbit/s | SuperSpeedPlus, Kodierung 128b/130b |
| **USB 3.2** | 20 Gbit/s | doppelte Leitungen, USB-C |
| **USB4 · Thunderbolt 3** | 40 Gbit/s | USB-C-Stecker; Thunderbolt bündelt PCIe, DisplayPort, USB; Daisy-Chain |
| FireWire 400/800 · eSATA | 400/800 Mbit/s · wie SATA | veraltet |

> **MERKE:** USB arbeitet **seriell** mit Hub-Struktur – bis zu **127 Geräte** je Controller. Thunderbolt kennt nur die Kette (Daisy-Chain).

## 4. Block 4 – CPU einbauen und Fehler

*Prozessoren auswählen, installieren, Fehler beheben – Moderne CPUs · Technologie · Auswahl und Installation · Probleme · Fehlerbehebung.*
Buch: Kap. 2.7 (S. 14–17) · Kap. 3.4–3.6 (S. 40–47) · Kap. 13.1–13.2 (S. 136–139) · Einbau-Schrittfolge ergänzt (kein eigenes Buchkapitel)

> **KERN:** Eine CPU passt nur, wenn **Sockel** und **Chipsatz/BIOS-Version** des Mainboards sie unterstützen. Beim Einbau entscheiden ESD-Schutz, Ausrichtung und Wärmeleitpaste.

### Auswahlkriterien

- **Passt sie?** Sockel (z. B. LGA 1200, AM4) · **CPU Support List** des Boards · ggf. vorher BIOS-Update
- **Wofür?** Büro: i3/Ryzen 3 · Allround: i5/Ryzen 5 · Gaming/Video: i7, i9/Ryzen 7, 9 · Server: Xeon/EPYC
- **Was drumherum?** Kerne/Threads, Takt, Cache, TDP, integrierte Grafik ja/nein · Kühler und Netzteil passend

### Einbau Schritt für Schritt

1. Konfiguration dokumentieren, **Netzstecker ziehen**, Einschalter drücken (Restspannung).
2. **ESD-Schutz**: Erdungsarmband und Matte, sonst Heizkörper anfassen.
3. Sockelhebel öffnen, CPU **ohne Kraft** einsetzen – Dreieck auf Markierung.
4. Hebel schließen.
5. **Wärmeleitpaste** dünn auftragen, Kühler über Kreuz festschrauben.
6. Lüfter an **CPU_FAN**, 4/8-pol. CPU-Strom stecken.
7. Starten, im BIOS prüfen: CPU erkannt, Temperatur plausibel.

### Kühlung

- **Luft**: Kühlkörper + Lüfter, Heatpipes; passiv bis ca. 120 W TDP.
- **Wasser**: sehr starke Systeme, Übertakten (Overclocking).
- **Stromsparen**: Intel SpeedStep, AMD Cool’n’Quiet.

> **FALLE:** ESD-Schäden sind oft **unsichtbar** – ein Bauteil kann später ausfallen. Nylon-Kleidung erzeugt über 20.000 V.

> **MERKE:** Prüfung nach Reparatur (DIN VDE 0701-0702): **Sichtprüfung · Messung · Funktionskontrolle**.

### Probleme und Fehlerbehebung

| Symptom | Mögliche Ursache | Maßnahme |
|---|---|---|
| **Kein Bild, startet nicht** | CPU nicht unterstützt, BIOS zu alt, CPU-Strom fehlt | Support List prüfen, BIOS-Update, Stecker prüfen |
| **Pieptöne beim Start** | POST-Fehler | Beep-Code im Mainboard-Handbuch nachschlagen |
| **Abschalten unter Last** | Überhitzung | Paste, Kühlersitz, Lüfter prüfen; Temperatur im BIOS |
| **„CPU Fan Error“** | Lüfter falsch angeschlossen oder defekt | an CPU_FAN anschließen, Lüfter tauschen |
| **Langsam** | Thermal Throttling, Energiesparplan | Kühlung und Energieoptionen prüfen |
| **Verbogene Pins** | falsch eingesetzt | vorsichtig richten oder Teil tauschen |

## 5. Block 5 – Arbeitsspeicher und Cache

*Speichertechnologien, Arbeitsspeicher, Cache – Speichertechnologien · Arbeitsspeicher · Speicheroptimierung · Cache.*
Buch: Kap. 5 (S. 55–64) · Kap. 13.3 Arbeitsspeicher aufrüsten (S. 140)

> **KERN:** Programme werden zum Ausführen in den **RAM** geladen: Zugriff in **Nanosekunden** statt Millisekunden (Festplatte). RAM ist **flüchtig** – ohne Strom sind die Daten weg.

### Speichertechnologien

| Technik | Funktion | Einsatz |
|---|---|---|
| **DRAM** | Kondensator je Bit, braucht **Refresh**; günstig, hohe Dichte | → **Arbeitsspeicher** |
| **SRAM** | Flip-Flop je Bit, kein Refresh, sehr schnell, teuer | → **Cache** |
| **ROM / PROM / EPROM** | nur lesen · einmal programmierbar · per UV löschbar | – |
| **EEPROM / Flash** | elektrisch lösch- und beschreibbar | → BIOS-Chip, USB-Stick, SSD |

### Arbeitsspeicher (DDR-SDRAM)

| Typ | Kontakte | Spannung |
|---|---|---|
| **DDR3** | 240 (SO-DIMM 204) | 1,5 V · DDR3L 1,35 V |
| **DDR4** | 288 (SO-DIMM 260) | 1,2 V |

- **DDR** = Daten auf steigender **und** fallender Taktflanke.
- Generationen **nicht kompatibel** – Kerbe an anderer Stelle.
- **DIMM** Desktop · **SO-DIMM** Notebook.
- **ECC** (Fehlerkorrektur) und **Registered** (gepuffert) → Server; Chipsatz muss es können.
- **Timings** (z. B. CL16) in Takten: kleiner = schneller.

### Speicheroptimierung

- **Dual Channel**: 2 Module in den richtigen (farbigen) Slots → doppelte Bandbreite. Triple/Quad Channel: 3/4 Kanäle.
- Module am besten als **Kit** kaufen (gleiche Größe, Takt, Timings).
- Vorher im Mainboard-Handbuch prüfen: Typ, max. Ausbau, Takt.
- **XMP**-Profil im BIOS lädt den Herstellertakt.

### Cache-Speicher (Speicherhierarchie)

| Ebene | Größe |
|---|---|
| **Register** | Byte |
| **L1-Cache** | KB je Kern · Daten + Befehle |
| **L2-Cache** | 256 KB – MB je Kern |
| **L3-Cache** | mehrere MB, alle Kerne teilen |
| **Arbeitsspeicher (RAM)** | GB |

- Oben: schneller, kleiner, teurer. Die CPU sucht L1 → L2 → L3 → RAM.

> **FALLE:** Cache = **SRAM**, Arbeitsspeicher = **DRAM** – nicht vertauschen. Flash ist **nicht flüchtig**, RAM schon.

## 6. Block 6 – Massenspeicher und BIOS

*Speichermedien, Festplatten, Startvorgang, BIOS – Einteilung · Festplatten · Sorten und Funktion · Startvorgang · BIOS-Einstellungen · Vorarbeiten Update.*
Buch: Kap. 10 (S. 101–111) · Kap. 13.5 (S. 142) · Kap. 14.1–14.3 (S. 146–156)

> **KERN:** Massenspeicher halten Daten **dauerhaft**. Beim Einschalten prüft das BIOS/UEFI die Hardware (**POST**) und startet dann von einem bootfähigen Laufwerk.

### Einteilung von Speichermedien

| Klasse | Bedeutung | Beispiele |
|---|---|---|
| **Online** | ständig verfügbar, schnellster Zugriff | RAM, Festplatte, SSD, eingesteckter Stick |
| **Nearline** | bei Bedarf automatisch bereitgestellt | Bandroboter, Bandbibliothek |
| **Offline** | manuell eingelegt, Archiv | Band im Schrank, DVD, externe Platte |

- Nach Technik: **magnetisch** (HDD, Band) · **optisch** (CD, DVD, Blu-ray) · **Flash** (SSD, USB-Stick, SD-Karte).

### Festplatten – Sorten und Funktion

| Typ | Funktion | Vor- / Nachteile |
|---|---|---|
| **HDD** | rotierende Magnetscheiben, Kopf auf Luftpolster; Spuren, Sektoren, Zylinder | viel Platz günstig · langsam, stoßempfindlich (Head Crash) |
| **SATA-SSD** | NAND-Flash, keine Mechanik | schnell, leise, robust · max. ca. 550 MB/s (SATA 3 = 600 MB/s) |
| **M.2 NVMe** | Flash über PCIe | sehr schnell (mehrere GB/s) |
| **SSHD** | HDD + kleiner Flash-Cache | eingestellt |
| **SAS / Enterprise** | seriell, Punkt-zu-Punkt, für Dauerbetrieb | Server, höhere MTBF |

### RAID (Kap. 10.5)

- **RAID 0** Striping: schnell, keine Sicherheit
- **RAID 1** Spiegelung
- **RAID 5** Parität, mind. 3 Platten

### Bauformen

- 3,5″ Desktop-HDD · 2,5″ Notebook/SATA-SSD · M.2 (z. B. 2280)
- Schnittstellen SATA, M.2, U.2, SAS

> **FALLE:** **RAID ersetzt kein Backup** – gelöschte oder verschlüsselte Dateien sind auf allen Platten gleichzeitig weg.

### Startvorgang des Computers

1. Strom an → CPU startet an fester Adresse im **BIOS-ROM**.
2. **POST** (Power-On Self-Test): Hardware prüfen; kritischer Fehler = Abbruch, Pieptöne.
3. Einstellungen aus dem **CMOS** laden (Knopfzelle).
4. Plug & Play: Ressourcen verteilen.
5. **Bootreihenfolge** → Bootloader → Betriebssystem.

### BIOS-Einstellungen

- Aufruf: **Entf** oder **F2** · Bootmenü: F8/F11/F12 (je Hersteller)
- Datum/Zeit, Laufwerke (AHCI/RAID), **Bootreihenfolge**, Onboard-Geräte
- CPU/RAM: Virtualisierung, XMP · Energie: Wake-on-LAN
- **Hardware-Monitor**: Temperaturen, Spannungen, Lüfter
- **Passwörter**: Setup/Boot · CMOS-Batterie raus oder Jumper „Clear CMOS“ = Reset

### Vorarbeiten für ein BIOS-Update

1. **Grund?** „Never touch a running system“ – nur bei Fehler, neuer Hardware, Sicherheitslücke
2. **Board + Version:** Startbildschirm, BIOS, msinfo32, CPU-Z, Sandra
3. **Download:** nur passende Datei von der **Herstellerseite**, Readme lesen
4. **Absichern:** Einstellungen notieren, Strom sichern (Netzteil, USV)

## 7. Block 7 – BIOS-Update, UEFI, Booten

*Update per Bootmedium · Live-Update · Absturz · EFI · Booten · Startoptionen.*
Buch: Kap. 14.4–14.11 (S. 157–165)

> **KERN:** Ein BIOS-Update darf **nie unterbrochen** werden. **UEFI** ist der moderne Nachfolger des BIOS – grafisch, 64-Bit-fähig, mit GPT und Secure Boot.

### Drei Wege zum BIOS-Update

| Weg | Ablauf |
|---|---|
| **Bootmedium** | Stick bootfähig machen → Flash-Programm + BIOS-Datei drauf → Bootreihenfolge: Stick zuerst → Flash starten |
| **Im BIOS integriert** | z. B. EZ Flash, M-Flash: BIOS-Datei auf FAT32-Stick, im Setup auswählen |
| **Live-Update** | Herstellertool unter Windows sucht und installiert BIOS-/Treiber-Updates |

> **DANACH:** Neu starten, ins BIOS gehen, Einstellungen mit den Notizen vergleichen – oft auf Standard zurückgesetzt.

> **ABSTURZ:** Rettung: **Dual-BIOS**, Flashback-Taste, Recovery des Herstellers – im Notfall Chip tauschen oder Board einschicken.

### BIOS vs. UEFI

| Merkmal | BIOS (Legacy) | UEFI |
|---|---|---|
| **Alter / Technik** | ca. 40 Jahre, 16-Bit | moderner Standard (UEFI-Forum), 64-Bit-fähig |
| **Bedienung** | Textmenü, Tastatur | grafisch, auch Maus |
| **Partitionsstil** | **MBR**: max. 2 TB, 4 primäre Partitionen | **GPT**: sehr große Platten, 128 Partitionen |
| **Startdaten** | Bootsektor (MBR) | **EFI-Systempartition** (FAT32) |
| **Sicherheit / Extras** | – | **Secure Boot**, Netzwerk/Fernwartung, hohe Auflösung vor OS-Start; CSM emuliert Legacy |

### Booten von Windows

1. Firmware (BIOS/UEFI) → **Windows Boot Manager**
2. **BCD**-Speicher (Startkonfiguration) · bearbeiten mit **bcdedit** als Admin
3. **Winload.exe** lädt Kernel, Treiber, Registry
4. Kernel → Plug & Play → **Smss.exe** → Dienste
5. **Winlogon.exe** → Anmeldung

### Optionen des Systemstarts

- **Systemwiederherstellung**: Wiederherstellungspunkte, Befehl **rstrui**.
- **Erweiterter Start**: **Shift** + Neu starten oder Einstellungen → Wiederherstellung.
- Dort: Starteinstellungen (**abgesicherter Modus**), Starthilfe, Eingabeaufforderung, UEFI-Einstellungen.

> **FALLE:** **F8** beim Start funktioniert ab Windows 8 nicht mehr.

## 8. Block 8 – Betriebssysteme

*PC-Betriebssysteme – Übersicht · Windows · Eigenschaften · Architektur · Dateisysteme · Linux · andere.*
Buch: Kap. 15 (S. 166–177)

> **KERN:** Das Betriebssystem ist die **Schnittstelle** zwischen Hardware, Programmen und Benutzer. Auf PCs dominiert Windows; daneben UNIX-artige Systeme wie Linux und macOS.

### Übersicht

| System | Beispiele / Merkmale |
|---|---|
| **Windows** | Windows 10/11, Server · Marktführer, kommerziell · Version: **winver** |
| **Linux** | Ubuntu, openSUSE, Debian · Open Source, Kernel + Software = **Distribution** |
| **UNIX** | AIX, HP-UX, Solaris, BSD · Server, Workstations |
| **macOS** | nur auf Apple-Hardware, UNIX-Basis |

### Eigenschaften von Windows

- **Client-Server**: Clients nutzen Dienste des Servers (Benutzer, Dateien, Druck).
- **Präemptives Multitasking**: OS verteilt Rechenzeit.
- **Multithreading, SMP**: Last auf alle Kerne.
- **Multiuser**, Fernzugriff per **RDP**.

### Architektur

| Schicht | Inhalt |
|---|---|
| **Benutzermodus** | Anwendungen, Dienste – kein direkter Hardwarezugriff |
| **Kernelmodus** | Kernel, Treiber, Systemdienste |
| **HAL** | vermittelt zwischen Kernel und Hardware |
| **Hardware** | CPU, RAM, Geräte |

- Schutz: **UAC** (Rückfrage bei Admin-Aktionen), **DEP**, Registry als Konfigurationsdatenbank.

### Dateisysteme

| System | Max. Datei | Einsatz |
|---|---|---|
| **FAT32** | 4 GB | USB-Stick, EFI-Partition |
| **exFAT** | sehr groß | große Sticks, SD-Karten |
| **NTFS** | sehr groß | Windows-Systempartition |
| **ReFS** | sehr groß | Server, Pro for Workstations |

> **MERKE:** **NTFS** kann: Zugriffsrechte, Verschlüsselung (EFS, nicht in Home), Komprimierung, Kontingente, Journaling, Mounten. Linux: **ext4** · macOS: **APFS**.

### Linux

- Kernel von **Linus Torvalds**, an UNIX angelehnt, Quellcode offen.
- Vorteile: kostenlos, stabil, anpassbar; viele Server laufen unter Linux.

> **FALLE:** Eine 6-GB-Datei passt **nicht** auf einen FAT32-Stick (max. 4 GB je Datei) – exFAT oder NTFS nehmen.

## 9. Block 9 – OS installieren

*Betriebssystem installieren – PC vorbereiten · Installationsmethoden · Windows 11 im Grafikmodus · Aktivieren · Fehlerbehandlung.*
Buch: Kap. 16 (S. 178–183) – im Buch mit **Windows 10**

> **KERN:** Vor der Installation stehen **Bootreihenfolge**, **Partitionierung** und Datensicherung fest. Danach führt ein Setup-Assistent durch Installation, Ersteinrichtung und Aktivierung.

### PC für die Installation vorbereiten

- Bootreihenfolge: Stick/DVD **vor** der Festplatte – oder Bootmenü. Danach wieder Festplatte zuerst.
- **Partitionierung planen** (z. B. System + Daten); spätere Änderung nur umständlich.
- Daten sichern, Treiber und Lizenzschlüssel bereitlegen.
- Installationsmedium mit dem **Media Creation Tool** erstellen (USB oder ISO).

### Installationsmethoden

| Methode | Wann? |
|---|---|
| **Neuinstallation** | neuer PC, sauberer Neuanfang |
| **Upgrade** aus Windows | Programme und Daten bleiben |
| **Netzwerk / PXE** | viele PCs in Firmen |
| **Image / unbeaufsichtigt** | Rollout gleicher Systeme |

### Windows 11 im Grafikmodus installieren

> **PLATZHALTER:** **Nicht im Buch** (dort Windows 10, S. 180–181). Nach dem Unterricht ergänzen: Mindestanforderungen · Ablauf · Unterschiede zu Windows 10. **(Unterricht)**

### Ablauf laut Buch (Windows 10)

1. **Start** – vom Stick booten, Sprache, Tastatur
2. **Lizenz** – Schlüssel, Edition, Lizenz akzeptieren
3. **Ziel** – „Benutzerdefiniert“, Partition wählen
4. **Kopieren** – Dateien, mehrere Neustarts
5. **Einrichten** – Region, Netz, Konto, PIN, Datenschutz

### Windows aktivieren

- über das Internet, per **Produktschlüssel**, per im BIOS hinterlegtem **OEM**-Schlüssel oder digitaler Lizenz.
- Notlösung: telefonisch. Firmen: Volumenlizenz (KMS).
- Edition muss zur hinterlegten Lizenz passen.

### Fehlerbehandlung

| Problem | Lösung |
|---|---|
| **Bootet nicht vom Stick** | Bootreihenfolge/-menü, Stick neu erstellen |
| **Keine Festplatte sichtbar** | Controller-Treiber laden, SATA-Modus prüfen |
| **Zu wenig Platz** | Partition löschen/vergrößern, größere Platte |
| **Unklarer Fehler** | Protokolle Panther\setupact.log, setuperr.log |

## 10. Block 10 – Netzwerk und Internet

*Zugang zum Netzwerk und Internet – Gemeinsamkeiten aller Desktop-OS · Netzwerkverbindungen · Internetzugang · Internet Explorer.*
Buch: Kap. 17 (S. 184–194)

> **KERN:** Alle Desktop-Betriebssysteme sprechen **TCP/IP**. Jedes Gerät braucht eine eindeutige **IP-Adresse** – dazu Subnetzmaske, Gateway und DNS-Server.

### Die vier IP-Einstellungen

| Einstellung | Bedeutung | Beispiel |
|---|---|---|
| **IP-Adresse** | eindeutige Adresse im Netz | 192.168.1.20 |
| **Subnetzmaske** | trennt Netz- und Geräteteil | 255.255.255.0 = /24 |
| **Standardgateway** | Router ins Internet / andere Netze | 192.168.1.1 |
| **DNS-Server** | übersetzt Namen in IP-Adressen | www.herdt.com → IP |

### Netzwerkverbindungen einstellen

| Variante | Bedeutung |
|---|---|
| **DHCP** | Server (meist Router) vergibt alles automatisch aus einem Pool |
| **Statisch** | manuell – für Server, Drucker; Adressen planen |
| **APIPA** | kein DHCP-Server erreichbar → **169.254.x.x** |

- Einstellungen öffnen: **ncpa.cpl** → Adapter → Eigenschaften → IPv4.
- Private Bereiche: **10.0.0.0/8 · 172.16.0.0/12 · 192.168.0.0/16**.

### Arbeitsgruppe vs. Domäne

| Modell | Merkmale |
|---|---|
| **Arbeitsgruppe** | kleines Netz, jeder PC verwaltet sich selbst; Windows-Freigaben max. **20** gleichzeitige Verbindungen |
| **Domäne** | zentrale Verwaltung über Server (Active Directory); Beitritt mit Admin-Konto, Neustart |

### Internetzugang – Grundlagen

- DSL, Kabel, Glasfaser, Mobilfunk (LTE/5G) über einen **Provider** (ISP).
- **Router** verbindet LAN und Internet (NAT).
- Firmen: **Proxy**, **Firewall**, **DMZ** (Pufferzone für Web-/Mail-Server).

> **VERALTET:** Das Buch zeigt die Einrichtung im **Internet Explorer** (Proxy, Startseite). Der IE wird seit 2022 nicht mehr unterstützt – heute **Edge**, Firefox, Chrome; Proxy zentral unter Einstellungen → Netzwerk und Internet → Proxy.

> **ERGÄNZUNG:** Diagnose-Befehle: ipconfig /all · ipconfig /release + /renew · ping · tracert · nslookup

## 11. Block 11 – Datensicherung

*Datensicherung durchführen – Sicherungsarten und -strategien · Windows-Bordmittel · Image-Sicherung.*
Buch: Kap. 19 (S. 205–217) · Kap. 20 Datenrettung (S. 218–224)

> **KERN:** Regelmäßige Sicherung schützt vor Datenverlust durch Defekte, Schadsoftware oder Bedienfehler. Entscheidend sind **Strategie** und eine **getestete Wiederherstellung**.

### Sicherungsarten – alles hängt am Archivbit

| Art | Was wird gesichert? | Archivbit | Wiederherstellung braucht |
|---|---|---|---|
| **Vollsicherung** | alle Daten | zurückgesetzt | nur die letzte Vollsicherung |
| **Inkrementell** | Änderungen seit der **letzten Sicherung** | zurückgesetzt | Voll + **alle** Inkremente seitdem |
| **Differenziell** | Änderungen seit der **letzten Vollsicherung** | **bleibt gesetzt** | Voll + **letzte** differenzielle |

> **MERKE:** Inkrementell = schnell sichern, langsam wiederherstellen. Differenziell = umgekehrt.

### Strategien

| Tag | Variante A | Variante B |
|---|---|---|
| **So** | Voll | Voll |
| **Mo–Fr** | inkrementell | differenziell |

- **Generationenprinzip**: Großvater (Monat) – Vater (Woche) – Sohn (Tag).
- Medien: externe Platte, NAS, Cloud, Band.
- **Datei-Sicherung** vs. **Image** (ganze Partition inkl. OS) – Image ist nach Totalausfall viel schneller zurück.
- *Ergänzung*: **3-2-1-Regel** – 3 Kopien, 2 Medien, 1 außer Haus/offline.

### Windows-Bordmittel

| Werkzeug | Zweck |
|---|---|
| **Dateiversionsverlauf** | persönliche Dateien regelmäßig, ältere Versionen |
| **Sichern und Wiederherstellen (Windows 7)** | Dateisicherung + **Systemabbild** |
| **Wiederherstellungslaufwerk** | Stick zum Starten und Reparieren |
| **Systemwiederherstellung** | Systemzustand zurück – **kein** Backup |

### Image mit Drittherstellerprogramm

- Acronis, Macrium Reflect, Veeam Agent: Images, zeitgesteuert, inkrementell, bootfähiges **Rettungsmedium**.

> **FALLE:** RAID, Systemwiederherstellung und reine Cloud-Synchronisation sind **keine** Datensicherung. Bei Plattenfehlern zuerst lesbare Daten sichern, dann prüfen (chkdsk, **S.M.A.R.T.**).

## 12. Block 12 – Schadsoftware

*Vor Schadsoftware schützen – Grundsätzliches · Antivirenprogramme · Windows-Sicherheit · Test · Client/Server-Antivirus.*
Buch: Kap. 21 (S. 225–233)

> **KERN:** Schadsoftware gelangt unbemerkt auf den PC, verbreitet sich, manipuliert oder spioniert. Schutz = **Virenschutz + Updates + Firewall + Backups + vorsichtiges Verhalten**.

### Arten von Schadsoftware

| Art | Merkmal |
|---|---|
| **Virus** | hängt sich an Dateien, verbreitet sich beim Ausführen |
| **Wurm** | verbreitet sich **selbstständig** übers Netz |
| **Trojaner** | tarnt sich als nützliches Programm, öffnet Hintertür |
| **Ransomware** | verschlüsselt Daten, erpresst Lösegeld |
| **Spyware · Keylogger** | spioniert Daten und Eingaben aus |
| **Rootkit** | tief im System oder BIOS versteckt |
| **Bot / Botnetz** | ferngesteuert für Spam, DDoS |
| **Scareware · Hoax** | falsche Warnung zum Kauf · Kettenbrief |

### Antivirenprogramme verwenden

- Erkennung: **Signaturen** (bekannte Muster) und **Heuristik** (verdächtiges Verhalten); **Echtzeitschutz**.
- Signaturen **ständig aktuell** halten; nur **ein** Scanner mit Echtzeitschutz.
- Unabhängige Tests: BSI, AV-TEST, Fachmagazine.

### Vorgehen bei Infektion

1. Vom Netz trennen
2. Von schreibgeschütztem **Notfallmedium** starten
3. Scannen, bereinigen, wichtige Daten sichern
4. Im Zweifel neu installieren, Passwörter ändern

### Windows-Sicherheit

- **Microsoft Defender**: Echtzeitschutz, Schnell-/Voll-/Offline-Scan – heute konkurrenzfähig.
- **Defender Firewall**, SmartScreen, Gerätesicherheit (TPM, Secure Boot).
- **Überwachter Ordnerzugriff** gegen Ransomware.
- Dazu: Windows Update, UAC, Standardbenutzer statt Admin.

### Testen & zentral verwalten

| Begriff | Bedeutung |
|---|---|
| **EICAR-Testdatei** | harmlose Zeichenfolge, die jeder Scanner als „Virus“ meldet |
| **Client/Server-AV** | Server holt Updates, Admin gibt frei, alle Clients erhalten sie automatisch |

> **ERGÄNZUNG:** **Phishing**: gefälschte Mails/Seiten stehlen Zugangsdaten – häufigster Einstiegsweg.

> **FALLE:** Wurm = verbreitet sich **allein**; Virus braucht eine Wirtsdatei; Trojaner verbreitet sich **nicht** selbst, sondern wird ausgeführt.


---

# Teil 2 – Kapitel 9 & 11: Externe Schnittstellen · Ein- und Ausgabegeräte

Zusammenfassung aus HERDT, *PC-Technik – Grundlagen* (2020), Kap. 9 (S. 94–100) und Kap. 11 (S. 112–124), ergänzt um die Unterrichts-Mitschrift „Hardware, Software“. Inhalte aus dem Unterricht sind mit **(Unterricht)** markiert.

## 20. Prüfungsfallen & Selbstcheck (Kap. 9 & 11)

### Prüfungsfallen
- PS/2: **Grün = Maus, Lila = Tastatur**.
- PS/2 ist **nicht** Hot-Plugging-fähig, USB schon.
- Geräteanzahl: **USB 127 · FireWire 63 · Thunderbolt 7**.
- Mbit/s ÷ 8 ≈ MB/s – USB 2.0 = 480 Mbit/s ≈ 40 MB/s.
- **Aktiver Hub** = eigenes Netzteil; **passiver Hub** = Strom vom PC.
- USB 2.0 liefert 500 mA (2,5 W), USB 3.0 900 mA.
- eSATA liefert **keinen** Strom.
- Funk-Dongle ist **nicht** Bluetooth-kompatibel.
- Interpolierte dpi sagen nichts über die Qualität.
- Laserdrucker = dokumentenecht, Tinte und Thermopapier nicht.
- Subpixel = Rot, Grün, Blau (**RGB**) · Druckfarben = **CMYK**.
- VGA ist analog, DVI/HDMI/DisplayPort digital.
- **VA** = bester Kontrast, **IPS** = beste Farben, **TN** = schnell und günstig.
- WLAN ist eine Technik, keine Netzwerkgröße.

### Übung Kapitel 9 (Buch S. 100)
1. Welche Schnittstellen werden bevorzugt für eine Tastatur verwendet? → USB (Standard), außerdem Bluetooth/Funk; früher PS/2
2. Welche Farbe hat der PS/2-Anschluss für die Maus? → Grün
3. Auf welcher Übertragungstechnik beruht USB? → Serielle Übertragung (Universal Serial Bus)
4. Wie viele Geräte können an USB angeschlossen werden? → bis zu 127
5. Mit welcher Geschwindigkeit arbeitet Thunderbolt 3? → bis zu 40 Gbit/s
6. Welche USB-Versionen sind heute marktüblich? → USB 2.0, USB 3.x (3.0/3.1/3.2), USB4 – meist mit USB-C

### Übung Kapitel 11 (Buch S. 124)
1. Welche drei Typen von Scannern unterscheidet man? → Hand-, Einzugs- und Flachbettscanner
2. Welche Farbe hat der PS/2-Anschluss für die Tastatur? → Lila (violett)
3. Wie lassen sich Mäuse und Tastaturen anschließen? → PS/2, USB, Bluetooth oder Funkempfänger (USB-Dongle)
4. Welche Typen von Mäusen werden unterschieden? → mechanische (Kugel) und optische (LED/Laser)
5. Welcher Druckertyp eignet sich für Durchschläge? → Nadeldrucker

### Abgleich Mitschrift ↔ Buch
| In der Mitschrift | Richtig (laut Buch) |
|---|---|
| Passiver Hub = externe Stromversorgung | **Aktiver** Hub hat das eigene Netzteil; der passive bekommt Strom nur vom USB-Anschluss (S. 97). |
| Ein Pixel = 3 Punkte (rot, gelb, blau) | Subpixel sind **Rot, Grün, Blau** (RGB). Drucker mischen dagegen mit Cyan, Magenta, Gelb, Schwarz (CMYK). |
| Tintendrucker-Farben: schwarz, gelb, blau, rot | Fachbegriffe: **Cyan** (Blau), **Magenta** (Rot), **Gelb**, **Schwarz** (S. 117). |
| Laserdrucker: schnell, nicht die beste Qualität | Das Buch nennt hohe Druckqualität (≥ 1.200 dpi); nur echter Fotodruck geht nicht (S. 117). |
| PAN: Bluetooth, RFID, EFC | gemeint ist vermutlich **NFC** (Near Field Communication). |
| Cloud = Festplatte übers Netzwerk (z. B. NAS) | Ein **NAS** steht im eigenen Netz; die **Cloud** ist Speicher bei einem Anbieter im Internet. Beides ist Speicher übers Netzwerk. |

### Kann ich das?
- Geräte nach EVA einordnen
- Legacy-Schnittstellen nennen
- USB-Versionen mit Raten und Steckertypen erklären
- USB, FireWire, Thunderbolt, eSATA, USB4 vergleichen
- Tastatur- und Maus-Anschlüsse nennen
- Scannertypen, dpi, TWAIN erklären
- Druckertypen mit Einsatzgebiet zuordnen
- Monitor-Kennzahlen und Panels erklären
- Prüfzeichen CE, GS, TCO, Energy Star erklären

## 21. EVA-Prinzip und Geräteüberblick (Unterricht)

> **KERN:** Kleinste Definition eines Computers: **CPU + RAM**. Alles andere ordnet man nach dem EVA-Prinzip ein: **Eingabe → Verarbeitung → Ausgabe**. Was keiner Gruppe zugeordnet ist, fällt unter „Sonstiges“ (Netzwerk, Speicher, Verbindungen).

| Eingabe | Verarbeitung | Ausgabe | Sonstiges |
|---|---|---|---|
| Tastatur, Maus, Touchpad | Mainboard (verbindet alle Komponenten) | Monitor (CRT, LCD …) | Router, Modem |
| Scanner, Webcam | CPU | Drucker, 3D-Drucker | Netzwerke: PAN, LAN, WLAN … |
| Mikrofon, Headset | RAM, ROM | Lautsprecher (Bananenstecker, USB), Kopfhörer, Headset | Kabel (Kupfer, Glasfaser) |
| Kartenleser (meist USB): SD-Karten, Magnetkarten, RFID-Chips | GPU / Grafikkarte | Beamer | USB / USB-C, SD-Port |
| Controller / Joystick (z. B. Flugsimulator) | Soundkarte | VR-Brille | Speichermedien (SSD …) |
| Touchscreen*, Stifteingabe, Grafiktablet | Optische Prozessoren (Co-Prozessor) | Braille-Gerät | RFID |
| Sensoren, Biosensoren | Lüfter, Kühler (aktiv/passiv) | Roboter (z. B. Schweißroboter) | |

Touchscreen (und Headset) sind **Ein- und Ausgabegerät** zugleich.

### Massendatenträger – vom Lochstreifen bis heute (Unterricht)
- **magnetisch:** Diskette · HDD · Magnetband
- **optisch:** CD · DVD · Blu-ray
- **Flash:** SSD · USB-Stick · Speicherkarte
- **historisch:** Lochstreifen
- **über Netzwerk:** NAS im eigenen Netz · Cloud über das Internet

### Was ist eine Schnittstelle? (Buch S. 94)
- **Schnittstelle (Interface):** Übergabepunkt, an dem zwei eigenständige Komponenten verbunden werden.
- **Software-Schnittstelle:** z. B. **API** (Application Programming Interface).
- **Hardware-Schnittstelle:** verbindet Komponenten des Computers, z. B. USB, PS/2, HDMI.

> **MERKE:** Bei Schnittstellen unterscheidet man die **theoretische** (maximale) und die **praktische** Übertragungsrate. Die praktische ist immer deutlich niedriger.

## 22. Legacy-Schnittstellen (Kap. 9.1)

> **KERN:** USB ist seit Jahren die wichtigste Schnittstelle für externe Geräte. Legacy-Schnittstellen sind veraltet.

| Schnittstelle | Zweck früher |
|---|---|
| **Seriell (RS-232)** | Modem, Maus, Geräte |
| **Parallel (IEEE 1284)** | Drucker |
| **PS/2** (IBM Personal System/2) | Tastatur und Maus |

- „Legacy“ = Hinterlassenschaft: aus Kompatibilitätsgründen lange „mitgeschleppt“, heute durch USB ersetzt.

### PS/2
- **Grün = Maus · Lila = Tastatur**
- neue Boards: höchstens ein **Kombi-Anschluss**; für beide Geräte ein Y-Adapter
- PS/2 ↔ USB per Adapter, wenn das Gerät beide Protokolle versteht
- **(Unterricht)** PS/2 ist **nicht Hot-Plugging-fähig**: Gerät nicht im laufenden Betrieb ein- oder ausstecken, sonst Neustart nötig

## 23. USB – Universal Serial Bus (Kap. 9.2)

> **KERN:** USB: seriell, Plug & Play, Hot-Plugging, bis zu **127 Geräte**.

- **Seriell:** Daten Bit für Bit; „Bus“ = gemeinsame Verbindung
- **127 Geräte:** jedes bekommt automatisch eine eigene Geräte-ID
- **Baumstruktur:** über Hubs erweiterbar; Host-Controller (Master) steuert Geräte (Slaves)
- **Plug & Play + Hot-Plugging:** im laufenden Betrieb an- und abstecken, wird automatisch erkannt

| Version | Name | seit | theoretisch | praktisch (Buch) |
|---|---|---|---|---|
| **USB 1.1** | Low Speed / Full Speed | 1996/98 | 1,5 / 12 Mbit/s | ca. 180 kB/s / 1,5 MB/s |
| **USB 2.0** | Hi-Speed | 2002 | 480 Mbit/s | ca. 37–40 MB/s |
| **USB 3.0 = 3.1 Gen 1** | SuperSpeed | 2010 | 5 Gbit/s | ca. 450 MB/s |
| **USB 3.1 (Gen 2)** | SuperSpeedPlus | – | 10 Gbit/s | ca. 800 MB/s |
| **USB 3.2** | – | 2018 | 20 Gbit/s | ca. 1.600 MB/s |
| **USB4** | – | ab 2021 | 40 Gbit/s | – |

- **Wie wurde es schneller?** USB 3.1: höherer Takt + effizientere Kodierung **128b/130b** statt 8b/10b · USB 3.2: **doppelte** Hochgeschwindigkeitsleitungen
- **USB OTG (On-the-Go):** zwei Geräte direkt koppeln, z. B. USB-Stick am Smartphone (Adapterkabel)
- **USB Wireless:** kabellos, 480 Mbit/s – hat sich nie durchgesetzt (Bluetooth, USB 3)

### Kabel und Strom
| | USB 1.x / 2.0 | USB 3.0 |
|---|---|---|
| **Adern** | 4 (2 Strom, 2 Daten) | 9 |
| **Strom** | 5 V · max. **500 mA = 2,5 W** | max. **900 mA** |

- USB 1.x/2.0: **Twisted-Pair**-Kabel. Low Speed (Maus, Tastatur): ungeschirmt reicht; schnellere Modi brauchen **geschirmte** Kabel.
- 2,5″-Festplatten an USB 2.0: oft **Y-Kabel** (Strom von zwei Ports). Ab USB 3.0 genügt einer.
- Drucker, Scanner, Kameras bringen eigene Stromversorgung mit.

### Stecker
- **Typ A** = am Computer · **Typ B** = am Gerät (Drucker, 3,5″-Festplatte)
- **Mini-USB** und **Micro-USB** für kleine Geräte; per Adapter kompatibel
- **USB-C:** oval, 24-polig, verdrehsicher; für USB 3.1/3.2, Thunderbolt, USB4
- Alte Stecker passen in USB-3.0-Buchsen. Der neue **USB-3.0-B-Stecker** passt nur in neue Buchsen – ein USB-3.0-Gerät am USB-2.0-PC braucht daher ein herkömmliches USB-Kabel.

### USB-Hubs
- **Aktiver Hub:** eigenes **Netzteil** – für stromhungrige Geräte
- **Passiver Hub:** Strom nur **vom PC-Anschluss** – reicht für Maus und Tastatur
- An einem USB-2.0-Hub lassen sich Low-, Full- und Hi-Speed-Geräte ohne Nachteil mischen; USB-3.0-Geräte laufen dort nur im **Hi-Speed**-Modus.

## 24. FireWire, Thunderbolt, eSATA, USB4 (Kap. 9.3–9.6)

| Schnittstelle | Geschwindigkeit | Geräte | Besonderheiten |
|---|---|---|---|
| **FireWire (IEEE 1394)** | 400 Mbit/s (≈ 40 MB/s) · 800 Mbit/s (≈ 80 MB/s) | bis 63, Kette | 1995 von Apple, bei Sony „i.Link“ · Geräte tauschen Daten **ohne PC** direkt aus · Hot-Plugging · Video-/Audiobereich · FW400-Kabel 4- oder 6-adrig (6 = mit Strom), max. 4,5 m · FW800 9-adrig, per Adapter kombinierbar · veraltet (Apple wechselte zu Thunderbolt) |
| **Thunderbolt** | TB1: 2 × 10 · TB2: 20 · **TB3: 40 Gbit/s** | bis 7, Kette (Daisy-Chain) | Intel + Apple, Codename „Light Peak“, 2011 · bündelt **USB, DisplayPort und PCIe** in einem Kabel · **schnellste** externe Schnittstelle · Stecker anfangs = **Mini-DisplayPort**, heute **USB-C** · Adapter zu DP, DVI, HDMI, VGA · Kupfer 3 m, Glasfaser 10 m · Kabel mit aktiver Elektronik (ca. 5× USB-3.0-Preis) |
| **eSATA** | 150–600 MB/s (wie SATA) | 1 | nach außen geführtes SATA, besser geschirmt, eigener Stecker (SATA-Kabel passt nicht) · **liefert keinen Strom** · Hot-Plugging oft problematisch · durch USB verdrängt |
| **USB4** | 40 Gbit/s | Hub-Struktur | aus Thunderbolt 3 entstanden + USB-Hubstruktur · kompatibel zu Thunderbolt 3 und USB 3 |

> **FALLE:** **Thunderbolt** kennt nur die **Kette**, **USB/USB4** die **Hub-/Baumstruktur**. FireWire: max. **63** Geräte, Thunderbolt: **7**, USB: **127**.

> **FALLE:** Mbit/s ≠ MB/s: 480 **Mbit**/s (USB 2.0) sind nur rund 40 **MB**/s. Kleines b = Bit, großes B = Byte.

## 25. Tastatur, Maus, Trackball (Kap. 11.1–11.2)

> **KERN:** Tastatur und Maus werden heute per **USB**, **Bluetooth** oder **Funk-Dongle** angeschlossen.

### 11.1 Tastatur
- Standard: **MF-102** (Multifunktion, 102+ Tasten); früher PC/XT mit 83–86 Tasten.
- Blöcke: **alphanumerischer Block** (wie Schreibmaschine) · **Ziffernblock** (wie Taschenrechner) · Cursor-Steuerung · **Funktionstasten** F1–F12.
- Status-LEDs: Num-Lock, Umschalt-Feststelltaste, Rollen.
- Ergonomie: **Natural Keyboard** (geteilt, V-förmig) schont Handgelenke; Sondertastaturen für Linkshänder, Sehbehinderte.
- Treiber nur für programmierbare Zusatztasten nötig.

| Anschluss | Einsatz |
|---|---|
| **PS/2** | ältere PCs; oft nur eine Kombi-Buchse |
| **USB** | aktueller Standard |
| **Bluetooth** | schnurlos |
| **Funk-Dongle** (USB) | schnurlos, **nicht** Bluetooth-kompatibel |

### 11.2 Maus und Trackball
- **Mechanisch (alt):** Gummikugel → zwei Wellen → Lochrädchen → Lichtschranke · verschmutzt leicht
- **Optisch / Laser (heute):** Sensor tastet die Oberfläche ab · keine Mechanik · Laser = präziser · Auflösung oft umschaltbar
- **Trackball:** Kugel oben, mit Daumen oder Fingern bewegt; Gerät bleibt stehen → wenig Platz, schont Arm und Handgelenk.
- **Mehrere Funkgeräte im Büro:** auf genug Funkkanäle achten, sonst steuert eine Maus mehrere PCs.
- **Sicherheit:** Funksignale können ausgespäht werden.
- **(Unterricht)** Weitere Anschlusswege für Eingabegeräte: Radiowellen (Funk), Infrarot, Bluetooth.

## 26. Scanner (Kap. 11.3)

> **KERN:** Scanner digitalisieren Papiervorlagen; vergleichen sollte man nur die **optische** Auflösung.

| Typ | Funktion | Vor- / Nachteile |
|---|---|---|
| **Handscanner** | wird von Hand über die Vorlage gezogen | breite Vorlagen in Streifen („Stitching“) → oft unbrauchbar, kaum noch genutzt |
| **Einzugsscanner** | Vorlage wird wie beim Drucker eingezogen | wenig Platz, saubere Ergebnisse · keine Bücher oder dicken Vorlagen |
| **Flachbettscanner** | Vorlage liegt auf Glas, Scaneinheit fährt darunter | auch Bücher möglich · braucht Platz · oft Kombigerät mit **ADF** (automatischer Einzug) |

- **Auflösung in dpi:** dots per inch (1 Zoll = 2,54 cm) · **optisch** = echt · **interpoliert** = „erraten“ (Mittelwerte), bringt keine Qualität
- **TWAIN:** „Technology Without An Interesting Name“ – Standardtreiber, jedes TWAIN-Programm kann jeden Scanner nutzen
- **Farbtiefe:** Scanner 30–42 Bit, Software meist 24 Bit; Überschuss gleicht Bildrauschen aus
- **Durchlichteinheit:** für Dias und Negative – Vorlage wird von hinten durchleuchtet · Tempo hängt von Auflösung, Schnittstelle (USB, im Kombigerät Netzwerk) und Mechanik ab

> **FALLE:** Höher scannen als die optische Auflösung bringt nichts – nur größere Dateien. Ein Bildpunkt auf dem Monitor besteht aus drei Subpixeln: **Rot, Grün, Blau** (RGB). In der Mitschrift steht „rot, gelb, blau“.

## 27. Drucker (Kap. 11.4)

> **KERN:** Jeder Druckertyp hat ein Einsatzgebiet: **Nadel** für Durchschläge, **Laser** fürs Büro, **Tinte** für Farbe und Fotos zuhause, **Thermosublimation** für Fotos in höchster Qualität und Spezialdruck.

| Drucker | Funktionsweise | Typisch / Merkmale | Dokumentenecht? |
|---|---|---|---|
| **Typenrad- / Kugelkopf** (Unterricht) | mechanisch: Rad bzw. Metallkugel mit Buchstaben dreht sich, ein Hammer schlägt durch das Farbband | historisch, nur Text | – |
| **Nadeldrucker** | 9, 18 oder 24 Nadeln drücken durch ein Farbband (Punktmatrix); Tempo in CPS (50–500 Zeichen/s) | laut, robust, günstig im Betrieb · **Durchschläge, Endlospapier** (Arztpraxis, Spedition) | – |
| **Laserdrucker** | **Xerografie:** Trommel wird geladen → Laser entlädt Stellen → Toner haftet → auf Papier übertragen → mit Druck und **Hitze fixiert** → Trommel gereinigt (Resttonerbehälter) | schnell, leise, ≥ 1.200 dpi, günstig pro Seite · Farblaser: 4 Toner (CMYK) · braucht **RAM** für die ganze Seite | ja (auch bei Nässe) |
| **Tintenstrahl** | feine Tintentröpfchen aus Düsen; Farben **CMYK** (Cyan, Magenta, Gelb, Schwarz), Foto: + Foto-Magenta, Foto-Türkis | günstig in der Anschaffung, teure Tinte · Düsen verkleben bei seltener Nutzung · Druckkopf mit Patrone (HP) oder fest im Gerät (Canon) (Unterricht) | nein |
| **Thermosublimation** | Farbfolie wird erhitzt, Farbe wird gasförmig und zieht ins Spezialpapier; 256 Stufen je Farbe | Fotos in höchster Qualität · teuer pro Seite · (Unterricht) auch Tassen, T-Shirts, Planen | ja |
| **Thermotransfer / Thermo** (Unterricht) | hitzeempfindliches Spezialpapier wird dunkel | Kassenzettel · wartungsarm, keine Tinte/Toner · verblasst bei Sonne/Hitze, nicht ins Altpapier | nein |
| **Wachsdrucker** (Unterricht) | wie Tinte, aber festes Wachs wird geschmolzen und aufgespritzt | glänzende, sehr farbstarke Ausdrucke | – |
| **3D-Drucker** (Unterricht) | schichtweiser Aufbau, meist geschmolzenes Granulat/Filament | auch innen komplexe Strukturen möglich | – |

### Entscheidungskriterien beim Druckerkauf (Buch S. 118)
| Typ | Anschaffung | Kosten/Seite | Tempo | Lärm | Foto |
|---|---|---|---|---|---|
| **Nadel** | hoch | sehr gering | langsam | hoch | – |
| **Laser** | niedrig | gering | schnell | gering | – |
| **Farblaser** | mittel–sehr hoch | gering–mittel | mittel | gering | mittel |
| **Tinte** | niedrig | hoch | mittel–schnell | gering | gut |
| **Thermosubl.** | hoch | sehr hoch | langsam | gering | sehr gut |

### Rechenbeispiel: RAM im Laserdrucker (Buch S. 117)
- A4, schwarz-weiß, 1.200 dpi: **8,27 × 1.200 × 11,69 × 1.200 ≈ 139 Mio. Punkte**
- 1 Punkt = 1 Bit → ÷ 8 = 17,4 Mio. Byte → ÷ 1.024 ÷ 1.024 ≈ **16,6 MB**
- A4 = 210 × 297 mm = 8,27 × 11,69 Zoll · Farblaser: 192–512 MB

> **MERKE:** Günstige Tintendrucker mit nur einer CMY-Patrone mischen Schwarz → Farbstich und dreifacher Verbrauch. Besser: **CMYK** mit einzeln tauschbaren Tanks.

> **(Unterricht)** Alle Drucker haben Sperren, z. B. gegen das Drucken von **Banknoten** (3D-Drucker: keine Waffen).

## 28. Monitor und Beamer (Kap. 11.5)

> **KERN:** Der **LCD**-Monitor hat den Röhrenmonitor (**CRT**: groß, schwer, stromhungrig, Strahlung; Entsorgung nur über Fachbetrieb wegen Vakuum) ersetzt. Wichtige Kennzahlen: **Diagonale** (Zoll), **Seitenverhältnis**, **native Auflösung**, **Reaktionszeit**, **Kontrast** und Panel-Typ.

- **Größe:** Diagonale in Zoll, üblich 24″–30″
- **Seitenverhältnis:** früher 4:3 · heute 16:9, 16:10 · 21:9 = Ultrawide, oft **Curved**
- **Auflösung:** Pixel Breite × Höhe, z. B. 1024 × 768 = 786.432 · LCD in **nativer** Auflösung betreiben, sonst kleines Bild oder unscharfe Skalierung
- **Bildwiederholrate:** LCD flimmert nicht · ab 59 Hz, Gaming bis 240 Hz
- **Reaktionszeit:** Pixel schwarz → weiß → schwarz · <2–16 ms · zu langsam = Schlieren
- **Kontrast:** hellster zu dunkelster Pixel · TN/IPS 1000:1 · VA 3000:1
- **Sichtwinkel:** Farbe ändert sich, wenn man schräg schaut
- **Strom & Strahlung:** nur Hintergrundlicht (Kaltkathode oder **LED**) · keine schädliche Strahlung

### Panel-Typen
| Panel | Stärken | Schwächen |
|---|---|---|
| **TN** | günstig, schnell, sparsam · Office, einfache Spiele | Farbtreue, Blickwinkel |
| **IPS** | sehr gute Farbtreue, großer Blickwinkel | mehr Strom, teurer, langsamer als TN |
| **VA** | bester Schwarzwert, höchster Kontrast | oft träge → weniger für schnelle Spiele |

Varianten: TN (STN, DSTN, TSTN) · IPS (S-IPS, AH-IPS …) · VA (PVA, MVA)

### So funktioniert LCD
Flüssigkristalle zwischen zwei um **90° gedrehten Polarisationsfiltern**. Ohne Spannung drehen die Kristalle das Licht um 90° → **heller** Pixel. Mit Spannung richten sie sich aus, das Licht wird geschluckt → **dunkler** Pixel. **OLED** leuchtet selbst, braucht kein Hintergrundlicht.

### Pixelfehler (ISO 9241)
| Typ | Fehler |
|---|---|
| 1 | Pixel immer hell |
| 2 | Pixel immer dunkel |
| 3 | Subpixel (R, G, B) defekt |

Fehlerklasse **0** = keine Fehler erlaubt · Klasse I–IV = immer mehr Fehler je 1 Mio. Pixel erlaubt. Gut: Klasse 0 oder I.

### Anschlüsse
**VGA** analog (Qualitätsverlust durch Umwandlung) → **DVI** digital → heute **HDMI** und **DisplayPort**, auch **USB-C**. Adapter gibt es in jede Richtung.

### Kaufkriterien
Größe · Auflösung · Schaltzeit < 12 ms · Pixelfehlerklasse 0/I · Helligkeit > 300 cd · Kontrast ≥ 800:1 · Blickwinkel > 170° · digitaler Anschluss · Pivot (90° drehbar)

> **(Unterricht)** **Beamer:** starke Lichtquelle projiziert das Bild. Die Lampen haben eine begrenzte Lebensdauer (Betriebsstunden) und müssen getauscht werden.

## 29. Der ergonomische Arbeitsplatz (Kap. 11.6)

### Normen und Prüfzeichen
| Zeichen | Bedeutung |
|---|---|
| **CE** | erfüllt EU-Vorschriften zur elektromagnetischen Verträglichkeit (EMV) |
| **GS** | „geprüfte Sicherheit“ nach Produktsicherheitsgesetz, ISO 9241, Unfallvorschriften – **freiwillig** |
| **TÜV** | prüft Sicherheit, Funktion, Qualität, Umwelt, Bedienbarkeit |
| **TCO** | Monitor: flimmerfrei, gleichmäßig ausgeleuchtet, reflexionsarm, max. 15 W im Stand-by |
| **ISO 9241** | Regeln für die Mensch-Maschine-Interaktion – ergonomische Bildschirmarbeit |
| **Energy Star** | US-Stromsparzeichen: automatischer Stand-by, max. 30 W im Stand-by |

### Ozon durch Laserdrucker
Entsteht bei der Ladung der Trommel · Grenzwert **0,1 ppm** · Aktivkohlefilter regelmäßig tauschen · ältere Drucker nicht direkt am Arbeitsplatz, gut lüften · neue Geräte „ozonfrei“.

### Lärmschutz
Dämmmaterial im Gehäuse · Silent-Lüfter, passive Kühlung, lüfterlose Netzteile · Laufwerke mit Gummipuffern entkoppeln · **Acoustic Management** der Festplatte (leiser, aber langsamer) · wenige große, langsame Lüfter · Wasserkühlung · „Silent-PC“.

> **MERKE:** Bildschirm blendfrei aufstellen, Oberkante auf Augenhöhe, genug Abstand · ergonomische Tastatur und Maus/Trackball schonen Handgelenke.

## 30. Netzwerk und Software (Unterricht)

### Ausdehnung von Netzwerken (Unterricht)
| Netz | Name | Ausdehnung |
|---|---|---|
| **PAN** | Personal Area Network | ca. 10 m · Bluetooth, NFC, RFID |
| **LAN** | Local Area Network | ein Gebäude |
| **CAN** | Campus Area Network | Firmengelände |
| **MAN** | Metropolitan Area Network | Stadt/Region |
| **WAN** | Wide Area Network | Länder |
| **GAN** | Global Area Network | weltweit |

- **WLAN** ist eine **Technik** (kabelloses LAN per Funk), keine Ausdehnung.
- **Router** verbindet zwei Netzwerke (z. B. Fritzbox: Heimnetz ↔ Internet).
- **Kabel:** Kupfer oder Lichtwellenleiter (Glasfaser).
- **Fritzbox:** Fax, NAS-Festplatte und Drucker anschließbar, **VPN** für Zugriff von unterwegs, **Gastnetz** (nur Internet, Bandbreite begrenzbar – als Anbieter haftet man).

### Software-Begriffe (Unterricht)
| Begriff | Bedeutung |
|---|---|
| **Betriebssystem** | verwaltet Hardware und Programme |
| **GUI** | grafische Benutzeroberfläche |
| **API** | Programmierschnittstelle zwischen Programmen |
| **KI / AI** | künstliche Intelligenz |
| **BIOS** | Firmware, startet den PC |
| **OCR** | Texterkennung aus Scans |
