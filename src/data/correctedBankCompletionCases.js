// Casos originales completados a partir de reactivos del BANCO EFISER CORREGIDO.
// El documento conservaba la clave y el objetivo educativo, pero no siempre las
// opciones o el contexto completo. Por eso cada reactivo se reescribió para que
// pueda responderse de manera independiente y estudiarse con retroalimentación.
const createCase = ({ id, series, specialty, difficulty = 4, caseText, question, choices, explanation, tags }) => {
  const answer = choices.findIndex((choice) => choice.correct);
  return {
    id,
    caseSeriesId: series,
    caseSet: series,
    specialty,
    difficulty,
    source: "BANCO_EFISER_CORREGIDO_Y_REVISADO.docx",
    sourceMode: "corrected-bank-derived",
    tags,
    case: caseText,
    question,
    options: choices.map((choice) => choice.text),
    answer,
    explanation,
    optionFeedback: choices.map((choice) => choice.feedback),
  };
};

const cohortCase = "Una cohorte prospectiva sigue durante 3 años a 420 adolescentes con enfermedad renal crónica en hemodiálisis. Al ingreso se cuantifica colesterol total en mg/dL y se registra la ocurrencia de muerte durante el seguimiento.";
const jointCase = "Hombre de 67 años con diabetes y enfermedad renal crónica consulta por 24 horas de dolor, derrame y limitación marcada de una rodilla. Temperatura 38.7 °C. La artrocentesis obtiene líquido turbio con 136,000 leucocitos/mm³, predominio de neutrófilos, glucosa muy baja y tinción de Gram pendiente.";
const monoCase = "Mujer de 21 años con 10 días de fiebre, odinofagia, adenopatías cervicales posteriores, petequias palatinas y esplenomegalia. Presenta linfocitosis con linfocitos atípicos y elevación discreta de AST y ALT.";
const preeclampsiaCase = "Primigesta de 31 semanas sin hipertensión previa presenta cefalea persistente y epigastralgia. TA repetida 170/110 mmHg, proteinuria 3+, plaquetas 88,000/mm³, AST 156 U/L y creatinina 1.3 mg/dL. El feto está vivo y no hay sangrado vaginal.";

const correctedBankCompletionCases = [
  createCase({ id: 43001, series: "CB-001-COHORTE", specialty: "Investigación / Bioestadística", difficulty: 3, caseText: cohortCase, question: "¿Cómo se clasifica la variable colesterol total medida en mg/dL?", choices: [
    { text: "Cualitativa nominal", feedback: "Las categorías nominales no tienen magnitud numérica ni permiten operaciones aritméticas.", correct: false },
    { text: "Cualitativa ordinal", feedback: "Una variable ordinal ordena categorías; el valor exacto en mg/dL conserva distancia numérica entre observaciones.", correct: false },
    { text: "Cuantitativa continua", feedback: "Correcta. El colesterol es una medida numérica que, en principio, puede tomar valores dentro de un intervalo y permite medias, diferencias y regresión.", correct: true },
    { text: "Cualitativa dicotómica", feedback: "Solo sería dicotómica si se transformara artificialmente en, por ejemplo, alto/bajo.", correct: false },
  ], explanation: "El colesterol expresado en mg/dL es una variable cuantitativa continua. Aunque el laboratorio la reporte con enteros, representa una magnitud medible en una escala continua. Punto clave: no confundas la medición original con una categorización clínica posterior.", tags: ["Escalas de medición", "Cohorte"] }),
  createCase({ id: 43002, series: "CB-001-COHORTE", specialty: "Investigación / Bioestadística", difficulty: 3, caseText: cohortCase, question: "¿Cómo se clasifica el desenlace muerte registrado como sí/no?", choices: [
    { text: "Cuantitativa discreta", feedback: "Un conteo de muertes sería discreto, pero el desenlace individual muerte sí/no no es un conteo.", correct: false },
    { text: "Cualitativa dicotómica", feedback: "Correcta. Cada participante queda en una de dos categorías mutuamente excluyentes: murió o no murió.", correct: true },
    { text: "Cuantitativa continua", feedback: "No expresa una magnitud continua; el tiempo hasta morir sería otra variable distinta.", correct: false },
    { text: "Cualitativa ordinal", feedback: "No existe jerarquía entre las categorías sí y no.", correct: false },
  ], explanation: "La muerte codificada como sí/no es una variable cualitativa dicotómica. Punto clave: el tipo de desenlace determina la estrategia analítica; aquí pueden estimarse riesgos, razones de riesgo o supervivencia.", tags: ["Variables", "Desenlace"] }),
  createCase({ id: 43003, series: "CB-001-COHORTE", specialty: "Investigación / Bioestadística", difficulty: 3, caseText: cohortCase, question: "Si se compara la mortalidad entre quienes tenían colesterol alto y bajo al inicio, ¿qué medida de asociación se obtiene directamente?", choices: [
    { text: "Riesgo relativo", feedback: "Correcta. La cohorte permite medir incidencia en expuestos y no expuestos, por lo que el cociente de ambos riesgos es estimable directamente.", correct: true },
    { text: "Odds ratio obligatoria", feedback: "La odds ratio es la medida típica de casos y controles; puede calcularse, pero no es la medida directa preferida cuando hay riesgos observables.", correct: false },
    { text: "Razón de prevalencias", feedback: "La prevalencia corresponde a una fotografía transversal y no aprovecha el seguimiento prospectivo.", correct: false },
    { text: "Coeficiente kappa", feedback: "Kappa cuantifica concordancia entre observadores o pruebas categóricas, no asociación entre exposición y mortalidad.", correct: false },
  ], explanation: "Una cohorte prospectiva parte de la exposición y mide casos nuevos durante seguimiento; por eso permite estimar incidencia y riesgo relativo. Punto clave: el diseño, no el tema clínico, define la medida de asociación primaria.", tags: ["Cohorte", "Riesgo relativo"] }),
  createCase({ id: 43004, series: "CB-001-COHORTE", specialty: "Investigación / Bioestadística", difficulty: 3, caseText: "Para estudiar una infección muy rara, se seleccionan primero pacientes que la presentaron y controles de la misma población fuente; después se recupera la exposición a un fármaco durante el mes previo.", question: "¿Cuál es la medida de asociación apropiada para este diseño?", choices: [
    { text: "Riesgo relativo", feedback: "No puede estimarse directamente porque el número de casos y controles fue fijado por el investigador, no deriva de una población seguida en riesgo.", correct: false },
    { text: "Odds ratio", feedback: "Correcta. En casos y controles se compara la odds de exposición entre casos y controles; bajo enfermedad rara puede aproximar el riesgo relativo.", correct: true },
    { text: "Incidencia acumulada", feedback: "Falta un denominador de población inicialmente en riesgo seguido en el tiempo.", correct: false },
    { text: "Hazard ratio", feedback: "Requeriría información de tiempo a evento en una cohorte o ensayo con seguimiento.", correct: false },
  ], explanation: "En estudios de casos y controles la selección inicia por desenlace; por ello no se calcula riesgo absoluto y la medida de asociación es la odds ratio. Punto clave: seleccionar controles comparables es indispensable para que esa OR sea válida.", tags: ["Casos y controles", "Odds ratio"] }),
  createCase({ id: 43005, series: "CB-001-COHORTE", specialty: "Investigación / Bioestadística", difficulty: 3, caseText: cohortCase, question: "Como el investigador no asigna una intervención y solo observa colesterol basal y mortalidad, ¿cómo se clasifica este estudio?", choices: [
    { text: "Ensayo clínico aleatorizado", feedback: "No hay asignación deliberada ni aleatorización de una maniobra terapéutica.", correct: false },
    { text: "Estudio observacional de cohorte", feedback: "Correcta. Los participantes se clasifican por exposición existente y se siguen para identificar desenlaces.", correct: true },
    { text: "Estudio ecológico", feedback: "Los datos se miden a nivel individual, no como promedios de poblaciones.", correct: false },
    { text: "Serie de casos", feedback: "Una serie de casos no tiene grupo comparador definido ni estima incidencia por exposición.", correct: false },
  ], explanation: "La ausencia de una maniobra asignada define un estudio observacional. El seguimiento prospectivo desde exposición hasta desenlace lo ubica como cohorte. Punto clave: prospectivo no significa experimental.", tags: ["Diseños de estudio", "Cohorte"] }),
  createCase({ id: 43006, series: "CB-009-ARTRITIS", specialty: "Infectología", difficulty: 4, caseText: jointCase, question: "Mientras se obtienen cultivos, ¿cuál es el agente bacteriano más probable en una artritis séptica nativa de este adulto?", choices: [
    { text: "Staphylococcus aureus", feedback: "Correcta. Es el patógeno más frecuente de artritis séptica nativa en adultos y debe cubrirse empíricamente según riesgo local de MRSA.", correct: true },
    { text: "Neisseria gonorrhoeae", feedback: "Se considera en adultos jóvenes sexualmente activos con tenosinovitis, dermatitis o artralgias migratorias, un escenario distinto.", correct: false },
    { text: "Mycobacterium tuberculosis", feedback: "Suele producir una monoartritis indolente, subaguda o crónica, no una sinovitis purulenta explosiva.", correct: false },
    { text: "Borrelia burgdorferi", feedback: "La artritis de Lyme suele ser subaguda y requiere contexto epidemiológico específico.", correct: false },
  ], explanation: "El líquido intensamente inflamatorio, la fiebre y los factores de riesgo obligan a tratar como artritis séptica. S. aureus es la causa más frecuente. Punto clave: toma hemocultivos y líquido sinovial antes del antibiótico si el paciente está estable, sin retrasar el tratamiento en sepsis.", tags: ["Artritis séptica", "Microbiología"] }),
  createCase({ id: 43007, series: "CB-009-ARTRITIS", specialty: "Reumatología", difficulty: 4, caseText: jointCase, question: "¿Cuál es el principal diagnóstico diferencial que debe buscarse simultáneamente en el líquido sinovial?", choices: [
    { text: "Artritis por cristales", feedback: "Correcta. Gota y CPPD pueden simular una monoartritis séptica y pueden coexistir con infección; se requiere búsqueda de cristales y cultivo.", correct: true },
    { text: "Fibromialgia", feedback: "No produce derrame, fiebre ni líquido sinovial inflamatorio.", correct: false },
    { text: "Osteoartrosis aislada", feedback: "Produce dolor mecánico y derrame no inflamatorio, no este recuento celular ni glucosa baja.", correct: false },
    { text: "Artritis reumatoide de inicio típico", feedback: "La presentación clásica es poliarticular y simétrica; no explica por sí sola un líquido tan purulento.", correct: false },
  ], explanation: "Los cristales no excluyen infección. Ante una monoartritis aguda se solicitan siempre Gram, cultivo, recuento/diferencial y cristales. Punto clave: tratar la posible infección mientras se completa el estudio si el cuadro es compatible.", tags: ["Monoartritis", "Cristales"] }),
  createCase({ id: 43008, series: "CB-009-ARTRITIS", specialty: "Infectología", difficulty: 4, caseText: jointCase, question: "Además de antimicrobianos dirigidos, ¿cuál es la medida de control de foco apropiada?", choices: [
    { text: "Esperar el cultivo definitivo antes de evacuar la articulación", feedback: "El retraso aumenta presión intraarticular, destrucción del cartílago y bacteriemia persistente.", correct: false },
    { text: "Aspiración para análisis y evacuación, con lavado artroscópico o quirúrgico según articulación y evolución", feedback: "Correcta. El drenaje es parte del tratamiento; la modalidad depende de articulación, volumen, respuesta y posibilidad de aspiraciones seriadas.", correct: true },
    { text: "Corticoide intraarticular inmediato", feedback: "Está contraindicado mientras exista sospecha de infección no controlada.", correct: false },
    { text: "Inmovilización sin artrocentesis", feedback: "No permite identificar el germen ni reduce adecuadamente la carga purulenta.", correct: false },
  ], explanation: "La artritis séptica requiere antibióticos y control de foco. El líquido debe estudiarse, pero también evacuarse. Punto clave: una articulación infectada es una urgencia ortopédica por riesgo de daño cartilaginoso irreversible.", tags: ["Artritis séptica", "Drenaje"] }),
  createCase({ id: 43009, series: "CB-011-INVESTIGACION", specialty: "Investigación / Bioestadística", difficulty: 3, caseText: "Un equipo desea estudiar incidencia y factores asociados a síndrome inflamatorio multisistémico pediátrico posterior a SARS-CoV-2 en hospitales de referencia. Aún no ha redactado protocolo.", question: "¿Cuál debe ser el primer componente que delimite qué problema se estudiará, en quiénes y por qué?", choices: [
    { text: "Cronograma", feedback: "El cronograma se construye una vez que se conoce la pregunta, diseño y procedimientos.", correct: false },
    { text: "Planteamiento del problema", feedback: "Correcta. Define el problema, contexto, población y vacío de conocimiento que fundamentarán la pregunta.", correct: true },
    { text: "Presupuesto", feedback: "La factibilidad financiera es importante, pero no sustituye definir el problema científico.", correct: false },
    { text: "Resultados esperados", feedback: "No deben anticiparse como si fueran hallazgos antes de formular la pregunta y el método.", correct: false },
  ], explanation: "El protocolo inicia al convertir una preocupación clínica en un problema investigable y una pregunta delimitada. Punto clave: la justificación explica la relevancia; el planteamiento define el problema que se quiere resolver.", tags: ["Protocolo", "Planteamiento del problema"] }),
  createCase({ id: 43010, series: "CB-011-INVESTIGACION", specialty: "Investigación / Bioestadística", difficulty: 3, caseText: "El mismo equipo ya definió la pregunta. Ahora debe argumentar la utilidad clínica, social y científica de invertir recursos en el estudio de síndrome inflamatorio multisistémico pediátrico.", question: "¿En qué apartado del protocolo debe desarrollarse ese argumento?", choices: [
    { text: "Justificación", feedback: "Correcta. Describe relevancia, utilidad esperada, impacto y factibilidad de realizar el estudio.", correct: true },
    { text: "Hipótesis", feedback: "La hipótesis enuncia una relación o diferencia esperada, no la utilidad de investigar el problema.", correct: false },
    { text: "Plan de análisis", feedback: "Explica cómo se analizarán variables, pero no por qué el estudio merece realizarse.", correct: false },
    { text: "Marco muestral", feedback: "Define la población de la cual se obtendrá la muestra.", correct: false },
  ], explanation: "Una justificación sólida enlaza el problema con sus consecuencias y con el beneficio plausible de generar evidencia. Punto clave: marco teórico = conocimiento previo; justificación = por qué vale la pena hacer el estudio.", tags: ["Protocolo", "Justificación"] }),
  createCase({ id: 43011, series: "CB-011-INVESTIGACION", specialty: "Investigación / Bioestadística", difficulty: 4, caseText: "Se quiere estimar la incidencia anual de nuevos casos de síndrome inflamatorio multisistémico pediátrico entre niños con infección por SARS-CoV-2 documentada. Se dispone de una red hospitalaria capaz de seguirlos 12 meses.", question: "¿Cuál diseño responde mejor a ese objetivo?", choices: [
    { text: "Estudio transversal", feedback: "Da una fotografía de prevalencia y no identifica con precisión casos nuevos durante un periodo.", correct: false },
    { text: "Cohorte", feedback: "Correcta. Parte de una población en riesgo y permite registrar casos incidentes durante un seguimiento definido.", correct: true },
    { text: "Casos y controles", feedback: "Es útil para estudiar asociaciones, en especial con desenlaces raros, pero no estima incidencia directamente.", correct: false },
    { text: "Serie de casos", feedback: "Describe pacientes sin denominador poblacional ni estimación de incidencia.", correct: false },
  ], explanation: "La incidencia requiere casos nuevos y una población inicialmente en riesgo seguida en el tiempo. Punto clave: el diseño debe elegirse según la pregunta primaria, no según la facilidad de obtener datos.", tags: ["Incidencia", "Cohorte"] }),
  createCase({ id: 43012, series: "CB-011-INVESTIGACION", specialty: "Investigación / Bioestadística", difficulty: 3, caseText: "Para un estudio retrospectivo hospitalario sobre síndrome inflamatorio multisistémico pediátrico se requiere verificar fecha de ingreso, resultados de PCR, tratamiento y desenlace de cada paciente.", question: "¿Cuál fuente permite recuperar esos datos con mayor validez?", choices: [
    { text: "Expediente clínico, hojas de ingreso y registros electrónicos verificables", feedback: "Correcta. Permiten documentar variables clínicas y temporales de cada sujeto de manera auditable.", correct: true },
    { text: "Encuesta de satisfacción aplicada a familiares", feedback: "No reemplaza registros diagnósticos, fechas ni tratamientos verificables.", correct: false },
    { text: "Publicaciones de redes sociales", feedback: "No constituyen una fuente clínica validada ni completa.", correct: false },
    { text: "Opinión del médico tratante sin revisión documental", feedback: "Introduce sesgo de recuerdo y no permite auditoría de las variables.", correct: false },
  ], explanation: "En estudios retrospectivos la calidad depende de cómo se midieron originalmente los datos. Punto clave: una fuente accesible no siempre es una fuente válida; define variables y criterios antes de revisar expedientes.", tags: ["Investigación retrospectiva", "Fuentes de datos"] }),
  createCase({ id: 43013, series: "CB-011-INVESTIGACION", specialty: "Investigación / Bioestadística", difficulty: 3, caseText: "Durante un año, 18 de 1,200 niños inicialmente libres del síndrome desarrollan síndrome inflamatorio multisistémico pediátrico. Todos tuvieron seguimiento suficiente para identificar el desenlace.", question: "¿Cuál es la incidencia acumulada anual?", choices: [
    { text: "0.15%", feedback: "Corresponde a un error decimal: 18/1,200 es 0.015, no 0.0015.", correct: false },
    { text: "1.5%", feedback: "Correcta. Se divide el número de casos nuevos entre la población inicialmente en riesgo: 18/1,200 = 0.015.", correct: true },
    { text: "18%", feedback: "Confunde el número absoluto de casos con una proporción.", correct: false },
    { text: "66.7 por 1,000", feedback: "No corresponde a la conversión de 18/1,200; la cifra correcta sería 15 por 1,000.", correct: false },
  ], explanation: "La incidencia acumulada usa casos nuevos como numerador y población inicialmente en riesgo como denominador. Punto clave: si el seguimiento es muy desigual, una tasa de incidencia con persona-tiempo puede ser más apropiada.", tags: ["Incidencia acumulada", "Cálculo"] }),
  createCase({ id: 43014, series: "CB-016-MONONUCLEOSIS", specialty: "Infectología", difficulty: 4, caseText: monoCase, question: "¿Cuál es el diagnóstico sindromático más probable?", choices: [
    { text: "Síndrome mononucleósico", feedback: "Correcta. Faringitis, adenopatías posteriores, esplenomegalia, linfocitos atípicos y transaminitis forman el patrón clásico.", correct: true },
    { text: "Síndrome nefrótico", feedback: "Requeriría proteinuria masiva, hipoalbuminemia y edema, ausentes en este caso.", correct: false },
    { text: "Síndrome serotoninérgico", feedback: "Exige exposición serotoninérgica y hallazgos neuromusculares/autonómicos como clonus e hiperreflexia.", correct: false },
    { text: "Fiebre reumática aguda", feedback: "No explica la linfocitosis atípica ni la esplenomegalia; además tendría que cumplir criterios de Jones.", correct: false },
  ], explanation: "El diagnóstico inicial es sindromático; EBV es la etiología más frecuente, pero CMV, VIH agudo y toxoplasmosis pueden producir cuadros semejantes. Punto clave: la esplenomegalia cambia el consejo de actividad física.", tags: ["Mononucleosis", "Diagnóstico"] }),
  createCase({ id: 43015, series: "CB-016-MONONUCLEOSIS", specialty: "Infectología", difficulty: 4, caseText: monoCase, question: "¿Qué patrón serológico apoya infección aguda por Epstein-Barr?", choices: [
    { text: "VCA-IgM positiva con EBNA negativa", feedback: "Correcta. VCA-IgM aparece al inicio; EBNA suele aparecer más tarde y orienta a infección pasada cuando está presente con VCA-IgG.", correct: true },
    { text: "EBNA-IgG aislada", feedback: "Sugiere infección pasada, no infección primaria aguda.", correct: false },
    { text: "VCA-IgG aislada con VCA-IgM negativa", feedback: "Puede reflejar infección pasada; requiere interpretación junto con EBNA y el contexto clínico.", correct: false },
    { text: "Anticuerpos antinucleares positivos", feedback: "No confirman EBV y pueden encontrarse en múltiples contextos.", correct: false },
  ], explanation: "La serología específica es más útil que una prueba heterófila aislada cuando se necesita confirmar EBV. Punto clave: no indiques amoxicilina empírica por la faringitis típica si sospechas mononucleosis, pues puede provocar exantema.", tags: ["EBV", "Serología"] }),
  createCase({ id: 43016, series: "CB-016-MONONUCLEOSIS", specialty: "Infectología", difficulty: 3, caseText: monoCase, question: "Sin obstrucción de vía aérea, anemia hemolítica ni trombocitopenia grave, ¿cuál es el tratamiento inicial más apropiado?", choices: [
    { text: "Reposo relativo, hidratación y analgésicos/antitérmicos", feedback: "Correcta. La mononucleosis no complicada recibe tratamiento de soporte; el manejo específico se reserva para complicaciones concretas.", correct: true },
    { text: "Amoxicilina por 10 días", feedback: "No trata EBV y puede provocar un exantema característico en este contexto.", correct: false },
    { text: "Aciclovir rutinario", feedback: "Puede reducir replicación viral sin beneficio clínico suficiente para indicarlo en enfermedad no complicada.", correct: false },
    { text: "Prednisona rutinaria", feedback: "Los corticoides se reservan para complicaciones como obstrucción inminente de vía aérea o citopenias graves.", correct: false },
  ], explanation: "La mayoría de los casos se resuelve con soporte. Punto clave: explica el riesgo de rotura esplénica y evita deporte de contacto hasta recuperación clínica y valoración individual del retorno.", tags: ["Mononucleosis", "Tratamiento"] }),
  createCase({ id: 43017, series: "CB-021-PREECLAMPSIA", specialty: "Gineco-obstetricia", difficulty: 5, caseText: preeclampsiaCase, question: "¿Cuál es la clasificación más precisa?", choices: [
    { text: "Hipertensión gestacional", feedback: "La hipertensión gestacional no incluye proteinuria ni daño orgánico atribuible a preeclampsia.", correct: false },
    { text: "Preeclampsia con datos de severidad, con síndrome HELLP parcial", feedback: "Correcta. La TA grave, síntomas neurológicos/epigastralgia, plaquetopenia, transaminitis y deterioro renal establecen severidad; falta LDH/hemólisis para documentar HELLP completo.", correct: true },
    { text: "Preeclampsia sin datos de severidad", feedback: "La presión de 170/110 y el daño hematológico, hepático y renal son datos de severidad.", correct: false },
    { text: "Hipertensión crónica no complicada", feedback: "No existía antes del embarazo y los datos sistémicos indican una microangiopatía obstétrica aguda.", correct: false },
  ], explanation: "La preeclampsia con datos de severidad se diagnostica por hipertensión de nueva aparición después de 20 semanas más proteinuria o disfunción orgánica. Punto clave: las cifras graves requieren tratamiento antihipertensivo urgente y sulfato de magnesio para prevenir convulsiones.", tags: ["Preeclampsia", "HELLP"] }),
  createCase({ id: 43018, series: "CB-021-PREECLAMPSIA", specialty: "Gineco-obstetricia", difficulty: 5, caseText: preeclampsiaCase, question: "Mientras se prepara la estabilización materna y la finalización del embarazo, ¿qué fármaco reduce el riesgo de eclampsia?", choices: [
    { text: "Sulfato de magnesio", feedback: "Correcta. Es el anticonvulsivante de elección para prevención y tratamiento de eclampsia en preeclampsia con datos de severidad.", correct: true },
    { text: "Furosemida rutinaria", feedback: "No previene convulsiones y puede empeorar la depleción intravascular si se usa sin indicación de edema pulmonar.", correct: false },
    { text: "Dexametasona para normalizar plaquetas maternas", feedback: "No sustituye la estabilización ni la finalización obstétrica; el beneficio para plaquetas maternas no define el manejo urgente.", correct: false },
    { text: "Warfarina", feedback: "No trata el mecanismo de preeclampsia y está contraindicada durante embarazo.", correct: false },
  ], explanation: "El sulfato de magnesio previene recurrencia convulsiva y eclampsia. Vigila reflejos, frecuencia respiratoria y diuresis; el antídoto de toxicidad clínicamente relevante es gluconato de calcio. Punto clave: controlar la TA grave y prevenir convulsiones son medidas paralelas, no alternativas.", tags: ["Preeclampsia", "Sulfato de magnesio"] }),
  createCase({ id: 43019, series: "CB-021-PREECLAMPSIA", specialty: "Gineco-obstetricia", difficulty: 5, caseText: preeclampsiaCase, question: "¿Cuál es la conducta definitiva una vez estabilizada la madre?", choices: [
    { text: "Continuar vigilancia expectante indefinida hasta término", feedback: "A las 31 semanas puede considerarse una ventana breve solo en centros expertos y pacientes muy seleccionadas, pero la inestabilidad o deterioro materno obliga a finalizar.", correct: false },
    { text: "Finalizar el embarazo tras estabilización materna y valoración obstétrica-neonatal", feedback: "Correcta. La finalización es el tratamiento definitivo; el momento y vía se individualizan según estabilidad materno-fetal, edad gestacional y condiciones cervicales.", correct: true },
    { text: "Suspender toda medicación y repetir laboratorios en una semana", feedback: "Ignora hipertensión grave, síntomas y disfunción multiorgánica con riesgo de eclampsia, HIC y complicaciones fetales.", correct: false },
    { text: "Indicar inhibidor de la ECA", feedback: "No es tratamiento obstétrico definitivo y está contraindicado en embarazo.", correct: false },
  ], explanation: "La única cura de la preeclampsia es la finalización del embarazo y la placenta. Punto clave: el manejo expectante antes de 34 semanas solo es posible si madre y feto están estables; la severidad progresiva rompe esa condición.", tags: ["Preeclampsia", "Finalización del embarazo"] }),
  createCase({ id: 43020, series: "CB-021-PREECLAMPSIA", specialty: "Gineco-obstetricia", difficulty: 4, caseText: preeclampsiaCase, question: "¿Cuál complicación materna debe vigilarse de forma inmediata ante cefalea refractaria y TA grave?", choices: [
    { text: "Hemorragia intracraneal", feedback: "Correcta. La hipertensión grave y el compromiso neurológico aumentan el riesgo de evento cerebrovascular, incluida hemorragia intracraneal.", correct: true },
    { text: "Hipertiroidismo autoinmune", feedback: "No explica la urgencia ni se relaciona con la descompensación hipertensiva aguda.", correct: false },
    { text: "Peritonitis bacteriana espontánea", feedback: "Ocurre en ascitis cirrótica y no deriva de este síndrome obstétrico.", correct: false },
    { text: "Miocardiopatía hipertrófica", feedback: "No es una complicación inmediata típica de preeclampsia grave.", correct: false },
  ], explanation: "La evaluación debe buscar eclampsia, edema pulmonar, insuficiencia renal, DPPNI, CID y evento cerebrovascular. Punto clave: la cefalea persistente, síntomas visuales y epigastralgia no son molestias menores; son señales de daño de órgano blanco.", tags: ["Preeclampsia", "Complicaciones"] }),
];

export default correctedBankCompletionCases;
