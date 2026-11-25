# COA1 – Wissensbasis

Gegliedert nach den **Kapiteln des Buchs** HERDT, *PC-Technik – Grundlagen* (2020): Die Nummer vor jedem Abschnitt ist die Kapitelnummer im Buch (Seitenzahlen = PDF-Seiten). Kapitel, die im Kurs nicht drankommen (4, 6, 7, 8, 12, 18, 20), fehlen. Inhalte aus dem Unterricht ohne Buchkapitel stehen am Ende (90–92) und sind mit **(Unterricht)** markiert.

## 0. Prüfungsfallen & Selbstcheck – Kapitel 2–21

### Zahlen, die man kennen muss

| Thema | Werte | Zusatz |
|---|---|---|
| Netzteil-Spannungen | 3,3 V · 5 V · 12 V | aus 230 V / 50 Hz Wechselspannung |
| Grafik-Leistung | PEG 75 W + 6-pol. 75 W + 8-pol. 150 W | normaler PCIe-Slot: 25 W |
| USB-Raten | 2.0: 480 Mbit/s · 3.0 (= 3.2 Gen 1): 5 · 3.1 Gen 2 (= 3.2 Gen 2): 10 · USB 3.2 Gen 2x2: 20 · USB4: 40 Gbit/s | USB 2.0: theoretisch 480 ÷ 8 = 60 MB/s, praktisch ≈ 37–40 MB/s |
| SATA | 150 · 300 · 600 MB/s | SATA-SSD praktisch ≈ 550 MB/s |
| RAM | DDR3 240 Pins 1,5 V · DDR4 288 Pins 1,2 V (SO-DIMM 260; Buch S. 60 nennt 256 – Druckfehler) | 32-Bit-Grenze: 4 GB RAM |
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

### FALLE-Boxen aus den Kapiteln

> **FALLE (Kap. 2):** **Harvard-Architektur** = getrennte Speicher für Daten und Programme. Von Neumann = **ein** gemeinsamer Speicher. Der Bus ist dort der Flaschenhals.

> **FALLE (Kap. 2):** Ein ATX-Board passt **nicht** in ein Mini-ITX-Gehäuse – umgekehrt passt Mini-ITX meist in ein ATX-Gehäuse.

> **FALLE (Kap. 13):** ESD-Schäden sind oft **unsichtbar** – ein Bauteil kann später ausfallen. Nylon-Kleidung erzeugt über 20.000 V.

> **FALLE (Kap. 5):** Cache = **SRAM**, Arbeitsspeicher = **DRAM** – nicht vertauschen. Flash ist **nicht flüchtig**, RAM schon.

> **FALLE (Kap. 10):** **RAID ersetzt kein Backup** – gelöschte oder verschlüsselte Dateien sind auf allen Platten gleichzeitig weg.

> **FALLE (Kap. 14):** **F8** beim Start funktioniert ab Windows 8 nicht mehr.

> **FALLE (Kap. 15):** Eine 6-GB-Datei passt **nicht** auf einen FAT32-Stick (max. 4 GB je Datei) – exFAT oder NTFS nehmen.

> **FALLE (Kap. 19):** RAID, Systemwiederherstellung und reine Cloud-Synchronisation sind **keine** Datensicherung. Bei Plattenfehlern zuerst lesbare Daten sichern, dann prüfen (chkdsk, **S.M.A.R.T.**).

> **FALLE (Kap. 21):** Wurm = verbreitet sich **allein**; Virus braucht eine Wirtsdatei; Trojaner verbreitet sich **nicht** selbst, sondern wird ausgeführt.

### MERKE-Boxen aus den Kapiteln

> **MERKE (Kap. 11):** Touchscreen und Multifunktionsgerät sind **Ein- und Ausgabegeräte** zugleich. *Ergänzung (nicht im Buch):* Bildschirm blendfrei aufstellen, Oberkante etwa auf Augenhöhe, genug Abstand.

> **MERKE (Kap. 9):** USB arbeitet **seriell** mit Hub-Struktur – bis zu **127 Geräte** je Controller. Thunderbolt kennt nur die Kette (Daisy-Chain).

> **MERKE (Kap. 13):** Prüfung nach Reparatur (DIN VDE 0701-0702, Stand Buch): **Sichtprüfung · Messung · Funktionskontrolle**. Seit 2021: DIN EN 50678 (VDE 0701) und DIN EN 50699 (VDE 0702), die drei Teilprüfungen bleiben (Ergänzung, nicht aus Buch/Unterricht).

> **MERKE (Kap. 15):** **NTFS** kann: Zugriffsrechte, Verschlüsselung (EFS, nicht in Home), Komprimierung, Kontingente, Journaling, Mounten. Linux: **ext4** · macOS: **APFS**.

> **MERKE (Kap. 19):** Inkrementell = schnell sichern, langsam wiederherstellen. Differenziell = umgekehrt.

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
- Binärzahlen umrechnen, Speichergrößen (1000 vs. 1024, Bit vs. Byte) unterscheiden
- Mindestanforderungen von Windows 11 nennen

### Vorläufig ergänzte Themen (nach dem Unterricht abgleichen)

- Kap. 16: Windows 11 im Grafikmodus installieren – Buch zeigt nur Windows 10, vorläufig ergänzt *(Ergänzung)*
- Abgeglichen: Abschnitt 91 (Binärzahlen und Speichergrößen) mit dem Unterricht vom 24.11. – siehe Lernmodule „Binärzahlen“ und „Speichergrößen“.

## 1. Prüfungsfallen & Selbstcheck – Kapitel 9 und 11

### Prüfungsfallen
- PS/2: **Grün = Maus, Lila = Tastatur**.
- PS/2 ist **nicht** Hot-Plugging-fähig, USB schon.
- Geräteanzahl: **USB 127 · FireWire 63 · Thunderbolt 7** (Thunderbolt laut Buch S. 98; Intel nennt 6 je Anschluss plus Host).
- Mbit/s ÷ 8 = MB/s (theoretisch): USB 2.0 = 480 Mbit/s = 60 MB/s. In der Praxis bleiben wegen Protokoll-Overhead nur ca. 37–40 MB/s übrig.
- **Aktiver Hub** = eigenes Netzteil; **passiver Hub** = Strom vom PC.
- USB 2.0 liefert 500 mA (2,5 W), USB 3.0 900 mA.
- eSATA liefert **keinen** Strom.
- Funk-Dongle ist **nicht** Bluetooth-kompatibel.
- Interpolierte dpi sagen nichts über die Qualität.
- Laserdrucker = dokumentenecht, Tinte und Thermopapier nicht.
- Subpixel = Rot, Grün, Blau (**RGB**) · Druckfarben = **CMYK**.
- VGA ist analog, DVI-D/HDMI/DisplayPort digital.
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
| Laserdrucker: schnell, nicht die beste Qualität | Das Buch nennt hohe Druckqualität (≥ 1.200 dpi); nur echter Fotodruck geht nicht (S. 117). ⚠ Achtung: Im Unterricht hieß es „nicht so die beste Qualität“. Für die Klausur: Laserdrucker = schnell, leise, hohe Druckqualität für Text und Grafik; für **Fotos** ist ein Tintenstrahldrucker besser (S. 117). |
| PAN: Bluetooth, RFID, EFC | gemeint ist vermutlich **NFC** (Near Field Communication). |
| Cloud = Festplatte übers Netzwerk (z. B. NAS) | Ein **NAS** steht im eigenen Netz; die **Cloud** ist Speicher bei einem Anbieter im Internet. Beides ist Speicher übers Netzwerk. |
| Maus: früher Laser/mit Kugel, heute LED | Früher **Kugel** (mechanisch); heute **optisch** – mit LED **oder Laser** (Laser = präziser, S. 114). |
| Nadeldrucker: 9 oder 24 Nadeln | Buch: 9, 18 oder 24 Nadeln (S. 116). |
| Thermotransferdrucker für Kassenzettel | Kassenzettel entstehen im **Thermodirektdruck** auf Thermopapier; Thermotransfer (mit Farbband, z. B. Etiketten) ist ein anderes Verfahren (Ergänzung, nicht im Buch). |

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

## 2. Kap. 2 – Hauptplatine, Netzteil und Gehäuse (S. 5–30)

> **KERN:** Jeder Computer arbeitet nach dem **EVA-Prinzip**: Eingabe → Verarbeitung → Ausgabe. Das Grundmodell dafür ist die **Von-Neumann-Architektur**.

### Das EVA-Prinzip

| Schritt | Bedeutung | Beispiele |
|---|---|---|
| **Eingabe** | Daten gelangen in den Rechner. | Tastatur, Maus, Scanner, Mikrofon |
| **Verarbeitung** | CPU rechnet mit Daten aus dem Arbeitsspeicher. | CPU, RAM |
| **Ausgabe** | Ergebnis wird sichtbar oder gespeichert. | Monitor, Drucker, Lautsprecher |

### Von-Neumann-Architektur – vier Funktionseinheiten + Bussystem

> **MERKE:** **Vier Funktionseinheiten + Bussystem = fünf Bestandteile.** Das Buch (S. 5) zählt vier Funktionseinheiten und nennt das Bussystem als „weitere wichtige Komponente“. Fragt die Klausur nach den Teilen des **Von-Neumann-Rechners**, nenne alle fünf; fragt sie nach der **CPU**, sind es drei (Steuerwerk, Rechenwerk, Speicher = Register und Cache – siehe Lernmodul „Kernkomponenten der CPU“).

| Einheit | Aufgabe |
|---|---|
| **Rechenwerk** | ALU (rechnen, vergleichen), FPU (Kommazahlen), Register |
| **Steuerwerk** | steuert alle Abläufe, Befehlsdecoder |
| **Speicher** | **ein** gemeinsamer Speicher für Daten **und** Programme |
| **Ein-/Ausgabe** | Verbindung zur Außenwelt |

- Verbunden über den **Systembus** (= Bussystem, der fünfte Bestandteil) = Datenbus (bidirektional) + Adressbus + Steuerbus.
- Verarbeitung **streng nacheinander** (sequenziell).
- Rechen- und Steuerwerk sitzen im PC gemeinsam in der **CPU**; ihre Befehle bilden den **Befehlssatz**.
- **Flaschenhals** ist das Bussystem: Vor und nach jedem Schritt werden dieselben Leitungen genutzt. Abhilfe: Register und Cache-Ebenen, mehrere Kerne (Buch S. 5).

### Kernkomponenten der CPU (Buch S. 6)

| Kürzel | Name | Aufgabe |
|---|---|---|
| **IDU** | Instruction Decode Unit | Befehlsdecoder: übersetzt Befehle in **Mikrocode** |
| **EXU** | Execution Unit | Ausführungseinheit: führt den Mikrocode aus |
| **COL** | Control Logic | Kontrolleinheit: kontrolliert den Ablauf |
| **BIL** | Bus Interface Logic | Bussteuereinheit: überwacht und steuert den Bus |
| **ALU** | Arithmetic Logic Unit | rechnet (+ − × ÷) und verknüpft logisch (UND, ODER, NICHT) |
| **FPU** | Floating Point Unit | Fließkomma-Berechnungen |
| **DC** | Data Cache | schneller Zwischenspeicher für **Daten** |
| **CC** | Code Cache | schneller Zwischenspeicher für **Befehle** |

- **Rechenwerk** = ALU + FPU + **Register** · **Steuerwerk** (= Leitwerk) = die Kontrolleinheiten.
- Unterricht: CPU-Komponenten = **Steuerwerk, Rechenwerk, Speicher** (Cache/Register).

### Bussystem (Kap. 2.2, Buch S. 7)

| Bus | Richtung | Aufgabe |
|---|---|---|
| **Datenbus** | **bidirektional** | transportiert die Daten · Busbreite 8/16/32/**64** Leitungen → 64 Bit = **8 Byte** gleichzeitig |
| **Adressbus** | unidirektional (von der CPU weg) | spricht eine Baugruppe über ihre **Adresse** an (Unterricht: „wie eine Hausnummer“) |
| **Steuerbus** | unidirektional (von der CPU weg) | legt fest, ob die Baugruppe **Sender oder Empfänger** ist (Unterricht: „wann“) |

- Leistung des Datenbusses = **Busbreite × Takt**. 1 Hz = 1 Takt pro Sekunde, 1 MHz = 1.000.000 Hz.

![Von-Neumann-Architektur: vier Funktionseinheiten und der Systembus (Buch S. 5–7)](faecher/coa1/bilder/von-neumann.svg)

> **FALLE:** **Harvard-Architektur** = getrennte Speicher für Daten und Programme. Von Neumann = **ein** gemeinsamer Speicher. Der Bus ist dort der Flaschenhals.

> **KERN:** Das **Mainboard** verbindet alle Bauteile über Leiterbahnen und verteilt die Spannungen. Sein **Formfaktor** bestimmt, welches Gehäuse und Netzteil passt.

### Aufbau moderner Hauptplatinen (Kap. 2.3, Buch S. 8–9)

- **Platine** = Trägerplatte aus Kunstharz, Fiberglas oder Carbon mit **mehreren Schichten Leiterbahnen** aus Kupfer, Silber oder Gold.
- Früher brauchte jede Funktion eine eigene Steckkarte, heute sind Grafik, Sound, Netzwerk usw. meist **onboard** (oder in der CPU). Onboard-Grafik ist schwächer als eine Grafikkarte.
- **Aufgaben des Mainboards:** Versorgungsspannungen verteilen · Leiterbahnen für Daten und Steuersignale · Sockel, Steckplätze und Schnittstellen bereitstellen · Standardgeräte (Maus, Tastatur) anschließen.
- Einbau: ohne Kraft und mechanische Spannung, vorgesehenes Montagematerial, ESD-Schutz (sonst Mikrorisse in der Platine).

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

### Prozessorsockel (Buch S. 10)

| Sockeltyp | Kontakte | Hinweis |
|---|---|---|
| **PGA** (Pin Grid Array) | **Pins an der CPU**, Löcher im Sockel | Pins verbiegen leicht · bei AMD als **PGA-ZIF** (Zero Insertion Force = ohne Kraft einsetzen), z. B. AM4 |
| **BGA** (Ball Grid Array) | kleine **Lotperlen** an der CPU | robust, für sehr viele Kontakte · meist **fest aufgelötet, nicht tauschbar** (z. B. Laptops) *(Ergänzung)* |
| **LGA** (Land Grid Array) | **Kontaktflächen** an der CPU, **Federn im Sockel** | alle aktuellen Intel-Desktop-CPUs, AMD Threadripper |

- Takt der CPU = **Referenztakt × Multiplikator**, z. B. 100 MHz × 44 = **4,4 GHz** (Buch S. 15).
- Seit ca. 2008 sitzt der **Speichercontroller in der CPU**; seit 2011 enthalten **die meisten** CPUs auch die übrigen Northbridge-Funktionen (Buch S. 10). Einen Front Side Bus gibt es nicht mehr.
- Intel-Namen: **K** = übertaktbar (freier Multiplikator) · **T** = stromsparend · erste Ziffer(n) = Generation, z. B. i9-**8**950HK = 8. Generation, i9-**10**900K = 10. Generation.

### Chipsatz (Kap. 2.5, Buch S. 11–12)

| Architektur | Aufbau |
|---|---|
| **Bridge** (älteste) | **Northbridge** für schnelle Teile (RAM, Grafik), über den **FSB** an der CPU · **Southbridge** für langsame Teile (Laufwerke, USB, Sound …) |
| **Hub** | Northbridge heißt **MCH** (Memory Controller Hub, mit Grafik: GMCH), Southbridge heißt **ICH** (I/O Controller Hub) |
| **Erweiterte Hub** | Speicher- und Grafikcontroller **in der CPU**, MCH + ICH in **einem** Chip („Einchip-Chipsatz“) |
| **PCH** (heute) | **Platform Controller Hub** – modular; der Chipsatz bestimmt Funktionen wie Übertakten (z. B. Intel Z270 ja, B250 nein), Anzahl USB-, SATA-, M.2-Anschlüsse |

- Unterricht: Es gibt immer einen **schnellen Bereich** (CPU, RAM, Grafik = „North“) und einen **langsamen Bereich** (Festplatten, Laufwerke, BIOS = „South“). Wo Daten schnell fließen müssen, gibt es mehr Busleitungen.
- Der **BIOS-Chip** (S. 19) gehört nicht zum Chipsatz, ist aber unverzichtbar: Das BIOS ist die **erste Software** nach dem Einschalten. Die CPU startet an einer festen Speicherzelle – deshalb muss das BIOS in einem **ROM** liegen (heute Flash, „flashbar“).

### Steckplätze (Kap. 2.9, Buch S. 19–21)

- **RAM-Slots:** ein **Steg** verhindert falsche Module. Für **Dual Channel** zwei Module in die **gleichfarbigen** Slots, am besten als abgestimmtes **Kit** (Unterricht: sonst laufen alle Module nur so schnell wie das langsamste).
- **PCI** (1995–2003): **paralleler Bus**, alle Karten teilen sich ca. 133 MB/s · **AGP**: Grafik, Punkt-zu-Punkt, seit ca. 2006 veraltet · **ISA**: uralt.
- **PCIe**: **Punkt-zu-Punkt**; jede Verbindung heißt **Lane**, Slots mit **x1, x4, x8, x16** Lanes. PCIe 3.x ist noch Standard (Buch 2020), x16 ≈ 15,75 GB/s.
- **SATA** (S. 21): SATA I **150 MB/s** · SATA II **300 MB/s** · SATA III **600 MB/s** – abwärtskompatibel; ausgeschöpft nur von SSDs.

### Externe Anschlüsse (I/O-Blende)

| Anschluss | Zweck |
|---|---|
| **USB 2.0 / 3.x / USB-C** | Peripherie, Speicher |
| **RJ45** | Netzwerk (Gigabit-Ethernet) |
| **HDMI · DisplayPort · DVI** | Monitor, digital |
| **VGA** | Monitor, analog (alt) |
| **Klinke · S/PDIF** | Audio analog / digital |
| **PS/2** | grün = Maus, lila = Tastatur |
| **Seriell (RS-232) · Parallel (IEEE 1284) · PS/2** | „Legacy“-Schnittstellen (Buch S. 94) |
| eSATA · FireWire | veraltet, durch USB/Thunderbolt verdrängt (kein „Legacy“ im Sinne des Buchs) |

- Beim ATX-Board sind die externen Anschlüsse **auf der Platine aufgelötet** (I/O-Panel) und direkt von außen erreichbar (S. 22).
- Unterricht: USB wird heute auf **USB-C** vereinheitlicht (für Altgeräte Adapter); Sound früher Klinke („AUX“), heute oft USB; FireWire (Kamera) und eSATA (externe Platten) sind durch USB ersetzt; WLAN-Karten führen ein Antennenkabel nach außen.

> **FALLE:** Im Unterricht (24.11.) hieß es „DisplayPort ist Nachfolger von HDMI“. Das stimmt nicht: **HDMI und DisplayPort sind zwei parallele digitale Standards** (HDMI v. a. für Fernseher, DisplayPort v. a. für PC-Monitore). Abgelöst haben beide den analogen **VGA** und den **DVI**-Anschluss.

### Formfaktoren & Gehäuse

| Formfaktor | Maße | Einsatz |
|---|---|---|
| **E-ATX** | 305 × 330 mm | Server, 2 Sockel |
| **ATX** | 305 × 244 mm | Standard-PC |
| **microATX** | 244 × 244 mm | Büro-PC |
| **Mini-ITX** | 170 × 170 mm | Mini-PC, Thin Client |

- Weitere (Buch S. 23): Flex-ATX 229 × 191 mm, Nano-ITX 120 × 120 mm, **BTX** (sollte ATX ablösen, 2007 vom Markt genommen).
- Der **Formfaktor** legt Maße, Lage der Bauteile und Schnittstellen fest – und damit **Gehäuse und Netzteil**.
- **ATX** (1996, Nachfolger von Baby-AT): **Zonenmodell** mit genormten Maßen und Befestigungslöchern → jedes ATX-Board passt in jedes ATX-Gehäuse; verpolungssicherer Stromstecker; Temperatur- und Lüfterüberwachung (zu heiß → Abschaltung).
- **microATX** behält Steckplatz- und Anschlusspositionen von ATX → passt in ATX-Gehäuse; enger, schlechtere Kühlung, weniger Steckplätze.

### Gehäuse (Buch S. 24–25)

| Gehäuse | passende Boards | Einsatz |
|---|---|---|
| **Big Tower** | Extended-ATX, ATX | Server, Workstations |
| **Midi Tower** | microATX, ATX | Bürorechner |
| **Mini Tower** | microATX, microBTX | Büro-/Schreibtischrechner |
| **Desktop** (liegend) | microATX, ATX | Schreibtisch, HTPC |
| **ITX** | Mini-ITX | kleiner Schreibtischrechner |
| **Rack 19″** | microATX, ATX | Server im Schrank, Höhe in **HE** (Höheneinheiten), ab 1 HE |

> **FALLE:** Ein ATX-Board passt **nicht** in ein Mini-ITX-Gehäuse – umgekehrt passt Mini-ITX meist in ein ATX-Gehäuse.

### Netzteil (Kap. 2.12)

- Schaltnetzteil: 230 V Wechselspannung → Gleichspannung **3,3 V · 5 V · 12 V**.
- PEG-Zusatzstecker: 6-polig +75 W, 8-polig +150 W (Unterricht: die Grafikkarte hat einen eigenen Stromanschluss, weil sie viel Strom braucht).
- **Nie öffnen oder reparieren** – im Netzteil liegen lebensgefährliche Spannungen. Immer komplett tauschen (S. 25).

### USV (Kap. 2.13)

- Unterbrechungsfreie Stromversorgung: überbrückt Stromausfälle per Akku, Zeit zum sicheren Herunterfahren.

## 3. Kap. 3 – Prozessor (CPU) (S. 31–47)

> **KERN:** Die CPU-Leistung hängt **nicht nur vom Takt** ab, sondern auch von Kernen, Threads, Cache, Befehlen pro Takt und Architektur.

### Kernkomponenten der CPU

- Tabelle IDU, EXU, COL, BIL, ALU, FPU, DC, CC: siehe **Kap. 2** (Buch S. 6). **Register** = kleinste, schnellste Speicher im Kern.

### Fertigung (Buch S. 31)

- Der nackte Mikrochip heißt **Die** (Silizium, Milliarden Transistoren als Schalter). Der Metalldeckel **Heatspreader** verteilt die Wärme und schützt das Die.
- Kleinere **Strukturbreite** (130 nm → 14 nm → 7 nm) = weniger Spannung und Energie bei gleicher Leistung oder mehr Leistung bei gleichem Verbrauch.
- Unterricht: Kontaktstifte sind **vergoldet** (leitet gut, rostet nicht); eine Markierung zeigt, wie herum die CPU eingesetzt wird; im Sockel wird sie mit einem Hebel/Bügel fixiert.

### Kerne und Takt (Buch S. 32–33)

- Dual-Core 2 · Triple 3 · Quad 4 · **Hexa 6** · Octa 8 Kerne; über 8 meist nur „Multicore“.
- Mehr Kerne helfen nur, wenn die **Software parallel arbeitet**. Ein sequenzielles Programm wird nicht schneller. Stärke: mehrere Programme/Threads gleichzeitig.
- **1 GHz = 1.000 MHz = 1 Milliarde Takte pro Sekunde.** Doppelter Takt bei baugleicher CPU = doppelt so schnell (30 s bei 1 GHz → 15 s bei 2 GHz). Vergleichbar nur innerhalb derselben Familie und Generation.

### Arbeitsweise (Buch S. 31–32)

- **CISC**: großer Befehlssatz, Befehle unterschiedlicher Länge, Mikrocode (x86/x64 – Intel, AMD) · **RISC**: wenige einfache, fest verdrahtete Befehle, viele Register (ARM, POWER, SPARC). Heute verschmolzen: x86-CPUs zerlegen komplexe Befehle intern in RISC-Befehle.

### Befehlsausführung und Pipelining (Buch S. 37–38)

1. Befehl laden
2. decodieren
3. Operanden laden
4. ausführen
5. Ergebnis zurückspeichern

- Ohne Pipelining braucht jede Stufe einen Takt → **5 Takte pro Befehl** (Von Neumann, nacheinander).
- **Pipelining**: jede Stufe hat eine eigene Funktionseinheit (Eimerkette) – während Befehl 1 decodiert wird, wird Befehl 2 schon geladen. Weiterhin wird nur **ein** Befehl pro Takt geladen.
- **Superskalar**: Funktionseinheiten mehrfach vorhanden → **mehrere Befehle pro Takt**. Moderne CPUs kombinieren beides.
- **Takt** in GHz = Referenztakt × Multiplikator; **Turbo** erhöht kurzzeitig.
- **Multicore** + **Hyper-Threading/SMT**: „8 Kerne / 16 Threads“.
- **64-Bit** (AMD64 2003, Intel64 2004) hebt die 4-GB-RAM-Grenze auf; braucht 64-Bit-Treiber.

### Technologie

| Begriff | Bedeutung |
|---|---|
| **Fertigung** | Strukturbreite in nm; **Die** = nacktes Plättchen; **Heatspreader** = Metalldeckel |
| **TDP** | Abwärme in Watt – danach wird die Kühlung ausgelegt |
| **Virtualisierung** | Intel VT-x / AMD-V, im BIOS aktivieren |
| **Hypervisor** | **Typ 1** direkt auf Hardware (Hyper-V Server, ESXi) · **Typ 2** im OS (VirtualBox, VMware Workstation) |

- Achtung Buch S. 37: Dort steht Hyper-V (Windows 10 Pro) als Typ 2 und „VMware vCenter Server“ als Typ 1 – fachlich ist Hyper-V immer Typ 1 (Windows läuft dann selbst als „Elternpartition“ darüber); vCenter ist Verwaltungssoftware, der Hypervisor ist ESXi.

### Moderne CPUs und Hersteller (Stand Buch 2020)

| Hersteller | Einstieg | Mittelklasse | Oberklasse | Server | Sockel (Buch) |
|---|---|---|---|---|---|
| **Intel** | Celeron, Pentium, Core i3 | Core i5 | Core i7, i9 | Xeon | LGA 1200 |
| **AMD** | Athlon, Ryzen 3 | Ryzen 5 | Ryzen 7, 9, Threadripper | EPYC | AM4 |

### Auswahlkriterien

- **Passt sie?** Sockel (z. B. LGA 1200, AM4) · **CPU Support List** des Boards · ggf. vorher BIOS-Update
- **Wofür?** Büro: i3/Ryzen 3 · Allround: i5/Ryzen 5 · Gaming/Video: i7, i9/Ryzen 7, 9 · Server: Xeon/EPYC
- **Was drumherum?** Kerne/Threads, Takt, Cache, TDP, integrierte Grafik ja/nein · Kühler und Netzteil passend

### Kühlung

- **Luft**: Kühlkörper + Lüfter, Heatpipes; passiv bis ca. 120 W TDP.
- **Wasser**: sehr starke Systeme, Übertakten (Overclocking).
- Unterricht: **passiv** = nur Kühlrippen (Alu), der Luftstrom kommt von Gehäuselüftern · **aktiv** = zusätzlich ein Lüfter direkt auf den Kühlrippen. Zwischen CPU und Kühler liegt immer ein Luftpolster (leitet schlecht) → **Wärmeleitpaste**. Wird die CPU zu heiß: Paste prüfen und erneuern (sie trocknet aus), nicht nur die Lüfter hochdrehen.
- **Stromsparen**: Intel SpeedStep, AMD Cool’n’Quiet.

### CPU einbauen

> **HINWEIS:** Dieser Ablauf stand früher unter Kap. 13. Das Buch beschreibt den CPU-Einbau nicht als eigene Anleitung; belegt sind nur einzelne Schritte (Quelle jeweils in Klammern). Alles ohne Quelle ist *(Ergänzung)*. Ausführlich: Lernmodul „Mikroprozessor“.

1. **Netzstecker ziehen**, **ESD-Schutz** (Buch S. 136–137).
2. Sockelhebel öffnen, CPU **ohne Kraft** einsetzen – Markierung bzw. Kerbe an CPU und Sockel zeigt die Richtung (Buch S. 10; Unterricht 24.11.).
3. Hebel bzw. Klammern schließen – sie fixieren die CPU (Buch S. 10; Unterricht 24.11.).
4. **Wärmeleitpaste** (oder Wärmeleitpad) zwischen CPU und Kühler – sie gleicht Unebenheiten aus (Buch S. 46). Dünn auftragen, Kühler gleichmäßig über Kreuz festschrauben *(Ergänzung)*.
5. Lüfter an **CPU_FAN**, 4/8-pol. CPU-Stromstecker anschließen *(Ergänzung)*.
6. Starten, im BIOS prüfen: CPU erkannt, Temperatur plausibel *(Ergänzung; Temperaturüberwachung: Buch S. 24)*.

| Symptom | Mögliche Ursache | Maßnahme |
|---|---|---|
| **Kein Bild, startet nicht** | CPU nicht unterstützt, BIOS zu alt, CPU-Strom fehlt | Support List prüfen, BIOS-Update, Stecker prüfen *(Ergänzung)* |
| **Pieptöne beim Start** | POST hat einen Hardwarefehler gefunden | Bedeutung im Handbuch nachschlagen – die Codes sind je BIOS-Hersteller verschieden (Buch S. 139) |
| **Abschalten unter Last** | Überhitzung | Paste, Kühlersitz, Lüfter prüfen (Buch S. 24: Abschalten bei Überhitzung; S. 46: Wärmeleitpaste); Temperatur im BIOS ansehen *(Ergänzung)* |
| **„CPU Fan Error“** | Lüfter falsch angeschlossen oder defekt | an CPU_FAN anschließen, Lüfter tauschen *(Ergänzung)* |
| **Langsam** | Thermal Throttling, Energiesparplan | Kühlung und Energieoptionen prüfen *(Ergänzung)* |
| **Verbogene Pins** | falsch eingesetzt | vorsichtig richten oder Teil tauschen (verbogener Kontakt → Fehlfunktion: Buch S. 10) |

## 5. Kap. 5 – Speicher (S. 55–64)

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
| **DDR5** (nicht im Buch, ab 2021) | 288 (SO-DIMM 262) | 1,1 V – Kerbe anders als DDR4 |

- Achtung: Das Buch (S. 60) nennt für DDR4-SO-DIMM 256 Kontakte – Druckfehler, korrekt sind 260 (JEDEC).
- DDR5 *(Ergänzung, nicht aus Buch/Unterricht)*: Das Buch (S. 59) kennt nur vier DDR-Generationen.
- **DDR** = Daten auf steigender **und** fallender Taktflanke.
- Generationen **nicht kompatibel** – Kerbe an anderer Stelle.
- **DIMM** Desktop · **SO-DIMM** Notebook.
- **ECC** (Fehlerkorrektur) und **Registered** (gepuffert) → Server; Chipsatz muss es können.
- **Timings** (z. B. CL16) in Takten: kleiner = schneller.

### Speicheroptimierung

- **Dual Channel**: 2 Module in den richtigen (farbigen) Slots → doppelte Bandbreite. Triple/Quad Channel: 3/4 Kanäle.
- Module am besten als **Kit** kaufen (gleiche Größe, Takt, Timings).
- Vorher im Mainboard-Handbuch prüfen: Typ, max. Ausbau, Takt.
- **XMP**-Profil im BIOS lädt den Herstellertakt. *(Ergänzung)*

### Cache-Speicher (Speicherhierarchie)

| Ebene | Größe |
|---|---|
| **Register** | Byte |
| **L1-Cache** | KB je Kern · Daten + Befehle |
| **L2-Cache** | 256 KB – MB je Kern |
| **L3-Cache** | mehrere MB, alle Kerne teilen |
| **Arbeitsspeicher (RAM)** | GB |

- Oben: schneller, kleiner, teurer. Die CPU sucht L1 → L2 → L3 → RAM.

![Speicherhierarchie als Pyramide (Buch S. 63–64)](faecher/coa1/bilder/speicherpyramide.svg)

> **FALLE:** Cache = **SRAM**, Arbeitsspeicher = **DRAM** – nicht vertauschen. Flash ist **nicht flüchtig**, RAM schon.

## 9. Kap. 9 – Externe Schnittstellen (S. 94–100)

### Überblick: Datenraten

| Schnittstelle | Datenrate (theoretisch) | Bemerkung |
|---|---|---|
| **USB 1.1** | 12 Mbit/s | Plug & Play, Hot-Plugging |
| **USB 2.0** Hi-Speed | 480 Mbit/s | theoretisch 480 ÷ 8 = 60 MB/s, praktisch ca. 37–40 MB/s |
| **USB 3.0 / 3.1 Gen 1 / 3.2 Gen 1** | 5 Gbit/s | SuperSpeed |
| **USB 3.1 Gen 2 / 3.2 Gen 2** | 10 Gbit/s | SuperSpeedPlus, Kodierung laut Buch (S. 96) 128b/130b; technisch korrekt ist 128b/132b (128b/130b gilt für PCIe 3.0) |
| **USB 3.2 Gen 2x2** | 20 Gbit/s | doppelte Leitungen, nur USB-C (Buch S. 96 vereinfacht: „USB 3.2 = 20 Gbit/s“) |
| **USB4 · Thunderbolt 3** | 40 Gbit/s | USB-C-Stecker; Thunderbolt bündelt PCIe, DisplayPort, USB; Daisy-Chain |
| FireWire 400/800 · eSATA | 400/800 Mbit/s · wie SATA | veraltet |

> **MERKE:** USB arbeitet **seriell** mit Hub-Struktur – bis zu **127 Geräte** je Controller. Thunderbolt kennt nur die Kette (Daisy-Chain).

### Was ist eine Schnittstelle? (Buch S. 94)
- **Schnittstelle (Interface):** Übergabepunkt, an dem zwei eigenständige Komponenten verbunden werden.
- **Software-Schnittstelle:** z. B. **API** (Application Programming Interface).
- **Hardware-Schnittstelle:** verbindet Komponenten des Computers, z. B. USB, PS/2, HDMI.

> **MERKE:** Bei Schnittstellen unterscheidet man die **theoretische** (maximale) und die **praktische** Übertragungsrate. Die praktische ist immer deutlich niedriger.

### 9.1 Legacy-Schnittstellen (S. 94)

> **KERN:** USB ist seit Jahren die wichtigste Schnittstelle für externe Geräte. Legacy-Schnittstellen sind veraltet.

| Schnittstelle | Zweck früher |
|---|---|
| **Seriell (RS-232)** | Modem, Maus, Geräte |
| **Parallel (IEEE 1284)** | Drucker |
| **PS/2** (IBM Personal System/2) | Tastatur und Maus |

- „Legacy“ = Hinterlassenschaft: aus Kompatibilitätsgründen lange „mitgeschleppt“, heute durch USB ersetzt.

#### PS/2
- **Grün = Maus · Lila = Tastatur**
- neue Boards: höchstens ein **Kombi-Anschluss**; für beide Geräte ein Y-Adapter
- PS/2 ↔ USB per Adapter, wenn das Gerät beide Protokolle versteht
- **(Unterricht)** PS/2 ist **nicht Hot-Plugging-fähig**: Gerät nicht im laufenden Betrieb ein- oder ausstecken, sonst Neustart nötig

### 9.2 USB (S. 94–97)

> **KERN:** USB: seriell, Plug & Play, Hot-Plugging, bis zu **127 Geräte**.

- **Seriell:** Daten Bit für Bit; „Bus“ = gemeinsame Verbindung
- **127 Geräte:** jedes bekommt automatisch eine eigene Geräte-ID
- **Baumstruktur:** über Hubs erweiterbar; Host-Controller (Master) steuert Geräte (Slaves)
- **Plug & Play + Hot-Plugging:** im laufenden Betrieb an- und abstecken, wird automatisch erkannt

| Version | Name | seit | theoretisch | praktisch (Buch) |
|---|---|---|---|---|
| **USB 1.1** | Low Speed / Full Speed | 1996/98 | 1,5 / 12 Mbit/s | ca. 180 kB/s / 1,5 MB/s |
| **USB 2.0** | Hi-Speed | 2002 | 480 Mbit/s (= 60 MB/s) | ca. 37–40 MB/s |
| **USB 3.0 = 3.1 Gen 1 = 3.2 Gen 1** | SuperSpeed | 2010 | 5 Gbit/s | ca. 450 MB/s |
| **USB 3.1 Gen 2 = 3.2 Gen 2** | SuperSpeedPlus | – | 10 Gbit/s | ca. 800 MB/s |
| **USB 3.2 Gen 2x2** | – | 2018 | 20 Gbit/s | ca. 1.600 MB/s |
| **USB4** | – | ab 2021 | 40 Gbit/s | – |

- Das Buch (S. 96) schreibt vereinfacht „USB 3.2 = 20 Gbit/s“; genau ist das nur **USB 3.2 Gen 2x2** (doppelte Leitungen, nur USB-C). USB 3.2 Gen 1 (5 Gbit/s) und Gen 2 (10 Gbit/s) sind umbenannte ältere Versionen.
- **Wie wurde es schneller?** USB 3.1 Gen 2: höherer Takt + effizientere Kodierung statt 8b/10b – laut Buch **128b/130b**; technisch korrekt ist 128b/132b (Buch S. 96: „128b/130b“ – dort verwechselt mit PCIe 3.0) · USB 3.2 Gen 2x2: **doppelte** Hochgeschwindigkeitsleitungen
- **USB OTG (On-the-Go):** zwei Geräte direkt koppeln, z. B. USB-Stick am Smartphone (Adapterkabel)
- **USB Wireless:** kabellos, 480 Mbit/s – hat sich nie durchgesetzt (Bluetooth, USB 3)

#### Kabel und Strom
| | USB 1.x / 2.0 | USB 3.0 |
|---|---|---|
| **Adern** | 4 (2 Strom, 2 Daten) | 9 |
| **Strom** | 5 V · max. **500 mA = 2,5 W** | max. **900 mA** |

- USB 1.x/2.0: **Twisted-Pair**-Kabel. Low Speed (Maus, Tastatur): ungeschirmt reicht; schnellere Modi brauchen **geschirmte** Kabel.
- 2,5″-Festplatten an USB 2.0: oft **Y-Kabel** (Strom von zwei Ports). Ab USB 3.0 genügt einer.
- Drucker, Scanner, Kameras bringen eigene Stromversorgung mit.

#### Stecker
- **Typ A** = am Computer · **Typ B** = am Gerät (Drucker, 3,5″-Festplatte)
- **Mini-USB** und **Micro-USB** für kleine Geräte; per Adapter kompatibel
- **USB-C:** oval, 24-polig, verdrehsicher; für USB 3.1/3.2, Thunderbolt (Buch S. 98: Thunderbolt über USB-C; S. 99: Stecker anfangs = Mini-DisplayPort · Zuordnung USB-C ab **Thunderbolt 3**, TB1/TB2 Mini-DisplayPort: *Ergänzung*), USB4
- Alte Stecker passen in USB-3.0-Buchsen. Der neue **USB-3.0-B-Stecker** passt nur in neue Buchsen – ein USB-3.0-Gerät am USB-2.0-PC braucht daher ein herkömmliches USB-Kabel.

![USB-Steckertypen von vorn (Buch S. 96–97)](faecher/coa1/bilder/usb-stecker.svg)

#### USB-Hubs
- **Aktiver Hub:** eigenes **Netzteil** – für stromhungrige Geräte
- **Passiver Hub:** Strom nur **vom PC-Anschluss** – reicht für Maus und Tastatur
- An einem USB-2.0-Hub lassen sich Low-, Full- und Hi-Speed-Geräte ohne Nachteil mischen; USB-3.0-Geräte laufen dort nur im **Hi-Speed**-Modus.

### 9.3–9.6 FireWire, Thunderbolt, eSATA, USB4 (S. 97–100)

| Schnittstelle | Geschwindigkeit | Geräte | Besonderheiten |
|---|---|---|---|
| **FireWire (IEEE 1394)** | 400 Mbit/s (≈ 40 MB/s) · 800 Mbit/s (≈ 80 MB/s) | bis 63, Kette | 1995 von Apple, bei Sony „i.Link“ · Geräte tauschen Daten **ohne PC** direkt aus · Hot-Plugging · Video-/Audiobereich · FW400-Kabel 4- oder 6-adrig (6 = mit Strom), max. 4,5 m · FW800 9-adrig, per Adapter kombinierbar · veraltet (Apple wechselte zu Thunderbolt) |
| **Thunderbolt** | TB1: 2 × 10 · TB2: 20 · **TB3: 40 Gbit/s** | bis 7 laut Buch (Intel: 6 je Anschluss plus Host), Kette (Daisy-Chain) | Intel + Apple, Codename „Light Peak“, 2011 · bündelt **USB, DisplayPort und PCIe** in einem Kabel · laut Buch (2020) **schnellste** externe Schnittstelle (heute: Thunderbolt 5 / USB4 v2 mit 80 Gbit/s) · Stecker anfangs = **Mini-DisplayPort**, heute **USB-C** · Adapter zu DP, DVI, HDMI, VGA · Kupfer 3 m, Glasfaser 10 m · Kabel mit aktiver Elektronik (ca. 5× USB-3.0-Preis) |
| **eSATA** | 150–600 MB/s (wie SATA) | 1 | nach außen geführtes SATA, besser geschirmt, eigener Stecker (SATA-Kabel passt nicht) · **liefert keinen Strom** · Hot-Plugging oft problematisch · durch USB verdrängt |
| **USB4** | 40 Gbit/s (Stand Buch 2020; USB4 Version 2.0 seit 2022: 80 Gbit/s) | Hub-Struktur | aus Thunderbolt 3 entstanden + USB-Hubstruktur · kompatibel zu Thunderbolt 3 und USB 3 |

> **FALLE:** **Thunderbolt** kennt nur die **Kette**, **USB/USB4** die **Hub-/Baumstruktur**. FireWire: max. **63** Geräte, Thunderbolt: **7** (laut Buch; Intel nennt 6 je Anschluss plus Host), USB: **127**.

![USB als Baum, Thunderbolt als Kette (Buch S. 94–100)](faecher/coa1/bilder/usb-baum-kette.svg)

> **FALLE:** Mbit/s ≠ MB/s: 480 **Mbit**/s (USB 2.0) sind theoretisch 60 **MB**/s, praktisch nur rund 37–40 MB/s. Kleines b = Bit, großes B = Byte.

## 10. Kap. 10 – Massenspeicher (S. 101–111)

> **KERN:** Massenspeicher halten Daten **dauerhaft**, auch ohne Strom. Die wichtigsten: **HDD** (rotierende Magnetscheiben), **SSD** (Flash, keine Mechanik) und **M.2 NVMe** (Flash direkt am PCIe-Bus).

### Einteilung von Speichermedien

| Klasse | Bedeutung | Beispiele |
|---|---|---|
| **Online** | ständig verfügbar, schnellster Zugriff | RAM, Festplatte, SSD, eingesteckter Stick |
| **Nearline** | bei Bedarf automatisch bereitgestellt | Bandroboter, Bandbibliothek |
| **Offline** | manuell eingelegt, Archiv | Band im Schrank, DVD, externe Platte |

- Nach Technik: **magnetisch** (HDD, Band) · **optisch** (CD, DVD, Blu-ray) · **Flash** (SSD, USB-Stick, SD-Karte).
- Beispiele Buch: Online = Festplatte, eingesteckter USB-Stick · Nearline = Bandroboter · **Offline = Installations-DVD, Backup-Band** (muss von Hand eingelegt werden).
- Vergleichskriterien (Buch): Kapazität, Geschwindigkeit, Haltbarkeit, Datensicherheit · Unterricht: **Zuverlässigkeit, Preis, Abrufgeschwindigkeit**.

### Datenträger und typische Größen

| Datenträger | Technik | Kapazität |
|---|---|---|
| Diskette (3,5″) | magnetisch | **1,44 MB** (Unterricht; ZIP-Diskette 100–750 MB) – heute bedeutungslos |
| CD | optisch | **700 MB** (Unterricht) |
| DVD | optisch | **4,7 GB** einseitig/einlagig (DVD 5) · 8,5 GB zweilagig (DVD 9) · 9,4 GB zweiseitig (DVD 10) · 17 GB zweiseitig + zweilagig (DVD 18) – Buch S. 110 |
| Blu-ray | optisch, **blauer Laser** | 25 / 50 GB (BD-RE ein-/zweilagig) · gepresst 27 / 54 GB |
| USB-Stick | Flash | Buch: bis 1 TB · Unterricht: 64 GB – 2 TB |
| Speicherkarte | Flash | **SD-Karte** ist Standard (SD, SDHC, SDXC; Mini/Micro) · Unterricht: 32 GB – 1 TB |
| HDD | magnetisch | Unterricht: 512 GB – 8 TB gängig, 20 TB und mehr erhältlich |
| SSD | Flash | Unterricht: 512 GB – 8 TB |
| Magnetband | magnetisch | Unterricht: 256 GB – 16 TB, heute für **Datensicherung in Firmen** |

> **HINWEIS:** In der Mitschrift stehen für die DVD 2,4 / 4,7 / 9,5 / 19 GB. Das Buch nennt 4,7 / 8,5 / 9,4 / 17 GB. Sicher ist: **Standard-DVD = 4,7 GB**. Für die Prüfung die Buchwerte lernen.

- **CD/DVD**: Die Daten stecken in **Pits** (Vertiefungen) und **Lands** (Rest der Fläche). DVD-Strukturen sind 7,4-mal kleiner als bei der CD; DVD-Laufwerke lesen auch CDs.
- **DVD+R/RW** (Multisession, hohe Kompatibilität) · **DVD-R/RW** (für große Videodateien, keine Multisession) · **DVD-RAM** (für PCs). Heutige Brenner können ± beides.
- **Blu-ray** schlug die HD DVD (2008 eingestellt).

### Festplatten – Sorten und Funktion

| Typ | Funktion | Vor- / Nachteile |
|---|---|---|
| **HDD** | rotierende Magnetscheiben, Kopf auf Luftpolster; Spuren, Sektoren, Zylinder | viel Platz günstig · langsam, stoßempfindlich (Head Crash) |
| **SATA-SSD** | NAND-Flash, keine Mechanik | schnell, leise, robust · max. ca. 550 MB/s (SATA 3 = 600 MB/s) |
| **M.2 NVMe** | Flash über PCIe | sehr schnell (mehrere GB/s) |
| **SSHD** | HDD + kleiner Flash-Cache | eingestellt |
| **SAS / Enterprise** | seriell, Punkt-zu-Punkt, für Server | MTBF von SATA- und SAS-Platten laut Buch ähnlich – manche SATA-Hersteller rechnen aber nur mit 8–12 h Betrieb am Tag. Für ausfallsichere Server: **Enterprise-Modelle**, die vom Hersteller für den **Dauerbetrieb** freigegeben sind (S. 104) |

### HDD – Aufbau (Buch S. 102–103)

- Magnetscheiben drehen sich auf der **Spindel**; die **Schreib-/Leseköpfe** am Plattenarm gleiten auf einem **Luftpolster** darüber (Buch S. 103). Unterricht: Gehäuse luftdicht, teils mit **Helium** gefüllt (weniger Luftwiderstand) – dort schwebt der Kopf entsprechend auf einem Heliumpolster *(Ergänzung)*.
- **Head Crash**: Schon ein Staubkorn bringt den Kopf in Kontakt mit der Platte → Platte zerstört. Darum ist die HDD versiegelt (Siegel = Garantiesiegel), nie öffnen.
- **Spur** = Kreis auf einer Plattenseite · **Zylinder** = alle übereinanderliegenden Spuren · **Sektor** = Teil einer Spur, laut Buch meist **512 Byte** (neuere Platten oft 4.096 Byte, „Advanced Format“ – *Ergänzung*).
- Kapazität = **Köpfe × Zylinder × Sektoren je Spur × 512 Byte** (Beispiel: 16 × 16.383 × 63 × 512 Byte = 8.063,5 MB ≈ 7,87 GB).
- Kenngrößen: **Drehzahl** (5.400 / 7.200 / 10.000 / 15.000 U/min – schneller, aber lauter) · **Cache** (512 KB – 256 MB) · **Average Seek Time** = mittlere Zeit, bis die Köpfe positioniert sind (3–12 ms) · Schnittstelle (SATA, SAS, USB …).
- Hersteller rechnen **1 GB = 1.000.000.000 Byte** statt 2³⁰ = 1.073.741.824 Byte → die Platte wirkt größer (S. 102, siehe Abschnitt 91).

### RAID (Kap. 10.5)

- **RAID 0** Striping: schnell, keine Sicherheit
- **RAID 1** Spiegelung
- **RAID 5** Parität, mind. 3 Platten

![RAID 0, 1 und 5 im Vergleich (Buch S. 108)](faecher/coa1/bilder/raid.svg)

### Bauformen

- 3,5″ Desktop-HDD · 2,5″ Notebook/SATA-SSD · M.2 (z. B. 2280)
- Schnittstellen SATA, M.2, U.2, SAS

> **FALLE:** **RAID ersetzt kein Backup** – gelöschte oder verschlüsselte Dateien sind auf allen Platten gleichzeitig weg.

## 11. Kap. 11 – Ein- und Ausgabegeräte (S. 112–124)

### Überblick

| Gerät | Wichtig zu wissen |
|---|---|
| **Tastatur** | MF-102-Layout; Anschluss USB (Standard), PS/2 (lila), Bluetooth, Funk-Dongle (nicht Bluetooth-kompatibel) |
| **Maus / Trackball** | heute optisch oder Laser; Maus PS/2 = grün |
| **Scanner** | Hand-, Einzugs-, Flachbettscanner · Auflösung in **dpi** (optisch vs. interpoliert) · Treiberschnittstelle **TWAIN** |
| **Drucker** | Nadel (Durchschläge, laut) · Tinte (günstig in der Anschaffung, teure Tinte) · **Laser** (Xerografie, braucht RAM für die ganze Seite) · Thermosublimation (Foto) |
| **Monitor** | LCD: Diagonale in Zoll, Seitenverhältnis 16:9 / 16:10 / 21:9, Reaktionszeit (ms), Kontrast, Bildwiederholrate (Hz), Pixelfehler · Paneltypen TN, IPS, VA |

> **MERKE:** Touchscreen und Multifunktionsgerät sind **Ein- und Ausgabegeräte** zugleich. *Ergänzung (nicht im Buch):* Bildschirm blendfrei aufstellen, Oberkante etwa auf Augenhöhe, genug Abstand.

### 11.1–11.2 Tastatur, Maus, Trackball (S. 112–114)

> **KERN:** Tastatur und Maus werden heute per **USB**, **Bluetooth** oder **Funk-Dongle** angeschlossen.

#### 11.1 Tastatur
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

#### 11.2 Maus und Trackball
- **Mechanisch (alt):** Gummikugel → zwei Wellen → Lochrädchen → Lichtschranke · verschmutzt leicht
- **Optisch / Laser (heute):** Sensor tastet die Oberfläche ab · keine Mechanik · Laser = präziser · Auflösung oft umschaltbar
- **Trackball:** Kugel oben, mit Daumen oder Fingern bewegt; Gerät bleibt stehen → wenig Platz, schont Arm und Handgelenk.
- **Mehrere Funkgeräte im Büro:** auf genug Funkkanäle achten, sonst steuert eine Maus mehrere PCs.
- **Sicherheit:** Funksignale können ausgespäht werden.
- **(Unterricht)** Weitere Anschlusswege für Eingabegeräte: Radiowellen (Funk), Infrarot, Bluetooth.

### 11.3 Scanner (S. 115–116)

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

### 11.4 Drucker (S. 116–118, ergänzt aus dem Unterricht)

> **KERN:** Jeder Druckertyp hat ein Einsatzgebiet: **Nadel** für Durchschläge, **Laser** fürs Büro, **Tinte** für Farbe und Fotos zuhause, **Thermosublimation** für Fotos in höchster Qualität und Spezialdruck.

| Drucker | Funktionsweise | Typisch / Merkmale | Dokumentenecht? |
|---|---|---|---|
| **Typenrad- / Kugelkopf** (Unterricht) | mechanisch: Rad bzw. Metallkugel mit Buchstaben dreht sich, ein Hammer schlägt durch das Farbband | historisch, nur Text | – |
| **Nadeldrucker** | 9, 18 oder 24 Nadeln drücken durch ein Farbband (Punktmatrix); Tempo in CPS (50–500 Zeichen/s) | laut, robust, günstig im Betrieb · **Durchschläge, Endlospapier** (Arztpraxis, Spedition) | – |
| **Laserdrucker** | **Xerografie:** Trommel wird geladen → Laser entlädt Stellen → Toner haftet → auf Papier übertragen → mit Druck und **Hitze fixiert** → Trommel gereinigt (Resttonerbehälter) | schnell, leise, ≥ 1.200 dpi, günstig pro Seite · Farblaser: 4 Toner (CMYK) · braucht **RAM** für die ganze Seite | ja (auch bei Nässe) |
| **Tintenstrahl** | feine Tintentröpfchen aus Düsen; Farben **CMYK** (Cyan, Magenta, Gelb, Schwarz), Foto: + Foto-Magenta, Foto-Türkis | günstig in der Anschaffung, teure Tinte · Düsen verkleben bei seltener Nutzung · Druckkopf mit Patrone (HP) oder fest im Gerät (Canon) (Unterricht) | nein |
| **Thermosublimation** | Farbfolie wird erhitzt, Farbe wird gasförmig und zieht ins Spezialpapier; 256 Stufen je Farbe | Fotos in höchster Qualität · teuer pro Seite · (Unterricht) auch Tassen, T-Shirts, Planen | ja |
| **Thermodirektdrucker** (Unterricht: „Thermotransfer“) | hitzeempfindliches Spezialpapier wird an erhitzten Stellen dunkel | Kassenzettel · wartungsarm, keine Tinte/Toner · verblasst bei Sonne/Hitze, nicht ins Altpapier | nein |
| **Wachsdrucker** (Unterricht) | wie Tinte, aber festes Wachs wird geschmolzen und aufgespritzt | glänzende, sehr farbstarke Ausdrucke | – |
| **3D-Drucker** (Unterricht) | schichtweiser Aufbau, meist geschmolzenes Granulat/Filament | auch innen komplexe Strukturen möglich | – |

Thermotransfer (mit Farbband, z. B. Etiketten) ist ein anderes Verfahren als der Thermodirektdruck der Kassenzettel *(Ergänzung, nicht aus Buch/Unterricht)*.

#### Entscheidungskriterien beim Druckerkauf (Buch S. 118)
| Typ | Anschaffung | Kosten/Seite | Tempo | Lärm | Foto |
|---|---|---|---|---|---|
| **Nadel** | hoch | sehr gering | langsam | hoch | – |
| **Laser** | niedrig | gering | schnell | gering | – |
| **Farblaser** | mittel–sehr hoch | gering–mittel | mittel | gering | mittel |
| **Tinte** | niedrig | hoch | mittel–schnell | gering | gut |
| **Thermosubl.** | hoch | sehr hoch | langsam | gering | sehr gut |

#### Rechenbeispiel: RAM im Laserdrucker (Buch S. 117)
- A4, schwarz-weiß, 1.200 dpi: **8,27 × 1.200 × 11,69 × 1.200 ≈ 139 Mio. Punkte**
- 1 Punkt = 1 Bit → ÷ 8 = 17,4 Mio. Byte → ÷ 1.024 ÷ 1.024 ≈ **16,6 MB**
- A4 = 210 × 297 mm = 8,27 × 11,69 Zoll · Farblaser: 192–512 MB

> **MERKE:** Günstige Tintendrucker mit nur einer CMY-Patrone mischen Schwarz → Farbstich und dreifacher Verbrauch. Besser: **CMYK** mit einzeln tauschbaren Tanks.

> **(Unterricht)** Alle Drucker haben Sperren, z. B. gegen das Drucken von **Banknoten** (3D-Drucker: keine Waffen).

### 11.5 Monitor (S. 119–123) und Beamer (Unterricht)

> **KERN:** Der **LCD**-Monitor hat den Röhrenmonitor (**CRT**: groß, schwer, stromhungrig, Strahlung; Entsorgung nur über Fachbetrieb wegen Vakuum) ersetzt. Wichtige Kennzahlen: **Diagonale** (Zoll), **Seitenverhältnis**, **native Auflösung**, **Reaktionszeit**, **Kontrast** und Panel-Typ.

- **Größe:** Diagonale in Zoll, üblich 24″–30″
- **Seitenverhältnis:** früher 4:3 · heute 16:9, 16:10 · 21:9 = Ultrawide, oft **Curved**
- **Auflösung:** Pixel Breite × Höhe, z. B. 1024 × 768 = 786.432 · LCD in **nativer** Auflösung betreiben, sonst kleines Bild oder unscharfe Skalierung
- **Bildwiederholrate:** LCD flimmert nicht · ab 59 Hz, Gaming bis 240 Hz
- **Reaktionszeit:** Pixel schwarz → weiß → schwarz · <2–16 ms · zu langsam = Schlieren
- **Kontrast:** hellster zu dunkelster Pixel · TN/IPS 1000:1 · VA 3000:1
- **Sichtwinkel:** Farbe ändert sich, wenn man schräg schaut
- **Strom & Strahlung:** nur Hintergrundlicht (Kaltkathode oder **LED**) · keine schädliche Strahlung

#### Panel-Typen
| Panel | Stärken | Schwächen |
|---|---|---|
| **TN** | günstig, schnell, sparsam · größter Marktanteil (Stand Buch 2020) · Office, einfache Spiele | Farbtreue, Blickwinkel |
| **IPS** | sehr gute Farbtreue, großer Blickwinkel | mehr Strom, teurer, langsamer als TN |
| **VA** | bester Schwarzwert, höchster Kontrast | oft träge → weniger für schnelle Spiele |

Varianten: TN (STN, DSTN, TSTN) · IPS (S-IPS, AH-IPS …) · VA (PVA, MVA)

#### So funktioniert LCD
Flüssigkristalle zwischen zwei um **90° gedrehten Polarisationsfiltern**. Ohne Spannung drehen die Kristalle das Licht um 90° → **heller** Pixel. Mit Spannung richten sie sich aus, das Licht wird geschluckt → **dunkler** Pixel. **OLED** leuchtet selbst, braucht kein Hintergrundlicht.

#### Pixelfehler (ISO 9241)
| Typ | Fehler |
|---|---|
| 1 | Pixel immer hell |
| 2 | Pixel immer dunkel |
| 3 | Subpixel (R, G, B) defekt |

Fehlerklasse **0** = keine Fehler erlaubt · Klasse I–IV = immer mehr Fehler je 1 Mio. Pixel erlaubt. Gut: Klasse 0 oder I.

#### Anschlüsse
**VGA** analog (Qualitätsverlust durch Umwandlung) → **DVI** digital (DVI-D; Varianten DVI-I/DVI-A führen auch analoge Signale – nicht im Buch) → heute **HDMI** und **DisplayPort**, auch **USB-C**. Adapter gibt es in jede Richtung.

#### Kaufkriterien
Größe · Auflösung · Schaltzeit < 12 ms · Pixelfehlerklasse 0/I · Helligkeit > 300 cd · Kontrast ≥ 800:1 · Blickwinkel > 170° · digitaler Anschluss · Pivot (90° drehbar)

> **(Unterricht)** **Beamer:** starke Lichtquelle projiziert das Bild. Die Lampen haben eine begrenzte Lebensdauer (Betriebsstunden) und müssen getauscht werden.

### 11.6 Prüfzeichen, Ozon, Lärmschutz (S. 123–124)

#### Normen und Prüfzeichen
| Zeichen | Bedeutung |
|---|---|
| **CE** | erfüllt EU-Vorschriften zur elektromagnetischen Verträglichkeit (EMV) |
| **GS** | „geprüfte Sicherheit“ nach Produktsicherheitsgesetz, ISO 9241, Unfallvorschriften – **freiwillig** |
| **TÜV** | prüft Sicherheit, Funktion, Qualität, Umwelt, Bedienbarkeit |
| **TCO** | Monitor: flimmerfrei, gleichmäßig ausgeleuchtet, reflexionsarm, max. 15 W im Stand-by |
| **ISO 9241** | Regeln für die Mensch-Maschine-Interaktion – ergonomische Bildschirmarbeit |
| **Energy Star** | US-Stromsparzeichen: automatischer Stand-by, max. 30 W im Stand-by |

#### Ozon durch Laserdrucker
Entsteht bei der Ladung der Trommel · Grenzwert **0,1 ppm** · Aktivkohlefilter regelmäßig tauschen · ältere Drucker nicht direkt am Arbeitsplatz, gut lüften · neue Geräte „ozonfrei“.

#### Lärmschutz
Dämmmaterial im Gehäuse · Silent-Lüfter, passive Kühlung, lüfterlose Netzteile · Laufwerke mit Gummipuffern entkoppeln · **Acoustic Management** der Festplatte (leiser, aber langsamer) · wenige große, langsame Lüfter · Wasserkühlung · „Silent-PC“.

> **MERKE (Ergänzung, nicht im Buch):** Bildschirm blendfrei aufstellen, Oberkante auf Augenhöhe, genug Abstand · ergonomische Tastatur (Natural Keyboard, S. 113) und Trackball (S. 114) schonen die Handgelenke.

## 13. Kap. 13 – PC montieren (S. 136–145)

> **KERN:** Vor jeder Arbeit am offenen PC: **Netzstecker ziehen**, Konfiguration **dokumentieren**, **Backup** machen und **ESD-Schutz** sicherstellen (S. 136–137). Nach einer Reparatur folgt die Prüfung nach **DIN VDE 0701-0702** (S. 138–139). RAM, Grafikkarte, Festplatte und optisches Laufwerk werden nach festen Schritten eingebaut (S. 140–145). Den CPU-Einbau findest du unter Kap. 3.

### 13.1 PC öffnen und schließen (S. 136–138)

- **Arbeitsplatz:** genug Platz, rutschsichere Unterlage; ideal ist ein Labortisch oder eine Werkbank.
- **Netzstecker ziehen** – die Spannungen am Netzteil sind lebensgefährlich. **Garantiesiegel** beachten: Manche Hersteller verweigern sonst die Garantie.
- **Dokumentieren:** aktuelle Konfiguration und Lage der Kabel aufschreiben oder fotografieren; vorher ein **Backup** aller Daten. Auch alle Arbeiten dokumentieren (hilft Kollegen, macht die Abrechnung nachvollziehbar).
- **Werkzeug:** Schraubendreher (Flach- und Kreuzschlitz), Akkuschrauber mit Drehmomentbegrenzung, Kombi- und Flachzange, Pinzette, Plastikboxen für Schrauben, Taschenlampe, Lupe.
- **Öffnen:** Kabellage dokumentieren, Netzstecker und alle Kabel ab. Standardgehäuse sind meist mit 4 bzw. 6 Schrauben an der Rückwand verschlossen, manche mit Clips. Schrauben in die Box legen.
- **Schließen:** Sind alle Kabel wieder dran, liegt nichts mehr im PC? Keine Kabel einklemmen; das Gehäuse soll ohne großen Druck einrasten. Kabel anschließen, **Netzstecker zuletzt**, dann Funktionstest.

### ESD-Schutz (S. 137)

- **ESD** (Electrostatic Discharge) = elektrostatische Entladung. Kleidung aus Nylon kann weit über **20.000 V** erzeugen; schon ca. **10 V** können einen Chip zerstören. Für Menschen ist das ungefährlich (sehr wenig Strom).
- **Schutz:** geerdetes **Armband** und geerdete **Arbeitsmatte**, Schuhe mit Erdungskeil – zumindest vorher einen **Heizkörper berühren**.
- Bauteile in **antistatischen Tüten** lagern; ausgebaute Teile auf eine geerdete Matte legen. Steckkarten an der **Metallhalterung**, Platinen nur an den **Kanten** anfassen. Platinen nie auf Metall (z. B. Alufolie) legen – eingebaute Akkus könnten kurzschließen.

> **FALLE:** ESD-Schäden sind oft **unsichtbar** – ein Bauteil kann sofort oder erst später ausfallen; manche Fehler treten nur ab und zu auf.

### 13.2 Sicherheitstechnische Prüfung (S. 138–139)

- Pflicht: Prüfung nach Änderung oder Reparatur (VDE 0701) und Wiederholungsprüfung (VDE 0702); seit 2008 zusammengefasst als **VDE 0701-0702**. Zweck: Abnutzung und Schäden rechtzeitig finden, Haftung bei Unfällen vermeiden.
- **Sichtprüfung:** Isolierungen, Kabel, Netzteil ansehen; kein Werkzeug im Gehäuse vergessen.
- **Messung:** beim PC vor allem Schutzleiter- und Isolationswiderstand.
- **Funktionsprüfung:** beim PC in der Regel erledigt, wenn er ins Betriebssystem bootet. Der **POST** meldet Hardwarefehler mit **Pieptönen** – die Codes sind je BIOS-Hersteller verschieden.

> **MERKE:** Prüfung nach Reparatur (DIN VDE 0701-0702, Stand Buch S. 138–139): **Sichtprüfung · Messung · Funktionskontrolle**. Bestanden nur, wenn **alle** Teilprüfungen bestanden sind. Seit 2021: DIN EN 50678 (VDE 0701) und DIN EN 50699 (VDE 0702), die drei Teilprüfungen bleiben (Ergänzung, nicht aus Buch/Unterricht).

### 13.3 Arbeitsspeicher aufrüsten (S. 140)

1. ESD-Schutz, PC öffnen, RAM-Steckplätze suchen. Störende Kabel darf man kurz abziehen (später wieder anstecken!).
2. Die beiden Halterungen am Steckplatz seitlich herunterklappen.
3. Modul **gerade von oben** einsetzen. Es passt nur in **einer** Richtung: Nocken im Steckplatz und Kerbe im Modul müssen zusammenpassen. **Keine Gewalt.**
4. Mit leichtem Druck hineinschieben – die Halterungen klappen von selbst zu.
5. Probelauf: keine ungewöhnlichen Pieptöne; die neue Speichergröße wird angezeigt.

### 13.4 Grafikkarte aus- und einbauen (S. 141)

- Nötig, wenn die Onboard-Grafik nicht reicht, bei einem Neubau oder wenn die alte Karte veraltet oder defekt ist.
- ESD-Schutz, PC aus, Netzkabel ab, öffnen. **PCIe-x16-Steckplatz** suchen; bei mehreren den mit den meisten Lanes (meist blau).
- Alte Karte: Schraube bzw. Verriegelung lösen, vorsichtig herausziehen.
- Neue Karte langsam und senkrecht einsetzen – **nicht zu viel Druck aufs Mainboard** (feine Risse beschädigen die Platine). Festschrauben; die Verriegelung rastet hörbar ein. Freie Gehäuseöffnungen abdecken (Staub).
- Falls nötig **Zusatzstrom** anschließen. Onboard-Grafik evtl. im BIOS abschalten. Nach dem Start die **Treiber** installieren.

### 13.5 Festplatte einbauen (S. 142–144)

| | SATA | IDE (Ultra-DMA) |
|---|---|---|
| **Datenkabel** | seriell, 7 Leitungen; Stecker passt nur in einer Richtung | 80-adriges Flachbandkabel mit 40-poligen Steckern, nur noch Altbestand · blau = Mainboard, schwarz = Master, grau = Slave |
| **Tempo** | SATA 1: 150 · SATA 2: 300 · SATA 3: 600 MByte/s | – |
| **Strom** | SATA-Stromstecker | Molex-Stecker (bei Mangel Y-Adapter) |
| **Einbau** | Datenkabel Mainboard ↔ Platte, Strom anstecken | Jumper (Master/Slave) prüfen · Datenkabel mit **roter Markierung an Pin 1** |

- Vorbereiten: PC aus, Netzstecker ziehen, ESD-Schutz, öffnen, keine Kabel versehentlich lösen. Platte in ein 3,5″-Fach schrauben (2,5″-Platte oder SSD per **Einbaurahmen**).
- Danach im **BIOS prüfen**, ob die Platte erkannt wird.
- **M.2 / NVMe** (S. 144): Der Steckplatz hängt direkt am **PCIe-Bus** – deutlich schneller als eine 2,5″-SSD. Die SSD wird mit einer kleinen **M.2-Schraube** fixiert; die Position steht im Handbuch (evtl. unter einer Steckkarte). **Achtung:** Manche Boards schalten dann SATA-Anschlüsse ab – vorher ins Handbuch schauen. Ohne M.2-Steckplatz geht ein PCIe-Adapter.

### 13.6 Optisches Laufwerk einbauen (S. 145)

- ESD-Schutz, PC aus, Kabel ab, öffnen; Blende eines **5,25″-Fachs** entfernen (dahinter evtl. ein Blech).
- Brenner brauchen beim Brennen mehr Strom – reicht das **Netzteil**, auch mit weiteren Platten und starker Grafikkarte?
- Jumper nur bei IDE (Master/Slave) bzw. SCSI (ID, Terminierung); **SATA/SAS brauchen keine Jumper**.
- Festschrauben, Daten- und Stromkabel anstecken (Pin 1 = rote Markierung), schließen, im **BIOS prüfen**.

## 14. Kap. 14 – Startvorgang des Computers (S. 146–165)

### Startvorgang des Computers

1. Strom an → die CPU startet das BIOS/UEFI aus dem **Flash-Speicher** auf dem Mainboard (Buch S. 146: EPROM/Flash-ROM).
2. **POST** (Power-On Self-Test): Hardware prüfen; kritischer Fehler = Abbruch, Pieptöne.
3. Einstellungen aus dem **CMOS** laden (Knopfzelle).
4. Plug & Play: Ressourcen verteilen.
5. **Bootreihenfolge** → Bootloader → Betriebssystem.

![Startvorgang vom Einschalten bis zur Anmeldung (Buch S. 147, 160–162)](faecher/coa1/bilder/startvorgang.svg)

### BIOS-Einstellungen

- Aufruf: **Entf** oder **F2** · Bootmenü: F8/F11/F12 (je Hersteller) *(Ergänzung)*
- Datum/Zeit, Laufwerke (AHCI/RAID), **Bootreihenfolge**, Onboard-Geräte
- CPU/RAM: Virtualisierung, XMP · Energie: Wake-on-LAN
- **Hardware-Monitor**: Temperaturen, Spannungen, Lüfter
- **Passwörter**: Setup/Boot · CMOS-Batterie raus oder Jumper „Clear CMOS“ = Reset

### Vorarbeiten für ein BIOS-Update

1. **Grund?** „Never touch a running system“ – nur bei Fehler, neuer Hardware, Sicherheitslücke
2. **Board + Version:** Startbildschirm, BIOS, msinfo32, CPU-Z, Sandra
3. **Download:** nur passende Datei von der **Herstellerseite**, Readme lesen
4. **Absichern:** Einstellungen notieren, Strom sichern (Netzteil, USV)

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
| **Sicherheit / Extras** | – | **Secure Boot** *(Ergänzung)*, Netzwerk/Fernwartung, hohe Auflösung vor OS-Start; CSM emuliert Legacy |

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

## 15. Kap. 15 – Aktuelle PC-Betriebssysteme (S. 166–177)

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

## 16. Kap. 16 – Betriebssystem installieren (S. 178–183)

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

> **HINWEIS:** **Nicht im Buch** (dort Windows 10, S. 180–181). Alles in diesem Abschnitt ist *(Ergänzung, nicht aus Buch/Unterricht)* – nach dem Unterricht abgleichen.

| Mindestanforderung Windows 11 | Wert |
|---|---|
| **Prozessor** | 64-Bit-CPU ab 1 GHz mit mindestens 2 Kernen (Liste unterstützter CPUs) |
| **Arbeitsspeicher** | 4 GB |
| **Speicher** | 64 GB |
| **Firmware** | UEFI mit Secure-Boot-Fähigkeit |
| **Sicherheitschip** | TPM 2.0 |
| **Grafik** | DirectX-12-fähig |

- Ablauf wie bei Windows 10 (Buch S. 180–181): Start, Product Key, Lizenz, Benutzerdefiniert/Upgrade, Partition, Grundlagen, Konto, Dienste.
- Unterschied: Bei der Einrichtung verlangt Windows 11 **Home** Internet und ein **Microsoft-Konto**; bei privater Einrichtung gilt das inzwischen meist auch für **Pro**. Microsoft ändert diese Regeln mit Updates – im Zweifel aktuelle Angaben prüfen *(Ergänzung)*.
- Kompatibilität prüfen mit der App **„PC-Integritätsprüfung“**.

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
| **Keine Festplatte sichtbar** *(Ergänzung)* | Controller-Treiber laden, SATA-Modus prüfen |
| **Zu wenig Platz** | Partition löschen/vergrößern, größere Platte |
| **Unklarer Fehler** | Protokolle Panther\setupact.log, setuperr.log |

## 17. Kap. 17 – Zugang zum Netzwerk und Internet (S. 184–194)

> **KERN:** Alle Desktop-Betriebssysteme sprechen **TCP/IP**. Jedes Gerät braucht eine eindeutige **IP-Adresse** – dazu Subnetzmaske, Gateway und DNS-Server.

### Die vier IP-Einstellungen

| Einstellung | Bedeutung | Beispiel |
|---|---|---|
| **IP-Adresse** | eindeutige Adresse im Netz | 192.168.1.20 |
| **Subnetzmaske** | trennt Netz- und Geräteteil | 255.255.255.0 = /24 |
| **Standardgateway** | Router ins Internet / andere Netze | 192.168.1.1 |
| **DNS-Server** | übersetzt Namen in IP-Adressen | www.herdt.com → IP |

![Die vier IP-Einstellungen im Heimnetz (Buch S. 184–187)](faecher/coa1/bilder/heimnetz.svg)

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

## 19. Kap. 19 – Datensicherung durchführen (S. 205–217, S.M.A.R.T. aus 20.3)

> **KERN:** Regelmäßige Sicherung schützt vor Datenverlust durch Defekte, Schadsoftware oder Bedienfehler. Entscheidend sind **Strategie** und eine **getestete Wiederherstellung**.

### Sicherungsarten – alles hängt am Archivbit

| Art | Was wird gesichert? | Archivbit | Wiederherstellung braucht |
|---|---|---|---|
| **Vollsicherung** | alle Daten | zurückgesetzt | nur die letzte Vollsicherung |
| **Inkrementell** | Änderungen seit der **letzten Voll- oder inkrementellen Sicherung** (alle Dateien mit gesetztem Archivbit) | zurückgesetzt | Voll + **alle** Inkremente seitdem |
| **Differenziell** | Änderungen seit der **letzten Vollsicherung** | **bleibt gesetzt** | Voll + **letzte** differenzielle |

> **MERKE:** Inkrementell = schnell sichern, langsam wiederherstellen. Differenziell = umgekehrt.

![Inkrementelle und differenzielle Sicherung im Wochenplan (Buch S. 205–207)](faecher/coa1/bilder/datensicherung.svg)

### Strategien

| Tag | Variante A | Variante B |
|---|---|---|
| **So** | Voll | Voll |
| **Mo–Fr** | inkrementell | differenziell |

- **Generationenprinzip**: Großvater (Monat) – Vater (Woche) – Sohn (Tag). *(Ergänzung)*
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

## 21. Kap. 21 – Vor Schadsoftware schützen (S. 225–233)

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

## 90. Unterricht – EVA-Prinzip und Geräteliste

> **KERN:** Kleinste Definition eines Computers: **CPU + RAM**. Alles andere ordnet man nach dem EVA-Prinzip ein: **Eingabe → Verarbeitung → Ausgabe**. Was keiner Gruppe zugeordnet ist, fällt unter „Sonstiges“ (Netzwerk, Speicher, Verbindungen).

| Eingabe | Verarbeitung | Ausgabe | Sonstiges |
|---|---|---|---|
| Tastatur, Maus, Touchpad | Mainboard (verbindet alle Komponenten) | Monitor (CRT, LCD …) | Router, Modem |
| Scanner, Webcam | CPU | Drucker, 3D-Drucker | Netzwerke: PAN, LAN, WLAN … |
| Mikrofon, Headset | RAM, ROM | Lautsprecher (Bananenstecker, USB), Kopfhörer, Headset | Kabel (Kupfer, Glasfaser) |
| Kartenleser (meist USB): SD-Karten, Magnetkarten, RFID-Chips | GPU / Grafikkarte | Beamer | USB / USB-C, SD-Port |
| Controller / Joystick (z. B. Flugsimulator) | Soundkarte | VR-Brille | Speichermedien (SSD …) |
| Touchscreen (auch Ausgabe), Stifteingabe, Grafiktablet | Optische Prozessoren (Co-Prozessor) | Braille-Gerät | RFID |
| Sensoren, Biosensoren | Lüfter, Kühler (aktiv/passiv) | Roboter (z. B. Schweißroboter) | |

Touchscreen (und Headset) sind **Ein- und Ausgabegerät** zugleich.

### Massendatenträger – vom Lochstreifen bis heute (Unterricht)
- **magnetisch:** Diskette · HDD · Magnetband
- **optisch:** CD · DVD · Blu-ray
- **Flash:** SSD · USB-Stick · Speicherkarte
- **historisch:** Lochstreifen
- **über Netzwerk:** NAS im eigenen Netz · Cloud über das Internet

## 91. Unterricht – Binärzahlen und Speichergrößen

### Binärzahlen

> **HINWEIS:** Kein eigenes Buchkapitel; Bezüge im Buch: S. 7 (64 Bit = 8 Byte), S. 65/70 (Hex-Adressen), S. 78 und 117 (Byte → KB → MB mit 1024), S. 184 (IPv4/IPv6). Stellenwerte, Umrechnen, 2ⁿ und Hex (0–9, A–F) kamen im Unterricht vom 24.11. dran (Lernmodul „Binärzahlen“). **(Unterricht 24.11.)**

- **Bit** = 0 oder 1 · **1 Byte = 8 Bit** (Buch S. 7: 64 Bit = 8 Byte)
- Stellenwerte binär (ein Byte): **128 – 64 – 32 – 16 – 8 – 4 – 2 – 1** · 1111 1111 = **255** *(Unterricht 24.11.)*
- Beispiel: 1100 0000 (binär) = 128 + 64 = **192** (dezimal) – erstes Oktett von 192.168.… *(Rechenweg: Unterricht 24.11.; Beispiel 192: Ergänzung)*
- **Hexadezimal**: Ziffern 0–9 und A–F (A = 10 … F = 15) *(Unterricht 24.11.)* · 16 dezimal = **10** hex · 1 Hex-Ziffer = 4 Bit · 1 Byte = 2 Hex-Ziffern (FF = 255) *(Ergänzung)*
- Im Buch: I/O-Adressen hexadezimal, z. B. **0220h** (S. 65, Übung S. 70) · IPv6-Adressen hexadezimal (S. 184)

**Binär → dezimal** *(Unterricht 24.11.)*: Stellenwerte der Einsen addieren.

| Stellenwert | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|---|
| 1010 1010 | 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 |

→ 128 + 32 + 8 + 2 = **170**

> ⚠ **Achtung, Fehler im Unterricht:** Für 1001 0010 stand in Excel **145** – richtig ist 128 + 16 + 2 = **146**.

> ⚠ **Achtung, Fehler im Unterricht:** Mündlich hieß es, 16 sei „A0“ (hex) – richtig ist **10** hex (1 × 16 + 0).

**Dezimal → binär** *(Unterricht 24.11.)*: von links den größten passenden Stellenwert abziehen. Beispiel 13 = 8 + 4 + 1 → **1101**. Andere Methode *(Ergänzung)*: immer durch 2 teilen und die Reste von unten nach oben lesen.

- Mit **n Bit** gibt es **2ⁿ** verschiedene Werte: 8 Bit → 256 Werte (0 bis **255**) *(Unterricht 24.11.)* · 16 Bit → 65.536 *(Ergänzung)*.
- Unterricht: Heute arbeiten CPU und RAM mit **64 Datenleitungen** = 64-Bit-System → 64 Bit = 8 Byte gleichzeitig.

### Speichergrößen

> **HINWEIS:** Kein eigenes Buchkapitel; Bezüge im Buch: S. 78, S. 95 (Mbit/s vs. MB/s), S. 102 (Hersteller-GB), S. 117 (÷ 8, ÷ 1024, ÷ 1024 → 16,6 MB). Im Unterricht vom 24.11. ausführlich behandelt (Lernmodul „Speichergrößen – 1000 oder 1024“). **(Unterricht 24.11.)**

| System | Umrechnung | Wer nutzt es? |
|---|---|---|
| **Dezimal (SI)** | 1 kB = 1.000 Byte · 1 MB = 1.000 kB · 1 GB = 1.000 MB · 1 TB = 1.000 GB | Festplattenhersteller (Buch S. 102; Unterricht 24.11.) · Name „SI“: *Ergänzung* |
| **Binär (IEC)** | 1 KiB = 1.024 Byte · 1 MiB = 1.024 KiB · 1 GiB = 1.024 MiB · 1 TiB = 1.024 GiB | EDV/Windows: zeigt Binärwerte, schreibt aber „GB“ (Unterricht 24.11.: an der Tafel 1 KibiB, 1 MibiB) · Name „IEC“: *Ergänzung* |

- Folge: Eine 1-TB-Platte zeigt in Windows nur ca. **931 GB** (eigentlich GiB) an: 10¹² Byte ÷ 1.024³ ≈ 931 *(Unterricht 24.11.; Buch S. 102)*.
- Buch S. 102 bestätigt: Festplattenhersteller rechnen 1 GB = 1.000.000.000 Byte, in der EDV üblich sind 2³⁰ = 1.073.741.824 Byte.
- **Datenraten in Bit** (Mbit/s), **Dateigrößen in Byte** → durch 8 teilen: 480 Mbit/s = 60 MB/s theoretisch (Buch S. 95: praktisch ca. 37 MB/s). Unterricht: **„Geschwindigkeiten immer in Bit, nie in Byte.“**
- Das Buch rechnet mit **1.024** (S. 117: Bit ÷ 8 ÷ 1.024 ÷ 1.024 → 16,6 MB; S. 78: 1.024 × 768 Pixel × 3 Byte = 2.359.296 Byte = **2,25 MB** Grafikspeicher).
- Rechenweg Größen: Byte ÷ 1.024 = KB ÷ 1.024 = MB ÷ 1.024 = GB (umgekehrt × 1.024). Bit → Byte: ÷ 8.
- **Welche Zahl wann?**
  - **Datenraten (Mbit/s, Gbit/s): immer mit 1.000** rechnen *(Buch S. 95: 5 GBit/s = 625 MB/s; im Unterricht wurde dagegen mit 1.024 gerechnet – siehe ⚠ unten)*. Beispiel: 1.000 Mbit/s ÷ 8 = **125 MB/s**.
  - **Dateigröße mit GiB/MiB:** 1.024. **Steht nur „GB“:** Herstellerangabe → 1.000 (Buch S. 102), EDV-/Windows-Rechnung → 1.024 (Unterricht 24.11.) – die Aufgabe sagt, wer rechnet. Schreib in der Klausur dazu, womit du rechnest *(Ergänzung)*.
  - Beispiel: 4 GiB über 100 Mbit/s → 4 × 1.073.741.824 Byte × 8 ÷ 100.000.000 Bit/s ≈ **343,6 s** (bei 4 GB nach Hersteller: 320 s).
- Reihenfolge der Vorsätze: Kilo · Mega · Giga · Tera · Peta · Exa · **Zetta · Yotta** *(Unterricht 24.11.)*.

> ⚠ **Achtung, Fehler im Unterricht:** An der Tafel stand für 1.000 Mbit/s **128 MB/s** (= 1.024 ÷ 8). Datenraten rechnet man aber mit 1.000 → **Für die Klausur: 125 MB/s.**

> ⚠ **Achtung, Fehler im Unterricht:** An der Tafel waren **Zetta und Yotta vertauscht** – richtig: Zetta (ZB) kommt vor Yotta (YB).

> ⚠ **Achtung:** Im Unterricht hieß es „1 GB = 1.024 MB“ – das ist die EDV-Rechnung; nach Norm heißt sie 1 **GiB** = 1.024 MiB. Für die Klausur: Rechenbasis dazuschreiben.

## 92. Unterricht – Netzwerkgrößen, Router, Software-Begriffe

### Ausdehnung von Netzwerken (Unterricht)
| Netz | Name | Ausdehnung |
|---|---|---|
| **PAN** | Personal Area Network | ca. 10 m · Bluetooth, NFC, RFID |
| **LAN** | Local Area Network | ein Gebäude |
| **CAN** | Campus Area Network | Firmengelände |
| **MAN** | Metropolitan Area Network | Stadt/Region |
| **WAN** | Wide Area Network | Länder |
| **GAN** | Global Area Network | weltweit |

![Netzwerke nach Ausdehnung (Unterricht)](faecher/coa1/bilder/netzgroessen.svg)

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
