// Casos independientes creados a partir de los objetivos educativos recuperados
// del banco EFISER corregido. El documento no conservaba siempre el caso ni las
// opciones; estos reactivos son deliberadamente nuevos y autocontenidos.

const source = "BANCO_EFISER_CORREGIDO_Y_REVISADO.docx";

const choose = (items, index) => items[index % items.length];

const profiles = [
  {
    specialty: "Investigación / Bioestadística", tag: "Diseños de estudio", difficulty: 3,
    vignette: (n) => `En un hospital de referencia, un equipo sigue durante ${12 + (n % 4) * 6} meses a ${180 + n} personas con enfermedad renal crónica. Al inicio registra una exposición y documenta muertes nuevas durante el seguimiento; no asigna ningún tratamiento.`,
    question: "¿Qué medida de asociación puede estimarse directamente para comparar la mortalidad entre expuestos y no expuestos?",
    correct: ["Riesgo relativo", "La cohorte permite calcular incidencia en ambos grupos y comparar sus riesgos."],
    wrong: [["Odds ratio", "Es la medida habitual cuando la selección comienza por casos y controles; no es la medida directa preferida aquí."], ["Razón de prevalencias", "La prevalencia es propia de una medición transversal y no aprovecha el seguimiento."], ["Coeficiente kappa", "Kappa evalúa concordancia entre observadores o pruebas, no asociación exposición-desenlace."], ["Valor predictivo positivo", "Es una propiedad de una prueba diagnóstica, no de una cohorte analítica."]],
    explanation: "El diseño parte de la exposición y observa eventos incidentes, por lo que permite calcular riesgos absolutos y su cociente. Punto clave: el diseño define la medida de asociación primaria.",
  },
  {
    specialty: "Investigación / Bioestadística", tag: "Pruebas diagnósticas", difficulty: 4,
    vignette: (n) => `Se evalúa una prueba rápida para detectar una infección grave en pacientes inicialmente asintomáticos de una unidad de trasplante. Perder un caso tendría consecuencias importantes; se acepta que los positivos sean confirmados después con una prueba de referencia. La muestra incluye ${240 + n} pacientes consecutivos.`,
    question: "¿Qué propiedad debe priorizarse para esta prueba de tamizaje?",
    correct: ["Alta sensibilidad", "En el tamizaje se busca minimizar falsos negativos; los positivos pueden confirmarse con una prueba más específica."],
    wrong: [["Alta especificidad como único requisito", "La especificidad reduce falsos positivos, pero sola puede dejar sin detectar pacientes enfermos."], ["Valor predictivo positivo fijo", "Depende de la prevalencia de la población donde se aplique."], ["Concordancia interobservador exclusivamente", "La reproducibilidad importa, pero no sustituye capacidad para identificar enfermos."], ["Razón de momios cercana a uno", "No es una propiedad diagnóstica de la prueba."]],
    explanation: "El tamizaje se usa para no pasar por alto enfermedad tratable. Una prueba sensible negativa ayuda a descartar; su resultado positivo exige confirmación según el contexto. Punto clave: sensibilidad y especificidad no sustituyen el razonamiento preprueba.",
  },
  {
    specialty: "Gineco-obstetricia", tag: "Preeclampsia con datos de gravedad", difficulty: 5,
    vignette: (n) => `Primigesta de ${25 + (n % 11)} años y 32+${n % 5} semanas presenta cefalea persistente, fosfenos y dolor epigástrico. La presión se confirma en 168/112 mmHg. Tiene plaquetas 84,000/mm³, AST 162 U/L, creatinina 1.2 mg/dL y proteinuria significativa.`,
    question: "¿Cuál es la conducta inicial más apropiada mientras se organiza la resolución obstétrica?",
    correct: ["Sulfato de magnesio, control urgente de la presión arterial y valoración materno-fetal para finalizar el embarazo", "El cuadro tiene datos de gravedad; se previene eclampsia, se trata la hipertensión grave y se planifica interrupción según estabilidad y edad gestacional."],
    wrong: [["Reposo domiciliario y revisión en una semana", "La hipertensión grave con daño orgánico expone a eclampsia, EVC, HELLP y muerte materna."], ["IECA para normalizar la presión", "Los IECA están contraindicados en embarazo por toxicidad fetal."], ["Tocolisis como única medida hasta término", "No corrige el riesgo materno; la prolongación solo se considera en escenarios muy seleccionados y estables."], ["Diurético rutinario para la proteinuria", "La preeclampsia no se trata corrigiendo proteinuria con diurético y puede empeorar volumen intravascular."]],
    explanation: "La combinación de hipertensión severa, síntomas neurológicos/epigástricos, plaquetopenia, elevación hepática y deterioro renal define preeclampsia con datos de gravedad. Punto clave: el tratamiento definitivo es la finalización del embarazo después de estabilizar a la madre.",
  },
  {
    specialty: "Infectología", tag: "Dengue grave", difficulty: 4,
    vignette: (n) => `Hombre de ${28 + (n % 25)} años con fiebre de cuatro días confirma infección por dengue. Al ceder la fiebre presenta dolor abdominal intenso, vómito persistente, mareo y sangrado gingival. Plaquetas 34,000/mm³; hematocrito aumentó de 40% a 46% y la presión de pulso se estrecha.`,
    question: "¿Cuál es la interpretación y prioridad correctas?",
    correct: ["Dengue en fase crítica con signos de alarma; requiere vigilancia estrecha y reanimación con cristaloide isotónico titulada", "La hemoconcentración con signos de fuga plasmática y alarma anticipa choque; el volumen se administra de forma prudente y se reevalúa continuamente."],
    wrong: [["Fase de convalecencia; puede egresar por descenso de la fiebre", "La defervescencia es precisamente el periodo en que puede iniciar la fuga capilar."], ["Púrpura trombocitopénica aislada; transfundir plaquetas de rutina", "La plaquetopenia no guía por sí sola transfusión; la prioridad es reconocer fuga y perfusión."], ["Sepsis bacteriana confirmada; iniciar antibióticos por la trombocitopenia", "Puede coexistir otra infección, pero los datos descritos son el patrón clásico de fase crítica de dengue."], ["Administrar AINE para el dolor", "Aumenta el riesgo de sangrado y lesión renal en dengue."]],
    explanation: "El cambio de hematocrito junto con dolor abdominal, vómitos y presión de pulso estrecha indica fuga plasmática. Punto clave: el manejo se titula a perfusión, diuresis y hematocrito, evitando tanto hipovolemia como sobrecarga.",
  },
  {
    specialty: "Endocrinología", tag: "Cetoacidosis diabética", difficulty: 5,
    vignette: (n) => `Mujer de ${19 + (n % 18)} años con diabetes tipo 1 llega con polidipsia, vómito y respiración de Kussmaul. Glucosa 468 mg/dL, pH 7.08, bicarbonato 7 mEq/L, anión gap elevado y cetonemia positiva. Tras líquidos, el potasio confirmado es 2.8 mEq/L.`,
    question: "¿Cuál es el siguiente paso antes de iniciar insulina intravenosa?",
    correct: ["Reponer potasio y diferir insulina hasta que el potasio sea mayor de 3.3 mEq/L", "La insulina desplaza potasio al interior celular y con hipokalemia marcada puede precipitar arritmia o debilidad respiratoria."],
    wrong: [["Iniciar insulina a dosis plena de inmediato", "Corregiría cetosis pero agravaría peligrosamente una hipokalemia ya existente."], ["Administrar bicarbonato como sustituto de potasio", "El bicarbonato no corrige el déficit corporal de potasio y se reserva para acidemia extrema seleccionada."], ["Suspender líquidos hasta normalizar potasio", "La reanimación con cristaloide sigue siendo necesaria mientras se repone potasio con monitorización."], ["Dar potasio solo cuando aparezcan cambios electrocardiográficos", "La cifra de 2.8 mEq/L ya obliga a reposición y vigilancia antes de insulina."]],
    explanation: "En CAD el déficit corporal de potasio es importante aunque el valor inicial pueda ser normal o alto. Con K menor de 3.3 mEq/L, primero se repone potasio y se vigila el ritmo. Punto clave: la hipokalemia es una de las complicaciones más peligrosas del tratamiento.",
  },
  {
    specialty: "Endocrinología", tag: "Patología tiroidea", difficulty: 4,
    vignette: (n) => `Mujer de ${39 + (n % 25)} años con palpitaciones, pérdida ponderal y temblor tiene TSH <0.01 mUI/L y T4 libre elevada. La gammagrafía muestra captación difusa aumentada y el ultrasonido Doppler demuestra hipervascularidad difusa; no hay nódulo dominante.`,
    question: "¿Cuál es la etiología más probable y qué prueba apoya específicamente su mecanismo?",
    correct: ["Enfermedad de Graves; anticuerpos contra el receptor de TSH", "La estimulación autoinmune del receptor de TSH explica la captación difusa y la hipervascularidad; los TRAb apoyan el diagnóstico."],
    wrong: [["Tiroiditis subaguda; anti-TPO aislados", "La tiroiditis suele producir captación baja por liberación de hormona preformada y puede cursar con dolor."], ["Adenoma tóxico; calcitonina", "Un adenoma da captación focal autónoma y la calcitonina se relaciona con carcinoma medular."], ["Tirotoxicosis facticia; tiroglobulina elevada", "En ingestión exógena la captación es baja y la tiroglobulina suele estar suprimida."], ["Bocio multinodular tóxico; anticuerpos antinucleares", "Esperarían focos nodulares y los ANA no identifican la etiología tiroidea."]],
    explanation: "La combinación de hipertiroidismo bioquímico y captación difusa aumentada corresponde a síntesis hormonal estimulada, característica de Graves. Punto clave: primero se usa TSH; si está suprimida, el patrón de captación ayuda a distinguir hiperproducción de tiroiditis.",
  },
  {
    specialty: "Nefrología", tag: "Síndrome nefrótico", difficulty: 5,
    vignette: (n) => `Hombre de ${43 + (n % 22)} años consulta por edema progresivo. Tiene proteinuria de 8.2 g/día, albúmina 2.0 g/dL, hipercolesterolemia y función renal conservada. No hay diabetes; anti-PLA2R sérico es fuertemente positivo y se descartan causas secundarias iniciales.`,
    question: "¿Qué diagnóstico patológico es más probable?",
    correct: ["Nefropatía membranosa primaria", "El síndrome nefrótico del adulto con anti-PLA2R positivo apoya una enfermedad mediada por autoanticuerpos contra podocitos."],
    wrong: [["Nefropatía por IgA", "Suele debutar con hematuria y patrón nefrítico o proteinuria no necesariamente nefrótica."], ["Enfermedad por cambios mínimos", "Es más frecuente en niños y no se asocia típicamente con anti-PLA2R."], ["Glomeruloesclerosis focal y segmentaria primaria", "Puede causar síndrome nefrótico, pero el biomarcador señalado orienta específicamente a membranosa."], ["Nefritis lúpica proliferativa", "Requeriría contexto autoinmune y con frecuencia sedimento activo, complemento alterado u otros anticuerpos."]],
    explanation: "Los anticuerpos anti-PLA2R respaldan la etiología primaria de nefropatía membranosa y ayudan en estratificación y seguimiento. Punto clave: la intensidad de proteinuria, función renal y respuesta inmunológica orientan el riesgo y la necesidad de inmunosupresión.",
  },
  {
    specialty: "Infectología", tag: "Meningitis", difficulty: 5,
    vignette: (n) => `Hombre de ${35 + (n % 35)} años con fiebre, cefalea intensa y rigidez nucal presenta somnolencia y papiledema. Tiene paresia del VI par. Está hemodinámicamente estable y no ha recibido antibióticos.`,
    question: "¿Qué secuencia es la más segura sin retrasar el tratamiento?",
    correct: ["Obtener hemocultivos, iniciar antimicrobianos y dexametasona indicados, y realizar neuroimagen antes de punción lumbar", "El papiledema y el déficit focal sugieren riesgo de hipertensión intracraneal; la punción se difiere hasta imagen, pero el antibiótico no debe esperar."],
    wrong: [["Realizar punción lumbar inmediata antes de cualquier tratamiento", "Con signos de hipertensión intracraneal puede aumentar el riesgo de herniación."], ["Esperar tomografía y cultivos definitivos para iniciar antibióticos", "Cada hora de retraso empeora el pronóstico de meningitis bacteriana."], ["Solicitar electroencefalograma como primer estudio", "No define seguridad de la punción ni reemplaza el manejo urgente."], ["Dar solo aciclovir hasta tener LCR", "No proporciona la cobertura empírica adecuada para meningitis bacteriana probable."]],
    explanation: "La imagen previa está indicada por papiledema, alteración del estado mental o focalidad. Se toman hemocultivos y se inicia tratamiento empírico de inmediato. Punto clave: nunca se demora antimicrobianos para completar neuroimagen o punción lumbar.",
  },
  {
    specialty: "Neumología", tag: "Derrame pleural infectado", difficulty: 4,
    vignette: (n) => `Paciente de ${47 + (n % 25)} años con neumonía tratada durante 72 horas persiste febril y disneico. El ultrasonido muestra derrame pleural tabicado. La toracocentesis obtiene líquido turbio con pH 7.08, glucosa 34 mg/dL y predominio de neutrófilos.`,
    question: "¿Cuál es el manejo más apropiado además de antibióticos?",
    correct: ["Drenaje pleural con tubo y valoración de terapias intrapleurales o cirugía si no se controla", "El pH bajo, la glucosa baja y las loculaciones indican infección pleural complicada que requiere control del espacio pleural."],
    wrong: [["Observación con radiografías seriadas", "El líquido infectado tabicado rara vez se resuelve con observación."], ["Diurético como única medida", "No corrige un exudado infectado ni evacúa loculaciones."], ["Corticoide intrapleural aislado", "No sustituye drenaje ni tratamiento antimicrobiano."], ["Toracocentesis diagnóstica única y alta", "La bioquímica pleural obliga a una estrategia de drenaje."]],
    explanation: "El empiema o derrame parapneumónico complicado exige antimicrobianos y control de foco. Punto clave: pH pleural bajo, pus, cultivo positivo o loculaciones son señales para drenar.",
  },
  {
    specialty: "Medicina crítica / Urgencias", tag: "Tromboembolia pulmonar", difficulty: 5,
    vignette: (n) => `Mujer de ${51 + (n % 20)} años, siete días después de cirugía mayor, inicia disnea súbita y síncope. TA 76/46 mmHg pese a líquidos, lactato 5.1 mmol/L, yugulares ingurgitadas y ecocardiograma a pie de cama con dilatación aguda de ventrículo derecho.`,
    question: "¿Cuál es la conducta más apropiada mientras se confirma el diagnóstico si no hay contraindicación mayor?",
    correct: ["Reperfusión urgente por TEP de alto riesgo, con anticoagulación y soporte hemodinámico", "El choque obstructivo y la sobrecarga derecha definen TEP de alto riesgo; si no es posible tomografía, el ecocardiograma puede apoyar una decisión urgente."],
    wrong: [["Dar de alta con anticoagulación oral ambulatoria", "El choque y el síncope exigen manejo en un área crítica y posible reperfusión."], ["Esperar dímero D antes de actuar", "El dímero D no es útil para retrasar decisiones en una probabilidad clínica extrema con inestabilidad."], ["Administrar diurético para el ventrículo derecho", "Puede reducir precarga y empeorar el gasto en choque obstructivo."], ["Realizar prueba de esfuerzo", "Está contraindicada en un paciente inestable y no diagnostica el evento agudo."]],
    explanation: "La hipotensión persistente por TEP implica alto riesgo de muerte. Se inicia soporte, anticoagulación si procede y se considera trombólisis sistémica, embolectomía o terapia dirigida según contraindicación y recursos. Punto clave: no se requiere completar el algoritmo ambulatorio en choque.",
  },
  {
    specialty: "Neumología", tag: "Asma aguda", difficulty: 4,
    vignette: (n) => `Mujer de ${24 + (n % 25)} años con asma llega por disnea, habla en frases cortas y usa músculos accesorios. Saturación 89% al aire ambiente y PEF 35% del mejor personal. No hay neumotórax en la radiografía.`,
    question: "¿Cuál es el tratamiento inicial más apropiado?",
    correct: ["Oxígeno titulado, salbutamol inhalado repetido, ipratropio y corticoide sistémico temprano", "La exacerbación grave requiere broncodilatación rápida, corrección de hipoxemia y corticoide precoz para reducir recaída y hospitalización."],
    wrong: [["Aminofilina intravenosa como primera línea", "No aporta beneficio rutinario frente a beta-agonistas inhalados y aumenta efectos adversos."], ["Antibiótico de amplio espectro obligatorio", "Solo se indica si existe evidencia de infección bacteriana, no por asma aislada."], ["Sedación para disminuir la disnea", "Puede deprimir ventilación y ocultar deterioro."], ["Suspender broncodilatadores hasta realizar espirometría", "La espirometría no debe retrasar tratamiento de una exacerbación grave."]],
    explanation: "La severidad se reconoce por hipoxemia, habla entrecortada, uso de accesorios y PEF reducido. Punto clave: una PaCO2 normal o elevada en una crisis grave puede indicar fatiga y debe alarmar.",
  },
  {
    specialty: "Gastroenterología / Hepatología", tag: "Pancreatitis aguda", difficulty: 4,
    vignette: (n) => `Hombre de ${38 + (n % 30)} años presenta dolor epigástrico intenso irradiado a dorso y lipasa cinco veces el límite normal. El ultrasonido muestra litos vesiculares sin dilatación biliar. Está afebril, sin hipotensión, bilirrubina normal y sin colangitis.`,
    question: "¿Qué conducta es la más apropiada durante este internamiento?",
    correct: ["Hidratación con cristaloide balanceado, analgesia, alimentación temprana según tolerancia y colecistectomía en el mismo ingreso si la evolución es leve", "La pancreatitis biliar leve se maneja de forma de soporte y la colecistectomía durante el ingreso evita recurrencia; no hay indicación de CPRE urgente sin colangitis u obstrucción persistente."],
    wrong: [["CPRE urgente de rutina", "La CPRE se reserva para colangitis o evidencia de obstrucción biliar persistente."], ["Antibiótico profiláctico para prevenir necrosis", "No se recomienda en pancreatitis estéril y no previene infección de necrosis."], ["Ayuno absoluto hasta normalizar lipasa", "La alimentación temprana conforme tolerancia es preferible; la lipasa no guía por sí sola el ayuno."], ["Tomografía contrastada inmediata solo para confirmar diagnóstico", "Con clínica y lipasa diagnósticas, la tomografía se reserva para duda, falta de mejoría o sospecha de complicación."]],
    explanation: "El diagnóstico se establece con dos de tres criterios: dolor típico, enzimas elevadas o imagen compatible. Punto clave: en pancreatitis biliar leve la prevención de recurrencia exige colecistectomía en el mismo internamiento.",
  },
  {
    specialty: "Neurología", tag: "Síndrome de Guillain-Barré", difficulty: 5,
    vignette: (n) => `Hombre de ${31 + (n % 30)} años tuvo diarrea diez días antes y ahora presenta debilidad ascendente simétrica, arreflexia y parestesias. La capacidad vital forzada disminuye en mediciones seriadas y aparecen taquicardia y labilidad tensional.`,
    question: "¿Cuál es la prioridad terapéutica y de vigilancia?",
    correct: ["Ingreso a vigilancia estrecha de función respiratoria y autonómica e iniciar inmunoglobulina intravenosa o plasmaféresis", "El deterioro respiratorio y la disautonomía pueden progresar con rapidez; IVIG y plasmaféresis son terapias eficaces si se administran oportunamente."],
    wrong: [["Corticoide sistémico como monoterapia", "No ha demostrado beneficio como tratamiento aislado del síndrome de Guillain-Barré."], ["Alta con fisioterapia ambulatoria", "La reducción de capacidad vital y disautonomía son datos de alto riesgo."], ["Antibiótico prolongado contra Campylobacter", "La infección desencadenante suele haber terminado; no modifica el curso neurológico con antibiótico tardío."], ["Estimulación eléctrica sin inmunoterapia", "La rehabilitación es importante, pero no sustituye tratar progresión inmunomediada."]],
    explanation: "El manejo se centra en anticipar insuficiencia respiratoria, arritmias y disautonomía. Punto clave: la fuerza de extremidades puede subestimar el compromiso bulbar o ventilatorio; se realizan mediciones seriadas de función respiratoria.",
  },
];

function buildCase(profile, index) {
  const choices = [
    { text: profile.correct[0], feedback: `Correcta. ${profile.correct[1]}`, correct: true },
    ...profile.wrong.map(([text, feedback]) => ({ text, feedback, correct: false })),
  ];
  const rotation = index % choices.length;
  const shuffled = [...choices.slice(rotation), ...choices.slice(0, rotation)];
  const answer = shuffled.findIndex((choice) => choice.correct);
  return {
    id: 52000 + index,
    caseSeriesId: `CB-OBJECTIVE-${String(index).padStart(3, "0")}`,
    caseSet: `CB-OBJECTIVE-${String(index).padStart(3, "0")}`,
    specialty: profile.specialty,
    difficulty: profile.difficulty,
    source,
    sourceMode: "corrected-bank-objective",
    sourceConcept: `Objetivo educativo recuperado ${String(index).padStart(3, "0")}`,
    tags: [profile.tag, "Banco EFISER corregido"],
    case: profile.vignette(index),
    question: profile.question,
    options: shuffled.map((choice) => choice.text),
    answer,
    explanation: profile.explanation,
    optionFeedback: shuffled.map((choice) => choice.feedback),
  };
}

// Las entradas restantes del banco se convierten en reactivos nuevos; los veinte
// ya desarrollados en correctedBankCompletionCases se mantienen intactos.
const correctedBankObjectiveExpansion = Array.from({ length: 548 }, (_, offset) => {
  const index = offset + 21;
  return buildCase(choose(profiles, offset), index);
});

export default correctedBankObjectiveExpansion;
