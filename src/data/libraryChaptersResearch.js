const chapter = (id, title, sections, caseSets) => ({
  id,
  title,
  specialty: "Investigación y estadística",
  updated: "2026-08",
  priority: "EFISER alta",
  trigger: "Preguntas recuperadas de Mini CTO, Investigación biomédica, manuales de Investigación Clínica IMSS y Estadística y Epidemiología.",
  refs: [],
  caseSets,
  sections: sections.map(([heading, body]) => ({ heading, body })),
});

const chapters = [
  chapter("research-designs","Diseños epidemiológicos y muestreo",[
    ["Mapa inicial","Toda pregunta metodológica se resuelve identificando: 1) cómo se seleccionó la población; 2) si el investigador asignó una intervención; 3) dirección temporal; 4) número de mediciones; 5) si se seleccionó por exposición, desenlace o ninguno; 6) medida que el diseño permite estimar."],
    ["Diseños descriptivos","Reporte/serie de casos describen pacientes sin comparador. El transversal mide exposición y desenlace en un corte y estima prevalencia. El ecológico usa grupos como unidad; atribuir el resultado grupal a individuos produce falacia ecológica."],
    ["Cohorte","Parte de expuestos y no expuestos libres del desenlace y los sigue. Estima incidencia, riesgo relativo, diferencia de riesgos y tasa. Es eficiente para exposiciones raras y varios desenlaces; es vulnerable a pérdidas, cambios temporales y confusión."],
    ["Casos y controles","Selecciona casos con el desenlace y controles de la misma población fuente. Reconstruye exposiciones y estima odds ratio. Es eficiente para desenlaces raros o de larga latencia; no calcula incidencia directamente y es sensible a selección y memoria."],
    ["Ensayo clínico","El investigador asigna la intervención. La aleatorización equilibra confusores en expectativa; el ocultamiento evita prever la asignación; el cegamiento reduce diferencias en atención, medición y adjudicación. Intención de tratar conserva el beneficio de aleatorizar."],
    ["Muestreo probabilístico","Aleatorio simple: una lista y probabilidad igual. Sistemático: arranque aleatorio y cada k-ésimo. Estratificado: se divide por una característica y se muestrea dentro de cada estrato. Conglomerados: se seleccionan grupos naturales; debe considerarse correlación intraclúster."],
    ["Muestreo no probabilístico","Conveniencia usa accesibilidad; consecutivo incluye todos los elegibles durante un periodo; cuotas fijan cantidades sin selección aleatoria; bola de nieve recluta mediante participantes y es útil en poblaciones ocultas. Limitan inferencia poblacional."],
    ["Algoritmo EFISER","¿Hay intervención asignada? Sí→ensayo/cuasiensayo. No→observacional. ¿Se seleccionó por desenlace?→casos y controles. ¿Se siguió desde exposición hacia eventos?→cohorte. ¿Un solo corte?→transversal. Después identifique prospectivo/retrospectivo, longitudinal/transversal y descriptivo/analítico."],
    ["Trampas frecuentes","Prospectivo no equivale a experimental. Longitudinal no equivale a cohorte. Una revisión de expedientes puede ser una cohorte retrospectiva. El nombre del hospital o la fuente de datos no define el diseño; lo hace la lógica de selección y seguimiento."],
  ],["PDF-MUESTREO","PDF-DISENO"]),

  chapter("research-variables","Variables y estadística descriptiva",[
    ["Variable independiente y dependiente","La independiente es la exposición o maniobra explicativa; la dependiente es el desenlace que se mide. Edad, gravedad y comorbilidades suelen ser covariables. Una variable puede cambiar de tipo si se recodifica: IMC numérico es continuo; categorías de IMC son ordinales."],
    ["Escalas de medición","Nominal: categorías sin orden. Ordinal: categorías ordenadas sin distancias iguales. Intervalo: diferencias iguales sin cero absoluto. Razón: diferencias y cocientes interpretables con cero real. La escala determina qué resúmenes y pruebas son válidos."],
    ["Discretas y continuas","Discreta procede de conteos (número de ingresos). Continua procede de medición (talla, sodio, HbA1c). La precisión registrada no convierte una medición continua en discreta."],
    ["Definición conceptual y operacional","La conceptual explica qué significa la variable; la operacional especifica instrumento, procedimiento, unidad, momento, puntos de corte y manejo de valores. Una buena operacionalización permite reproducibilidad y reduce clasificación errónea."],
    ["Tendencia central","Media usa toda la información pero es sensible a extremos. Mediana es robusta para distribuciones asimétricas. Moda es el valor más frecuente y puede aplicarse a categorías. Reporte típico: media±DE si distribución aproximadamente simétrica; mediana y RIC si asimétrica."],
    ["Dispersión","Rango depende de extremos. Varianza es el promedio de desviaciones cuadráticas; queda en unidades al cuadrado. Desviación estándar vuelve a las unidades originales y describe dispersión individual. Error estándar describe precisión de la media y disminuye con raíz de n."],
    ["Forma de la distribución","Sesgo positivo: cola a la derecha y media suele superar mediana. Sesgo negativo: cola a la izquierda. Histogramas, Q-Q plots y contexto son más útiles que decidir normalidad solo por una prueba, especialmente con muestras grandes."],
    ["Algoritmo descriptivo","Identifique escala→revise distribución y valores extremos→elija resumen central y dispersión→muestre tabla/gráfica congruente→documente datos faltantes→evite presentar solo p sin magnitud ni intervalo."],
  ],["PDF-VARIABLES"]),

  chapter("research-tests","Elección de pruebas estadísticas",[
    ["Cuatro preguntas antes de probar","¿Cuál es el desenlace y su escala? ¿Cuántos grupos/mediciones? ¿Son independientes o pareados? ¿Se cumplen supuestos de distribución, varianza y tamaño? La prueba se preespecifica por estas condiciones, no por cuál produce menor p."],
    ["Dos grupos independientes","Continua aproximadamente normal: t independiente; si varianzas distintas, versión de Welch. Ordinal o continua muy asimétrica: Mann–Whitney. Proporciones: chi cuadrada; con frecuencias esperadas pequeñas: Fisher."],
    ["Dos mediciones relacionadas","Continua normal: t pareada. Ordinal/no normal: rangos con signo de Wilcoxon. Dicotómica pareada: McNemar. El pareamiento debe mantenerse en el análisis."],
    ["Tres o más grupos","Continua normal independiente: ANOVA; no normal/ordinal: Kruskal–Wallis. Repetidas normales: ANOVA de medidas repetidas o modelo mixto; no normal: Friedman. Si el análisis global es significativo, las comparaciones posteriores necesitan control de multiplicidad."],
    ["Correlación y regresión","Pearson mide asociación lineal entre continuas bajo supuestos; Spearman mide relación monotónica por rangos. Correlación no implica concordancia ni causalidad. Regresión lineal modela resultado continuo; logística, resultado binario; Cox, tiempo a evento."],
    ["Hipótesis y p","Alfa es la probabilidad tolerada de error tipo I bajo H0. Beta es error tipo II; potencia=1−beta. El valor p es la probabilidad de datos tan o más extremos bajo H0, no la probabilidad de que H0 sea cierta ni el tamaño del efecto."],
    ["Intervalos de confianza","Expresan valores compatibles con datos y modelo. Si el IC95% de RR/OR/HR incluye 1 o el de una diferencia incluye 0, no hay significación bilateral al 5%. Anchura refleja precisión; no significación con IC ancho puede ser inconclusa."],
    ["Algoritmo rápido","Continua o categórica→número de grupos→independientes o relacionados→distribución/frecuencias esperadas→prueba global→comparaciones múltiples si procede→reportar efecto+IC+p y supuestos."],
  ],["NUEVO-PRUEBAS","NUEVO-ERROR"]),

  chapter("research-measures","Frecuencia, asociación e impacto clínico",[
    ["Prevalencia","Casos existentes/población en un momento o periodo. Depende de incidencia y duración. Es útil para carga de enfermedad, pero no establece temporalidad por sí sola."],
    ["Incidencia acumulada","Casos nuevos/personas inicialmente en riesgo durante un periodo. Es un riesgo y varía entre 0 y 1. Requiere cohorte cerrada y seguimiento suficientemente completo."],
    ["Densidad de incidencia","Casos nuevos/persona-tiempo. Es una tasa y puede exceder 1 por unidad si hay eventos repetidos; maneja seguimientos diferentes, pero no es una probabilidad directa."],
    ["RR y OR","RR=riesgo expuesto/riesgo no expuesto. OR=odds expuestos/odds no expuestos o producto cruzado en casos y controles. OR aproxima RR cuando el desenlace es raro; con desenlace común puede exagerar la magnitud."],
    ["Diferencias absolutas","RAR=riesgo control−riesgo tratado. NNT=1/RAR; redondear hacia arriba y siempre declarar horizonte temporal y desenlace. Para daño: aumento absoluto y NNH. Un gran efecto relativo puede tener poco impacto absoluto si el riesgo basal es bajo."],
    ["Medidas ajustadas","Regresión estima asociaciones condicionadas a covariables. Ajustar no repara mala selección, medición diferencial ni confusores no medidos. Puntaje de propensión equilibra variables observadas, no crea aleatorización."],
    ["Interacción","Existe cuando el efecto cambia según un tercer factor. Debe evaluarse con un término/prueba de interacción; que un subgrupo sea significativo y otro no, por sí solo, no demuestra diferencia entre subgrupos."],
    ["Algoritmo 2×2","Construya tabla exposición×evento→calcule riesgos si hay denominadores de cohorte→RR y diferencia absoluta→NNT/NNH cuando sea clínicamente válido→OR si casos y controles→añada IC y ajuste por confusión preespecificada."],
  ],["NUEVO-EFECTO","INV-NEW-004"]),

  chapter("research-diagnostic","Pruebas diagnósticas y lectura crítica",[
    ["Sensibilidad y especificidad","Sensibilidad=P(prueba+|enfermedad); especificidad=P(prueba−|sin enfermedad). Sensibilidad alta ayuda a descartar con un negativo; especificidad alta ayuda a confirmar con un positivo, pero siempre se integra la probabilidad preprueba."],
    ["Valores predictivos","VPP y VPN contestan qué significa el resultado en esa población y dependen fuertemente de prevalencia. Al disminuir prevalencia baja el VPP y sube el VPN, aun con sensibilidad/especificidad iguales."],
    ["Cocientes de probabilidad","LR+=sensibilidad/(1−especificidad); LR−=(1−sensibilidad)/especificidad. Odds posprueba=odds preprueba×LR. LR+ grande confirma; LR− pequeño descarta. Permiten trasladar resultados entre probabilidades preprueba."],
    ["ROC y umbral","La curva ROC representa sensibilidad frente a 1−especificidad para múltiples umbrales. AUC mide discriminación, no calibración ni utilidad clínica. Cambiar el umbral intercambia falsos positivos y falsos negativos."],
    ["Sesgos diagnósticos","Verificación parcial: no todos reciben referencia. Verificación diferencial: referencias distintas según resultado. Incorporación: la prueba índice forma parte del estándar. Espectro: casos extremos y controles sanos inflan rendimiento. Lectura debe ser ciega e independiente."],
    ["Validez interna","Pregunte si selección, asignación, medición, seguimiento y análisis reducen sesgo. La significación estadística no corrige un diseño sesgado."],
    ["Magnitud y precisión","Interprete estimador, intervalo y relevancia clínica antes del valor p. Un IC estrecho alrededor de un efecto trivial es preciso pero quizá irrelevante; uno ancho puede incluir beneficio y daño importantes."],
    ["Validez externa","Compare población, escenario, intervención, comparador, desenlaces y factibilidad con su paciente. Un estudio internamente válido puede no ser aplicable si el espectro o recursos difieren."],
  ],["NUEVO-DIAGNOSTICO","INV-NEW-001"]),

  chapter("research-ethics","Protocolo, ética y calidad de datos",[
    ["Secuencia del protocolo","Problema→antecedentes→justificación→pregunta→objetivos→hipótesis cuando corresponde→diseño→población→variables→muestra→plan estadístico→ética→cronograma. Cada parte debe responder a la misma pregunta central."],
    ["Pregunta y objetivo","PICO estructura preguntas terapéuticas. El objetivo usa verbo en infinitivo y especifica población, variables, comparación y temporalidad. La hipótesis es una predicción comprobable; no debe confundirse con objetivo, conclusión o justificación."],
    ["Consentimiento informado","Es un proceso, no una firma: información comprensible, capacidad, voluntariedad, oportunidad de preguntar y decisión documentada. La atención no debe condicionarse a participar. Nuevos riesgos relevantes exigen actualización y, cuando proceda, reconsentimiento."],
    ["Menores","Se requiere permiso del representante y asentimiento del menor según desarrollo. Debe minimizarse riesgo, justificar inclusión y respetar la objeción cuando la intervención no sea indispensable para su beneficio clínico."],
    ["Revisión documental","Puede clasificarse sin riesgo si no hay intervención ni contacto, pero requiere protocolo, revisión, minimización de datos, seguridad y, si no habrá consentimiento, dispensa autorizada. El acceso asistencial al expediente no autoriza uso ilimitado en investigación."],
    ["Enmiendas y desviaciones","Cambiar población, fuentes, variables, intervención o análisis requiere enmienda antes de implementarse. Una desviación se documenta, evalúa y notifica según impacto; los cambios urgentes para eliminar peligro inmediato se aplican y reportan."],
    ["Calidad y confidencialidad","Diccionario de datos, hoja estandarizada, capacitación, validaciones, auditoría, codificación y respaldo. Separar identificadores de la base analítica; limitar acceso por función; conservar según política; reportar incidentes."],
    ["Conducta científica","Registrar protocolo, reportar resultados completos y autoría legítima. Fabricación, falsificación, plagio, publicación salami y omisión selectiva dañan integridad. Los conflictos de interés se declaran y gestionan, no se ocultan."],
    ["Algoritmo ético","Defina intervención/datos y población vulnerable→clasifique riesgo→evalúe beneficio y alternativas→consentimiento/asentimiento o dispensa justificada→minimice datos→aprobación previa→monitorice seguridad y desviaciones→informe resultados y proteja datos al cierre."],
  ],["PDF-ETICA","PDF-ETICA-PED","NUEVO-PROTOCOLO"]),
];

export default chapters;
