const caseSeries = [
  {
    id: 101,
    caseSet: "CAD-001",
    step: 1,
    specialty: "Endocrinología",
    difficulty: 3,
    source: "ADA",
    tags: ["CAD", "DM1", "Diagnóstico"],
    title: "CAD - diagnóstico inicial",
    case:
      "Paciente femenino de 24 años con DM1. Acude por náusea, vómito, dolor abdominal y respiración profunda. Refiere omitir insulina por 24 horas.\n\nSignos vitales: TA 96/58 mmHg, FC 122 lpm, FR 28 rpm.\n\nLaboratorios:\nGlucosa 486 mg/dL\npH 7.18\nHCO3 10 mEq/L\nCetonas séricas positivas\nPotasio 5.2 mEq/L",
    question: "¿Cuál es el diagnóstico más probable?",
    options: [
      "Estado hiperosmolar hiperglucémico",
      "Cetoacidosis diabética",
      "Acidosis láctica por metformina",
      "Gastroenteritis sin complicación metabólica",
    ],
    answer: 1,
    explanation:
      "Hiperglucemia, acidosis metabólica con bicarbonato bajo y cetonas positivas definen cetoacidosis diabética.",
  },
  {
    id: 102,
    caseSet: "CAD-001",
    step: 2,
    specialty: "Endocrinología",
    difficulty: 3,
    source: "ADA",
    tags: ["CAD", "Tratamiento", "Líquidos"],
    title: "CAD - primera intervención",
    case:
      "Misma paciente con CAD. TA 96/58 mmHg, FC 122 lpm, mucosas secas. Glucosa 486 mg/dL, pH 7.18, HCO3 10 mEq/L, K 5.2 mEq/L.",
    question: "¿Cuál es la primera intervención terapéutica?",
    options: [
      "Bicarbonato IV inmediato",
      "Cristaloide isotónico IV",
      "Insulina subcutánea de acción rápida sin líquidos",
      "Suspender toda insulina hasta normalizar potasio",
    ],
    answer: 1,
    explanation:
      "La primera medida en CAD es reanimación con líquidos isotónicos. La insulina IV se inicia después de valorar potasio y repleción inicial.",
  },
  {
    id: 103,
    caseSet: "CAD-001",
    step: 3,
    specialty: "Endocrinología",
    difficulty: 4,
    source: "ADA",
    tags: ["CAD", "Potasio", "Insulina"],
    title: "CAD - potasio bajo",
    case:
      "Tras líquidos iniciales, la paciente sigue con CAD. Nuevo potasio: 3.1 mEq/L. Glucosa 410 mg/dL. Persiste anion gap elevado.",
    question: "¿Qué debe hacerse antes de iniciar insulina IV?",
    options: [
      "Iniciar insulina de inmediato porque la glucosa sigue alta",
      "Reponer potasio y retrasar insulina hasta K mayor de 3.3 mEq/L",
      "Dar bicarbonato para subir potasio",
      "Iniciar hemodiálisis urgente",
    ],
    answer: 1,
    explanation:
      "Si K es menor de 3.3 mEq/L, la insulina puede precipitar hipokalemia grave. Debe reponerse potasio antes de iniciar insulina.",
  },
  {
    id: 104,
    caseSet: "NAC-001",
    step: 1,
    specialty: "Infectología",
    difficulty: 3,
    source: "ATS/IDSA",
    tags: ["NAC", "Gravedad", "UCI"],
    title: "NAC grave - clasificación",
    case:
      "Masculino de 68 años con DM2 llega por fiebre, tos purulenta y disnea. TA 84/52 mmHg, FC 118, FR 34, SatO2 86%. Radiografía: consolidación multilobar.",
    question: "¿Qué dato obliga a considerar neumonía grave y manejo en UCI?",
    options: [
      "Edad mayor de 65 años aislada",
      "Hipotensión persistente con necesidad probable de vasopresores",
      "Tos productiva sin hipoxemia",
      "Leucocitosis leve",
    ],
    answer: 1,
    explanation:
      "Choque con necesidad de vasopresores es criterio mayor de NAC grave y orienta a UCI.",
  },
  {
    id: 105,
    caseSet: "NAC-001",
    step: 2,
    specialty: "Infectología",
    difficulty: 3,
    source: "ATS/IDSA",
    tags: ["NAC", "Antibiótico"],
    title: "NAC grave - tratamiento empírico",
    case:
      "Mismo paciente con NAC grave. No hay antecedente de Pseudomonas ni MRSA. Requiere ingreso hospitalario.",
    question: "¿Qué esquema empírico es razonable?",
    options: [
      "Ceftriaxona más azitromicina",
      "Amoxicilina sola por vía oral",
      "Fluconazol",
      "Oseltamivir como único tratamiento",
    ],
    answer: 0,
    explanation:
      "En NAC hospitalaria grave sin factores de MRSA/Pseudomonas, un beta-lactámico más macrólido es una opción estándar.",
  },
  {
    id: 106,
    caseSet: "HIPO-001",
    step: 1,
    specialty: "Nefrología",
    difficulty: 4,
    source: "Medicina interna",
    tags: ["Hiponatremia", "SIADH", "Osmolalidad"],
    title: "Hiponatremia - abordaje inicial",
    case:
      "Mujer de 72 años con confusión leve. Sodio 118 mEq/L. Glucosa normal. No edema, mucosas húmedas, TA 126/70. Toma sertralina.",
    question: "¿Cuál estudio ayuda primero a confirmar que es hiponatremia hipotónica?",
    options: [
      "Osmolalidad sérica",
      "Troponina",
      "Electroforesis de proteínas",
      "Gasometría venosa únicamente",
    ],
    answer: 0,
    explanation:
      "El primer paso es confirmar tonicidad con osmolalidad sérica y descartar pseudohiponatremia o hiponatremia hipertónica.",
  },
  {
    id: 107,
    caseSet: "HIPO-001",
    step: 2,
    specialty: "Nefrología",
    difficulty: 4,
    source: "Medicina interna",
    tags: ["Hiponatremia", "SIADH"],
    title: "Hiponatremia - SIADH",
    case:
      "Misma paciente. Osmolalidad sérica baja. Osmolalidad urinaria 520 mOsm/kg y sodio urinario 62 mEq/L. Está euvolémica clínicamente.",
    question: "¿Cuál diagnóstico es más probable?",
    options: [
      "SIADH",
      "Hipovolemia por diarrea",
      "Hiponatremia hipertónica por hiperglucemia",
      "Síndrome nefrótico",
    ],
    answer: 0,
    explanation:
      "Hiponatremia hipotónica euvolémica con orina inapropiadamente concentrada y sodio urinario alto sugiere SIADH.",
  },
  {
    id: 108,
    caseSet: "IAM-001",
    step: 1,
    specialty: "Cardiología",
    difficulty: 3,
    source: "ACS",
    tags: ["STEMI", "Reperfusión"],
    title: "STEMI - reperfusión",
    case:
      "Masculino de 57 años con dolor torácico opresivo de 90 minutos. ECG: elevación del ST en DII, DIII y aVF. Hospital con sala de hemodinamia disponible.",
    question: "¿Cuál es la estrategia de reperfusión preferida?",
    options: [
      "Intervención coronaria percutánea primaria",
      "Prueba de esfuerzo",
      "Trombólisis aunque haya hemodinamia inmediata",
      "Observación con enzimas seriadas únicamente",
    ],
    answer: 0,
    explanation:
      "En STEMI dentro de ventana y con hemodinamia disponible, la angioplastia primaria es la estrategia preferida.",
  },
  {
    id: 109,
    caseSet: "IAM-001",
    step: 2,
    specialty: "Cardiología",
    difficulty: 3,
    source: "ACS",
    tags: ["STEMI", "Ventrículo derecho"],
    title: "STEMI inferior - ventrículo derecho",
    case:
      "Mismo paciente con STEMI inferior. Presenta hipotensión, campos pulmonares limpios y elevación del ST en V4R.",
    question: "¿Qué debe evitarse inicialmente?",
    options: [
      "Nitratos",
      "Aspirina",
      "Reperfusión",
      "Monitoreo cardíaco",
    ],
    answer: 0,
    explanation:
      "En infarto de ventrículo derecho hay dependencia de precarga; los nitratos pueden causar hipotensión profunda.",
  },
  {
    id: 110,
    caseSet: "BIO-001",
    step: 1,
    specialty: "Investigación",
    difficulty: 3,
    source: "Bioestadística",
    tags: ["Riesgo relativo", "Ensayo clínico"],
    title: "Ensayo clínico - riesgo relativo",
    case:
      "En un ensayo, el evento primario ocurrió en 10% del grupo tratado y 20% del grupo control.",
    question: "¿Cuál es el riesgo relativo del tratamiento frente a control?",
    options: ["0.5", "1.0", "1.5", "2.0"],
    answer: 0,
    explanation:
      "El riesgo relativo es 10% / 20% = 0.5. El tratamiento reduce el riesgo relativo en 50%.",
  },
];

export default caseSeries;
