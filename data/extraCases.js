const extraCases = [
  {
    id: 11,
    specialty: "Cardiología",
    difficulty: 3,
    source: "ESC/ACC ACS",
    tags: ["SCASEST", "Troponina", "Estrategia invasiva"],
    title: "SCASEST de alto riesgo",
    case:
      "Masculino de 71 años con HAS y tabaquismo. Presenta dolor torácico opresivo de 70 minutos de evolución, irradiado a brazo izquierdo. TA 142/86 mmHg, FC 96 lpm.\n\nECG: infradesnivel del ST de 2 mm en V4-V6.\nTroponina ultrasensible inicial: 42 ng/L.\nTroponina a 1 hora: 109 ng/L.",
    question: "¿Cuál es la estrategia más adecuada?",
    options: [
      "Alta con prueba de esfuerzo ambulatoria",
      "Coronariografía temprana en menos de 24 horas",
      "Trombólisis inmediata",
      "Repetir troponina en 24 horas antes de decidir",
    ],
    answer: 1,
    explanation:
      "El dolor compatible, cambios isquémicos en ECG y ascenso dinámico de troponina clasifican al paciente como SCASEST de alto riesgo. Requiere estrategia invasiva temprana, no trombólisis.",
  },
  {
    id: 12,
    specialty: "Cardiología",
    difficulty: 3,
    source: "Guías de insuficiencia cardiaca",
    tags: ["ICFEr", "GDMT", "iSGLT2"],
    title: "Insuficiencia cardiaca con FE reducida",
    case:
      "Femenino de 59 años con disnea progresiva y edema maleolar. Ecocardiograma: FEVI 32%. TA 118/72 mmHg, FC 84 lpm. Creatinina 1.0 mg/dL, potasio 4.3 mEq/L. Recibe enalapril y furosemida.",
    question: "¿Qué fármaco debe agregarse por beneficio pronóstico en ICFEr?",
    options: [
      "Dapagliflozina o empagliflozina",
      "Verapamilo",
      "Hidroclorotiazida como único ajuste",
      "Digoxina como primera línea obligatoria",
    ],
    answer: 0,
    explanation:
      "Los iSGLT2 forman parte del tratamiento modificador de pronóstico en insuficiencia cardiaca con fracción de eyección reducida, incluso sin diabetes.",
  },
  {
    id: 13,
    specialty: "Endocrinología",
    difficulty: 3,
    source: "ADA Standards of Care",
    tags: ["Hipoglucemia", "Insulina basal"],
    title: "Hipoglucemia nocturna",
    case:
      "Mujer de 58 años con DM2 en glargina 34 U nocturnas y lispro antes de comidas. Consulta por diaforesis y confusión a las 03:00 h con glucemias de 48-55 mg/dL. HbA1c 6.4%. TFG 82 ml/min.",
    question: "¿Cuál es el ajuste inicial más apropiado?",
    options: [
      "Aumentar glargina nocturna",
      "Disminuir dosis basal de insulina",
      "Suspender toda insulina prandial de forma permanente",
      "Agregar sulfonilurea",
    ],
    answer: 1,
    explanation:
      "La hipoglucemia nocturna recurrente con HbA1c baja obliga a desintensificar, especialmente reduciendo insulina basal antes de añadir fármacos.",
  },
  {
    id: 14,
    specialty: "Endocrinología",
    difficulty: 3,
    source: "ATA/Endocrino",
    tags: ["Graves", "TRAb"],
    title: "Hipertiroidismo con oftalmopatía",
    case:
      "Femenino de 32 años con pérdida de peso, palpitaciones, temblor fino, bocio difuso y exoftalmos bilateral. TSH <0.01 mUI/L y T4 libre elevada.",
    question: "¿Qué estudio confirma con mayor especificidad la etiología más probable?",
    options: [
      "Anticuerpos contra el receptor de TSH",
      "Anticuerpos anti-TPO aislados",
      "Tiroglobulina sérica",
      "Calcitonina",
    ],
    answer: 0,
    explanation:
      "El cuadro sugiere enfermedad de Graves. Los TRAb confirman la etiología autoinmune con mayor especificidad que anti-TPO.",
  },
  {
    id: 15,
    specialty: "Infectología",
    difficulty: 3,
    source: "ATS/IDSA NAC",
    tags: ["NAC", "UCI", "Criterios mayores"],
    title: "Neumonía grave adquirida en la comunidad",
    case:
      "Masculino de 68 años con fiebre, tos purulenta y disnea. TA 84/52 mmHg, FR 34 rpm, SatO2 86%, PaO2/FiO2 210. Radiografía con consolidación multilobar.",
    question: "¿Cuáles son los criterios mayores de gravedad para NAC?",
    options: [
      "FR mayor de 30 y multilobar",
      "Hipotensión que requiere vasopresores y ventilación mecánica invasiva",
      "Confusión y BUN elevado",
      "Hipotermia y leucopenia",
    ],
    answer: 1,
    explanation:
      "Los dos criterios mayores ATS/IDSA para NAC grave son choque con necesidad de vasopresores y ventilación mecánica invasiva.",
  },
  {
    id: 16,
    specialty: "Infectología",
    difficulty: 2,
    source: "IDSA",
    tags: ["Pielonefritis", "Urocultivo"],
    title: "Pielonefritis aguda",
    case:
      "Mujer de 39 años con fiebre, dolor lumbar derecho, náusea y disuria. TA 110/70 mmHg. EGO con piuria y nitritos positivos. No embarazo. Tolera vía oral.",
    question: "¿Qué estudio debe tomarse antes de antibiótico?",
    options: [
      "Urocultivo",
      "Biopsia renal",
      "Cistoscopia urgente",
      "Antígeno urinario para neumococo",
    ],
    answer: 0,
    explanation:
      "En pielonefritis se debe obtener urocultivo antes de iniciar antibiótico para dirigir tratamiento y detectar resistencia.",
  },
  {
    id: 17,
    specialty: "Neumología",
    difficulty: 3,
    source: "GOLD",
    tags: ["EPOC", "Exacerbación"],
    title: "Exacerbación de EPOC",
    case:
      "Masculino de 70 años con EPOC, aumento de disnea, mayor volumen de esputo y esputo purulento. SatO2 88% al aire ambiente. No hay neumonía en radiografía.",
    question: "¿Qué dato apoya el uso de antibiótico en esta exacerbación?",
    options: [
      "Esputo purulento con incremento de síntomas respiratorios",
      "Edad mayor de 65 años aislada",
      "Saturación normal",
      "Tos seca sin cambios",
    ],
    answer: 0,
    explanation:
      "La purulencia del esputo, especialmente con aumento de disnea o volumen, apoya etiología bacteriana y uso de antibiótico.",
  },
  {
    id: 18,
    specialty: "Neumología",
    difficulty: 3,
    source: "ESC/ERS HTP",
    tags: ["Hipertensión pulmonar", "Cateterismo derecho"],
    title: "Sospecha de hipertensión pulmonar",
    case:
      "Femenino de 46 años con esclerosis sistémica y disnea progresiva. Ecocardiograma: dilatación de ventrículo derecho y velocidad de insuficiencia tricuspídea elevada.",
    question: "¿Qué estudio confirma el diagnóstico hemodinámico?",
    options: [
      "Cateterismo cardíaco derecho",
      "Espirometría simple",
      "Radiografía de tórax",
      "Dímero D",
    ],
    answer: 0,
    explanation:
      "El ecocardiograma estima probabilidad, pero la confirmación de hipertensión pulmonar requiere cateterismo cardíaco derecho.",
  },
  {
    id: 19,
    specialty: "Gastroenterología",
    difficulty: 3,
    source: "ACG",
    tags: ["Sangrado digestivo alto", "Endoscopia"],
    title: "Hemorragia digestiva alta",
    case:
      "Masculino de 63 años con melena y hematemesis. TA 92/58 mmHg, FC 118 lpm, Hb 7.8 g/dL. Usa naproxeno crónicamente.",
    question: "¿Cuál es la prioridad inicial?",
    options: [
      "Endoscopia inmediata sin reanimación",
      "Reanimación hemodinámica, acceso IV y estabilización",
      "Colonoscopia como primer estudio",
      "Alta con inhibidor de bomba de protones oral",
    ],
    answer: 1,
    explanation:
      "En sangrado digestivo alto con inestabilidad, primero se estabiliza al paciente con ABC, accesos IV y reanimación; después endoscopia temprana.",
  },
  {
    id: 20,
    specialty: "Hematología",
    difficulty: 3,
    source: "ASH",
    tags: ["Anemia microcítica", "Ferritina"],
    title: "Anemia ferropénica",
    case:
      "Mujer de 49 años con fatiga. Hb 8.9 g/dL, VCM 68 fL, RDW elevado, ferritina 8 ng/mL. Refiere menstruaciones abundantes.",
    question: "¿Cuál es el diagnóstico más probable?",
    options: [
      "Anemia ferropénica",
      "Anemia de enfermedad crónica pura",
      "Esferocitosis hereditaria",
      "Deficiencia de B12",
    ],
    answer: 0,
    explanation:
      "VCM bajo, RDW alto y ferritina baja son típicos de anemia ferropénica.",
  },
  {
    id: 21,
    specialty: "Reumatología",
    difficulty: 3,
    source: "EULAR",
    tags: ["Arteritis temporal", "Esteroides"],
    title: "Cefalea y claudicación mandibular",
    case:
      "Mujer de 74 años con cefalea temporal nueva, dolor al masticar y VSG elevada. Refiere visión borrosa transitoria.",
    question: "¿Cuál es la conducta inicial más adecuada?",
    options: [
      "Esperar biopsia antes de tratar",
      "Iniciar glucocorticoide de inmediato",
      "Indicar AINE y seguimiento en 3 meses",
      "Solicitar anticuerpos anti-CCP",
    ],
    answer: 1,
    explanation:
      "La sospecha de arteritis de células gigantes con síntomas visuales requiere glucocorticoide inmediato para prevenir pérdida visual, sin esperar biopsia.",
  },
  {
    id: 22,
    specialty: "Neurología",
    difficulty: 3,
    source: "AHA/ASA",
    tags: ["EVC", "Trombólisis"],
    title: "Déficit neurológico agudo",
    case:
      "Masculino de 66 años con inicio súbito de afasia y hemiparesia derecha hace 90 minutos. TA 168/92 mmHg. Glucosa 118 mg/dL. TAC simple sin hemorragia.",
    question: "¿Cuál es el siguiente paso si no hay contraindicaciones?",
    options: [
      "Trombólisis IV dentro de ventana terapéutica",
      "Anticoagulación plena inmediata",
      "Esperar RM cerebral en 24 horas",
      "Alta con aspirina",
    ],
    answer: 0,
    explanation:
      "En EVC isquémico dentro de ventana y sin hemorragia ni contraindicaciones, se considera trombólisis IV.",
  },
  {
    id: 23,
    specialty: "Medicina crítica",
    difficulty: 4,
    source: "Surviving Sepsis",
    tags: ["Sepsis", "Lactato", "Choque séptico"],
    title: "Choque séptico",
    case:
      "Femenino de 62 años con fiebre, confusión y dolor lumbar. TA 78/44 mmHg pese a 30 ml/kg de cristaloide. Lactato 4.8 mmol/L. EGO con piuria.",
    question: "¿Cuál intervención debe iniciarse ahora?",
    options: [
      "Norepinefrina y antibiótico de amplio espectro",
      "Diurético de asa",
      "Esperar hemocultivos 24 horas",
      "Beta bloqueador IV",
    ],
    answer: 0,
    explanation:
      "Choque séptico con hipotensión persistente tras líquidos requiere vasopresor, preferentemente norepinefrina, junto con antibióticos tempranos.",
  },
  {
    id: 24,
    specialty: "Investigación",
    difficulty: 3,
    source: "Bioestadística",
    tags: ["Sensibilidad", "Tamizaje"],
    title: "Prueba de tamizaje",
    case:
      "Se evalúa una nueva prueba para detectar enfermedad renal temprana. El objetivo es no dejar pasar casos en una población de alto riesgo, aceptando falsos positivos.",
    question: "¿Qué característica debe priorizarse?",
    options: [
      "Alta sensibilidad",
      "Alta especificidad exclusivamente",
      "Bajo valor predictivo negativo",
      "Baja reproducibilidad",
    ],
    answer: 0,
    explanation:
      "En tamizaje se prioriza sensibilidad alta para reducir falsos negativos. Una prueba positiva puede confirmarse con otra más específica.",
  },
  {
    id: 25,
    specialty: "Bioética",
    difficulty: 2,
    source: "Bioética clínica",
    tags: ["Autonomía", "Consentimiento"],
    title: "Rechazo de tratamiento",
    case:
      "Paciente competente con neumonía grave entiende riesgos y beneficios, pero rechaza intubación invasiva. No hay alteración del estado mental.",
    question: "¿Qué principio debe respetarse principalmente?",
    options: [
      "Autonomía",
      "Justicia distributiva",
      "Paternalismo obligatorio",
      "Veracidad estadística",
    ],
    answer: 0,
    explanation:
      "Un paciente competente puede rechazar tratamientos aun si el equipo médico no está de acuerdo. Debe documentarse capacidad, información y decisión.",
  },
];

export default extraCases;
