import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  ALL_QUESTIONS, 
  Question 
} from "./questions";
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Search, 
  HelpCircle, 
  Info, 
  List, 
  Sparkles, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  Trophy, 
  Shuffle, 
  BookMarked 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Structure for randomized option map
interface ShuffledOption {
  text: string;
  originalIndex: number;
}

interface ShuffledQuestion extends Question {
  shuffledOptionsList: ShuffledOption[];
  correctShuffledIndex: number;
}

export default function App() {
  // Navigation & Mode States
  const [activeTab, setActiveTab] = useState<"quiz" | "learning">("quiz");
  
  // Quiz Lifecycle States
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [questionsList, setQuestionsList] = useState<ShuffledQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Answers state: index -> selected option index of the shuffled option list (-1 for skipped)
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState<boolean>(false);
  
  // Search state in learning tab
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);

  // Stats
  const stats = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    let answeredCount = 0;

    Object.entries(answers).forEach(([idxStr, choiceIdx]) => {
      const idx = parseInt(idxStr, 10);
      const q = questionsList[idx];
      if (!q) return;
      if (choiceIdx === -1) {
        skipped++;
      } else {
        answeredCount++;
        if (choiceIdx === q.correctShuffledIndex) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    const total = questionsList.length;
    const progressPct = total > 0 ? Math.round((Object.keys(answers).length / total) * 100) : 0;
    const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;

    return { correct, wrong, skipped, answeredCount, progressPct, scorePct, total };
  }, [answers, questionsList]);

  // Helper: Shuffle Array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Initialize and Shuffle Quiz
  const handleStartQuiz = useCallback((shuffleQuestions: boolean = true) => {
    let processed: ShuffledQuestion[] = ALL_QUESTIONS.map((q) => {
      // Prepare options with their original index
      const mappedOptions: ShuffledOption[] = q.options.map((opt, oIdx) => ({
        text: opt,
        originalIndex: oIdx,
      }));

      // Shuffle options
      const shuffledOpts = shuffleQuestions ? shuffleArray(mappedOptions) : mappedOptions;
      const correctShuffledIdx = shuffledOpts.findIndex(
        (o) => o.originalIndex === q.correct
      );

      return {
        ...q,
        shuffledOptionsList: shuffledOpts,
        correctShuffledIndex: correctShuffledIdx,
      };
    });

    if (shuffleQuestions) {
      processed = shuffleArray(processed);
    }

    setQuestionsList(processed);
    setCurrentIndex(0);
    setAnswers({});
    setIsFinished(false);
    setQuizStarted(true);
    setShowRestartConfirm(false);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!quizStarted || isFinished || activeTab !== "quiz") return;

      const q = questionsList[currentIndex];
      if (!q) return;

      const alreadyAnswered = currentIndex in answers;

      if (!alreadyAnswered) {
        if (e.key === "a" || e.key === "A" || e.key === "1") {
          handleSelectAnswer(0);
        } else if (e.key === "b" || e.key === "B" || e.key === "2") {
          handleSelectAnswer(1);
        } else if (e.key === "c" || e.key === "C" || e.key === "3") {
          handleSelectAnswer(2);
        } else if (e.key === "d" || e.key === "D" || e.key === "4") {
          handleSelectAnswer(3);
        } else if (e.key === "s" || e.key === "S") {
          handleSkipQuestion();
        }
      }

      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [quizStarted, currentIndex, answers, isFinished, activeTab, questionsList]);

  // Handle option selection
  const handleSelectAnswer = (optionIdx: number) => {
    if (currentIndex in answers) return; // already answered
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIdx,
    }));
  };

  // Handle skip
  const handleSkipQuestion = () => {
    if (currentIndex in answers) return;
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: -1,
    }));
    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Prev / Next actions
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleRestart = () => {
    handleStartQuiz(true);
  };

  // Glossary/BI concepts for visual learning mode
  const learningConcepts = [
    {
      id: "dwh",
      title: "Data Warehouse (DWH)",
      icon: <BookMarked className="w-5 h-5 text-indigo-600" />,
      summary: "Ein hochgradig strukturiertes, integriertes, zeitabhängiges und nicht-flüchtiges Datenbanksystem, das als zentraler Datenspeicher für analytische Berichte und Entscheidungen dient.",
      explanation: "Im Gegensatz zu operativen Systemen (ERP, CRM) ist das DWH auf Lesezugriffe und komplexe Abfragen optimiert. Daten werden strukturiert modelliert, um historische Verläufe präzise wiederzugeben (Historisierung). Das DWH wendet das Prinzip 'Schema-on-Write' an, d. h. Daten müssen vor dem Laden in ein festes Datenmodell gepresst werden.",
      linkedQuestions: [5, 10, 16, 28, 38],
    },
    {
      id: "etl",
      title: "ETL-Prozess (Extract, Transform, Load)",
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
      summary: "Der dreistufige Datenintegrationsprozess, mit dem Daten aus heterogenen operativen Quellsystemen extrahiert, bereinigt/konvertiert und in das DWH geladen werden.",
      explanation: "1. EXTRAKTION: Rohdaten werden möglichst lastenfrei aus Quelldatenbanken abgelesen. Häufig dient ein physischer Staging-Bereich (Zwischenlager) zur Entlastung der Quellsysteme.\n2. TRANSFORMATION: Daten werden gefiltert, bereinigt, in einheitliche Datentypen konvertiert und über Mappings harmonisiert.\n3. LADEN: Die aufbereiteten Daten werden in die dimensionalen Tabellen des DWHs geschrieben.",
      linkedQuestions: [8, 24, 27, 38],
    },
    {
      id: "star_schema",
      title: "Sternschema (Star Schema)",
      icon: <Award className="w-5 h-5 text-indigo-600" />,
      summary: "Eine bewährte relationale Modellierungstechnik im DWH. Im Zentrum steht eine Faktentabelle, umgeben von radial angeordneten, denormalisierten Dimensionstabellen.",
      explanation: "Das Sternschema minimiert Joins durch bewusste Denormalisierung der Dimensionen. Dies sorgt für eine exzellente Abfrage-Performance auf großen Datenmengen, da Abfragen über sehr wenige Relationen (Joins) erfolgen können. Die Benutzbarkeit ist hoch, da das Schema intuitiv zu lesen ist.",
      linkedQuestions: [32, 33],
    },
    {
      id: "snowflake_schema",
      title: "Schneeflockenschema (Snowflake Schema)",
      icon: <Info className="w-5 h-5 text-indigo-600" />,
      summary: "Eine Variante des Sternschemas, bei der die Dimensionstabellen relational normalisiert werden, wodurch sie sich weiter verzweigen.",
      explanation: "Vorteile: Minimiert Redundanzen und spart Speicherplatz im DBMS. Nachteile: Erfordert signifikant mehr Tabellen-Joins in SQL-Abfragen, was zu schlechterer Performance bei der Auswertung im BI-Front-End führen kann. Es wird seltener gewählt, wenn reine Abfrage-Performance im Vordergrund steht.",
      linkedQuestions: [34],
    },
    {
      id: "data_lake",
      title: "Data Lake",
      icon: <HelpCircle className="w-5 h-5 text-indigo-600" />,
      summary: "Ein Speicher-Repository, das riesige Mengen an nativen Rohdaten in beliebigen Formaten (strukturiert, semistrukturiert und unstrukturiert) kostengünstig vorhält.",
      explanation: "Data Lakes implementieren 'Schema-on-Read' – Daten werden so wie sie sind abgespeichert und erst beim Auslesen durch analytische Anwendungen strukturiert interpretiert. Dies erlaubt maximale Agilität für Data Science und Big-Data-Anwendungsfälle, bietet aber geringere Konsistenzgarantien als ein DWH.",
      linkedQuestions: [5, 39],
    },
    {
      id: "ssot",
      title: "Single Source of Truth (SSOT)",
      icon: <Trophy className="w-5 h-5 text-indigo-600" />,
      summary: "Das Architektur- und Datenpflegekonzept, nach dem jede Information im gesamten Unternehmen an nur einem vereinbarten Ort verlässlich verwaltet wird.",
      explanation: "Dank SSOT haben alle Abteilungen Zugriff auf dieselbe und eindeutige Datenbasis. Es verhindert, dass das Controlling andere Umsatzzahlen vorweist als der Vertrieb, da globale Kennzahlen (wie Nettoumsatz oder Deckungsbeitrag) verbindlich in einer gemeinsamen Semantikschicht definiert sind.",
      linkedQuestions: [1, 13, 21],
    },
    {
      id: "data_quality",
      title: "Datenqualität & Fuzzy-Matching",
      icon: <CheckCircle2 className="w-5 h-5 text-indigo-600" />,
      summary: "Prozesse und Regeln zur Absicherung einer präzisen, lückenlosen und widerspruchsfreien Analysegrundlage zur Vermeidung von Fehlentscheidungen.",
      explanation: "Schlechte Datenqualität führt zu Vertrauensverlust in das BI-System. Zu den Qualitätsmaßnahmen zählen Regelvalidierungen im ETL-Prozess (Quarantäne) sowie Fuzzy-Matching (probabilistische Algorithmen, die ähnlich geschriebene Kunden wie 'Müller' und 'Mueller' als potenzielle Duplikate zur Konsolidierung identifizieren).",
      linkedQuestions: [6, 7, 11, 16, 22, 23, 25, 29, 30, 31],
    },
    {
      id: "cloud_bigdata",
      title: "Cloud BI & Big Data Scaling",
      icon: <List className="w-5 h-5 text-indigo-600" />,
      summary: "Skalierung von Analysen auf gigantische Mengen (Volume, Velocity, Variety) durch elastische Cloud-Computing-Ressourcen und intelligentes Partitions-Management.",
      explanation: "Durch Pay-as-you-go-Modelle entfallen große IT-Investitionskosten. Bei hohem Berechnungsbedarf skaliert die Cloud elastisch nach oben. Um Abfragen zusätzlich zu beschleunigen, werden Techniken wie Datenkompression und physische Partitionierung eingesetzt (wodurch Abfragen nur noch in den betroffenen Datenblöcken suchen müssen).",
      linkedQuestions: [18, 19, 20, 35, 36],
    }
  ];

  const filteredConcepts = useMemo(() => {
    return learningConcepts.filter(concept => 
      concept.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      concept.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.explanation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Determine Austria Grade and Color
  const getGradeInfo = (pct: number) => {
    if (pct >= 90) return { number: 1, label: "Sehr gut", badge: "Ausgezeichnet! Absolut prüfungsfit.", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    if (pct >= 75) return { number: 2, label: "Gut", badge: "Gute Leistung! Ein paar kleine Lücken noch schließen.", color: "text-blue-700 bg-blue-50 border-blue-200" };
    if (pct >= 60) return { number: 3, label: "Befriedigend", badge: "Bestanden. Fokusthemen gezielt wiederholen.", color: "text-amber-700 bg-amber-50 border-amber-200" };
    if (pct >= 50) return { number: 4, label: "Genügend", badge: "Knapp bestanden. Vertiefe dein Wissen unbedingt.", color: "text-orange-700 bg-orange-50 border-orange-200" };
    return { number: 5, label: "Nicht genügend", badge: "Noch nicht bestanden. Nutze den Lernassistenten unten!", color: "text-red-700 bg-red-50 border-red-200" };
  };

  const gradeInfo = getGradeInfo(stats.scorePct);

  // Initialize on mount
  useEffect(() => {
    handleStartQuiz(true);
  }, [handleStartQuiz]);

  const activeQuestion = questionsList[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 pb-12">
      {/* Upper Brand Bar */}
      <div className="bg-[#1a56db] text-white py-3 px-4 shadow-sm border-b border-indigo-700">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
                Wirtschaftsakademie Wien
              </div>
              <h1 className="text-sm font-bold tracking-tight">
                Lernportal: Business Intelligence (Teil 1)
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-indigo-950/40 rounded-full p-1 border border-indigo-400/20">
            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                activeTab === "quiz" 
                  ? "bg-white text-[#1a56db] shadow-sm" 
                  : "text-indigo-100 hover:text-white"
              }`}
              id="tab-quiz-btn"
            >
              Quiz &amp; Test
            </button>
            <button
              onClick={() => setActiveTab("learning")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                activeTab === "learning" 
                  ? "bg-white text-[#1a56db] shadow-sm" 
                  : "text-indigo-100 hover:text-white"
              }`}
              id="tab-learning-btn"
            >
              Wissensdatenbank (Q&amp;A)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        
        {/* TAB 1: QUIZ CONTAINER */}
        {activeTab === "quiz" && (
          <div>
            {!quizStarted ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-8 text-center max-w-2xl mx-auto mt-8">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-100">
                  <Trophy className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Bereit für die Prüfung?
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Dieses interaktive Quiz umfasst 40 Prüfungsfragen der Wirtschaftsakademie Wien für das Modul <strong>Business Intelligence (Teil 1)</strong>. Teste dein Wissen zu ETL, Sternschema, Data Governance und mehr.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleStartQuiz(true)}
                    className="px-6 py-3.5 bg-[#1a56db] hover:bg-[#154bb8] text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer text-sm"
                    id="start-shuffled"
                  >
                    <Shuffle className="w-4 h-4" />
                    Zufälliges Quiz starten
                  </button>
                  <button
                    onClick={() => handleStartQuiz(false)}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                    id="start-ordered"
                  >
                    <BookOpen className="w-4 h-4" />
                    Fragen in Original-Reihenfolge
                  </button>
                </div>
              </div>
            ) : isFinished ? (
              /* RESULT PREVIEW */
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
                  <div className="text-center pb-6 border-b border-slate-100">
                    <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100 shadow-inner">
                      <Trophy className="w-10 h-10 animate-bounce" />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-600">
                      Testergebnis
                    </span>
                    <h2 className="text-3xl font-black text-slate-900 mt-1">
                      {stats.scorePct}% Korrekte Antworten
                    </h2>
                    <p className="text-slate-500 mt-1.5 text-sm">
                      {stats.correct} von {stats.total} Fragen richtig beantwortet (Auswertung nach dem österreichischen Notensystem)
                    </p>
                  </div>

                  {/* Austria Grade Display */}
                  <div className={`mt-6 p-4 rounded-xl border ${gradeInfo.color} flex items-start gap-3`}>
                    <div className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center font-black text-2xl shadow-sm flex-shrink-0">
                      {gradeInfo.number}
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider opacity-90">Note</div>
                      <h4 className="font-extrabold text-lg leading-tight">{gradeInfo.label}</h4>
                      <p className="text-sm mt-0.5 opacity-90">{gradeInfo.badge}</p>
                    </div>
                  </div>

                  {/* Score stats grid */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                      <span className="block text-2xl font-black text-emerald-700">{stats.correct}</span>
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Richtig</span>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                      <span className="block text-2xl font-black text-red-700">{stats.wrong}</span>
                      <span className="text-xs font-bold text-red-800 uppercase tracking-wider">Falsch</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                      <span className="block text-2xl font-black text-slate-600">{stats.skipped}</span>
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Übersprungen</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center mt-8">
                    <button
                      onClick={handleRestart}
                      className="px-6 py-3 bg-[#1a56db] hover:bg-[#154bb8] text-white rounded-xl font-bold text-sm tracking-tight transition flex items-center gap-2 shadow-sm cursor-pointer"
                      id="restart-quiz-btn"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Erneut versuchen
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("learning");
                        setSearchTerm("");
                      }}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-sm tracking-tight transition flex items-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      Lernstoff nachschlagen
                    </button>
                  </div>
                </div>

                {/* Detailed review table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6">
                  <h3 className="font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-4 text-lg">
                    Detaillierte Fragen-Review
                  </h3>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {questionsList.map((q, qIndex) => {
                      const userChoiceIdx = answers[qIndex];
                      const isCorrect = userChoiceIdx !== undefined && userChoiceIdx !== -1 && userChoiceIdx === q.correctShuffledIndex;
                      const hasSkipped = userChoiceIdx === -1 || userChoiceIdx === undefined;

                      return (
                        <div 
                          key={qIndex} 
                          className={`p-4 rounded-xl border ${
                            isCorrect 
                              ? "bg-emerald-50/50 border-emerald-100" 
                              : hasSkipped 
                                ? "bg-slate-50 border-slate-200" 
                                : "bg-red-50/50 border-red-100"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                              Topthema: {q.topic}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-bold">
                              {isCorrect ? (
                                <span className="text-emerald-700 flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Richtig
                                </span>
                              ) : hasSkipped ? (
                                <span className="text-slate-500 flex items-center gap-0.5">
                                  <AlertCircle className="w-3.5 h-3.5" /> Offen / Übersprungen
                                </span>
                              ) : (
                                <span className="text-red-700 flex items-center gap-0.5">
                                  <XCircle className="w-3.5 h-3.5" /> Falsch
                                </span>
                              )}
                            </span>
                          </div>
                          <p className="font-bold text-sm text-slate-800 mt-2">
                            Frage {qIndex + 1}: {q.text}
                          </p>
                          <div className="mt-2 text-xs space-y-1 bg-white p-3 rounded-lg border border-slate-100">
                            <div>
                              <span className="font-bold text-slate-500">Deine Antwort: </span>
                              <span className={isCorrect ? "text-emerald-700 font-semibold" : hasSkipped ? "text-slate-500" : "text-red-700 font-semibold"}>
                                {hasSkipped 
                                  ? "Keine Antwort abgegeben" 
                                  : q.shuffledOptionsList[userChoiceIdx]?.text}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div className="mt-1">
                                <span className="font-bold text-emerald-700">Richtige Antwort: </span>
                                <span className="text-slate-800 font-semibold">
                                  {q.shuffledOptionsList[q.correctShuffledIndex]?.text}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ACTIVE QUIZ SCREEN */
              activeQuestion && (
                <div className="space-y-6">
                  {/* Progress Header */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6">
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#1a56db] h-full transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / questionsList.length) * 100}%` }}
                      ></div>
                    </div>

                    {/* Live indicators */}
                    <div className="flex gap-4 items-center justify-start mt-3.5 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        {stats.correct} Richtig
                      </span>
                      <span className="flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-full border border-red-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                        {stats.wrong} Falsch
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                        {questionsList.length - Object.keys(answers).length} Offen
                      </span>
                    </div>
                  </div>

                  {/* Current Question Display */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 lg:p-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3 block">
                      Themenbereich: {activeQuestion.topic}
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-slate-900 leading-snug">
                      {activeQuestion.text}
                    </h3>

                    {/* Options list */}
                    <div className="space-y-3 mt-6">
                      {activeQuestion.shuffledOptionsList.map((opt, oIdx) => {
                        const isAnswered = currentIndex in answers;
                        const userSelectedIdx = answers[currentIndex];
                        
                        let optStyle = "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-100/50";
                        let keyStyle = "bg-slate-100 text-slate-500 border-slate-200";
                        let appendIcon = null;

                        if (isAnswered) {
                          if (oIdx === activeQuestion.correctShuffledIndex) {
                            // Correct option (either selected by user or revealed)
                            optStyle = "border-emerald-500 bg-emerald-50 text-emerald-900";
                            keyStyle = "bg-emerald-600 text-white border-emerald-600";
                            appendIcon = <CheckCircle2 className="w-5 h-5 text-emerald-600 ml-auto flex-shrink-0" />;
                          } else if (userSelectedIdx === oIdx && userSelectedIdx !== activeQuestion.correctShuffledIndex) {
                            // Wrong selected option
                            optStyle = "border-red-500 bg-red-50 text-red-900";
                            keyStyle = "bg-red-600 text-white border-red-600";
                            appendIcon = <XCircle className="w-5 h-5 text-red-600 ml-auto flex-shrink-0" />;
                          } else {
                            // Untouched incorrect options
                            optStyle = "border-slate-200 bg-white opacity-40";
                            keyStyle = "bg-slate-100 text-slate-400 border-slate-100";
                          }
                        }

                        const letters = ["A", "B", "C", "D"];

                        return (
                          <button
                            key={oIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectAnswer(oIdx)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 min-h-[50px] cursor-pointer outline-none relative select-none ${optStyle}`}
                          >
                            <span className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-sm tracking-tight transition-all flex-shrink-0 ${keyStyle}`}>
                              {letters[oIdx]}
                            </span>
                            <span className="font-semibold text-sm lg:text-base leading-relaxed grow mt-0.5 pr-2">
                              {opt.text}
                            </span>
                            {appendIcon}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanatory feedback */}
                    <AnimatePresence>
                      {currentIndex in answers && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className={`mt-6 p-4 rounded-xl border text-sm flex gap-3 ${
                            answers[currentIndex] === activeQuestion.correctShuffledIndex
                              ? "bg-emerald-50 text-emerald-800 border-emerald-100"
                              : answers[currentIndex] === -1
                                ? "bg-slate-50 text-slate-700 border-slate-200"
                                : "bg-red-50 text-red-800 border-red-100"
                          }`}>
                            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold">
                                {answers[currentIndex] === activeQuestion.correctShuffledIndex
                                  ? "✓ Hervorragend! Das ist absolut korrekt."
                                  : answers[currentIndex] === -1
                                    ? "⏮ Übersprungen!"
                                    : "✗ Leider fehlerhaft."}
                              </p>
                              <p className="mt-1 leading-relaxed text-xs lg:text-sm font-medium">
                                {answers[currentIndex] === activeQuestion.correctShuffledIndex ? (
                                  "Diese Antwort entspricht den offiziellen Lehrunterlagen der Wirtschaftsakademie Wien."
                                ) : (
                                  <>
                                    Die sachlich richtige Antwort lautet: <strong className="underline">{activeQuestion.shuffledOptionsList[activeQuestion.correctShuffledIndex]?.text}</strong>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Footer */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="px-4 py-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-slate-700 h-10"
                        id="nav-prev"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Zurück
                      </button>
                      <button
                        onClick={handleSkipQuestion}
                        disabled={currentIndex in answers}
                        className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-xs transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer h-10"
                        id="nav-skip"
                      >
                        Überspringen
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {Object.keys(answers).length === questionsList.length && (
                        <button
                          onClick={handleFinish}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs tracking-tight transition flex items-center gap-1.5 shadow-sm cursor-pointer h-10"
                          id="nav-finish"
                        >
                          Test auswerten
                          <Award className="w-4 h-4" />
                        </button>
                      )}
                      
                      {currentIndex < questionsList.length - 1 ? (
                        <button
                          onClick={handleNext}
                          className="px-5 py-2.5 bg-[#1a56db] hover:bg-[#154bb8] text-white rounded-xl font-extrabold text-xs tracking-tight transition flex items-center gap-1.5 shadow-sm cursor-pointer h-10"
                          id="nav-next"
                        >
                          Nächste Frage
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleFinish}
                          className="px-5 py-2.5 bg-[#1a56db] hover:bg-[#154bb8] text-white rounded-xl font-extrabold text-xs tracking-tight transition flex items-center gap-1.5 shadow-sm cursor-pointer h-10"
                          id="nav-finish-fallback"
                        >
                          Auswertung
                          <Award className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Test neu starten Button / Confirm Dialog */}
                  <div className="flex justify-center pt-2">
                    {showRestartConfirm ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex sm:flex-row flex-col items-center gap-3 shadow-sm max-w-md animate-fade-in text-center sm:text-left">
                        <span className="text-xs font-semibold text-amber-800">
                          Möchtest du das Quiz wirklich abbrechen und neu starten? Alle bisherigen Antworten gehen verloren.
                        </span>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => {
                              handleRestart();
                              setShowRestartConfirm(false);
                            }}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-sm"
                            id="confirm-restart-yes"
                          >
                            Ja, neu starten
                          </button>
                          <button
                            onClick={() => setShowRestartConfirm(false)}
                            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition cursor-pointer"
                            id="confirm-restart-no"
                          >
                            Nein
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowRestartConfirm(true)}
                        className="text-xs font-bold text-slate-500 hover:text-red-600 hover:border-slate-300 hover:bg-red-50/50 transition flex items-center gap-1.5 py-2 px-4 rounded-xl border border-slate-200 bg-white shadow-sm cursor-pointer"
                        id="quiz-restart-btn-bottom"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Test neu starten
                      </button>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* TAB 2: LEARNING GLOSSARY */}
        {activeTab === "learning" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Search Input Filter */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#1a56db]" />
                BI-Lernassistent (Wissensdatenbank)
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Suche nach zentralen Konzepten aus dem Kurs &bdquo;Business Intelligence &ndash; Teil 1&ldquo;. Klicke auf ein Konzept, um eine prägnante, lernfreundliche Erklärung und Verweise auf die relevanten Quizfragen anzuzeigen.
              </p>
              
              <div className="relative mt-4">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Konzepte filter (z.B. ETL, Sternschema, Data Lake)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl outline-none text-sm transition"
                  id="glossary-search"
                />
              </div>
            </div>

            {/* Concepts List Accordion */}
            <div className="space-y-3">
              {filteredConcepts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                  <p className="text-slate-500 font-semibold">Keine Übereinstimmung mit &bdquo;{searchTerm}&ldquo; gefunden.</p>
                </div>
              ) : (
                filteredConcepts.map((concept) => {
                  const isOpen = expandedConcept === concept.id;
                  return (
                    <div 
                      key={concept.id}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-sm"
                    >
                      <button
                        onClick={() => setExpandedConcept(isOpen ? null : concept.id)}
                        className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-50/50 transition cursor-pointer"
                        id={`concept-btn-${concept.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                            {concept.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm lg:text-base">{concept.title}</h3>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{concept.summary}</p>
                          </div>
                        </div>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 border-t border-slate-100 pt-4 bg-slate-50/50">
                          <p className="text-sm font-semibold text-slate-700 leading-relaxed whitespace-pre-line">
                            {concept.explanation}
                          </p>
                          
                          {/* References indicator */}
                          <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-slate-500">
                              Relevante Quiz-Fragen zu diesem Thema:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {concept.linkedQuestions.map((qNum) => (
                                <button
                                  key={qNum}
                                  onClick={() => {
                                    setActiveTab("quiz");
                                    setQuizStarted(true);
                                    setIsFinished(false);
                                    // Map to index (qNum - 1)
                                    setCurrentIndex(Math.min(qNum - 1, ALL_QUESTIONS.length - 1));
                                  }}
                                  className="px-2.5 py-1 text-xs font-bold bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 text-indigo-700 rounded-md transition cursor-pointer"
                                  id={`goto-question-${qNum}`}
                                >
                                  Frage {qNum}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
