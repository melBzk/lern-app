// ============ Fach: ITE1 (Englisch) ============
// Die drei Datenblöcke unten sind 1:1 aus deinen Quiz-Dateien übernommen
// (ITE1_Englisch_Uebungsklausur_MC.html, ITE1_Klausurquiz_Trainer.html, ITE1_Englisch_Vokabelquiz.html).
// Neue Fragen/Vokabeln einfach im gleichen Format ergänzen – ganz unten werden sie für die App umgewandelt.
(() => {

// ---------- Übungsklausur (Situationen, Multiple Choice, Zuordnung) ----------
// a = Nummer der richtigen Antwort (ab 1)
const MC = [
 {sit:"Situation zur 1. bis 5. Aufgabe", unit:"Unit 1", text:"Sie beginnen Ihre Ausbildung in einem IT-Unternehmen und lernen die Firma, ihre Abteilungen und verschiedene Unternehmensarten kennen."},
 {q:"What is a <b>subsidiary</b>?", o:["A company that is owned by a larger parent company","The main office of a company","A company that is run by a family","A department that handles legal issues","A new company without any customers"], a:1, ex:"subsidiary = Tochtergesellschaft. Die Hauptverwaltung heißt head office bzw. headquarters."},
 {q:"Which description fits a <b>start-up</b>?", o:["A company with formalized processes and long-term strategic goals","A company operating in many countries with global infrastructure","A new, agile company that usually can't survive without outside investment","A company owned by the government","A company that only sells hardware"], a:3, ex:"Start-ups sind agil und schnell, aber oft auf Investoren angewiesen. Formalisierte Prozesse kennzeichnen große Unternehmen, globale Infrastruktur multinationale Konzerne."},
 {q:"What does <b>SaaS</b> mean?", o:["Security and Antivirus Service","Software as a Service – software that runs in the cloud and is rented by subscription","Storage and Archive System","Server as a Station","Software and Support Standard"], a:2, ex:"SaaS: Man mietet die Software (Abo) und nutzt sie über das Internet, statt sie lokal zu installieren."},
 {q:"Which department <i>makes sure that software meets technical standards</i>?", o:["Human Resources","Sales &amp; Marketing","Legal Department","Quality Assurance","Customer Service"], a:4, ex:"QA = Qualitätssicherung. HR = Personal, R&amp;D = Forschung und Entwicklung."},
 {type:"match", q:"Ordnen Sie die Abteilung der Aufgabe zu!", ref:"<b>Abteilungen:</b> 1. Human Resources · 2. Research &amp; Development · 3. Customer Service", rows:["recruits and trains new employees","creates innovative new products","answers customer questions and complaints","handles staff relations and benefits"], a:[1,2,3,1], ex:"HR kümmert sich um Personal (Einstellung, Schulung, Zusatzleistungen). R&amp;D entwickelt neue Produkte. Customer Service betreut Kundenanfragen."},

 {sit:"Situation zur 6. bis 12. Aufgabe", unit:"Unit 2", text:"Sie arbeiten in einem Softwareprojekt. Sie lernen die IT-Rollen im Team kennen und besprechen Arbeitsmodelle mit der Personalabteilung."},
 {q:"What does a <b>software tester</b> mainly do?", o:["Writes the marketing plan","Creates test scenarios and test data and finds bugs before users do","Delivers the project on time and on budget","Designs the company logo","Negotiates contracts with customers"], a:2, ex:"Der Tester prüft die Software gegen die requirements. Für Termine und Budget ist der Project Manager zuständig."},
 {q:"What is a <b>deliverable</b>?", o:["A delivery truck","A result or product that has to be handed over in a project","A software error","A meeting with the customer","A type of contract"], a:2, ex:"deliverable = Liefergegenstand, z. B. ein fertiges Modell, ein Testplan oder ein Bericht."},
 {q:"What does <b>KPI</b> stand for?", o:["Key Performance Indicator – a figure used to measure success","Keyboard Port Interface","Known Problem Index","Key Project Investment","Kernel Process Information"], a:1, ex:"Mit KPIs wie Umsatz oder Anzahl neuer Kunden misst man den Erfolg."},
 {q:"A <b>vulnerability</b> in an information system is …", o:["a backup copy","a weakness that attackers could use","a new feature","a fast network connection","a user manual"], a:2, ex:"vulnerability = Schwachstelle. Ein breach ist dagegen ein erfolgreicher Angriff oder ein Datenleck."},
 {q:"What does it mean to <b>deploy</b> software?", o:["To delete it","To write the code for it","To install it and make it available for use","To test it on paper","To sell it to a competitor"], a:3, ex:"deploy = bereitstellen, in Betrieb nehmen (z. B. in die production environment)."},
 {q:"What is a <b>compressed work week</b>?", o:["Working only from home","Working full-time hours on fewer days","Being paid only for results","Working part-time","Choosing any working hours without core time"], a:2, ex:"Ein Beispiel ist vier Tage à 10 Stunden. ROWE bedeutet: Es zählt nur das Ergebnis. Flexible hours bedeutet: freie Zeiteinteilung mit Kernzeit."},
 {q:"Complete: <i>„We get too ___ emails, and we spend too ___ time answering them.“</i>", o:["much – many","many – much","a lot – many","few – much","much – much"], a:2, ex:"emails sind zählbar → many. time ist unzählbar → much."},

 {sit:"Situation zur 13. bis 21. Aufgabe", unit:"Unit 3", text:"Sie arbeiten im IT-Support. Sie erklären neuen Kolleginnen und Kollegen Benutzeroberflächen, Hardware und Software-Einstellungen."},
 {q:"What is a <b>GUI</b>?", o:["A programming language","A graphical user interface that lets users control a computer with windows, icons and menus","A type of cable","A security protocol","A hard disk"], a:2, ex:"GUI = Graphical User Interface (grafische Benutzeroberfläche). Das Gegenteil ist eine Kommandozeile, bei der man Befehle eintippt."},
 {q:"Which GUI element lets you select <b>exactly one</b> option from a set of options?", o:["Check box","Text field","Radio button","Button","Search bar"], a:3, ex:"radio button = genau eine Option. check box = an/aus. drop-down = Auswahl aus einer versteckten Liste."},
 {q:"How do you <b>zoom in</b> on a smartphone?", o:["Pinch two fingers together","Spread two fingers apart","Swipe left","Press and hold","Two-finger tap"], a:2, ex:"spread = zoom in, pinch = zoom out."},
 {q:"What is <b>RAM</b>?", o:["Permanent storage for files","The temporary working memory of a computer","A type of monitor","A network cable","The graphics card"], a:2, ex:"RAM = Arbeitsspeicher, flüchtig (die Daten sind beim Ausschalten weg). Dauerhaft gespeichert wird auf SSD oder HDD."},
 {q:"What is the main advantage of an <b>SSD</b> compared to an HDD?", o:["It is always cheaper per GB","It is faster because it has no moving parts","It has spinning disks","It can only store music","It needs no power"], a:2, ex:"SSD = Solid-State-Drive (Flash-Speicher). Eine HDD hat rotierende Magnetscheiben und ist langsamer."},
 {q:"What is a <b>docking station</b> used for?", o:["To charge only smartphones","To connect a laptop with one cable to monitors, keyboard, mouse and power","To print documents","To cool the processor","To store backups in the cloud"], a:2, ex:"Laptop per USB-C anschließen, Monitore per HDMI/DisplayPort ans Dock."},
 {q:"What does it mean to <b>pair</b> a wireless headset?", o:["To buy two headsets","To connect it wirelessly (e.g. via Bluetooth) with a device","To clean it","To set the volume","To update the firmware"], a:2, ex:"pair = koppeln."},
 {q:"What is <b>bandwidth</b>?", o:["The width of a monitor","The amount of data that can be transferred per second","The length of a network cable","The number of users in a meeting","The size of a hard drive"], a:2, ex:"Wenn Video standardmäßig aus ist, spart man Bandbreite."},
 {q:"Complete: <i>„If we ___ file sharing, we ___ the security risk.“</i>", o:["will disable – reduce","disable – will reduce","disabled – will reduce","disable – reduced","would disable – will reduce"], a:2, ex:"Conditional 1: If + simple present, will + Infinitiv. Im if-Satz steht kein will."},

 {sit:"Situation zur 22. bis 32. Aufgabe", unit:"Unit 4", text:"Sie arbeiten in einem Agile-Team an einer App. Später planen Sie das WLAN für ein neues Büro und helfen bei der Entscheidung zwischen Cloud und eigener Infrastruktur."},
 {q:"Which statement describes <b>Agile</b> software development?", o:["The plan is fixed upfront and phases follow one after another.","Teams work in short iterative cycles (sprints) and get feedback continuously.","The project manager assigns every task and teams work in silos.","Customer feedback is only collected at the end.","Changes are not allowed once the project has started."], a:2, ex:"Alle anderen Antworten beschreiben traditionelle Projekte (z. B. Wasserfall)."},
 {q:"What is a <b>blocker</b> in a stand-up meeting?", o:["A team member who talks too much","A problem that is stopping progress","A firewall","A finished task","A new feature"], a:2, ex:"Die drei Stand-up-Fragen: What did I do yesterday? What will I do today? Are there any blockers?"},
 {q:"What is the <b>backend</b> of a software program?", o:["The part the user sees, like buttons and menus","The part the user doesn't see, like the logic, server and database","The last page of the manual","The keyboard and mouse","The design draft of an interface"], a:2, ex:"frontend = Benutzeroberfläche, backend = unsichtbare Logik und Daten. Ein wireframe ist ein UI-Entwurf."},
 {q:"What is an <b>API</b>?", o:["A type of monitor","An interface that allows two software programs to communicate and exchange data","A virus scanner","A wireless access point","A project plan"], a:2, ex:"API = Application Programming Interface (Programmierschnittstelle). Beispiel: Ein Online-Shop spricht über eine API mit dem Zahlungsdienst."},
 {q:"What is a <b>token</b> in software?", o:["A coin for the coffee machine","A small piece of data used to identify a user","A large database","A type of chart","A wireless router"], a:2, ex:"Läuft ein authorization token zu früh ab, wird der Nutzer abgemeldet."},
 {q:"What does an <b>access point</b> do?", o:["It prints documents","It lets wireless devices connect to a wired network by broadcasting a Wi-Fi signal","It stores backups","It measures room temperature","It encrypts emails"], a:2, ex:"AP = WLAN-Zugangspunkt. Die SSID ist der Name des WLANs."},
 {q:"What is <b>latency</b>?", o:["The amount of data per second","The time it takes for data to travel from source to destination","The name of a Wi-Fi network","An area without signal","The price of a router"], a:2, ex:"latency = Verzögerung. Bandbreite (bandwidth) ist dagegen die Datenmenge pro Sekunde."},
 {q:"What is a <b>dead zone</b> in a wireless network?", o:["An area with no Wi-Fi signal","A crashed server","A deleted file","A network with too many users","A secure password zone"], a:1, ex:"dead zone = Funkloch. Mehr access points verbessern die coverage (Abdeckung)."},
 {q:"What does <b>on-premise</b> infrastructure mean?", o:["Servers rented from a cloud provider","The company's own servers and hardware on its own premises","Software on a smartphone","A temporary network","Data stored only on paper"], a:2, ex:"on-premise = lokal, im eigenen Haus. Gegenteil: cloud computing über einen Drittanbieter."},
 {q:"What is the main purpose of the <b>GDPR</b>?", o:["To make cloud services cheaper","To protect the privacy and rights of individuals regarding their personal data","To set standards for Wi-Fi speed","To control international trade","To regulate working hours"], a:2, ex:"GDPR = DSGVO. Sie regelt das Sammeln, Verarbeiten und Speichern personenbezogener Daten und gilt für alle, die in der EU tätig sind oder Daten von EU-Bürgern verarbeiten."},
 {q:"Complete: <i>„___ the higher costs, the cloud is a good option for us.“</i>", o:["Although","Even though","Despite","Unless","However"], a:3, ex:"Nach despite steht ein Nomen oder eine -ing-Form. Nach although/even though steht ein ganzer Satz: Although the costs are higher, …"},

 {sit:"Situation zur 33. bis 39. Aufgabe", unit:"Unit 7", text:"Sie arbeiten im Kundensupport eines Softwareanbieters für ERP-Systeme. Sie bearbeiten Tickets und erklären Kunden ihr Dashboard."},
 {q:"What is an <b>ERP system</b>?", o:["A program for editing photos","Software that manages and integrates business processes like finance, HR, production, sales and inventory in one central system","A type of network cable","A social media platform","An antivirus program"], a:2, ex:"ERP = Enterprise Resource Planning. CRM = Kundenbeziehungen, SCM = Lieferkette."},
 {q:"What is a <b>CRM</b> system used for?", o:["Managing customer data, contacts, leads and sales","Cooling servers","Writing source code","Managing Wi-Fi access points","Editing videos"], a:1, ex:"CRM = Customer Relationship Management."},
 {q:"In a support ticket, what does <b>severity</b> describe?", o:["How fast the problem must be fixed","How bad the problem is","Who reported the problem","The date of the ticket","The cost of the solution"], a:2, ex:"Severity = wie schlimm. Priority = wie dringend."},
 {q:"A ticket has the status <b>backlog</b>. What does that mean?", o:["It has been fixed","It has been logged but is not yet scheduled","It was deleted","It is being worked on right now","It was sent to the customer"], a:2, ex:"Weitere Status: open, in progress, pending, on hold, closed. deferred = verschoben."},
 {q:"Which chart is best to show <b>parts of a whole</b> (percentages)?", o:["Line chart","Pie chart","Funnel chart","Map chart","Numeric card"], a:2, ex:"pie chart = Anteile, line chart = Trend über Zeit, bar chart = Vergleich."},
 {q:"What is a <b>sandbox</b> environment?", o:["A playground for children","A safe test environment where updates are tested before deployment","The main production server","A cloud storage folder","A backup tape"], a:2, ex:"Gehört zu den Preventative measures im Incident Report: Updates erst in der Sandbox testen."},
 {q:"Which phrase do you use to <b>confirm a customer's symptoms</b>?", o:["You can resolve this by …","Just to confirm, are you experiencing …?","Alternatively, you can try …","If this does not work, you might also consider …","Typical signs include …"], a:2, ex:"Ablauf einer FAQ: issue → symptoms → confirm → solution → alternative."},

 {sit:"Situation zur 40. bis 45. Aufgabe", unit:"Unit 11", text:"Sie arbeiten bei einer Beratungsfirma für Digitalisierung und erklären Kunden Begriffe rund um digitale Transformation und das Internet der Dinge."},
 {q:"What is <b>digitalization</b> (of a country)?", o:["Printing all documents","Integrating digital technologies into society, economy and government","Buying new computers for one office","Replacing all workers with robots","Using social media only"], a:2, ex:"Ziele: bessere öffentliche Dienste, Wachstum, Effizienz, Innovation."},
 {q:"What does <b>IoT</b> stand for?", o:["Internet of Things – devices with sensors that collect and share data","Integration of Technology","Input/Output Terminal","International Online Trade","Internet over Telephone"], a:1, ex:"Beispiele: smart thermostat, smartwatch, vernetzte Rauchmelder."},
 {q:"What does <b>interoperability</b> mean?", o:["Working without a computer","The ability of different systems to work together and exchange data","A type of surgery","Very fast internet","Working from home"], a:2, ex:"Gemeinsame Standards sorgen für Interoperabilität."},
 {q:"What is the <b>digital divide</b>?", o:["A broken network cable","The gap between people with and without access to technology or digital skills","Dividing a hard drive into parts","A new smartphone model","The border between two countries"], a:2, ex:"Ein Risiko der Digitalisierung, z. B. für ältere Menschen oder ländliche Regionen."},
 {q:"What is a <b>blockchain</b>?", o:["A chain for locking a laptop","A secure, shared digital record of transactions that is very hard to change","A type of firewall","A slow internet connection","A list of blocked websites"], a:2, ex:"Einsatz z. B. zur Prüfung der Echtheit von Dokumenten oder für Zahlungen."},
 {q:"IoT devices collect a lot of raw data. What is the <b>first step</b> to make this data useful?", o:["Data interpretation","Data cleaning – removing errors and handling missing values","Deleting all data","Printing the data","Selling the data"], a:2, ex:"Die Reihenfolge lautet: data cleaning → data structuring → data interpretation."}
];

// ---------- Klausur-Trainer (Forms-Quiz) ----------
// type: single | multi | text,  a = richtige Nummer(n) ab 1
const TRAINER = [
 {type:"single", pts:4, q:"What does <b>CPU</b> stand for?", o:["Computer Personal Unit","Central Process Unit","Core Performance Utility","Communication Performance Unit"], a:[2],
  ex:"CPU = Central Processing Unit (Prozessor). Im Forms-Quiz steht als Antwort „Central Process Unit“; die korrekte Langform lautet „Central Processing Unit“."},
 {type:"single", pts:4, q:"What is a <b>„GUI“</b>?", o:["General User Interaction","Graphical User Interface","General Utility Interface","Global Utility Integration"], a:[2],
  ex:"GUI = Graphical User Interface, die grafische Benutzeroberfläche mit Fenstern, Symbolen und Menüs."},
 {type:"text", pts:4, q:"Which component in a PC is responsible for sending the video signal to the monitor? (one or 2 words)", accept:["gpu","graphics card","video card","graphics card gpu","graphic card","graphics card (gpu)"],
  ex:"Richtige Antworten laut Quiz: GPU, Graphics Card, Video Card (deutsch: Grafikkarte)."},
 {type:"single", pts:4, q:"What is a <b>motherboard</b> in a computer?", o:["It is the mother of which all boards are copied","It is the mainboard for the CPU and to connect all peripherals","In a computer, there is no motherboard"], a:[2],
  ex:"Motherboard = Hauptplatine (Mainboard). Auf ihr sitzen CPU und RAM, an sie werden alle Komponenten angeschlossen."},
 {type:"single", pts:4, q:"In networking, what does <b>„LAN“</b> mean?", o:["Local Area Network","Large Access Node","Logical Application Network","Linked Access Net"], a:[1],
  ex:"LAN = Local Area Network, ein lokales Netzwerk (z. B. im Büro). Zum Vergleich: WAN = Wide Area Network, WLAN = Wireless LAN."},
 {type:"single", pts:4, q:"Which device <b>connects multiple networks</b> together?", o:["Switch","Router","Hub","Mouse"], a:[2],
  ex:"Ein Router verbindet Netzwerke, z. B. das Büronetz mit dem Internet. Ein Switch verbindet Geräte innerhalb eines Netzwerks."},
 {type:"single", pts:4, q:"Which of these is an example of <b>cloud storage</b>?", o:["Dropbox","BIOS","RAM","SSD"], a:[1],
  ex:"Dropbox speichert Dateien online beim Anbieter. BIOS ist Firmware, RAM der Arbeitsspeicher, die SSD ein lokaler Datenträger."},
 {type:"single", pts:4, q:"What is <b>RAM</b>?", o:["Read any Monday","Random Access Memory","Rules are must!"], a:[2],
  ex:"RAM = Random Access Memory, der Arbeitsspeicher (flüchtig)."},
 {type:"single", pts:4, q:"What does <b>„HTTP“</b> stand for?", o:["HyperText Transfer Protocol","High Transfer Text Protocol","Hyper Transfer Text Process","High Transmission Transfer Protocol"], a:[1],
  ex:"HTTP = HyperText Transfer Protocol, das Protokoll für Webseiten. HTTPS ist die verschlüsselte Variante."},
 {type:"multi", pts:8, q:"Wie sagt man für <b>„Vertrauen“</b>?", hint:"Wählen Sie 2 Optionen aus.", o:["Concierge","Confidence","Concerned","Conspiracy","Trust"], a:[2,5],
  ex:"Vertrauen = trust / confidence. Concierge = Portier, concerned = besorgt, conspiracy = Verschwörung."},
 {type:"multi", pts:4, q:"What is part of a <b>GUI</b> (Graphical User Interface)? Click all matching items.", o:["desktop","hard disk","menu bar","icon","RAM","minimize/maximize/close buttons","Peter, Paul and Mary"], a:[1,3,4,6],
  ex:"Zur GUI gehören die sichtbaren Elemente: desktop, menu bar, icons, minimize/maximize/close buttons. Hard disk und RAM sind Hardware."},
 {type:"single", pts:4, q:"Fill in the blank: <i>„Please ___ the file before sending it.“</i>", o:["compress","eat","forget","shout"], a:[1],
  ex:"compress = komprimieren (z. B. als ZIP), damit die Datei kleiner wird. Die falschen Optionen sind ergänzt, im Original war nur „compress“ zu sehen."}
];

// ---------- Vokabeln: [Englisch, Deutsch, Unit] ----------
const VOC = [
 // Unit 1 – My company
 ["apprentice","Auszubildende/r, Lehrling","Unit 1"],
 ["apprenticeship","Ausbildung, Lehre","Unit 1"],
 ["vocational training","Berufsausbildung","Unit 1"],
 ["head office","Hauptsitz, Zentrale","Unit 1"],
 ["medium-sized company","mittelständischer Betrieb","Unit 1"],
 ["family business","Familienunternehmen","Unit 1"],
 ["subsidiary","Tochtergesellschaft","Unit 1"],
 ["induction","Einführung (neuer Mitarbeiter)","Unit 1"],
 ["Chairman of the Board","Vorstandsvorsitzende/r","Unit 1"],
 ["to found","gründen","Unit 1"],
 ["factory","Fabrik, Werk","Unit 1"],
 ["connector","Steckverbinder","Unit 1"],
 ["mechanical engineering","Maschinenbau","Unit 1"],
 ["target group","Zielgruppe","Unit 1"],
 ["competitor","Wettbewerber, Konkurrent","Unit 1"],
 ["Human Resources (HR)","Personalabteilung","Unit 1"],
 ["Research and Development (R&D)","Forschung und Entwicklung","Unit 1"],
 ["Quality Assurance (QA)","Qualitätssicherung","Unit 1"],
 ["Legal Department","Rechtsabteilung","Unit 1"],
 ["Customer Service","Kundendienst","Unit 1"],
 ["Sales","Vertrieb","Unit 1"],
 ["elevator (AE) / lift (BE)","Aufzug","Unit 1"],
 ["ground floor (BE)","Erdgeschoss","Unit 1"],
 ["open-plan office","Großraumbüro","Unit 1"],
 ["to recruit","(Personal) anwerben, einstellen","Unit 1"],
 ["outside investment","Investition von außen, Fremdkapital","Unit 1"],
 ["to make a profit","Gewinn machen","Unit 1"],
 ["revenue","Umsatz, Einnahmen","Unit 1"],
 ["collaboration","Zusammenarbeit","Unit 1"],
 ["compliance","Einhaltung von Vorschriften","Unit 1"],
 // Unit 2 – My workplace
 ["workflow","Arbeitsablauf","Unit 2"],
 ["productivity","Produktivität","Unit 2"],
 ["to prioritize","Prioritäten setzen","Unit 2"],
 ["overload","Überlastung","Unit 2"],
 ["counterproductive","kontraproduktiv","Unit 2"],
 ["back-to-back","direkt aufeinanderfolgend","Unit 2"],
 ["redundancy","Redundanz, Doppelung","Unit 2"],
 ["aligned","aufeinander abgestimmt","Unit 2"],
 ["interruption","Unterbrechung","Unit 2"],
 ["to be on call","in Rufbereitschaft sein","Unit 2"],
 ["fatigue","Erschöpfung, Ermüdung","Unit 2"],
 ["survey","Umfrage","Unit 2"],
 ["to supervise","beaufsichtigen, betreuen","Unit 2"],
 ["to be in charge of","zuständig sein für","Unit 2"],
 ["bug / defect","Programmfehler / Mangel","Unit 2"],
 ["to deliver","liefern, umsetzen","Unit 2"],
 ["to raise a problem","auf ein Problem aufmerksam machen","Unit 2"],
 ["test data","Prüfdaten, Testdaten","Unit 2"],
 ["requirements","Anforderungen","Unit 2"],
 ["responsibility","Verantwortung, Zuständigkeit","Unit 2"],
 ["deliverable","Liefergegenstand, Arbeitsergebnis","Unit 2"],
 ["to deploy","bereitstellen, in Betrieb nehmen","Unit 2"],
 ["vulnerability","Schwachstelle","Unit 2"],
 ["breach","Sicherheitsverletzung, Einbruch","Unit 2"],
 ["seamless","nahtlos","Unit 2"],
 ["annual leave","Jahresurlaub","Unit 2"],
 ["base salary","Grundgehalt","Unit 2"],
 ["benefits","Zusatzleistungen","Unit 2"],
 ["retirement plan","Altersvorsorge, Betriebsrente","Unit 2"],
 ["core working hours","Kernarbeitszeit","Unit 2"],
 ["notice period","Kündigungsfrist","Unit 2"],
 ["resignation","Kündigung (durch Arbeitnehmer)","Unit 2"],
 ["remuneration","Vergütung","Unit 2"],
 // Unit 3 – Computer software and hardware
 ["graphical user interface (GUI)","grafische Benutzeroberfläche","Unit 3"],
 ["menu bar","Menüleiste","Unit 3"],
 ["file explorer","Datei-Explorer, Dateimanager","Unit 3"],
 ["folder","Ordner","Unit 3"],
 ["wastepaper basket / trash","Papierkorb","Unit 3"],
 ["search bar","Suchleiste","Unit 3"],
 ["dock","Programmleiste","Unit 3"],
 ["portrait mode","Hochformat","Unit 3"],
 ["landscape mode","Querformat","Unit 3"],
 ["to press and hold","gedrückt halten","Unit 3"],
 ["to pinch","(Finger) zusammenziehen","Unit 3"],
 ["to swipe","wischen","Unit 3"],
 ["credentials","Zugangsdaten","Unit 3"],
 ["power outlet","Steckdose","Unit 3"],
 ["LED indicator","LED-Anzeige","Unit 3"],
 ["receiver","Empfänger","Unit 3"],
 ["resolution","Auflösung","Unit 3"],
 ["to pair (a device)","(ein Gerät) koppeln","Unit 3"],
 ["default","Standard(-einstellung)","Unit 3"],
 ["lumbar support","Lendenwirbelstütze","Unit 3"],
 ["strain","Belastung","Unit 3"],
 ["portability","Transportierbarkeit, Tragbarkeit","Unit 3"],
 ["light-weight","leicht","Unit 3"],
 ["solid-state drive (SSD)","Solid-State-Laufwerk","Unit 3"],
 ["wireless","drahtlos","Unit 3"],
 ["fit-for-purpose","zweckmäßig, geeignet","Unit 3"],
 ["radio button","Optionsfeld","Unit 3"],
 ["check box","Kontrollkästchen","Unit 3"],
 ["drop-down field","Auswahlliste","Unit 3"],
 ["notification","Benachrichtigung","Unit 3"],
 ["to enable","aktivieren","Unit 3"],
 ["to disable","deaktivieren","Unit 3"],
 ["bandwidth","Bandbreite","Unit 3"],
 ["to enforce","durchsetzen, erzwingen","Unit 3"],
 ["outcome","Ergebnis","Unit 3"],
 ["accessibility","Barrierefreiheit","Unit 3"],
 // Unit 4 – Internal communication
 ["adaptive","anpassungsfähig","Unit 4"],
 ["sequential phases","aufeinanderfolgende Phasen","Unit 4"],
 ["silo","Silo (isolierter Bereich)","Unit 4"],
 ["misalignment","Nichtübereinstimmung, Diskrepanz","Unit 4"],
 ["upfront","im Voraus","Unit 4"],
 ["approach","Ansatz, Vorgehensweise","Unit 4"],
 ["to distribute","verteilen","Unit 4"],
 ["stakeholder","Beteiligte/r, Interessengruppe","Unit 4"],
 ["accountable","verantwortlich, rechenschaftspflichtig","Unit 4"],
 ["tweaks","kleine Anpassungen","Unit 4"],
 ["blocker","Hindernis (stoppt den Fortschritt)","Unit 4"],
 ["Wi-Fi access point","WLAN-Zugangspunkt","Unit 4"],
 ["interference","Störung, Interferenz","Unit 4"],
 ["network load","Netzwerklast","Unit 4"],
 ["reliability","Zuverlässigkeit","Unit 4"],
 ["dead zone","Funkloch","Unit 4"],
 ["coverage gap","Lücke in der Netzabdeckung","Unit 4"],
 ["draft","Entwurf","Unit 4"],
 ["measurement unit","Messgerät","Unit 4"],
 ["consequence","Folge","Unit 4"],
 ["to justify","rechtfertigen, begründen","Unit 4"],
 ["bulk discount","Mengenrabatt","Unit 4"],
 ["to bear in mind","im Hinterkopf behalten","Unit 4"],
 ["to factor in","einbeziehen, einkalkulieren","Unit 4"],
 ["crucial","entscheidend","Unit 4"],
 ["shielded","abgeschirmt","Unit 4"],
 ["on-premise","vor Ort (eigene Infrastruktur)","Unit 4"],
 ["comprehensive","umfassend","Unit 4"],
 ["personal data","personenbezogene Daten","Unit 4"],
 ["safeguards","Schutzmaßnahmen","Unit 4"],
 ["unparalleled","unübertroffen","Unit 4"],
 ["scalability","Skalierbarkeit","Unit 4"],
 ["reputable","seriös, angesehen","Unit 4"],
 ["to impede sth","etw. erschweren, beeinträchtigen","Unit 4"],
 ["hurdle","Hürde","Unit 4"],
 ["to mitigate sth","etw. abmildern","Unit 4"],
 ["reluctance","Zögern, Widerwille","Unit 4"],
 ["latency","Latenz, Verzögerung","Unit 4"],
 ["disaster recovery","Notfallwiederherstellung","Unit 4"],
 ["intellectual property","geistiges Eigentum","Unit 4"],
 // Unit 7 – Dealing with customers
 ["severity","Schweregrad (wie schlimm)","Unit 7"],
 ["priority","Dringlichkeit, Priorität","Unit 7"],
 ["showstopper","K.-o.-Fehler (blockiert alles)","Unit 7"],
 ["negligible","vernachlässigbar","Unit 7"],
 ["deferred","verschoben","Unit 7"],
 ["backlog","Rückstand, Auftragsstau","Unit 7"],
 ["pending","ausstehend","Unit 7"],
 ["on hold","in Wartestellung","Unit 7"],
 ["feature request","Funktionswunsch","Unit 7"],
 ["to assign","zuweisen","Unit 7"],
 ["purchase order","Bestellung","Unit 7"],
 ["to acknowledge","anerkennen, bestätigen","Unit 7"],
 ["vendor","Anbieter, Hersteller","Unit 7"],
 ["customer churn","Kundenabwanderung","Unit 7"],
 ["lead","Interessent, potenzieller Kunde","Unit 7"],
 ["quotation","Angebot","Unit 7"],
 ["invoice","Rechnung","Unit 7"],
 ["pie chart","Kreisdiagramm","Unit 7"],
 ["legend","Legende (Diagramm)","Unit 7"],
 ["customer retention","Kundenbindung","Unit 7"],
 ["permissions","Berechtigungen","Unit 7"],
 ["inventory","Lagerbestand, Inventar","Unit 7"],
 ["response time","Reaktionszeit","Unit 7"],
 ["discrepancy","Abweichung, Unstimmigkeit","Unit 7"],
 ["ledger","Hauptbuch","Unit 7"],
 ["to reverse an entry","eine Buchung stornieren","Unit 7"],
 ["to reconcile payments","Zahlungen abgleichen","Unit 7"],
 ["posted","gebucht","Unit 7"],
 ["to unlock","entsperren","Unit 7"],
 ["duplicate entry","doppelter Eintrag","Unit 7"],
 // Unit 11 – Digitalization
 ["to foster innovation","Innovation fördern","Unit 11"],
 ["competitiveness","Wettbewerbsfähigkeit","Unit 11"],
 ["policy-making","politische Entscheidungsfindung","Unit 11"],
 ["to keep pace with sth","mit etw. Schritt halten","Unit 11"],
 ["broadband","Breitband","Unit 11"],
 ["workforce","Arbeitskräfte, Belegschaft","Unit 11"],
 ["entrepreneurship","Unternehmertum","Unit 11"],
 ["state-of-the-art","hochmodern","Unit 11"],
 ["permit","Genehmigung","Unit 11"],
 ["skills shortage","Fachkräftemangel","Unit 11"],
 ["submission","Einreichung","Unit 11"],
 ["validation","Gültigkeitsprüfung","Unit 11"],
 ["to hinder","behindern","Unit 11"],
 ["authority","Behörde","Unit 11"],
 ["authenticity","Echtheit","Unit 11"],
 ["bottleneck","Engpass","Unit 11"],
 ["to struggle with sth","mit etw. zu kämpfen haben","Unit 11"],
 ["digital divide","digitale Kluft","Unit 11"],
 ["insurance premium","Versicherungsprämie","Unit 11"],
 ["claim","Schadensfall, Versicherungsanspruch","Unit 11"],
 ["tangible benefits","greifbare Vorteile","Unit 11"],
 ["to acquire","erwerben, anschaffen","Unit 11"],
 ["sophisticated algorithms","ausgefeilte Algorithmen","Unit 11"],
 ["volunteer","Freiwillige/r","Unit 11"],
 ["construction site","Baustelle","Unit 11"]
];


// =================== Umwandlung für die App ===================
const UNIT = { "Unit 1": 1, "Unit 2": 2, "Unit 3": 3, "Unit 4": 4, "Unit 7": 7, "Unit 11": 11 };
const TRAINER_D = 90, VOKABEL_D = 95;
const fragen = [];
const plain = s => s.replace(/<[^>]+>/g, "");
const pick = (arr, n) => arr.slice().sort(() => Math.random() - .5).slice(0, n);

// Übungsklausur
let sit = null;
MC.forEach(it => {
  if (it.sit) { sit = it; return; }
  const d = UNIT[sit.unit];
  if (it.type === "match") {
    // "<b>Abteilungen:</b> 1. HR · 2. R&D · 3. CS"  →  ["HR", "R&D", "CS"]
    const labels = plain(it.ref).split("·").map(s => s.replace(/^.*?\d+\.\s*/, "").trim());
    it.rows.forEach((row, r) => {
      const right = labels[it.a[r] - 1];
      fragen.push({ d, kontext: sit.text, q: `${it.q}<br><i>„${row}“</i>`,
        o: [right, ...labels.filter(l => l !== right)], e: it.ex });
    });
    return;
  }
  fragen.push({ d, kontext: sit.text, q: it.q,
    o: [it.o[it.a - 1], ...it.o.filter((_, i) => i !== it.a - 1)], e: it.ex });
});

// Klausur-Trainer
TRAINER.forEach(it => {
  const base = { d: TRAINER_D, q: it.q + (it.hint ? ` <span class="hint">(${it.hint})</span>` : ""), e: it.ex };
  if (it.type === "text") fragen.push({ ...base, t: "text", accept: it.accept });
  else if (it.type === "multi") fragen.push({ ...base, t: "multi", o: it.o, k: it.a.map(n => n - 1) });
  else fragen.push({ ...base, o: [it.o[it.a[0] - 1], ...it.o.filter((_, i) => i !== it.a[0] - 1)] });
});

// Vokabeln: Richtung wird bei jedem Start zufällig gewählt (Englisch→Deutsch oder umgekehrt)
VOC.forEach(([en, de, unit]) => {
  const same = VOC.filter(v => v[2] === unit && v[0] !== en);
  const wrong = pick(same, 3);
  const toDe = Math.random() < .5;
  fragen.push(toDe
    ? { d: VOKABEL_D, key: en, q: `Was heißt <b>${en}</b> auf Deutsch?`, o: [de, ...wrong.map(v => v[1])], e: `${en} = ${de} · ${unit}` }
    : { d: VOKABEL_D, key: en, q: `Wie heißt <b>${de}</b> auf Englisch?`, o: [en, ...wrong.map(v => v[0])], e: `${de} = ${en} · ${unit}` });
});

registerFach({
  id: "ite1",
  name: "ITE1",
  langname: "Englisch (IT Matters)",
  bereich: "Vorbereitungskurs",
  html: true, // Fragen enthalten <b>/<i>
  themen: {
    1: "Unit 1 · My company",
    2: "Unit 2 · My workplace",
    3: "Unit 3 · Software & hardware",
    4: "Unit 4 · Internal communication",
    7: "Unit 7 · Dealing with customers",
    11: "Unit 11 · Digitalization",
    [TRAINER_D]: "Klausur-Trainer · Forms-Quiz",
    [VOKABEL_D]: "Vokabeln · alle Units"
  },
  fragen,
  wissensbasis: "faecher/ite1/wissensbasis.md",
  // Kapitel der Lernübersicht (## Nummer) je Thema
  kapitel: { 1: "1", 2: "2", 3: "3", 7: "4", 4: "5", 11: "6", [TRAINER_D]: "3" },
  allgemein: ["0", "7", "8"]
});
})();
