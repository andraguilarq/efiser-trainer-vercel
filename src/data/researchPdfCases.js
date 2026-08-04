const makeCase = (id, caseSet, step, title, caseText, question, options, answer, explanation, optionFeedback, tags, sourceMode = "documento") => ({
  id,
  caseSet,
  step,
  specialty: "Investigación y estadística",
  difficulty: sourceMode === "nuevo" ? 5 : 4,
  sourceMode,
  tags,
  title,
  case: caseText,
  question,
  options,
  answer,
  explanation,
  optionFeedback,
});

const cohortMen = "Se siguieron 708 hombres mayores de 40 años entre 2010 y 2020. Los participantes fueron seleccionados aleatoriamente dentro de los estratos de edad 40–50, 51–60, 61–70, 71–80 y ≥81 años. Al inicio se documentaron variables clínico-epidemiológicas y síndrome metabólico; durante el seguimiento se registró mortalidad cardiovascular.";
const covidCharts = "Se revisarán los expedientes de pacientes atendidos por COVID-19 durante 2020–2021 para relacionar características clínicas con comorbilidades preexistentes. No habrá contacto con los pacientes y los investigadores extraerán la información del archivo clínico.";
const postop = "Se desea calcular la prevalencia de complicaciones postoperatorias inmediatas después de cirugía intracraneal. En todos los pacientes que ingresen desde quirófano a UCI se registrarán prospectivamente variables hemodinámicas y metabólicas a la primera, cuarta, octava y duodécima horas.";
const diet = "Un protocolo evaluará la relación entre un régimen dietético indicado por nutrición y la hemoglobina glucosilada después de seis meses. Se registrarán sexo, edad, peso, talla e IMC clasificado como bajo peso, normal, sobrepeso y obesidad grados I, II o III.";
const pediatric = "Un ensayo en niños mayores de 8 años comparará morfina más ketorolaco contra buprenorfina más ketorolaco para dolor posterior a cirugía ortopédica. Los fármacos se administrarán por vía intravenosa a dosis habituales y el dolor se medirá con escala visual análoga a las 4 horas.";

const imported = [
  makeCase(21001,"PDF-MUESTREO",1,"Muestreo por estratos",cohortMen,"¿Qué método de muestreo se utilizó?",["Aleatorio estratificado por edad","Aleatorio simple","Casos consecutivos","Conveniencia"],0,"La población se dividió primero en estratos definidos por edad y después se seleccionó aleatoriamente dentro de cada estrato. Este método garantiza representación de todos los grupos etarios y permite estimaciones por estrato.",[
    "Correcta. El rasgo definitorio es la selección aleatoria dentro de grupos previamente formados por edad.",
    "En el muestreo aleatorio simple todos se seleccionan de una sola lista, sin asegurar representación de cada rango etario.",
    "Los casos consecutivos se incluyen conforme aparecen y no implican selección aleatoria.",
    "El muestreo por conveniencia depende de accesibilidad y no de un mecanismo probabilístico."
  ],["Muestreo","Estratificado"]),
  makeCase(21002,"PDF-MUESTREO",2,"Diseño con seguimiento",cohortMen,"¿Cómo se clasifica el diseño principal del estudio?",["Casos y controles","Ensayo clínico","Estudio transversal","Cohorte"],3,"Los participantes se clasifican al inicio y se observan a lo largo del tiempo para detectar mortalidad cardiovascular. La dirección exposición→desenlace y la medición de incidencia corresponden a una cohorte.",[
    "Casos y controles inicia seleccionando por desenlace y reconstruye exposiciones previas; aquí todos entran antes de conocer el desenlace.",
    "No existe asignación de una intervención, por lo que no es un ensayo.",
    "Un transversal mide exposición y desenlace en un solo momento y no estima adecuadamente incidencia.",
    "Correcta. Es una cohorte longitudinal con seguimiento de eventos."
  ],["Diseños","Cohorte"]),
  makeCase(21003,"PDF-MUESTREO",3,"Tamaño de muestra",cohortMen,"Si el objetivo primario fuera estimar la proporción de hombres con síndrome metabólico al inicio, ¿qué fórmula de tamaño de muestra corresponde?",["Estimación de una proporción","Comparación de dos proporciones","Estimación de una media","Coeficiente de correlación"],0,"Cuando el parámetro de interés es una prevalencia se calcula el tamaño para estimar una sola proporción, incorporando proporción esperada, precisión deseada, confianza y, cuando proceda, tamaño de población y efecto de diseño.",[
    "Correcta. La prevalencia es una proporción única.",
    "Comparar dos proporciones exige dos grupos y una diferencia clínicamente relevante entre ellos.",
    "La fórmula para una media requiere una variable cuantitativa y una desviación estándar esperada.",
    "La correlación se usa cuando el objetivo es cuantificar asociación lineal entre dos variables continuas."
  ],["Tamaño de muestra","Prevalencia"]),
  makeCase(21004,"PDF-MUESTREO",4,"Selección de la prueba",cohortMen,"Antes de elegir una prueba estadística, ¿qué información es indispensable?",["El tipo de variables, número de grupos y distribución de los datos","Únicamente el valor de p esperado","Solo el tamaño total de la muestra","La revista en la que se publicará"],0,"La prueba depende de la escala de medición, independencia o pareamiento, número de grupos, forma de la distribución y objetivo del análisis. Estos elementos se definen antes de calcular significación.",[
    "Correcta. Es la secuencia lógica para escoger una prueba válida.",
    "El valor de p es resultado del análisis y no debe utilizarse para escogerlo a posteriori.",
    "El tamaño influye en potencia y aproximaciones, pero por sí solo no identifica la prueba adecuada.",
    "La revista no determina el método estadístico."
  ],["Pruebas estadísticas","Distribución"]),
  makeCase(21005,"PDF-MUESTREO",5,"Modelo para mortalidad",cohortMen,"Si se desea estimar la asociación ajustada entre síndrome metabólico y tiempo hasta muerte cardiovascular, ¿cuál análisis es el más apropiado?",["Regresión lineal simple","Modelo de riesgos proporcionales de Cox","Prueba t pareada","Coeficiente kappa"],1,"Existe un desenlace de tiempo a evento, duración variable de seguimiento y posible censura. Cox estima hazard ratios ajustados, siempre que se valore el supuesto de riesgos proporcionales.",[
    "La regresión lineal no maneja adecuadamente censura ni la distribución del tiempo a evento.",
    "Correcta. Integra tiempo, evento, censura y covariables.",
    "La t pareada compara medias de dos mediciones relacionadas; no analiza supervivencia.",
    "Kappa cuantifica concordancia entre clasificaciones categóricas."
  ],["Supervivencia","Cox"]),

  makeCase(21006,"PDF-ETICA",1,"Riesgo de revisión documental",covidCharts,"¿Cómo se clasifica, en principio, el riesgo de este estudio?",["Sin riesgo","Riesgo mínimo","Mayor que el mínimo","Ensayo de alto riesgo"],0,"La revisión retrospectiva de expedientes, sin intervención ni contacto y con protección de datos, se clasifica habitualmente como investigación sin riesgo. Eso no elimina la revisión ética ni las obligaciones de confidencialidad.",[
    "Correcta. No se modifica intencionalmente ninguna variable biológica, fisiológica, psicológica o social.",
    "Riesgo mínimo implicaría procedimientos prospectivos comparables con exploraciones habituales, lo que no se describe.",
    "No hay intervención farmacológica, invasiva o conductual que justifique mayor riesgo.",
    "No existe asignación experimental."
  ],["Ética","Riesgo"]),
  makeCase(21007,"PDF-ETICA",2,"Excepción de consentimiento",covidCharts,"¿Qué documento debe solicitarse si resulta impracticable contactar a todos los pacientes y el comité considera que la dispensa es éticamente admisible?",["Asentimiento del menor","Excepción o dispensa de consentimiento informado","Consentimiento para procedimiento quirúrgico","Ningún documento ni revisión"],1,"La dispensa debe justificarse y ser autorizada por el comité; no la decide unilateralmente el investigador. Debe demostrarse riesgo bajo, imposibilidad práctica y protección estricta de privacidad.",[
    "El asentimiento corresponde a menores capaces de comprender una investigación prospectiva.",
    "Correcta. La excepción formal sustituye el contacto individual solo tras evaluación ética.",
    "El consentimiento asistencial no autoriza automáticamente el uso de información para investigación.",
    "Los estudios documentales siguen requiriendo protocolo, revisión y manejo seguro de datos."
  ],["Consentimiento","Expedientes"]),
  makeCase(21008,"PDF-ETICA",3,"Datos identificables",covidCharts,"¿Qué información puede extraerse de manera congruente con el protocolo aprobado?",["Cualquier dato disponible porque ya existe en el expediente","Solo las variables autorizadas, minimizando identificadores y preservando confidencialidad","Nombre completo para facilitar la publicación","Imágenes adicionales aunque no estén contempladas"],1,"La minimización de datos exige recolectar únicamente lo necesario para los objetivos autorizados. Los identificadores deben omitirse, codificarse o separarse y protegerse conforme al protocolo.",[
    "La existencia previa del dato no elimina la privacidad ni amplía el alcance autorizado.",
    "Correcta. Propósito, minimización y seguridad delimitan la extracción.",
    "Los nombres no deben incorporarse a la base analítica salvo necesidad excepcional y justificada.",
    "Usar información no prevista requiere una modificación aprobada."
  ],["Confidencialidad","Minimización"]),
  makeCase(21009,"PDF-ETICA",4,"Enmienda al protocolo",covidCharts+" Tras iniciar el estudio, el equipo descubre un archivo radiológico y desea analizar todas las imágenes disponibles, aunque esta fuente no figuraba en el protocolo aprobado.","¿Cuál es la conducta correcta?",["Extraerlas sin notificar porque permanecen en el hospital","Solicitar autorización verbal al jefe de archivo","Presentar una enmienda a los comités antes de utilizar esa nueva fuente","Analizarlas y avisar al finalizar"],2,"Agregar una fuente, variables o procedimientos cambia el protocolo. La enmienda debe describir finalidad, acceso, privacidad y análisis, y aprobarse antes de implementar el cambio, salvo medidas urgentes de seguridad.",[
    "La localización institucional no sustituye la aprobación ética.",
    "La autorización administrativa puede ser necesaria, pero no reemplaza la evaluación de la enmienda.",
    "Correcta. El estudio debe conducirse conforme a la versión vigente aprobada.",
    "La aprobación retrospectiva no corrige una desviación planificada."
  ],["Enmiendas","Comités"]),
  makeCase(21010,"PDF-ETICA",5,"Instrumento de recolección",covidCharts,"¿Cuál es la mejor práctica para registrar la información?",["Una hoja de recolección definida y aprobada, con acceso limitado al equipo autorizado","Notas libres de cualquier empleado del hospital","Una hoja no controlada que cambie durante el estudio","Copiar expedientes completos a dispositivos personales"],0,"El instrumento debe corresponder al diccionario de variables, conservar trazabilidad y someterse con el protocolo. El acceso se limita al personal autorizado y la base debe protegerse y respaldarse.",[
    "Correcta. Estandariza la captura y reduce errores, datos innecesarios y accesos indebidos.",
    "Solo el equipo autorizado y capacitado puede manejar datos de investigación.",
    "Los cambios no controlados comprometen comparabilidad y requieren documentarse.",
    "Los dispositivos personales elevan el riesgo de pérdida y divulgación."
  ],["Recolección","Calidad de datos"]),

  makeCase(21011,"PDF-DISENO",1,"Temporalidad del estudio",postop,"Según el momento de obtención de los datos, ¿cómo se clasifica el estudio?",["Prospectivo","Retrospectivo","Ambispectivo","Ecológico"],0,"Los pacientes se incorporan y las variables se registran hacia adelante conforme ocurren. La fuente puede ser una nota clínica, pero la temporalidad depende de cuándo se planea y obtiene la información.",[
    "Correcta. La medición se programa antes de que ocurran los desenlaces.",
    "Retrospectivo implicaría que eventos y datos ya existieran al iniciar el protocolo.",
    "Ambispectivo combina una fase histórica y otra prospectiva, ausente aquí.",
    "Ecológico utiliza unidades grupales, no pacientes individuales."
  ],["Diseño","Prospectivo"]),
  makeCase(21012,"PDF-DISENO",2,"Número de mediciones",postop,"Por el número de ocasiones en que se miden las variables, el estudio es:",["Transversal","Longitudinal","Casos y controles","Cruzado"],1,"Cada paciente aporta mediciones repetidas durante 12 horas; por ello existe una dimensión temporal intraindividual y el diseño es longitudinal.",[
    "Transversal sería una sola medición o corte temporal por individuo.",
    "Correcta. Hay seguimiento y repetición de variables en los mismos pacientes.",
    "Casos y controles se define por selección basada en desenlace, no por número de mediciones.",
    "Un diseño cruzado asigna secuencias de intervenciones a los mismos participantes."
  ],["Diseño","Longitudinal"]),
  makeCase(21013,"PDF-DISENO",3,"Control de la exposición",postop,"Respecto al control del investigador sobre las variables, ¿cómo se clasifica?",["Experimental","Cuasiexperimental","Observacional","Ensayo pragmático"],2,"Los investigadores registran complicaciones sin asignar tratamiento ni modificar la atención. Por tanto, la exposición y los desenlaces se observan tal como ocurren.",[
    "Experimental exige asignación deliberada de una intervención.",
    "Cuasiexperimental introduce una intervención sin aleatorización completa.",
    "Correcta. No hay maniobra controlada por el investigador.",
    "Un ensayo pragmático sigue siendo experimental."
  ],["Diseño","Observacional"]),
  makeCase(21014,"PDF-DISENO",4,"Alcance del objetivo",postop,"Si el único objetivo es cuantificar la frecuencia de complicaciones sin comparar factores asociados, el alcance es:",["Descriptivo","Analítico","Predictivo","Experimental"],0,"El estudio caracteriza la frecuencia y distribución de un fenómeno en una población definida; no contrasta una exposición ni estima una relación causal.",[
    "Correcta. Describe cuánto y cuándo ocurre.",
    "Analítico requeriría comparar grupos o evaluar asociaciones.",
    "Predictivo exigiría desarrollar o validar un modelo de pronóstico.",
    "Experimental depende de intervención, que no existe."
  ],["Alcance","Descriptivo"]),
  makeCase(21015,"PDF-DISENO",5,"Enfoque metodológico",postop,"Por la naturaleza de los datos y el análisis propuesto, la investigación es:",["Cualitativa","Cuantitativa","Etnográfica","Fenomenológica"],1,"Se medirán frecuencias, signos vitales y variables metabólicas expresadas numéricamente; el análisis será cuantitativo.",[
    "La investigación cualitativa explora significados y experiencias mediante datos narrativos.",
    "Correcta. Utiliza mediciones numéricas y estimación estadística.",
    "La etnografía estudia prácticas culturales mediante inmersión en el campo.",
    "La fenomenología explora la experiencia vivida, no frecuencias clínicas."
  ],["Metodología","Cuantitativa"]),

  makeCase(21016,"PDF-VARIABLES",1,"Variable dependiente",diet,"¿Cuál es la variable dependiente principal?",["Régimen dietético","Meses de seguimiento","Hemoglobina glucosilada a seis meses","Sexo"],2,"La variable dependiente es el desenlace que se espera modificar como consecuencia del régimen dietético: la HbA1c medida al final del seguimiento.",[
    "El régimen es la exposición o variable independiente.",
    "El tiempo define el momento de evaluación, no el desenlace clínico principal.",
    "Correcta. Es el resultado sobre el que se evalúa el efecto de la dieta.",
    "El sexo es una covariable basal."
  ],["Variables","Desenlace"]),
  makeCase(21017,"PDF-VARIABLES",2,"Escala de HbA1c",diet,"Si la HbA1c se registra como porcentaje con decimales, ¿cómo se clasifica?",["Cualitativa nominal","Cuantitativa continua","Cualitativa ordinal","Dicotómica"],1,"La HbA1c puede adoptar numerosos valores numéricos dentro de un intervalo y las diferencias son interpretables; se analiza habitualmente como cuantitativa continua.",[
    "No son categorías sin orden.",
    "Correcta. Es una medición numérica en escala continua.",
    "Solo sería ordinal si se recodificara en categorías ordenadas.",
    "No se limita a dos valores."
  ],["Variables","Cuantitativa continua"]),
  makeCase(21018,"PDF-VARIABLES",3,"Categorías de IMC",diet,"Cuando el IMC se registra únicamente como bajo peso, normal, sobrepeso y obesidad I–III, ¿qué escala tiene?",["Nominal","Ordinal","Razón continua","Dicotómica"],1,"Las categorías poseen un orden natural de menor a mayor adiposidad, aunque las distancias entre categorías no son equivalentes; por ello son ordinales.",[
    "Nominal carece de jerarquía intrínseca.",
    "Correcta. Existe orden sin intervalos numéricos iguales.",
    "El IMC original en kg/m² es cuantitativo, pero aquí fue categorizado.",
    "Hay más de dos categorías."
  ],["Variables","Ordinal"]),
  makeCase(21019,"PDF-VARIABLES",4,"Definición operacional",diet+" El protocolo especifica báscula, ubicación, ropa del paciente, posición corporal, calibración y unidad de registro del peso.","¿Qué componente metodológico representa esa descripción?",["Definición conceptual","Definición operacional","Hipótesis nula","Criterio de eliminación"],1,"La definición operacional establece exactamente cómo se observará o medirá una variable para que el procedimiento sea reproducible y uniforme.",[
    "La definición conceptual explica qué significa peso desde el punto de vista teórico, sin detallar su medición.",
    "Correcta. Especifica instrumento, procedimiento y unidad.",
    "La hipótesis nula plantea ausencia de diferencia o asociación.",
    "Un criterio de eliminación indica cuándo retirar datos después de la inclusión."
  ],["Variables","Operacionalización"]),
  makeCase(21020,"PDF-VARIABLES",5,"Escala de talla",diet,"Si la talla se registra como 1.72 m, 1.68 m y otros valores con decimales, se trata de una variable:",["Cuantitativa discreta","Cualitativa ordinal","Cualitativa nominal","Cuantitativa continua"],3,"La talla puede adoptar cualquier valor dentro del rango permitido por la precisión del instrumento y tiene cero físico interpretable; es cuantitativa continua.",[
    "Las variables discretas son conteos con valores separados, como número de ingresos.",
    "No se está registrando en categorías ordenadas.",
    "No es una etiqueta cualitativa.",
    "Correcta. Es una medición continua en escala de razón."
  ],["Variables","Escalas"]),

  makeCase(21021,"PDF-ETICA-PED",1,"Riesgo en menores",pediatric,"¿Cómo se clasifica el riesgo del protocolo?",["Sin riesgo","Riesgo mínimo","Mayor que el mínimo","No es investigación"],2,"La administración comparativa de opioides intravenosos con fines de investigación puede causar depresión respiratoria, sedación y otros eventos relevantes; excede el riesgo mínimo aunque las dosis sean habituales.",[
    "Hay intervención farmacológica prospectiva.",
    "El riesgo mínimo no supera el de exploraciones rutinarias; los opioides IV tienen riesgos clínicos relevantes.",
    "Correcta. La intervención requiere vigilancia y justificación del balance riesgo-beneficio.",
    "La asignación comparativa sistemática constituye investigación."
  ],["Ética pediátrica","Riesgo"]),
  makeCase(21022,"PDF-ETICA-PED",2,"Permiso parental",pediatric,"¿Qué autorización es indispensable antes de incluir a un menor elegible?",["Consentimiento del menor como adulto","Permiso o consentimiento informado de padres o tutor legal","Solo autorización del cirujano","Dispensa automática porque los fármacos son habituales"],1,"El representante legal debe recibir información completa y otorgar permiso. Esto se complementa con el asentimiento del menor cuando su capacidad de comprensión lo permite.",[
    "El menor no sustituye por sí solo al representante legal, aunque debe participar en la decisión.",
    "Correcta. Es la autorización jurídica y ética requerida.",
    "El equipo asistencial no puede sustituir la decisión del representante.",
    "El uso clínico habitual no convierte la asignación investigacional en atención ordinaria."
  ],["Consentimiento","Menores"]),
  makeCase(21023,"PDF-ETICA-PED",3,"Asentimiento",pediatric,"Un niño de 11 años comprende el estudio y rechaza participar, aunque sus padres aceptan. ¿Qué conducta es más apropiada si el estudio no ofrece una intervención necesaria para salvar su vida?",["Incluirlo porque los padres firmaron","Respetar su negativa y no incluirlo","Sedarlo para completar el protocolo","Solicitar al investigador principal que firme por él"],1,"El asentimiento reconoce la capacidad progresiva del menor. En una investigación no terapéutica o sin beneficio indispensable, una negativa informada debe respetarse.",[
    "El permiso parental no anula automáticamente la objeción de un menor capaz de comprender.",
    "Correcta. Protege autonomía progresiva y voluntariedad.",
    "La sedación para vencer una negativa sería éticamente inadmisible.",
    "El investigador no puede representar al participante."
  ],["Asentimiento","Autonomía"]),
  makeCase(21024,"PDF-ETICA-PED",4,"Principio protegido",pediatric,"¿Qué principio ético se protege principalmente al solicitar y respetar el asentimiento?",["Autonomía","Justicia distributiva","No maleficencia exclusivamente","Validez externa"],0,"El asentimiento materializa la autonomía progresiva: informa al menor con lenguaje apropiado, verifica comprensión y toma en serio su voluntad.",[
    "Correcta. Es la expresión acorde con el desarrollo de la capacidad decisional.",
    "La justicia se refiere a selección equitativa y distribución de cargas y beneficios.",
    "La no maleficencia exige reducir daño, pero no es el fundamento principal del asentimiento.",
    "La validez externa es una propiedad metodológica."
  ],["Ética","Autonomía"]),
  makeCase(21025,"PDF-ETICA-PED",5,"Dictamen desfavorable",pediatric+" El comité ha solicitado en tres ocasiones correcciones sustanciales de seguridad y consentimiento. Los investigadores no las realizan.","¿Qué dictamen procede?",["Aprobación automática","No aprobado","Aprobación condicionada indefinida","Ejecución mientras se corrige"],1,"Si persisten deficiencias esenciales, el comité puede emitir no aprobado. La reiteración no genera derecho a aprobación y el protocolo no puede iniciar sin dictamen favorable.",[
    "Ningún número de revisiones produce aprobación automática.",
    "Correcta. No se han satisfecho requisitos éticos fundamentales.",
    "Una aprobación condicionada requiere correcciones concretas y verificables, no incumplimiento persistente.",
    "Iniciar antes de aprobar constituye una desviación grave."
  ],["Comité de ética","Dictamen"]),
];

const newCases = [
  makeCase(21101,"NUEVO-PRUEBAS",1,"Comparación de dos medianas","Un ensayo piloto compara estancia hospitalaria entre dos grupos independientes. La distribución es marcadamente asimétrica, existen valores extremos y el tamaño es de 24 pacientes por grupo.","¿Cuál prueba compara mejor la tendencia central entre los grupos?",["t de Student pareada","U de Mann–Whitney","ANOVA de medidas repetidas","McNemar"],1,"Para una variable cuantitativa asimétrica en dos grupos independientes, Mann–Whitney compara las distribuciones/rangos y evita asumir normalidad. Debe reportarse mediana y rango intercuartílico.",[
    "La t pareada requiere datos relacionados y, para inferencia sobre medias, supuestos paramétricos.",
    "Correcta. Es la alternativa no paramétrica para dos grupos independientes.",
    "ANOVA de medidas repetidas corresponde a tres o más mediciones relacionadas.",
    "McNemar compara proporciones dicotómicas pareadas."
  ],["Pruebas estadísticas","No paramétrica"],"nuevo"),
  makeCase(21102,"NUEVO-PRUEBAS",2,"Comparación de tres proporciones","Se comparará la proporción de control tensional entre tres estrategias independientes de tratamiento. Todas las frecuencias esperadas de la tabla son mayores de 5.","¿Qué prueba es la más apropiada?",["Chi cuadrada de Pearson","ANOVA","Correlación de Spearman","Wilcoxon"],0,"Se comparan dos variables categóricas en grupos independientes y las frecuencias esperadas permiten la aproximación chi cuadrada.",[
    "Correcta. Evalúa si la distribución de proporciones difiere entre los tres grupos.",
    "ANOVA compara medias de una variable cuantitativa.",
    "Spearman estudia asociación monotónica entre variables ordinales o cuantitativas.",
    "Wilcoxon compara mediciones ordinales o cuantitativas relacionadas."
  ],["Chi cuadrada","Proporciones"],"nuevo"),
  makeCase(21103,"NUEVO-PRUEBAS",3,"Frecuencias pequeñas","En un ensayo con 22 pacientes se comparan eventos adversos sí/no entre dos grupos. Dos celdas tienen frecuencia esperada menor de 5.","¿Qué prueba debe preferirse?",["Exacta de Fisher","Pearson","t independiente","Kruskal–Wallis"],0,"La prueba exacta de Fisher calcula la probabilidad sin depender de la aproximación asintótica de chi cuadrada y es adecuada para tablas 2×2 con recuentos pequeños.",[
    "Correcta. Conserva validez con frecuencias esperadas bajas.",
    "La aproximación de Pearson puede ser inexacta cuando varias celdas son pequeñas.",
    "La t compara medias, no frecuencias categóricas.",
    "Kruskal–Wallis compara tres o más grupos en una variable ordinal/continua."
  ],["Fisher","Muestras pequeñas"],"nuevo"),
  makeCase(21104,"NUEVO-EFECTO",1,"RAR y NNT","En un ensayo, el evento primario ocurrió en 12% del grupo control y 8% del grupo tratado durante un año.","¿Cuál es el número necesario a tratar durante un año?",["4","12","25","50"],2,"La reducción absoluta del riesgo es 0.12−0.08=0.04. El NNT es 1/0.04=25: se deben tratar 25 pacientes durante un año para evitar, en promedio, un evento adicional.",[
    "Un NNT de 4 requeriría una reducción absoluta de 25%.",
    "Doce no es el inverso de la reducción absoluta de 4%.",
    "Correcta. NNT=25 para el horizonte temporal del estudio.",
    "Cincuenta correspondería a una reducción absoluta de 2%."
  ],["NNT","Riesgo absoluto"],"nuevo"),
  makeCase(21105,"NUEVO-EFECTO",2,"IC de un riesgo relativo","Una cohorte reporta RR 1.8; IC95% 0.92–3.10 para lesión renal asociada a una exposición.","¿Cuál interpretación es correcta?",["La exposición aumenta el riesgo con certeza","El resultado no es estadísticamente significativo al 5% y sigue siendo impreciso","La exposición es protectora","El estudio demuestra equivalencia"],1,"El intervalo incluye 1, valor nulo del RR, por lo que no se rechaza la hipótesis nula al 5%. Además, la amplitud admite desde poco efecto hasta un incremento importante: ausencia de significación no equivale a ausencia de efecto.",[
    "El estimador puntual sugiere aumento, pero el intervalo no permite afirmarlo con el umbral convencional.",
    "Correcta. Deben interpretarse dirección, valor nulo y precisión.",
    "La mayor parte del intervalo está por arriba de 1 y no sustenta protección.",
    "Equivalencia requiere márgenes predefinidos y un diseño/análisis específico."
  ],["Intervalo de confianza","Riesgo relativo"],"nuevo"),
  makeCase(21106,"NUEVO-ERROR",1,"Error tipo I","Se realizan 20 comparaciones independientes con alfa 0.05 sin corrección y se destaca únicamente la que alcanzó p=0.03.","¿Qué problema aumenta principalmente?",["Error tipo I por multiplicidad","Error tipo II por exceso de potencia","Sesgo de verificación","Censura informativa"],0,"Cada comparación adicional aumenta la probabilidad familiar de obtener al menos un falso positivo. Deben preespecificarse desenlaces y considerar métodos de control de multiplicidad.",[
    "Correcta. Se incrementa el riesgo de rechazar falsamente alguna hipótesis nula.",
    "La multiplicidad no produce exceso de error tipo II por definición; las correcciones pueden reducir potencia.",
    "El sesgo de verificación pertenece a estudios diagnósticos.",
    "La censura informativa pertenece al análisis de tiempo a evento."
  ],["Error tipo I","Multiplicidad"],"nuevo"),
  makeCase(21107,"NUEVO-ERROR",2,"Potencia insuficiente","Un ensayo pequeño encuentra una diferencia clínicamente importante, pero p=0.18 y el IC95% es muy amplio.","¿Cuál conclusión es la más defendible?",["Los tratamientos son equivalentes","El estudio puede ser inconcluso por imprecisión y error tipo II","La hipótesis nula quedó demostrada","Debe eliminarse el intervalo de confianza"],1,"Un resultado no significativo con intervalo amplio puede reflejar falta de potencia. Para declarar equivalencia o no inferioridad se necesitan márgenes, diseño y análisis específicos.",[
    "No significación no demuestra equivalencia.",
    "Correcta. La muestra puede ser incapaz de detectar una diferencia real.",
    "Las pruebas no demuestran la hipótesis nula; valoran compatibilidad de los datos.",
    "El intervalo es precisamente lo que revela la imprecisión."
  ],["Error tipo II","Potencia"],"nuevo"),
  makeCase(21108,"NUEVO-DIAGNOSTICO",1,"Cambio de prevalencia","Una prueba diagnóstica conserva sensibilidad 90% y especificidad 90%. Se traslada de una clínica de alta prevalencia a tamizaje poblacional de baja prevalencia.","¿Qué cambio es más probable?",["Aumenta el valor predictivo positivo","Disminuye el valor predictivo positivo y aumenta el negativo","Cambian necesariamente sensibilidad y especificidad","El cociente de probabilidad positivo se vuelve cero"],1,"Con menor probabilidad preprueba habrá proporcionalmente más falsos positivos entre los resultados positivos, reduciendo el VPP; los resultados negativos serán más confiables y aumenta el VPN.",[
    "El VPP suele disminuir al bajar la prevalencia.",
    "Correcta. Los valores predictivos dependen de la prevalencia o probabilidad preprueba.",
    "Sensibilidad y especificidad son más transportables, aunque pueden variar por espectro y umbral.",
    "El LR+ depende de sensibilidad y especificidad, no se vuelve cero por menor prevalencia."
  ],["Pruebas diagnósticas","Prevalencia"],"nuevo"),
  makeCase(21109,"NUEVO-DIAGNOSTICO",2,"Espectro clínico","Una prueba se valida comparando pacientes con enfermedad avanzada contra voluntarios jóvenes sanos y obtiene AUC 0.98. Después funciona peor en pacientes ambulatorios con enfermedad inicial y diagnósticos similares.","¿Qué sesgo explica mejor la caída del rendimiento?",["Sesgo de espectro","Sesgo de memoria","Sesgo ecológico","Sesgo de publicación"],0,"Usar extremos muy distintos facilita artificialmente la discriminación. La prueba debe evaluarse en el espectro real de gravedad y diagnósticos diferenciales donde será utilizada.",[
    "Correcta. La muestra de validación no representa el espectro clínico objetivo.",
    "No depende del recuerdo de exposiciones.",
    "No se están atribuyendo asociaciones grupales a individuos.",
    "El problema ocurre dentro del diseño de validación, no por selección de estudios publicados."
  ],["Sesgo","Diagnóstico"],"nuevo"),
  makeCase(21110,"NUEVO-CAUSALIDAD",1,"Confusor","En una cohorte, café se asocia con infarto. Los consumidores de café fuman más; tabaquismo se relaciona con infarto y no es consecuencia del café.","¿Qué papel puede tener el tabaquismo?",["Mediador obligatorio","Confusor","Desenlace sustituto","Error aleatorio"],1,"Un confusor se asocia con exposición y desenlace, pero no pertenece a la cadena causal de la exposición. Puede distorsionar la estimación y debe controlarse por diseño o análisis.",[
    "Un mediador sería causado por la exposición y transmitiría parte de su efecto.",
    "Correcta. Cumple la estructura clásica de confusión.",
    "No sustituye al desenlace cardiovascular.",
    "Es una variable sistemática explicativa, no fluctuación por azar."
  ],["Confusión","Causalidad"],"nuevo"),
  makeCase(21111,"NUEVO-CAUSALIDAD",2,"Colisionador","Se estudia obesidad y mortalidad únicamente entre pacientes hospitalizados. Tanto obesidad como gravedad aguda aumentan la probabilidad de hospitalización.","¿Qué riesgo introduce ajustar o condicionar por hospitalización?",["Sesgo por colisionador","Sesgo de memoria","Falacia ecológica","Error de transcripción"],0,"Hospitalización es efecto común de obesidad y gravedad. Condicionar por un colisionador puede abrir una asociación no causal entre sus causas y distorsionar la relación con mortalidad.",[
    "Correcta. La selección por un efecto común puede generar la llamada paradoja del colisionador.",
    "No se está preguntando retrospectivamente por exposiciones.",
    "La unidad de análisis sigue siendo individual.",
    "Un error de captura es posible, pero no explica la estructura de selección descrita."
  ],["DAG","Colisionador"],"nuevo"),
  makeCase(21112,"NUEVO-META",1,"Heterogeneidad","Un metaanálisis obtiene I²=78% y los estudios difieren en población, dosis y duración.","¿Cuál es la conducta interpretativa correcta?",["Ignorar la heterogeneidad porque el resultado global es significativo","Explorar causas clínicas y metodológicas, usar un modelo apropiado y valorar si es razonable combinar","Eliminar siempre el estudio más grande","Convertir todos los desenlaces a valores de p"],1,"I² alto señala variabilidad más allá del azar, pero debe interpretarse con número y precisión de estudios. Antes de aceptar un promedio se exploran población, intervención, desenlace, sesgo y análisis de sensibilidad.",[
    "Un efecto global significativo no elimina la heterogeneidad ni garantiza aplicabilidad.",
    "Correcta. La síntesis debe respetar la comparabilidad clínica y metodológica.",
    "Eliminar el mayor estudio sin razón introduce sesgo.",
    "Los valores de p pierden magnitud y precisión del efecto."
  ],["Metaanálisis","Heterogeneidad"],"nuevo"),
  makeCase(21113,"NUEVO-META",2,"Sesgo de publicación","Un metaanálisis pequeño muestra asimetría en gráfico de embudo y ausencia de estudios pequeños con resultados negativos.","¿Cuál interpretación es más prudente?",["Demuestra fraude","Sugiere efectos de estudios pequeños, incluida publicación selectiva, pero no la prueba por sí sola","Confirma ausencia de heterogeneidad","Obliga a duplicar el tamaño del ensayo más grande"],1,"La asimetría puede deberse a publicación selectiva, heterogeneidad, diferencias metodológicas o azar, especialmente con pocos estudios. Es una señal que requiere evaluación, no una prueba definitiva.",[
    "La asimetría no identifica fraude ni su causa.",
    "Correcta. Debe integrarse con búsqueda, protocolos y análisis de sensibilidad.",
    "Puede coexistir con heterogeneidad importante.",
    "No determina por sí misma un tamaño muestral."
  ],["Metaanálisis","Publicación"]),
  makeCase(21114,"NUEVO-PROTOCOLO",1,"Pregunta PICO","Una residente quiere saber si, en adultos con sepsis, iniciar norepinefrina periférica temprana comparado con esperar un acceso central reduce el tiempo hasta PAM objetivo sin aumentar extravasación grave.","¿Cuál elemento corresponde a la I de PICO?",["Adultos con sepsis","Norepinefrina periférica temprana","Esperar acceso central","Tiempo hasta PAM objetivo"],1,"PICO organiza población, intervención o exposición, comparador y desenlace. Aquí la maniobra evaluada es iniciar norepinefrina periférica temprana.",[
    "Es la población.",
    "Correcta. Es la intervención que se desea evaluar.",
    "Es el comparador.",
    "Es el desenlace principal de eficacia, acompañado de seguridad."
  ],["PICO","Pregunta clínica"],"nuevo"),
  makeCase(21115,"NUEVO-PROTOCOLO",2,"Objetivo e hipótesis","Un protocolo declara: ‘Determinar si la norepinefrina periférica temprana reduce el tiempo hasta PAM objetivo en adultos con sepsis, comparada con esperar un acceso central’.","¿Qué componente representa el enunciado?",["Objetivo general","Hipótesis estadística nula","Justificación","Definición operacional"],0,"Inicia con un verbo en infinitivo, especifica población, intervención, comparador y desenlace; por ello es un objetivo. Una hipótesis formularía una predicción comprobable sobre la relación esperada.",[
    "Correcta. Expresa qué se medirá y comparará.",
    "La hipótesis nula plantearía ausencia de diferencia entre estrategias.",
    "La justificación explica relevancia, factibilidad e impacto del estudio.",
    "La definición operacional detallaría exactamente cómo se medirá el tiempo y la PAM."
  ],["Protocolo","Objetivos"],"nuevo"),
];

const conceptCase = (id, title, question, answers, correct, explanation, tags) => ({
  id,
  caseSet: `PDF-CONCEPT-${id}`,
  step: 1,
  specialty: "Investigación y estadística",
  difficulty: 3,
  sourceMode: "documento",
  tags,
  title,
  case: "Durante la elaboración y evaluación de un protocolo de investigación clínica, el comité solicita identificar correctamente el concepto metodológico descrito.",
  question,
  options: answers.map((item) => item[0]),
  answer: correct,
  explanation,
  optionFeedback: answers.map((item, index) => `${index === correct ? "Correcta. " : ""}${item[1]}`),
});

const importedConcepts = [
  conceptCase(21201,"Investigación operacional","¿Qué investigación estudia la aplicación de conocimientos y métodos en la práctica sanitaria, sus resultados, los pacientes y las prácticas profesionales?",[["Investigación básica","Busca mecanismos fundamentales sin centrarse necesariamente en la prestación de servicios."],["Investigación aplicada","Usa conocimiento para resolver un problema concreto, pero el término solicitado se enfoca específicamente en cómo funciona la atención."],["Investigación operacional","Analiza procesos, organización, desempeño y resultados de los servicios para mejorar su funcionamiento."],["Investigación traslacional","Conecta hallazgos básicos con aplicaciones clínicas y de salud."]],2,"La investigación operacional estudia cómo se ejecuta la atención, identifica barreras y prueba estrategias para mejorar procesos y resultados en condiciones reales.",["Tipos de investigación"]),
  conceptCase(21202,"Investigación traslacional","¿Qué tipo de investigación transforma con rapidez avances de ciencia básica y tecnología en nuevas aproximaciones diagnósticas o terapéuticas?",[["Básica","Genera conocimiento mecanístico inicial."],["Aplicada","Resuelve problemas prácticos, pero no expresa por sí sola el puente laboratorio-clínica."],["Operacional","Optimiza la prestación de servicios."],["Traslacional","Lleva descubrimientos del laboratorio a estudios clínicos y, después, a práctica y población."]],3,"La investigación traslacional reduce la brecha entre descubrimiento y aplicación; suele describirse como del banco a la cama y de la cama a la comunidad.",["Tipos de investigación"]),
  conceptCase(21203,"Equipo interdisciplinario","Cuando especialistas de distintas disciplinas integran conceptos y métodos para construir un abordaje común, el equipo es:",[["Multidisciplinario","Las disciplinas colaboran en paralelo y aportan desde su campo, con integración limitada."],["Interdisciplinario","Integra perspectivas y métodos para una pregunta y estrategia compartidas."],["Unidisciplinario","Trabaja desde una sola disciplina."],["Administrativo","Describe una función organizacional, no el grado de integración científica."]],1,"La interdisciplinariedad implica integración real; no es solo yuxtaponer informes de varias especialidades.",["Equipos de investigación"]),
  conceptCase(21204,"Declaración de Helsinki","¿Qué documento de la Asociación Médica Mundial establece principios éticos para investigación médica en seres humanos y prioriza derechos y bienestar del participante?",[["Declaración de Helsinki","Es el marco internacional específico de la Asociación Médica Mundial para investigación médica en humanos."],["Código de Núremberg","Es antecedente esencial centrado en consentimiento voluntario, pero no es el documento descrito."],["Informe Belmont","Formula respeto, beneficencia y justicia en el contexto estadounidense."],["CONSORT","Es una guía de reporte de ensayos, no un código ético."]],0,"Helsinki exige que los fines científicos nunca prevalezcan sobre los derechos e intereses individuales y aborda protocolo, revisión ética, consentimiento, registro y publicación.",["Ética"]),
  conceptCase(21205,"Publicación salami","Dividir artificialmente un mismo estudio en múltiples artículos con resultados solapados se denomina:",[["Plagio","Es apropiarse de ideas o texto ajenos sin atribución."],["Fabricación","Consiste en inventar datos inexistentes."],["Publicación salami","Fragmenta un cuerpo de resultados para inflar publicaciones y puede duplicar participantes o análisis."],["Autoría fantasma","Omite a quien hizo una contribución que amerita autoría."]],2,"La publicación salami distorsiona la literatura y puede inducir doble conteo en revisiones; distintos artículos deben responder preguntas genuinamente distintas y declarar la cohorte compartida.",["Integridad científica"]),
  conceptCase(21206,"Estudio transversal","¿Qué diseño observacional es el más directo para estimar prevalencia en una población definida?",[["Transversal descriptivo","Mide casos existentes y denominador en un corte o periodo definido."],["Casos y controles","Selecciona por desenlace y no calcula prevalencia poblacional directamente."],["Ensayo clínico","Evalúa una intervención asignada."],["Cohorte de incidencia","Sigue personas en riesgo para contar casos nuevos."]],0,"La prevalencia requiere contar casos existentes y población evaluada en el mismo marco temporal; el transversal es el diseño clásico.",["Diseños","Prevalencia"]),
  conceptCase(21207,"Resultados percibidos","¿Qué término describe desenlaces informados directamente por el paciente sobre síntomas, función o estado de salud, sin interpretación de terceros?",[["PRO","Los patient-reported outcomes proceden directamente del paciente."],["Costo-beneficio","Compara costos y beneficios monetizados."],["Escala de adherencia exclusivamente","Es solo un instrumento particular y no engloba todos los desenlaces percibidos."],["Biomarcador sustituto","Es una medición biológica que pretende anticipar un desenlace clínico."]],0,"Los PRO complementan supervivencia y biomarcadores al medir lo que el paciente experimenta; requieren instrumentos válidos, confiables y sensibles al cambio.",["Desenlaces"]),
  conceptCase(21208,"Validez externa","Al revisar si la población, entorno e intervención de un artículo se parecen a los de su paciente, el médico evalúa:",[["Validez interna","Pregunta si el efecto observado está libre de sesgo dentro del estudio."],["Precisión","Se refleja principalmente en la anchura del intervalo de confianza."],["Validez externa o aplicabilidad","Valora si los resultados pueden trasladarse al paciente y contexto clínico."],["Potencia","Es la probabilidad de detectar un efecto definido si existe."]],2,"La aplicabilidad exige comparar criterios de selección, riesgo basal, recursos, intervención, comparador y desenlaces con la situación real.",["Lectura crítica"]),
  conceptCase(21209,"Magnitud y precisión","Interpretar la reducción absoluta del riesgo y su intervalo de confianza corresponde a evaluar:",[["Magnitud del efecto y precisión","La estimación cuantifica beneficio absoluto y el intervalo muestra incertidumbre."],["Solo validez externa","No responde cuánto efecto hubo ni cuán preciso fue."],["Solo aleatorización","La aleatorización se relaciona con validez interna."],["Sesgo de publicación","Se evalúa a nivel del conjunto de literatura."]],0,"La lectura clínica no termina en p: debe expresar tamaño del efecto, intervalo y relevancia para el riesgo basal y el horizonte temporal.",["Lectura crítica"]),
  conceptCase(21210,"Componente I de PICO","En una pregunta de diagnóstico o pronóstico, ¿qué letra de PICO describe la prueba índice o la exposición de interés?",[["P","Población o problema."],["I","Intervención, prueba índice o exposición."],["C","Comparador o prueba de referencia."],["O","Desenlace clínico."]],1,"La I representa aquello que se evalúa: tratamiento, prueba diagnóstica, exposición o factor pronóstico, según el tipo de pregunta.",["PICO"]),
  conceptCase(21211,"PubMed Clinical Queries","¿Qué función de PubMed ofrece filtros metodológicos preconstruidos para preguntas clínicas?",[["Clinical Queries","Aplica estrategias validadas para categorías clínicas y alcance amplio o estrecho."],["MeSH Database","Ayuda a identificar vocabulario controlado, pero no es el filtro clínico solicitado."],["Clipboard","Solo conserva temporalmente resultados seleccionados."],["Citation manager","Exporta referencias, no filtra por diseño clínico."]],0,"Clinical Queries facilita búsquedas sensibles o específicas para terapia, diagnóstico, etiología y pronóstico; aun así, la estrategia debe adaptarse a la pregunta.",["Búsqueda bibliográfica"]),
  conceptCase(21212,"Estadística inferencial","¿Qué rama compara grupos y permite inferir si las diferencias observadas son compatibles con azar bajo un modelo?",[["Descriptiva","Resume y presenta los datos observados."],["Inferencial","Usa estimación y contraste para generalizar desde la muestra a la población."],["Administrativa","No es una rama estadística."],["Cualitativa","Es un enfoque de investigación distinto, no la categoría solicitada."]],1,"La inferencia incluye intervalos de confianza, pruebas de hipótesis y modelos; su validez depende del diseño, supuestos y proceso de muestreo.",["Inferencia"]),
  conceptCase(21213,"Prevalencia","¿Qué medida divide el número de personas con una enfermedad entre la población evaluada en un momento dado?",[["Incidencia","Cuenta casos nuevos durante seguimiento."],["Prevalencia","Incluye casos existentes y expresa carga de enfermedad."],["Riesgo relativo","Compara riesgos entre dos grupos."],["Odds ratio","Compara odds de exposición o desenlace."]],1,"La prevalencia puntual es una proporción de casos existentes; aumenta con incidencia alta o duración prolongada y disminuye con curación o muerte rápida.",["Frecuencia"]),
  conceptCase(21214,"Incidencia acumulada","¿Qué medida divide casos nuevos durante un periodo entre personas inicialmente libres del evento y en riesgo?",[["Prevalencia","Incluye casos existentes."],["Incidencia acumulada","Es el riesgo de desarrollar el evento durante el periodo."],["Media","Resume una variable cuantitativa."],["Especificidad","Es propiedad de una prueba diagnóstica."]],1,"La incidencia acumulada necesita un denominador en riesgo y seguimiento definido; siempre debe acompañarse del horizonte temporal.",["Frecuencia"]),
  conceptCase(21215,"Escala de razón","¿Qué escala cuantitativa posee intervalos iguales y un cero absoluto que permite interpretar cocientes?",[["Nominal","Clasifica sin orden."],["Ordinal","Ordena sin intervalos iguales."],["Intervalo","Tiene intervalos iguales, pero el cero es convencional."],["Razón","Tiene cero real y permite decir el doble o la mitad."]],3,"Peso, talla, tiempo y concentraciones positivas suelen medirse en escala de razón; temperatura Celsius es de intervalo.",["Escalas"]),
  conceptCase(21216,"Anchura del intervalo","¿De qué depende principalmente la amplitud de un intervalo de confianza para una media?",[["Variabilidad, tamaño muestral y nivel de confianza","La desviación estándar aumenta el error; mayor n lo reduce; mayor confianza ensancha el intervalo."],["Solo del valor p","El valor p no determina por sí solo la anchura."],["Solo de la población total","En poblaciones grandes suele importar más n muestral que el total, salvo corrección finita."],["Del nombre de la variable","La etiqueta no altera la precisión."]],0,"En forma simplificada: estimación ± valor crítico×error estándar. Por eso más variabilidad o confianza ensanchan y más muestra estrecha.",["Intervalos de confianza"]),
  conceptCase(21217,"Reducir margen de error","Manteniendo el mismo nivel de confianza y variabilidad, ¿cómo se reduce el margen de error?",[["Disminuyendo la muestra","Aumenta el error estándar."],["Aumentando la muestra","Reduce el error estándar en proporción a 1/√n."],["Seleccionando después la prueba con menor p","Introduce análisis dirigido por resultados y no mejora precisión real."],["Eliminando valores extremos sin criterio","Puede sesgar la estimación."]],1,"Aumentar n mejora precisión, aunque con rendimientos decrecientes: para reducir a la mitad el error suele requerirse cuadruplicar la muestra.",["Tamaño de muestra"]),
  conceptCase(21218,"Chi cuadrada","¿Qué prueba contrasta frecuencias observadas y esperadas para estudiar asociación entre variables categóricas independientes?",[["t de Student","Compara medias."],["Chi cuadrada","Evalúa independencia u homogeneidad en tablas de contingencia."],["Pearson","Correlaciona variables continuas."],["ANOVA","Compara medias en tres o más grupos."]],1,"Chi cuadrada exige observaciones independientes y frecuencias esperadas adecuadas; en tablas 2×2 pequeñas se prefiere Fisher.",["Pruebas"]),
  conceptCase(21219,"Coeficiente de Pearson","¿Qué estadígrafo cuantifica intensidad y dirección de una relación lineal entre dos variables continuas?",[["Chi cuadrada","Evalúa asociación entre categorías."],["Coeficiente de Pearson","Varía entre −1 y 1 y mide asociación lineal."],["Kappa","Mide concordancia categórica más allá del azar."],["Mediana","Resume tendencia central."]],1,"Pearson no demuestra causalidad ni concordancia y puede ser engañoso ante valores extremos o relaciones no lineales.",["Correlación"]),
  conceptCase(21220,"Error tipo I","Rechazar la hipótesis nula cuando en realidad es verdadera corresponde a:",[["Error tipo I","Es un falso positivo y su probabilidad se representa por alfa."],["Error tipo II","Es no detectar un efecto real."],["Potencia","Es 1−beta."],["Confusión","Es distorsión por una tercera variable."]],0,"El control de alfa limita falsos positivos por contraste; multiplicidad, análisis no preespecificados y selección de resultados aumentan el riesgo global.",["Errores"]),
  conceptCase(21221,"Media aritmética","¿Qué medida de tendencia central se obtiene sumando los valores y dividiendo entre el número de observaciones?",[["Media aritmética","Utiliza todos los valores y es sensible a extremos."],["Mediana","Es el valor central ordenado."],["Moda","Es el valor más frecuente."],["Varianza","Es una medida de dispersión."]],0,"La media es apropiada cuando interesa el promedio y la distribución no está dominada por valores extremos; debe acompañarse de una medida de dispersión.",["Descriptiva"]),
  conceptCase(21222,"Varianza","¿Qué medida se basa en el promedio de las desviaciones al cuadrado respecto de la media?",[["Rango","Diferencia entre máximo y mínimo."],["Varianza","Cuantifica dispersión en unidades al cuadrado."],["Mediana","Resume el centro por orden."],["Error estándar","Cuantifica precisión de una estimación."]],1,"La desviación estándar es la raíz de la varianza y vuelve a las unidades originales, por lo que suele ser más interpretable.",["Dispersión"]),
  conceptCase(21223,"Error tipo II","No rechazar la hipótesis nula cuando es falsa corresponde a:",[["Error tipo I","Es rechazar una H0 verdadera."],["Error tipo II","Es un falso negativo; su probabilidad es beta."],["Sesgo de selección","Es una distorsión sistemática por inclusión."],["Interacción","Es cambio del efecto entre estratos."]],1,"El error tipo II aumenta con muestras pequeñas, alta variabilidad, efectos menores o alfa más estricto; la potencia es 1−beta.",["Errores","Potencia"]),
];

export default [...imported, ...importedConcepts, ...newCases];
