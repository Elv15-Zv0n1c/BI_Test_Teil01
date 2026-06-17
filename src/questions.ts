export interface Question {
  text: string;
  options: string[];
  correct: number;
  topic: string;
}

export const ALL_QUESTIONS: Question[] = [
  {
    text: "Was ist das primäre Ziel von Business Intelligence?",
    options: [
      "Die vollständige Automatisierung aller operativen Geschäftstransaktionen zur Reduktion von Personalkosten.",
      "Die systematische Aufbereitung heterogener Unternehmensdaten zu entscheidungsrelevanten Informationen.",
      "Die exklusive Erfassung externer Marktdaten zur Abwehr potenzieller wettbewerbsbezogener Risiken.",
      "Die technologische Ablösung dezentraler ERP-Systeme durch eine universelle transaktionale SQL-Datenbank."
    ],
    correct: 1,
    topic: "Grundlagen"
  },
  {
    text: "Welche Komponente ist kein zwingender Bestandteil einer BI-Lösung?",
    options: [
      "Heterogene operative Quellsysteme wie ERP oder CRM.",
      "Eine leistungsfähige ETL-Strecke zur Datenintegration.",
      "Ein internes soziales Netzwerk für interaktiven Datenaustausch.",
      "Eine analytische Datenbank wie ein zentrales Data Warehouse."
    ],
    correct: 2,
    topic: "Architektur"
  },
  {
    text: "Wie unterstützt BI datenbasierte Entscheidungen?",
    options: [
      "Durch die ausschließliche Bereitstellung statischer Umsatzberichte in unveränderten Tabellenstrukturen.",
      "Durch die visuelle Bestätigung intuitiver Managemententscheidungen mittels vordefinierter Diagramme.",
      "Durch die Bereitstellung konsolidierter, bereinigter Berichte zur Identifikation von Mustern.",
      "Durch die vollautomatische Einleitung operativer Gegenmaßnahmen ohne die Notwendigkeit von Freigaben."
    ],
    correct: 2,
    topic: "Grundlagen"
  },
  {
    text: "Welche der folgenden Quellen ist typischerweise keine interne Datenquelle eines BI-Systems?",
    options: [
      "Das zentrale ERP-System mit Finanz-, Logistik- und produktionsrelevanten Daten.",
      "Standardisierte Berichte externer Agenturen zur globalen Branchenentwicklung.",
      "Das dezentrale CRM-System mit historischen Informationen zu Kunden und Vertriebschancen.",
      "Manuell gepflegte Tabellenkalkulationen des Controllings bezüglich der Budgetplanung."
    ],
    correct: 1,
    topic: "Datenquellen"
  },
  {
    text: "Welche Aussage beschreibt den grundlegenden Unterschied zwischen einem Data Warehouse und einem Data Lake zutreffend?",
    options: [
      "Ein Data Lake speichert strukturierte Daten, während ein Data Warehouse nur relationale unstrukturierte Daten sichert.",
      "Ein Data Warehouse erzwingt das Schema beim Schreiben, während ein Data Lake das Schema erst beim Lesen anwendet.",
      "Ein Data Lake zeichnet sich durch ein stark reduziertes Datenvolumen gegenüber einem Data Warehouse aus.",
      "Beide Systeme sind technologisch sowie konzeptionell identisch und unterscheiden sich ausschließlich in der Namensgebung."
    ],
    correct: 1,
    topic: "Architektur"
  },
  {
    text: "Welche konkrete Auswirkung hat schlechte Datenqualität auf BI-Analysen?",
    options: [
      "Dashboards weisen geringfügig längere Ladezeiten auf, zeigen jedoch durchgängig mathematisch korrekte Kennzahlen.",
      "Abteilungen agieren auf Basis widersprüchlicher Werte, was zu Vertrauensverlust und Fehlentscheidungen führt.",
      "Fehlerhafte Datensätze werden durch moderne Analyse-Engines im Front-End vollautomatisch und fehlerfrei korrigiert.",
      "Die qualitative Beschaffenheit der Datenbasis hat keinen nachweisbaren Einfluss auf strategische Entscheidungen."
    ],
    correct: 1,
    topic: "Datenqualität"
  },
  {
    text: "Welcher Mechanismus gehört zu den automatisierten Data-Quality-Checks?",
    options: [
      "Die tägliche manuelle Stichprobenprüfung neu importierter Sätze durch einen dedizierten Data Steward.",
      "Regelbasierte ETL-Validierungen zur Aussteuerung unplausibler Wertebereiche und fehlender Pflichtfelder.",
      "Die nachträgliche, rein visuelle Abänderung aggregierter Kennzahlen direkt in den fertigen Berichten.",
      "Die pauschale Löschung sämtlicher Datensätze, welche statistisch von vordefinierten Mittelwerten abweichen."
    ],
    correct: 1,
    topic: "Datenqualität"
  },
  {
    text: "Welche Funktion übernehmen ETL-Tools in der Datenaufbereitung?",
    options: [
      "Sie dienen der rein grafischen Gestaltung und interaktiven Publikation von Management-Dashboards.",
      "Sie extrahieren Daten aus Quellsystemen, transformieren sie strukturell und laden sie in das Zielsystem.",
      "Sie agieren als logischer Ersatz für physische Data Warehouses und übernehmen deren Speicherfunktion.",
      "Sie regulieren primär die Zugriffsberechtigungen der Endanwender auf sensible relationale Datenbanktabellen."
    ],
    correct: 1,
    topic: "ETL"
  },
  {
    text: "Welcher Mehrwert entsteht durch die Kombination interner und externer Datenquellen?",
    options: [
      "Die im System befindlichen internen Daten werden durch den externen Import automatisch fehlerfrei bereinigt.",
      "Der Import externer Quellen macht die Vorhaltung eines physischen Data Warehouses vollständig obsolet.",
      "Interne Leistungskennzahlen werden durch externen Marktkontext für vergleichende Analysen anwendbar gemacht.",
      "Externe Quellen dienen ausschließlich der operativen Bonitätsprüfung von im System registrierten Neukunden."
    ],
    correct: 2,
    topic: "Datenquellen"
  },
  {
    text: "Welches Element ist Teil einer gut durchdachten BI-Architektur?",
    options: [
      "Eine Präsentationsschicht, welche ungefiltert Abfragen direkt auf transaktionalen Quellsystemen ausführt.",
      "Eine semantische Schicht zur einheitlichen, abteilungsübergreifenden Definition geschäftskritischer Kennzahlen.",
      "Der bewusste Verzicht auf jegliche technische Dokumentation zur Gewährleistung maximaler Agilität.",
      "Die physische Speicherung und Konsolidierung sämtlicher Unternehmensdaten in dezentralen Excel-Dateien."
    ],
    correct: 1,
    topic: "Architektur"
  },
  {
    text: "Welche Maßnahme hilft, Datenchaos in BI-Prozessen zu vermeiden?",
    options: [
      "Die Gewährung voller Autonomie für jede Abteilung bezüglich der Definition eigener Kennzahlen.",
      "Die Bereitstellung zertifizierter und zentral gepflegter Datasets als verbindliche Berichtsvorlage.",
      "Die vollständige Eliminierung von Metadaten und Schemabeschreibungen zur Reduktion der Systemkomplexität.",
      "Die ungeordnete Speicherung sämtlicher Rohdaten in einem dezentralen, nicht dokumentierten Datenpool."
    ],
    correct: 1,
    topic: "Datenqualität"
  },
  {
    text: "Wovon profitieren Unternehmen bei der Automatisierung ihrer BI-Pipelines?",
    options: [
      "Die manuelle Datenaufbereitung wird durch kreative, nicht reproduzierbare Arbeitsweisen bereichert.",
      "Die ETL-Strecken bedürfen keinerlei technischer Überwachung mehr, da Automatisierungen absolut fehlerfrei arbeiten.",
      "Fehlerquellen manueller Aufbereitungen werden minimiert und regelmäßige, pünktliche Dashboard-Updates gesichert.",
      "Die Automatisierung führt ausschließlich zu einer unmittelbaren Reduktion notwendiger Server-Hardware-Ressourcen."
    ],
    correct: 2,
    topic: "Automatisierung"
  },
  {
    text: "Was bedeutet \"Single Source of Truth\" im BI-Kontext?",
    options: [
      "Die physische Restriktion aller Datenbestände eines globalen Konzerns auf einen einzigen Datenbankserver.",
      "Die gesetzliche Verpflichtung zur ausschließlichen Nutzung staatlich zertifizierter Berichtssysteme.",
      "Das Prinzip einer eindeutigen, konsistenten und verbrieften Datenquelle für unternehmensweite Kennzahlen.",
      "Die Implementierung eines spezifischen Algorithmus zur unwiderruflichen Bereinigung von Kundenstammdaten."
    ],
    correct: 2,
    topic: "Grundlagen"
  },
  {
    text: "Was unterscheidet Batch-Verarbeitung von Echtzeitdatenanalyse?",
    options: [
      "Die Batch-Verarbeitung erzielt grundsätzlich signifikant höhere Verarbeitungsgeschwindigkeiten als Echtzeitsysteme.",
      "Batch-Systeme verarbeiten Daten gesammelt in Intervallen, während Echtzeit-Systeme Daten bei Entstehung analysieren.",
      "Echtzeitdatenanalysen können ausnahmslos nur in Verbindung mit unstrukturierten externen Quellen realisiert werden.",
      "Beide Ansätze basieren auf den identischen Technologien und unterscheiden sich rein in der vertraglichen Lizenzierung."
    ],
    correct: 1,
    topic: "Datenverarbeitung"
  },
  {
    text: "Welchen Beitrag leisten Data Catalogs zur Datenverwaltung in BI?",
    options: [
      "Sie komprimieren relationale Datenbanken zur Einsparung teurer Infrastruktur- und Speicherkosten.",
      "Sie bieten ein zentrales Verzeichnis über Herkunft, Bedeutung und Qualität aller verfügbaren Datenbestände.",
      "Sie dienen primär der Ablage strukturierter Kundendaten für operative Marketing- und Vertriebszwecke.",
      "Sie steuern und automatisieren die monatliche Abrechnung interner IT-Dienstleistungen vollumfänglich."
    ],
    correct: 1,
    topic: "Datenverwaltung"
  },
  {
    text: "Welche Konsequenz droht ohne regelmäßige Aktualisierung der Daten im BI-System?",
    options: [
      "Die Server-Hardware schaltet sich bei Erkennung veralteter Datensätze zur Sicherheit automatisch ab.",
      "Berichte verlieren an Relevanz, was das Vertrauen der Entscheider mindert und die Systemakzeptanz gefährdet.",
      "Die allgemeine Datenqualität verbessert sich kontinuierlich, da weniger fehlerhafte operative Datensätze einfließen.",
      "Die Performance des Data Warehouse nimmt stark zu, da historische Abfragen nicht mehr verarbeitet werden müssen."
    ],
    correct: 1,
    topic: "Datenqualität"
  },
  {
    text: "Welches Problem tritt typischerweise bei der Integration großer Datenmengen auf?",
    options: [
      "Das physische Datenvolumen verringert sich durch den Integrationsvorgang im Zielsystem auf unnatürliche Weise.",
      "Inkompatible Datenstrukturen und differierende Ladezyklen der Quellsysteme erfordern komplexe Konsolidierungen.",
      "Große Datenmengen lassen sich aufgrund technischer Beschränkungen prinzipiell nicht in ein DWH überführen.",
      "Der Integrationsprozess zwingt das Entwicklungsteam zum vollständigen Verzicht auf performante ETL-Werkzeuge."
    ],
    correct: 1,
    topic: "Integration"
  },
  {
    text: "Wie unterstützen Cloud-Technologien die effiziente Verarbeitung von Big Data?",
    options: [
      "Sie beschränken das zu verarbeitende Volumen und optimieren ausschließlich kleine, relationale Tabellen.",
      "Sie stellen elastisch skalierbaren Speicher und Rechenleistung bedarfsgerecht zur Verfügung.",
      "Sie machen die relationale oder dimensionale Datenmodellierung für analytische Zwecke gänzlich überflüssig.",
      "Sie erlauben aus Sicherheitsgründen ausschließlich das Abspeichern streng strukturierter Tabellenformate."
    ],
    correct: 1,
    topic: "Cloud & Big Data"
  },
  {
    text: "Was beschreiben die 3Vs von Big Data?",
    options: [
      "Verkaufsvolumen, Verlustrisiko und Vermögenszuwachs als zentrale Säulen operativer BI-Berichte.",
      "Volume, Velocity und Variety als Kennzeichen für Datenmenge, Verarbeitungsgeschwindigkeit und Vielfalt.",
      "Vertraulichkeit, Verfügbarkeit und Verbindlichkeit als Kernaspekte moderner datenschutzrechtlicher Vorgaben.",
      "Validierung, Versionierung und Visualisierung als die drei aufeinanderfolgenden Phasen im Reporting."
    ],
    correct: 1,
    topic: "Cloud & Big Data"
  },
  {
    text: "Wie verbessern Datenkompression und Partitionierung die BI-Performance?",
    options: [
      "Die Datenkompression minimiert Rechenzeiten, während die Partitionierung Abfragen drastisch verlangsamt.",
      "Partitionierung grenzt Suchbereiche ein, während Kompression den Speicherbedarf senkt und den I/O-Durchsatz steigert.",
      "Beide Mechanismen dienen ausschließlich der Verschlüsselung zum Schutz personenbezogener Kundendaten.",
      "Sie ersetzen die Notwendigkeit dimensionstragender Tabellenstrukturen im physischen Data Warehouse."
    ],
    correct: 1,
    topic: "Performance"
  },
  {
    text: "Welche Strategie eignet sich zur Optimierung der Datenkonsolidierung?",
    options: [
      "Die bewusste Beibehaltung abteilungsspezifischer Datensilos zur Förderung der lokalen Datenhoheit.",
      "Die Etablierung eines einheitlichen Repositories mit standardisierten ETL-Pipelines und Datenstrukturen.",
      "Der vollständige Verzicht auf Transformations- und Bereinigungsschritte im Rahmen des Ladevorgangs.",
      "Die ausschließliche Migration externer Datenquellen unter Ausschluss aller hausinternen Quellsysteme."
    ],
    correct: 1,
    topic: "Integration"
  },
  {
    text: "Welche Aufgabe hat die Datenvalidierung in der Qualitätssicherung?",
    options: [
      "Die automatisierte physische Löschung aller Datensätze, die ein vordefiniertes Alter überschreiten.",
      "Die automatisierte Abprüfung importierter Sätze gegen vordefinierte Format- und Integritätsregeln.",
      "Die automatische Erfassung und visuelle Aufbereitung von Dashboards ohne menschliches Zutun.",
      "Der vollständige Ersatz der Transformationslogiken innerhalb der integrierten ETL-Pipelines."
    ],
    correct: 1,
    topic: "Datenqualität"
  },
  {
    text: "Wie tragen Data Stewards zur Vermeidung inkonsistenter Daten bei?",
    options: [
      "Sie implementieren und warten eigenständig die Abfrageschnittstellen im Datenbank-Backend.",
      "Sie definieren Datenqualitätsregeln und steuern die fachliche Bereinigung unklarer Stammsätze.",
      "Sie überwachen und regulieren die Gehaltsstrukturen und Personalressourcen des BI-Projektteams.",
      "Sie verantworten die operative Administration und physische Wartung der physischen Servergerüste."
    ],
    correct: 1,
    topic: "Datenverwaltung"
  },
  {
    text: "Welche Maßnahme verbessert die Integration unterschiedlicher Datenquellen?",
    options: [
      "Die zwingende technologische Vereinheitlichung aller Quelldatenbanken auf ein einziges Softwareprodukt.",
      "Die Implementierung zentraler Mappings im ETL-Prozess zur strukturellen Vereinheitlichung der Daten.",
      "Die generelle Blockade externer Datenquellen zur Vermeidung struktureller Inkompatibilitäten im Zielsystem.",
      "Die rein manuelle, visuelle Zusammenführung abweichender Datenstrukturen durch die jeweiligen Fachabteilungen."
    ],
    correct: 1,
    topic: "ETL"
  },
  {
    text: "Wie kann die Datenbereinigung automatisiert werden?",
    options: [
      "Durch den ungefilterten Direktimport aller operativen Rohdaten ohne vorgeschaltete Plausibilitätsprüfungen.",
      "Durch vordefinierte Skripte, die fehlerhafte Sätze isolieren, korrigieren oder in Quarantänetabellen aussteuern.",
      "Die Datenbereinigung lässt sich aufgrund fachlicher Komplexität unter keinen Umständen maschinell steuern.",
      "Durch die strikte Beschränkung des Imports auf ausschließlich numerische und finanzbezogene Kennzahlen."
    ],
    correct: 1,
    topic: "Datenqualität"
  },
  {
    text: "Welche Rolle spielen Metadatenmanagement und Dokumentation in BI?",
    options: [
      "Sie stellen rein optionale Maßnahmen dar, welche ausschließlich im Kontext offizieller IT-Audits Relevanz besitzen.",
      "Sie dokumentieren Herkunft und Logik der Datenflüsse, um Nachvollziehbarkeit und Vertrauen in Berichte zu sichern.",
      "Sie fungieren als technologisches Substitut für das physische Speichermodell des Data Warehouse.",
      "Sie beziehen sich per Definition ausschließlich auf die Benennung von physischen Quelldateien im Dateisystem."
    ],
    correct: 1,
    topic: "Datenverwaltung"
  },
  {
    text: "Wie tragen ETL-Prozesse zur Harmonisierung von Daten aus verschiedenen operativen Systemen bei?",
    options: [
      "Sie kopieren Daten ohne jegliche Filterung oder syntaktische Veränderung direkt in das Speicherziel.",
      "Sie überführen heterogene Formate über standardisierte Transformationsregeln in ein einheitliches Schema.",
      "Sie identifizieren abweichende Datenbestände und löschen diese zur Vermeidung von Konflikten ersatzlos.",
      "Sie bewirken eine rein visuelle Anpassung der Kennzahlendarstellung im Front-End des Anenders."
    ],
    correct: 1,
    topic: "ETL"
  },
  {
    text: "Warum ist die Datenhistorisierung im Data Warehouse für Zeitreihenanalysen wichtig?",
    options: [
      "Sie minimiert das abzuspeichernde Datenvolumen durch die systematische Löschung veralteter Datensätze.",
      "Sie speichert historische Datenstände ab, um zeitliche Entwicklungen korrekt und veränderungsfrei darzustellen.",
      "Sie dient aus datenschutzrechtlichen Gründen primär der Anonymisierung aller personenbezogenen Daten.",
      "Sie stellt ein reines Archivierungskonzept ohne Relevanz für analytische Fragestellungen dar."
    ],
    correct: 1,
    topic: "Architektur"
  },
  {
    text: "Wie tragen Data Quality Standards zur Fehlerreduktion bei?",
    options: [
      "Sie unterbinden die Nutzung dezentraler Tabellenkalkulationen in sämtlichen Unternehmensbereichen.",
      "Sie etablieren verbindliche Erfassungs- und Prüfrichtlinien zur Vermeidung von Fehlern an der Datenquelle.",
      "Sie stellen ein alternatives, hochperformantes Softwareprodukt zur Ablösung klassischer ETL-Werkzeuge dar.",
      "Sie definieren Qualitätskriterien, welche ausschließlich auf die Verarbeitung externer Datenquellen abzielen."
    ],
    correct: 1,
    topic: "Datenqualität"
  },
  {
    text: "Welche Methode eignet sich zur Duplikatserkennung in großen Datensätzen?",
    options: [
      "Die manuelle Sichtprüfung aller Datensätze durch die Mitarbeiter der jeweiligen operativen Fachbereiche.",
      "Die Anwendung algorithmischer Ähnlichkeitsanalysen zur Identifikation potenziell identischer Datensätze.",
      "Die dauerhafte Konvertierung und Speicherung des gesamten Datenbestands als unstrukturierte Textdatei.",
      "Eine maschinelle Duplikatserkennung ist bei hohen Datenmengen aus mathematischen Gründen unmöglich."
    ],
    correct: 1,
    topic: "Datenqualität"
  },
  {
    text: "Was leisten Fuzzy-Matching-Algorithmen bei der Bereinigung von Kundendaten?",
    options: [
      "Sie entfernen automatisiert alle Kundendatensätze, die statistisch vom durchschnittlichen Kaufverhalten abweichen.",
      "Sie identifizieren lexikalische Abweichungen in Stammdaten zur Zusammenführung potenzieller Dubletten.",
      "Sie ersetzen die interne Kundendatenbank vollständig durch geprüfte Adressdaten dritter Anbieter.",
      "Sie übersetzen internationale Kundennamen vollautomatisch in die jeweilige Landessprache des Hauptsitzes."
    ],
    correct: 1,
    topic: "Datenqualität"
  },
  {
    text: "Wie verbessern strukturierte Datenmodelle die Performance von BI-Abfragen?",
    options: [
      "Indem sie sämtliche Datenbestände ohne logische Relationen in einer einzigen, riesigen Tabelle abspeichern.",
      "Durch denormalisierte Schemata, welche Joins reduzieren und Abfragen auf großen Datenmengen beschleunigen.",
      "Strukturell optimierte Datenmodelle haben keinen messbaren Einfluss auf die Abfragegeschwindigkeit des DBMS.",
      "Indem sie die Ausführung aller Analyseabfragen exklusiv in externe Programmierumgebungen verlagern."
    ],
    correct: 1,
    topic: "Datenmodellierung"
  },
  {
    text: "Welchen Vorteil hat das Sternschema gegenüber dem Schneeflockenschema?",
    options: [
      "Es verringert den benötigten Speicherplatz durch eine konsequente relationale Normalisierung aller Tabellen.",
      "Es beschleunigt Lesezugriffe durch flache Dimensionstabellen und eine geringere Anzahl notwendiger Joins.",
      "Es eignet sich architektonisch ausschließlich zur Speicherung unstrukturierter Daten im Data Lake.",
      "Es stellt die einzige Modellierungsvariante dar, die innerhalb moderner Cloud-Datenbanken lauffähig ist."
    ],
    correct: 1,
    topic: "Datenmodellierung"
  },
  {
    text: "Welchen Nachteil hat das Schneeflockenschema gegenüber dem Sternschema?",
    options: [
      "Es beansprucht signifikant mehr physischen Festplattenspeicher aufgrund redundanter Datenhaltung.",
      "Es verlangsamt komplexe Analyseabfragen durch eine höhere Anzahl relationaler Joins zwischen normalisierten Dimensionen.",
      "Es eignet sich aus mathematischen Gründen nicht für die Durchführung historischer Zeitreihenanalysen.",
      "Es unterbindet die logische Zuordnung von hierarchischen Dimensionstabellen zur zentralen Faktentabelle."
    ],
    correct: 1,
    topic: "Datenmodellierung"
  },
  {
    text: "Wie trägt Cloud Computing zur Skalierung von BI-Lösungen bei?",
    options: [
      "Es limitiert die Speicherkapazität auf Kleinstmengen und verbietet die Verarbeitung unstrukturierter Daten.",
      "Es erlaubt die dynamische Anpassung von Rechenleistung und Speicherplatz an wachsende Datenvolumina.",
      "Es eliminiert die Notwendigkeit jeglicher logischer Datenmodellierung für analytische Auswertungen.",
      "Es gestattet aus Sicherheitsgründen ausschließlich die Ausführung sehr einfacher relationaler Standardabfragen."
    ],
    correct: 1,
    topic: "Cloud & Big Data"
  },
  {
    text: "Worin liegt der Vorteil eines Pay-as-you-go-Modells für BI-Kosten?",
    options: [
      "Es garantiert eine unveränderliche, starre monatliche Pauschalgebühr unabhängig von der tatsächlichen Nutzung.",
      "Es rechnet Ressourcen nutzungsbasiert ab, was die Effizienz bei schwankendem Rechenbedarf optimiert.",
      "Es ist im direkten Vergleich zum Kauf und Betrieb eigener Server-Infrastrukturen grundsätzlich kostenintensiver.",
      "Dieses Abrechnungsmodell ist technologisch auf Datenbanklizenzen beschränkt und schließt BI-Analysewerkzeuge aus."
    ],
    correct: 1,
    topic: "Cloud & Big Data"
  },
  {
    text: "Welche Folge hat eine unzureichende Dokumentation der Datenherkunft?",
    options: [
      "Sie maximiert die allgemeine Verarbeitungsgeschwindigkeit, da keine Metadaten vorgehalten werden müssen.",
      "Sie erschwert die Fehleranalyse im Berichtswesen, was das Vertrauen in Kennzahlen nachhaltig beschädigt.",
      "Sie ist ausschließlich für externe behördliche Prüfungen relevant und hat keinen Einfluss auf den BI-Betrieb.",
      "Sie wird durch moderne Visualisierungstools vollautomatisch und fehlerfrei im Hintergrund kompensiert."
    ],
    correct: 1,
    topic: "Datenverwaltung"
  },
  {
    text: "Welche Aussage beschreibt den Zweck eines Staging-Bereichs in der BI-Architektur zutreffend?",
    options: [
      "Er beschreibt eine temporäre Vorschauumgebung, in der fertige Dashboards vor dem Deployment getestet werden.",
      "Er dient als flüchtiges Zwischenlager zur schnellen, transformatorisch unveränderten Konsolidierung der Quellsystemdaten.",
      "Im Staging-Bereich werden ausschließlich lizenzierte Datenbestände von externen Datenanbietern abgelegt.",
      "Er beschreibt die analytische Hauptdatenbank zur permanenten Speicherung historisierter Kundendaten."
    ],
    correct: 1,
    topic: "Architektur"
  },
  {
    text: "Welches Problem wird durch Schema-on-Read im Data Lake gelöst?",
    options: [
      "Die mangelnde Datensicherheit und Verschlüsselung bei der Übertragung in Cloud-Speichersysteme.",
      "Daten können formatunabhängig gespeichert und erst bei der konkreten Analyseanforderung strukturiert interpretiert werden.",
      "Die unzureichende Einhaltung datenschutzrechtlicher Vorgaben bei der Vorhaltung personenbezogener Daten.",
      "Die fehlerhafte automatische Ergänzung fehlender relationaler Werte innerhalb strukturierter Datenzeilen."
    ],
    correct: 1,
    topic: "Architektur"
  },
  {
    text: "Warum ist die lose Kopplung zwischen Quellsystemen und BI-System ein architektonisches Grundprinzip?",
    options: [
      "Weil eine direkte Integration transaktionaler Quellschnittstellen gegen gesetzliche Sicherheitsrichtlinien verstößt.",
      "Sie sichert die BI-Verfügbarkeit bei Quellsystemausfällen und verhindert eine Performance-Belastung operativer Systeme.",
      "Die lose Kopplung stellt ein technisch veraltetes Muster dar und wird in aktuellen Cloud-Architekturen vermieden.",
      "Sie gewährleistet eine permanente, echtzeitnahe Synchronisation sämtlicher operativer Transaktionsdaten."
    ],
    correct: 1,
    topic: "Architektur"
  }
];
