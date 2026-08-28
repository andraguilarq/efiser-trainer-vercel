export const studyResources = [
  {
    id: "resource-hyponatremia", specialty: "Nefrología", topic: "Hiponatremia", type: "Algoritmo", title: "Hiponatremia: decidir antes de corregir",
    summary: "Ordena la evaluación de la hiponatremia por tonicidad, síntomas y volemia; la gravedad neurológica determina la urgencia.",
    steps: ["Confirmar sodio y glucosa; calcular osmolaridad sérica efectiva.", "Si hay convulsión, coma o síntomas neurológicos graves: NaCl 3% en bolos y control seriado de sodio.", "Si es hipotónica: osmolaridad urinaria y sodio urinario, integrados con exploración de volemia.", "Tratar la causa y vigilar que la corrección no exceda el límite seguro, especialmente ante alto riesgo de desmielinización osmótica."],
    table: [["Patrón", "Pista útil", "Conducta"], ["Hipovolémica", "Sodio urinario bajo si pérdida extrarrenal", "Restituir volumen si corresponde"], ["SIADH", "Orina concentrada, euvolemia, sodio urinario no suprimido", "Restricción y tratar desencadenante"], ["Hipervolémica", "Edema/IC/cirrosis", "Tratar enfermedad de base y balance hídrico"]],
    tags: ["Hiponatremia", "Sodio", "SIADH"],
  },
  {
    id: "resource-cad", specialty: "Endocrinología", topic: "Cetoacidosis diabética", type: "Algoritmo", title: "Cetoacidosis diabética: reanimación y resolución",
    summary: "El orden terapéutico evita las complicaciones más peligrosas: volumen, potasio, insulina y dextrosa según evolución.",
    steps: ["Confirmar cetosis/acidosis y buscar desencadenante; iniciar líquidos isotónicos según estado hemodinámico.", "Medir potasio: si es bajo, reponerlo antes de iniciar insulina; monitorizarlo de forma estrecha.", "Iniciar insulina IV cuando sea seguro; añadir dextrosa al descender glucosa mientras persista cetosis.", "Considerar bicarbonato solo ante acidemia extrema; finalizar cuando se resuelvan cetosis y acidosis, no solo por glucosa o cetonuria."],
    table: [["Dato", "Implica"], ["Potasio bajo", "Insulina puede precipitar arritmia: reponer primero"], ["Glucosa baja con acidosis persistente", "Añadir dextrosa; no detener insulina prematuramente"], ["Cetonuria persistente", "No define por sí sola resolución"]],
    tags: ["CAD", "Cetoacidosis", "Potasio"],
  },
  {
    id: "resource-sca", specialty: "Cardiología", topic: "Síndrome coronario agudo", type: "Algoritmo", title: "Dolor torácico: de ECG a reperfusión",
    summary: "La prioridad es reconocer isquemia con elevación del ST o equivalentes y no retrasar reperfusión por pruebas innecesarias.",
    steps: ["ECG de 12 derivaciones temprano; repetirlo si el primero no es diagnóstico y la sospecha persiste.", "Si hay STEMI/equivalente y es candidato: activar reperfusión; elegir ICP primaria o fibrinólisis según tiempos y contraindicaciones.", "En SCASEST: integrar troponina dinámica, ECG y riesgo para decidir estrategia invasiva.", "Iniciar medidas antitrombóticas y antiisquémicas según escenario, riesgo hemorrágico y procedimientos."],
    table: [["Escenario", "Decisión central"], ["STEMI", "Reperfusión urgente"], ["SCASEST alto riesgo", "Coronariografía temprana"], ["Troponina sin patrón isquémico", "Buscar lesión miocárdica/diagnóstico alterno"]],
    tags: ["SCA", "STEMI", "Troponina"],
  },
  {
    id: "resource-sepsis", specialty: "Medicina crítica / Urgencias", topic: "Sepsis", type: "Algoritmo", title: "Sepsis: reconocer, reanimar, reevaluar",
    summary: "Antibióticos, control de foco y reanimación se inician en paralelo; los líquidos y vasopresores se individualizan a la respuesta.",
    steps: ["Identificar disfunción orgánica y obtener cultivos si no retrasan antimicrobianos.", "Administrar antimicrobianos apropiados y buscar control de foco temprano.", "Reanimar con líquidos cuando hay hipoperfusión, reevaluando respuesta y riesgo de sobrecarga.", "Si persiste hipotensión, usar vasopresor para perfusión y monitorizar lactato, diuresis y exploración."],
    table: [["Problema", "Error frecuente"], ["Choque persistente", "Repetir líquidos sin reevaluar respuesta"], ["Foco drenables", "Confiar solo en antibióticos"], ["Lactato alto", "Interpretarlo sin contexto de perfusión y tendencia"]],
    tags: ["Sepsis", "Choque séptico", "Lactato"],
  },
  {
    id: "resource-tep", specialty: "Neumología", topic: "Tromboembolia pulmonar", type: "Escala", title: "TEP: probabilidad, imagen y estratificación",
    summary: "La probabilidad clínica guía el uso de dímero D e imagen; la estabilidad hemodinámica separa las rutas urgentes.",
    steps: ["Valorar estabilidad: hipotensión/choque obliga a ruta de alto riesgo y tratamiento inmediato según contexto.", "En paciente estable, estimar probabilidad clínica antes de pedir dímero D o angio-TC.", "Un dímero D negativo solo descarta TEP en probabilidad apropiada; no sustituye imagen si probabilidad alta.", "Tras confirmar, estratificar riesgo con clínica, disfunción de VD y biomarcadores para decidir vigilancia y reperfusión."],
    table: [["Situación", "Prueba/conducta"], ["Probabilidad baja apropiada", "Dímero D puede evitar imagen"], ["Probabilidad alta", "Imagen diagnóstica, no demorar con dímero D"], ["Inestabilidad", "Evaluación urgente y estrategia de reperfusión según riesgo"]],
    tags: ["TEP", "Embolia pulmonar", "Dímero D"],
  },
  {
    id: "resource-meningitis", specialty: "Infectología", topic: "Meningitis", type: "Algoritmo", title: "Meningitis: no retrasar el tratamiento",
    summary: "La toma de hemocultivos y la punción lumbar son importantes, pero nunca deben retrasar antimicrobianos si hay sospecha fundada.",
    steps: ["Valorar ABC, sepsis, focalidad, déficit de conciencia, inmunosupresión y papiledema.", "Si requiere neuroimagen antes de PL, obtener hemocultivos e iniciar dexametasona/antimicrobianos sin espera.", "Interpretar LCR con glucosa, proteínas, celularidad, Gram/cultivo y PCR según contexto.", "Ajustar tratamiento al microorganismo y valorar aislamiento/complicaciones neurológicas."],
    table: [["LCR", "Patrón orientador"], ["Bacteriana", "PMN, glucosa baja, proteínas altas"], ["Viral", "Linfocitos predominantes, glucosa usualmente conservada"], ["Tuberculosa", "Curso subagudo, glucosa baja y proteínas altas; integrar imagen/contexto"]],
    tags: ["Meningitis", "LCR", "SNC"],
  },
  {
    id: "resource-hta", specialty: "Cardiología", topic: "Hipertensión arterial", type: "Tabla", title: "Hipertensión: confirmar, estratificar, tratar",
    summary: "La técnica de medición y la confirmación fuera de consulta cambian diagnóstico y tratamiento; el riesgo cardiovascular modifica el umbral terapéutico.",
    steps: ["Confirmar una medición correcta y considerar MAPA/HBPM cuando corresponda.", "Valorar daño de órgano blanco, enfermedad cardiovascular, ERC, diabetes y causas secundarias si hay pistas.", "Iniciar cambios de estilo de vida y fármacos según cifras, riesgo y comorbilidades.", "Comprobar adherencia y técnica antes de etiquetar hipertensión resistente."],
    table: [["Escenario", "Punto de decisión"], ["Bata blanca", "Confirmar fuera de consulta antes de sobremedicar"], ["Resistente aparente", "Adherencia, técnica y sustancias antes de estudiar secundaria"], ["HTA + albuminuria", "Bloqueo SRAA si no hay contraindicación"]],
    tags: ["HTA", "MAPA", "HBPM"],
  },
  {
    id: "resource-tiroides", specialty: "Endocrinología", topic: "Patología tiroidea", type: "Tabla", title: "Tirotoxicosis y nódulo: separar síntesis de destrucción",
    summary: "TSH suprimida inicia la ruta: TRAb/captación y Doppler ayudan a diferenciar Graves, nódulo autónomo y tiroiditis destructiva.",
    steps: ["Confirmar TSH suprimida con T4L/T3 y valorar gravedad clínica.", "Con tirotoxicosis, decidir si hay síntesis aumentada o liberación destructiva de hormona preformada.", "Nódulo con TSH baja: gammagrafía; nódulo caliente suele tener bajo riesgo de malignidad.", "Nódulo no funcional se clasifica por ultrasonido y se indica PAAF por tamaño/riesgo."],
    table: [["Entidad", "Captación/flujo", "Tratamiento clave"], ["Graves", "Alto/difuso", "Antitiroideo, opciones definitivas según caso"], ["Tiroiditis", "Bajo", "Betabloqueo/antiinflamatorio; no tionamida"], ["Nódulo autónomo", "Focal alto", "Tratamiento definitivo según clínica"]],
    tags: ["Tiroides", "Graves", "Nódulo tiroideo"],
  },
];

export const pearls = [
  { id: "pearl-sodio", specialty: "Nefrología", topic: "Hiponatremia", text: "En hiponatremia sintomática grave, la prioridad es elevar el sodio de forma controlada para revertir edema cerebral; después se corrige la causa y se vigila la sobrecorrección." },
  { id: "pearl-cad", specialty: "Endocrinología", topic: "Cetoacidosis diabética", text: "En CAD, la glucosa puede normalizarse antes que la cetosis: añadir dextrosa permite continuar insulina hasta resolver la acidosis." },
  { id: "pearl-ptt", specialty: "Hematología / Reumatología", topic: "PTT", text: "Plaquetopenia más anemia hemolítica microangiopática obliga a actuar como PTT: la muestra de ADAMTS13 se toma antes de plasmaféresis, pero el tratamiento no espera el resultado." },
  { id: "pearl-sca", specialty: "Cardiología", topic: "Síndrome coronario agudo", text: "Una troponina elevada identifica lesión miocárdica; para infarto se necesita integrarla con isquemia clínica, ECG o imagen." },
  { id: "pearl-cmv", specialty: "Infectología", topic: "CMV", text: "En retinitis por CMV, una PCR plasmática negativa no descarta enfermedad ocular localizada; el fondo de ojo urgente guía la conducta." },
  { id: "pearl-tep", specialty: "Neumología", topic: "Tromboembolia pulmonar", text: "El dímero D descarta TEP solo cuando la probabilidad clínica lo permite; no reemplaza imagen en probabilidad alta." },
  { id: "pearl-cirrosis", specialty: "Gastroenterología / Hepatología", topic: "Cirrosis", text: "En ascitis con deterioro clínico, la paracentesis diagnóstica temprana cambia tratamiento; no debe diferirse por esperar imagen." },
  { id: "pearl-evc", specialty: "Neurología", topic: "EVC isquémico", text: "En EVC agudo, el tiempo de inicio o última vez sano determina elegibilidad terapéutica, pero la selección por imagen puede ampliar opciones en casos escogidos." },
];
