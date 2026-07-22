const source = "Efiser.pdf - banco reconstruido del examen";

const q = (id, caseSet, step, specialty, title, clinicalCase, question, options, answer, explanation, tags = []) => ({
  id,
  caseSet,
  step,
  specialty,
  difficulty: 3,
  source,
  sourceMode: "reconstructed",
  tags,
  title,
  case: clinicalCase,
  question,
  options,
  answer,
  explanation,
});

const dengue = "Paciente residente de Guanajuato con fiebre de inicio súbito, cefalea, mialgias, hiperemia conjuntival y exantema. No presenta un foco infeccioso evidente.";
const snake = "Paciente atendido después de mordedura por una víbora. Presenta dolor y edema progresivo en la extremidad afectada.";
const pancreatitis = "Paciente con dolor epigástrico intenso irradiado a espalda, náusea y vómito. Se sospecha pancreatitis aguda.";
const acs = "Paciente con dolor torácico opresivo y cambios electrocardiográficos compatibles con síndrome coronario agudo.";
const tbm = "Mujer de Chiapas con un mes de cefalea, fiebre, pérdida de peso y antecedente de contacto con tuberculosis. En la exploración se documenta papiledema.";
const mono = "Paciente con fiebre, esplenomegalia, trombocitopenia y pruebas de función hepática alteradas; se sospecha síndrome mononucleósico.";
const encephalitis = "Hombre joven con fiebre, cefalea, alteración del estado mental y crisis convulsivas.";
const joint = "Hombre con inicio súbito de dolor intenso, eritema y aumento de volumen de la rodilla. La radiografía muestra calcificaciones lineales del cartílago.";
const sodium = "Mujer adulta mayor con gastroenteritis, deshidratación, hipotensión e hiponatremia hipotónica.";
const obstruction = "Hombre con oliguria, dolor hipogástrico y globo vesical palpable.";
const copd = "Paciente fumador con disnea crónica, tos y expectoración. Se estudia por probable EPOC.";
const pheo = "Paciente joven con hipertensión paroxística, cefalea, diaforesis y palpitaciones; una imagen muestra tumor suprarrenal.";
const thyroid = "Paciente con nódulo tiroideo sospechoso y adenopatía cervical; se investiga carcinoma diferenciado o medular de tiroides.";
const graves = "Mujer joven con pérdida de peso, diarrea, hiperhidrosis, taquicardia y bocio difuso.";
const renal = "Paciente que desarrolla oliguria y elevación de creatinina después de un procedimiento con medio de contraste.";
const sepsis = "Paciente con infección grave, hipotensión y datos de hipoperfusión.";
const pep = "Paciente con sospecha de tromboembolia pulmonar, hipotensión persistente y deterioro hemodinámico.";
const chik = "Paciente con fiebre aguda, exantema y artralgias intensas tras exposición a mosquitos Aedes.";
const membranous = "Adulto con síndrome nefrótico y sospecha de nefropatía membranosa primaria.";

const efiserRecalledCases = [
  q(9001,"EF-01",1,"Infectología","Diagnóstico temprano de dengue",dengue,"En los primeros cinco días de enfermedad, ¿qué prueba tiene mayor utilidad diagnóstica?",["IgG para dengue","Antígeno NS1 o PCR","IgM aislada","Cultivo viral de rutina"],1,"Durante la fase virémica temprana se utilizan NS1 o pruebas moleculares; la IgM adquiere mayor utilidad después del quinto día.",["Dengue","Diagnóstico"]),
  q(9002,"EF-01",2,"Infectología","Diagnóstico tardío de dengue",dengue+" La fiebre inició hace siete días.","¿Qué prueba es la más útil en este momento?",["Serología IgM","Antígeno NS1 como única prueba","IgG aislada","Hemocultivo"],0,"Después del quinto día, la serología IgM es la prueba habitual de mayor utilidad.",["Dengue","Serología"]),
  q(9003,"EF-01",3,"Infectología","Dato de gravedad en dengue",dengue,"¿Cuál hallazgo clínico constituye un signo de alarma o gravedad?",["Rinorrea acuosa","Dolor abdominal intenso y persistente","Prurito aislado","Tos seca leve"],1,"El dolor abdominal intenso o persistente es un signo de alarma; también lo son vómito persistente, sangrado de mucosas, letargo y hepatomegalia.",["Dengue","Gravedad"]),
  q(9004,"EF-01",4,"Infectología","Afectación hepática por dengue",dengue,"¿Qué alteración apoya daño hepático grave por dengue?",["AST y ALT mayores de 1,000 U/L","Fosfatasa alcalina discretamente baja","Bilirrubina indirecta de 1.1 mg/dL","Amilasa normal"],0,"La elevación marcada de aminotransferasas, especialmente ≥1,000 U/L, define afectación orgánica grave.",["Dengue","Hepatitis"]),

  q(9005,"EF-02",1,"Toxicología","Mecanismo del veneno viperino",snake,"¿Qué componente facilita la difusión del veneno a través de los tejidos?",["Hialuronidasa","Acetilcolinesterasa","Trombina humana","Catalasa"],0,"La hialuronidasa degrada matriz extracelular y facilita la extensión tisular del veneno.",["Ofidismo","Fisiopatología"]),
  q(9006,"EF-02",2,"Toxicología","Indicación de antiveneno",snake,"¿Cuál hallazgo indica administración de antiveneno?",["Dos puntos de punción sin síntomas","Edema que progresa rápidamente a más de un segmento","Ansiedad aislada","Dolor local leve que no progresa"],1,"La progresión rápida del edema, la necrosis, la coagulopatía, el sangrado, el choque o la neurotoxicidad son indicaciones.",["Ofidismo","Antiveneno"]),
  q(9007,"EF-02",3,"Toxicología","Complicación sistémica del ofidismo",snake,"¿Cuál es una complicación sistémica esperada del envenenamiento viperino?",["Coagulopatía de consumo","Hipertiroidismo","Anemia megaloblástica","Pericarditis constrictiva"],0,"Las metaloproteinasas y otras toxinas pueden producir hemorragia y coagulopatía de consumo.",["Ofidismo","Coagulopatía"]),
  q(9008,"EF-02",4,"Toxicología","Medida inicial en ofidismo",snake,"Después de estabilizar el ABC, ¿qué medida local es apropiada?",["Incidir y succionar la herida","Aplicar torniquete arterial","Inmovilizar la extremidad","Aplicar hielo directamente"],2,"Debe inmovilizarse la extremidad y evitar incisiones, succión, hielo o torniquetes.",["Ofidismo","Urgencias"]),

  q(9009,"EF-03",1,"Gastroenterología","Diagnóstico de pancreatitis",pancreatitis,"¿Qué hallazgo de laboratorio apoya el diagnóstico?",["Lipasa mayor de tres veces el límite superior normal","DHL discretamente elevada","Hiperproteinemia","Bilirrubina total normal"],0,"La lipasa o amilasa ≥3 veces el límite superior normal constituye uno de los tres criterios diagnósticos.",["Pancreatitis","Diagnóstico"]),
  q(9010,"EF-03",2,"Gastroenterología","Etiología biliar",pancreatitis+" El ultrasonido muestra litos vesiculares y el perfil hepático tiene patrón obstructivo.","¿Cuál es la etiología más probable?",["Autoinmune","Biliar","Traumática","Hipercalcémica"],1,"La presencia de litos y colestasis orienta a pancreatitis aguda biliar.",["Pancreatitis","Biliar"]),
  q(9011,"EF-03",3,"Gastroenterología","Escala temprana en pancreatitis",pancreatitis,"¿Qué escala puede calcularse desde el ingreso y repetirse durante las primeras 24 horas?",["Ranson completo","APACHE II","Child-Pugh","MELD-Na"],1,"APACHE II puede aplicarse desde el ingreso; Ranson requiere variables de ingreso y a las 48 horas.",["Pancreatitis","Gravedad"]),
  q(9012,"EF-03",4,"Gastroenterología","Indicación de CPRE",pancreatitis+" Presenta ictericia, fiebre, colestasis y dilatación de la vía biliar.","¿Cuál es la intervención indicada?",["CPRE temprana","Colecistectomía abierta inmediata en choque","Pancreatografía diagnóstica rutinaria","Nutrición parenteral exclusiva"],0,"La CPRE temprana está indicada ante pancreatitis biliar con colangitis u obstrucción biliar persistente.",["Pancreatitis","CPRE"]),

  q(9013,"EF-04",1,"Cardiología","Territorio inferior",acs+" El ECG muestra elevación del ST en DII, DIII y aVF.","¿Qué territorio está afectado?",["Anterior","Inferior","Lateral alta","Posterior"],1,"DII, DIII y aVF corresponden a la cara inferior.",["SCA","ECG"]),
  q(9014,"EF-04",2,"Cardiología","Biomarcador de necrosis",acs,"¿Cuál es el biomarcador más sensible y específico de lesión miocárdica?",["Mioglobina","Troponina cardiaca","DHL","AST"],1,"La troponina cardiaca de alta sensibilidad es el biomarcador de elección.",["SCA","Troponina"]),
  q(9015,"EF-04",3,"Cardiología","Reinfarto",acs+" Tres días después reaparece dolor y se sospecha reinfarto.","¿Qué biomarcador puede ser útil por normalizarse antes?",["CK-MB","Troponina T","BNP","Proteína C reactiva"],0,"CK-MB suele normalizarse en 48-72 horas y puede apoyar el diagnóstico de reinfarto.",["SCA","Reinfarto"]),
  q(9016,"EF-04",4,"Cardiología","Estratificación en SCASEST",acs+" No hay elevación persistente del ST.","¿Qué escala se utiliza para estratificar el riesgo isquémico y orientar la estrategia invasiva?",["Wells","GRACE","CHA2DS2-VASc","CURB-65"],1,"GRACE estima mortalidad en el síndrome coronario agudo sin elevación del ST.",["SCASEST","GRACE"]),

  q(9017,"EF-05",1,"Infectología","Meningitis tuberculosa",tbm,"¿Cuál es el diagnóstico más probable?",["Migraña con aura","Neuralgia del trigémino","Meningitis tuberculosa","Cefalea tensional"],2,"La evolución subaguda, síntomas constitucionales y contacto con tuberculosis orientan a meningitis tuberculosa.",["Tuberculosis","Meningitis"]),
  q(9018,"EF-05",2,"Neurología","Imagen antes de punción lumbar",tbm,"¿Cuál es el siguiente estudio antes de realizar punción lumbar?",["Tomografía de cráneo","Electroencefalograma","Radiografía de cráneo","Doppler carotídeo"],0,"El papiledema obliga a obtener neuroimagen antes de la punción lumbar por riesgo de herniación.",["Meningitis","Punción lumbar"]),
  q(9019,"EF-05",3,"Infectología","Vía de transmisión de tuberculosis",tbm,"¿Cuál es el mecanismo habitual de adquisición de tuberculosis?",["Ingesta de carne","Aerosoles respiratorios","Picadura de mosquito","Transmisión fecal-oral"],1,"M. tuberculosis se transmite por núcleos de gotitas suspendidos en el aire.",["Tuberculosis","Transmisión"]),

  q(9020,"EF-06",1,"Infectología","Síndrome mononucleósico",mono,"¿Cuál es el diagnóstico sindromático más probable?",["Síndrome mononucleósico agudo","Vasculitis ANCA","Aplasia medular","Leucemia mieloide crónica"],0,"La fiebre con esplenomegalia, citopenias y transaminitis es compatible con síndrome mononucleósico.",["EBV","Mononucleosis"]),
  q(9021,"EF-06",2,"Infectología","EBV agudo",mono,"¿Qué resultado serológico apoya infección aguda por virus Epstein-Barr?",["IgM anti-VCA positiva","IgG anti-EBNA aislada","IgG anti-VCA sin IgM","ANA positivo"],0,"La IgM contra el antígeno de la cápside viral aparece en la infección aguda; EBNA aparece más tarde.",["EBV","Serología"]),

  q(9022,"EF-07",1,"Neurología","Encefalitis herpética",encephalitis,"¿Cuál es el agente causal más probable?",["Virus herpes simple tipo 1","Virus de hepatitis A","Candida albicans","Mycoplasma pneumoniae"],0,"HSV-1 es la causa esporádica más frecuente de encefalitis grave en adultos.",["Encefalitis","HSV"]),
  q(9023,"EF-07",2,"Neurología","Tratamiento empírico de encefalitis",encephalitis,"¿Qué tratamiento debe iniciarse de inmediato?",["Aciclovir intravenoso","Oseltamivir oral","Fluconazol oral","Isoniazida aislada"],0,"Ante sospecha de encefalitis herpética debe iniciarse aciclovir IV sin esperar confirmación por PCR.",["Encefalitis","Aciclovir"]),

  q(9024,"EF-08",1,"Reumatología","Diagnóstico de pseudogota",joint,"¿Cuál es el diagnóstico más probable?",["Gota tofácea","Artritis por cristales de pirofosfato cálcico","Artritis reumatoide","Osteoartrosis no inflamatoria"],1,"La rodilla y la condrocalcinosis orientan a enfermedad por depósito de CPPD.",["Pseudogota","CPPD"]),
  q(9025,"EF-08",2,"Reumatología","Cristales de CPPD",joint,"¿Qué se espera encontrar en el líquido sinovial?",["Cristales en aguja con birrefringencia negativa","Cristales romboidales con birrefringencia positiva débil","Cristales de colesterol","Cuerpos de Heinz"],1,"CPPD produce cristales romboidales con birrefringencia positiva débil.",["Pseudogota","Cristales"]),

  q(9026,"EF-09",1,"Nefrología","Hiponatremia hipovolémica",sodium,"¿Qué tipo de hiponatremia presenta?",["Hipervolémica","Euvolémica","Hipovolémica","Pseudohiponatremia"],2,"Las pérdidas gastrointestinales producen depleción de volumen e hiponatremia hipovolémica.",["Hiponatremia","Hipovolemia"]),
  q(9027,"EF-09",2,"Nefrología","Azotemia prerrenal",sodium,"¿Qué relación BUN/creatinina se espera?",["Menor de 5:1","Aproximadamente 10:1","Mayor de 20:1","Siempre normal"],2,"La reabsorción aumentada de urea en hipoperfusión prerrenal eleva la relación BUN/creatinina por encima de 20:1.",["LRA","Prerrenal"]),
  q(9028,"EF-09",3,"Nefrología","Tratamiento de hiponatremia hipovolémica",sodium,"Si no presenta síntomas neurológicos graves, ¿cuál es el tratamiento inicial?",["Solución salina 0.9%","Restricción absoluta de sodio","Tolvaptán","Dextrosa al 5%"],0,"La reposición con solución salina isotónica corrige el estímulo hipovolémico para la secreción de ADH.",["Hiponatremia","Tratamiento"]),
  q(9029,"EF-09",4,"Nefrología","Corrección de hiponatremia",sodium+" Presenta convulsiones atribuibles a la hiponatremia.","¿Cuál es la conducta inmediata?",["Bolo de solución salina hipertónica al 3%","Corrección rápida hasta sodio normal","Agua libre intravenosa","Diurético tiazídico"],0,"La hiponatremia con síntomas neurológicos graves requiere bolos de solución hipertónica, con meta inicial de aumento de 4-6 mEq/L y vigilancia estrecha para evitar sobrecorrección.",["Hiponatremia","Hipertónica"]),

  q(9030,"EF-10",1,"Nefrología","Lesión renal postrenal",obstruction,"¿Qué tipo de lesión renal debe sospecharse?",["Prerrenal","Intrínseca glomerular","Postrenal","Vascular renal"],2,"El globo vesical indica retención urinaria y obstrucción de la vía urinaria baja.",["LRA","Obstrucción"]),
  q(9031,"EF-10",2,"Nefrología","Complicación de obstrucción",obstruction,"Si no se corrige, ¿a qué complicación puede conducir?",["Hidronefrosis y enfermedad renal crónica","Síndrome nefrótico inmediato","Acidosis tubular distal aislada","Glomerulonefritis rápidamente progresiva"],0,"La presión retrógrada sostenida produce hidronefrosis y daño renal crónico.",["Obstrucción","Hidronefrosis"]),

  q(9032,"EF-11",1,"Neumología","Diagnóstico espirométrico de EPOC",copd,"¿Qué hallazgo confirma obstrucción persistente al flujo aéreo?",["FEV1/FVC posbroncodilatador menor de 0.70","FVC mayor de 120%","FEV1/FVC prebroncodilatador mayor de 0.80","DLCO elevada como único dato"],0,"El criterio espirométrico clásico es FEV1/FVC posbroncodilatador <0.70.",["EPOC","Espirometría"]),
  q(9033,"EF-11",2,"Neumología","Intervención que modifica progresión",copd,"¿Qué intervención tiene mayor impacto sobre la progresión de la enfermedad?",["Suspender el tabaquismo","Antibiótico diario en todos","Corticoide inhalado aislado en todos","Oxígeno nocturno en todo paciente"],0,"El abandono del tabaco es la intervención principal para reducir la pérdida acelerada de función pulmonar.",["EPOC","Tabaquismo"]),
  q(9034,"EF-11",3,"Neumología","Broncodilatación en EPOC",copd,"¿Qué grupo farmacológico constituye la base del tratamiento inhalado de mantenimiento?",["LAMA y/o LABA","Antihistamínicos","Antileucotrienos aislados","Mucolíticos como monoterapia universal"],0,"Los broncodilatadores de larga acción LAMA y LABA son la base del tratamiento sintomático.",["EPOC","LAMA","LABA"]),

  q(9035,"EF-12",1,"Endocrinología","Diagnóstico bioquímico de feocromocitoma",pheo,"¿Cuál es la prueba bioquímica de elección?",["Metanefrinas plasmáticas libres o urinarias fraccionadas","Cortisol salival aislado","Aldosterona sin renina","TSH"],0,"Las metanefrinas plasmáticas libres o urinarias fraccionadas tienen alta sensibilidad.",["Feocromocitoma","Metanefrinas"]),
  q(9036,"EF-12",2,"Endocrinología","Preparación preoperatoria en feocromocitoma",pheo,"¿Cuál es la preparación farmacológica correcta antes de la resección?",["Betabloqueo antes del alfa bloqueo","Alfa bloqueo y después beta bloqueo si se requiere","Diurético tiazídico aislado","Ninguna preparación"],1,"Debe establecerse primero alfa bloqueo; agregar beta bloqueo antes puede precipitar crisis por estimulación alfa no opuesta.",["Feocromocitoma","Cirugía"]),

  q(9037,"EF-13",1,"Endocrinología","Marcador de carcinoma medular",thyroid,"¿Qué marcador se eleva característicamente en carcinoma medular de tiroides?",["Tiroglobulina","Calcitonina","T4 libre","TRAb"],1,"Las células C producen calcitonina, marcador del carcinoma medular.",["Tiroides","Carcinoma medular"]),
  q(9038,"EF-13",2,"Endocrinología","Lavado de aguja ganglionar",thyroid,"¿Qué medición en el lavado de la aguja aumenta el rendimiento para detectar metástasis ganglionar de carcinoma diferenciado?",["Tiroglobulina","TSH","T3 total","Cortisol"],0,"La tiroglobulina en el lavado de la BAAF ganglionar complementa la citología.",["Tiroides","BAAF"]),
  q(9039,"EF-13",3,"Endocrinología","Genética en carcinoma medular",thyroid,"¿Qué gen debe estudiarse en el carcinoma medular de tiroides?",["RET","HFE","CFTR","JAK2"],0,"El estudio germinal de RET permite identificar MEN2 y orientar el estudio familiar.",["Tiroides","RET"]),

  q(9040,"EF-14",1,"Endocrinología","Patrón gammagráfico de Graves",graves,"¿Qué patrón se espera en la gammagrafía tiroidea?",["Captación difusa aumentada","Ausencia total de captación en todos los casos","Nódulo frío único","Captación exclusiva ganglionar"],0,"Graves produce estimulación difusa del receptor de TSH y captación homogénea aumentada.",["Graves","Gammagrafía"]),
  q(9041,"EF-14",2,"Endocrinología","Tratamiento quirúrgico de Graves",graves+" Tiene bocio grande y se decide tratamiento quirúrgico.","¿Cuál es el procedimiento definitivo preferido?",["Lobectomía unilateral","Tiroidectomía total o casi total","Ablación ganglionar aislada","Yodo radioactivo después de toda cirugía de rutina"],1,"La tiroidectomía total o casi total reduce recurrencia; el yodo ablativo posterior no es rutinario en Graves.",["Graves","Cirugía"]),

  q(9042,"EF-15",1,"Nefrología","Lesión renal asociada a contraste",renal,"¿Cuál es el diagnóstico más probable?",["Lesión renal aguda asociada a contraste","Síndrome hepatorrenal","Nefritis lúpica","Obstrucción ureteral bilateral demostrada"],0,"El incremento de creatinina después de contraste, sin otra causa dominante, sugiere lesión renal aguda asociada a contraste.",["Contraste","LRA"]),
  q(9043,"EF-15",2,"Nefrología","Mecanismo de lesión por contraste",renal,"¿Qué mecanismo participa en esta lesión?",["Vasoconstricción renal y toxicidad tubular directa","Cristalización obligatoria del contraste en todos los túbulos","Depósito lineal de IgG","Obstrucción por cálculos de urato"],0,"La fisiopatología incluye alteraciones hemodinámicas con vasoconstricción medular y toxicidad tubular; no se explica por cristalización tubular como mecanismo principal.",["Contraste","Fisiopatología"]),

  q(9044,"EF-16",1,"Medicina crítica","Hipotensión en sepsis",sepsis,"¿Qué mecanismo explica principalmente la hipotensión distributiva?",["Vasodilatación inducida por mediadores inflamatorios","Obstrucción fija del tracto de salida","Hemólisis aislada","Hipersecreción de aldosterona"],0,"La pérdida del tono vascular por mediadores inflamatorios es central en el choque séptico.",["Sepsis","Choque"]),
  q(9045,"EF-16",2,"Medicina crítica","PAM objetivo en choque séptico",sepsis,"¿Cuál es la meta inicial habitual de presión arterial media?",["45 mmHg","55 mmHg","65 mmHg","100 mmHg"],2,"La meta inicial recomendada suele ser una PAM de 65 mmHg, individualizada según respuesta y comorbilidades.",["Sepsis","PAM"]),

  q(9046,"EF-17",1,"Neumología","TEP inestable",pep,"Si no es posible trasladarlo de inmediato a tomografía, ¿qué estudio a pie de cama puede apoyar una decisión urgente?",["Ecocardiografía enfocada y ultrasonido venoso","Espirometría","Prueba de metacolina","Radiografía de senos paranasales"],0,"En inestabilidad extrema, la ecocardiografía puede mostrar sobrecarga aguda del ventrículo derecho y el ultrasonido venoso trombosis proximal; la angio-TC sigue siendo el estándar cuando es factible.",["TEP","Inestabilidad"]),

  q(9047,"EF-18",1,"Infectología","Complicación de chikungunya",chik,"¿Cuál es una complicación característica?",["Artralgias o artritis inflamatoria crónica","Cirrosis fulminante universal","Glomeruloesclerosis focal","Parálisis flácida en todos los casos"],0,"Las manifestaciones articulares pueden persistir durante meses o años.",["Chikungunya","Artritis"]),
  q(9048,"EF-18",2,"Infectología","Tratamiento inicial de arbovirosis",chik,"Mientras no se descarte dengue, ¿qué analgésico se prefiere inicialmente?",["Paracetamol","Ácido acetilsalicílico","Ketorolaco","Warfarina"],0,"Se prefiere paracetamol y se evitan AINE/ASA hasta descartar dengue por el riesgo hemorrágico.",["Chikungunya","Tratamiento"]),

  q(9049,"EF-19",1,"Nefrología","Anticuerpo en nefropatía membranosa",membranous,"¿Qué anticuerpo se asocia con mayor frecuencia a la forma primaria?",["Anti-PLA2R","Anti-MBG","Anti-Ro","Anti-CCP"],0,"Anti-PLA2R es el principal autoanticuerpo de la nefropatía membranosa primaria.",["Membranosa","PLA2R"]),
  q(9050,"EF-19",2,"Nefrología","Biopsia en nefropatía membranosa",membranous,"¿Qué patrón se espera en inmunofluorescencia?",["Depósito lineal de IgG","Depósitos granulares de IgG y C3","Ausencia completa de depósitos","Depósitos mesangiales exclusivos de IgA"],1,"La membranosa muestra depósitos granulares capilares de IgG y C3, con depósitos subepiteliales en microscopía electrónica.",["Membranosa","Biopsia"]),
];

export default efiserRecalledCases;
