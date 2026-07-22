const headings=["Definición","Epidemiología","Fisiopatología","Clasificación","Factores de riesgo","Manifestaciones clínicas","Diagnóstico","Estudios de laboratorio","Estudios de imagen y gabinete","Diagnóstico diferencial","Tratamiento actualizado","Manejo de complicaciones","Seguimiento","Pronóstico","Perlas clínicas de alto rendimiento para EFISER","Trampas frecuentes del examen","Tablas comparativas","Algoritmos diagnósticos y terapéuticos","Relación con el examen EFISER previo","Casos clínicos nuevos tipo EFISER","Preguntas tipo EFISER R2-R3"];
const make=(id,title,specialty,trigger,items,table,algorithm,refs,caseSets)=>({
  id,title,specialty,updated:"2026-07",priority:"EFISER alta",trigger,refs,caseSets,
  sections:headings.map((heading,i)=>({
    heading,
    body:i<16?items[i]:i===16?table:i===17?algorithm:i===18?trigger:i===19?"Casos vinculados: "+caseSets.join(", ")+". Cada opción incluye retroalimentación.":"Reactivos R2-R3 vinculados: "+caseSets.join(", ")+"."
  }))
});

const libraryChapters=[
make("preeclampsia","Preeclampsia","Ginecoobstetricia",
"Tema priorizado por la recopilación del examen previo. El texto extraíble de Efiser.pdf no conserva un bloque literal completo; la ampliación se marca como evidencia externa.",
[
"HTA de novo después de 20 semanas (≥140/90 en dos mediciones) más proteinuria o disfunción materna de órgano blanco. PA persistente ≥160/110 es grave y requiere tratamiento urgente.",
"Complica 2-8% de embarazos y causa mortalidad materna/perinatal. Puede iniciar en el puerperio.",
"Placentación anómala y remodelado incompleto de arterias espirales → hipoperfusión y desequilibrio angiogénico (↑sFlt-1/↓PlGF) → disfunción endotelial, vasoconstricción, fuga capilar y coagulación.",
"Sin o con severidad. Severidad: PA grave, plaquetas <100,000, creatinina >1.1 o duplicación, AST/ALT ≥2 veces con dolor, edema pulmonar o síntomas neurológicos. HELLP = hemólisis+enzimas elevadas+plaquetas bajas.",
"Alto riesgo: preeclampsia previa, multifetal, HTA crónica, diabetes, ERC o autoinmunidad. Moderado: nuliparidad, obesidad, edad ≥35, historia familiar y determinantes sociales.",
"Puede ser asintomática; cefalea, fosfenos, epigastralgia/HD, disnea, oliguria y edema brusco. Eclampsia = convulsión no explicada por otra causa.",
"Proteinuria ≥300 mg/24 h, P/C ≥0.3 o tira 2+ si no hay cuantificación. Sin proteinuria, HTA+órgano blanco basta. Evaluar feto.",
"BH/plaquetas, creatinina, AST/ALT, bilirrubina/LDH si hemólisis y proteinuria. Ácido úrico no diagnostica.",
"US de crecimiento/líquido y Doppler umbilical si RCIU. Neuroimagen ante focalidad, coma, cefalea atípica o PRES; imagen pulmonar si edema.",
"HTA gestacional, HTA crónica sobreagregada, hígado graso agudo, TTP/SHU, lupus, feocromocitoma, trombosis venosa cerebral.",
"Nacimiento es definitivo. PA grave: labetalol IV, hidralazina IV o nifedipino oral inmediata en 30-60 min. MgSO4 previene/trata convulsión. Aspirina 81-150 mg/d desde 12-28 sem (ideal <16) en alto riesgo.",
"Eclampsia: ABC, MgSO4 4-6 g carga y 1-2 g/h, controlar PA y nacimiento. Toxicidad por Mg: suspender y gluconato de calcio. Manejar HELLP, DPPNI, edema, AKI/CID.",
"PA dentro de 72 h si grave y a 7-10 días; control 6-12 semanas. Educar riesgo CV/renal futuro.",
"Riesgo de recurrencia, HTA crónica, cardiopatía, EVC y ERC; inicio temprano/severidad empeoran desenlace.",
"Proteinuria no es obligatoria. MgSO4 no es antihipertensivo. No retrasar tratamiento de PA grave. Puede debutar posparto.",
"Trampas: exigir edema/proteinuria; esperar 4 h con PA grave; usar MgSO4 para bajar PA; asumir resolución inmediata posparto."
],
"HTA gestacional: PA sin proteinuria/órgano blanco. Preeclampsia: PA+proteinuria u órgano blanco. Crónica: previa o <20 sem. Sobreagregada: nueva proteinuria/órgano blanco o deterioro sobre HTA crónica.",
"Confirmar PA → si ≥160/110 persistente tratar ya → BH/Cr/AST-ALT/proteinuria+feto → clasificar severidad → MgSO4 si severa/eclampsia → nacimiento o manejo expectante experto según edad gestacional/estabilidad.",
["https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2020/06/gestational-hypertension-and-preeclampsia"],["EF-PREE-01","EF-PREE-02"]),

make("rta","Acidosis tubular renal","Nefrología",
"Caso recordado: K 2.2, pH 7.05 y K urinario 8. Esos tres datos no tipifican ATR; faltan anion gap, pH urinario, Na/Cl urinarios y estimación de NH4+. Forzar tipo 1 solo con ellos sería un error.",
[
"Defectos de acidificación renal que causan acidosis metabólica hiperclorémica con anion gap normal y TFG relativamente preservada.",
"Adquirida es más frecuente: autoinmunidad/fármacos en distal; Fanconi/fármacos en proximal; diabetes/ERC y bloqueadores SRAA en tipo 4.",
"Tipo 1: falla secreción distal H+ y NH4+, orina alcalina, hipocitraturia y pérdida K. Tipo 2: pérdida proximal HCO3, con acidificación distal conservada al bajar HCO3. Tipo 4: hipoaldosteronismo/resistencia y menor amoniogénesis por hiperkalemia.",
"Tipo 1 distal hipokalémica; tipo 2 proximal hipokalémica; tipo 4 hiperkalémica. Tipo 3 no se usa como entidad independiente.",
"Distal: Sjögren, LES, anfotericina, genes SLC4A1/ATP6V1B1/ATP6V0A4/FOXI1/WDR72. Proximal: acetazolamida, tenofovir, mieloma, SLC4A4/Fanconi. Tipo 4: diabetes, AINE, heparina, IECA/ARA-II, trimetoprim.",
"Debilidad, parálisis/arritmia por K, osteomalacia. Distal: litiasis/nefromcalcinosis. Proximal: glucosuria normoglucémica, fosfaturia y aminoaciduria. Tipo 4: hiperkalemia.",
"Confirmar acidosis y anion gap. En NAGMA medir pH urinario fresco y UAG=Na+K−Cl u osmolal gap. UAG negativa favorece diarrea; positiva, defecto renal de NH4+.",
"Gasometría, Na/K/Cl/HCO3/Cr/Ca/P/Mg; EGO, pH, Na/K/Cl urinarios, citrato/calcio. K urinario aislado requiere creatinina o 24 h.",
"US/TC para litiasis/nefromcalcinosis; densitometría si crónica; audiometría en genética.",
"Diarrea, fístulas, exceso de cloro, ERC, cetoacidosis en resolución, tolueno. K urinario 8 sugiere conservación, pero depende de concentración y volumen.",
"K 2.2 se corrige antes del álcali. Distal: citrato K/bicarbonato 1-2 mEq/kg/d. Proximal: >10 mEq/kg/d, K, a veces tiazida y P/vit D. Tipo 4: retirar causa, bajar K, diurético/quelante; fludrocortisona seleccionada.",
"pH 7.05+K 2.2: monitorización, ECG, Mg y K IV prudente; vigilar arritmia/rabdomiólisis/debilidad respiratoria. Bicarbonato puede agravar K.",
"Control K/HCO3/Cr, pH/citrato/calcio, adherencia; audición/crecimiento/dientes en genética.",
"Sin tratar: enfermedad ósea, crecimiento bajo, litiasis, nefrocalcinosis y ERC.",
"Distal requiere pH urinario >5.5 inapropiado y NH4+ bajo/UAG positiva. Proximal puede acidificar <5.5. Tipo 4 tiene K alto.",
"Trampas: usar solo pH urinario; interpretar K urinario sin creatinina; dar bicarbonato antes de K crítico; olvidar diarrea."
],
"Tipo 1: K↓, pH U>5.5, UAG+, litiasis. Tipo 2: K↓, pH variable/<5.5 al estabilizar, Fanconi, álcali alto. Tipo 4: K↑, pH U usual <5.5, NH4+ bajo, diabetes/hipoaldosteronismo.",
"Acidemia → AG → NAGMA → revisar diarrea/fármacos/TFG → K → pH U+UAG/osmolal gap → distinguir distal/proximal/tipo4 → corregir K crítico antes del álcali.",
["https://www.nature.com/articles/s41581-023-00699-9","https://www.ncbi.nlm.nih.gov/books/NBK519044/"],["EF-RTA-01","EF-RTA-02"]),

make("nephrotic","Síndrome nefrótico","Nefrología",
"Tema priorizado por bancos EFISER; la reconstrucción previa incluye nefropatía membranosa y anti-PLA2R. Se amplían genética, histología y tratamiento KDIGO.",
[
"Proteinuria intensa (adulto usual ≥3.5 g/d), hipoalbuminemia y edema, con hiperlipidemia/lipiduria frecuentes.",
"En niños predomina cambios mínimos; en adultos, membranosa, FSGS y causas secundarias. Diabetes es causa global importante.",
"Daño podocitario/subepitelial aumenta permeabilidad. Hipoalbuminemia+retención de Na causan edema; pérdida de antitrombina/Ig y síntesis hepática explican trombosis, infección e hiperlipidemia.",
"Primario: MCD, FSGS, membranosa. Secundario: diabetes, LES, amiloide, infección, fármacos, cáncer. Pediátrico: sensible, dependiente, recaedor o resistente a esteroide.",
"Diabetes, lupus, HBV/HCV/VIH, sífilis, neoplasia, AINE/litio, obesidad. SRNS: NPHS1/2, WT1, LAMB2, INF2, TRPC6, ACTN4, COQ y APOL1 según fenotipo.",
"Edema, ascitis/derrames, orina espumosa; trombosis renal/TEP, infección y AKI. Hematuria/HTA/TFG baja sugieren componente nefrítico/secundario.",
"Cuantificar proteína, albúmina, creatinina y sedimento; excluir secundaria. Biopsia en mayoría de adultos sin causa clara y niños atípicos/resistentes.",
"EGO/P:C o 24 h, albúmina/lípidos/Cr/HbA1c, ANA/complemento, HBV/HCV/VIH, electroforesis. Anti-PLA2R/THSD7A y genética según contexto.",
"US antes de biopsia; Doppler/angio-TC si trombosis. Histología: MCD LM casi normal/EM fusión; FSGS esclerosis segmentaria; membranosa depósitos subepiteliales.",
"IC/cirrosis/enteropatía/desnutrición; proteinuria tubular/overflow; síndrome nefrítico. En membranosa excluir cáncer, infección, lupus y fármaco.",
"Sodio/diurético, IECA/ARA-II, iSGLT2 cuando indicado, estatina/riesgo y vacunas. MCD: esteroide; FSGS primaria: esteroide/CNI; membranosa: rituximab, ciclofosfamida-esteroide o CNI según riesgo. SRNS: CNI+genética.",
"Edema resistente: bloqueo secuencial vigilado. Anticoagular trombosis; profilaxis individualizada (membranosa/albúmina muy baja). Tratar infección y evitar AINE/depleción.",
"Peso/PA/edema/proteína/albúmina/Cr y toxicidad. Anti-PLA2R seriado anticipa respuesta. Vigilar nefrotoxicidad CNI.",
"Remisión de proteinuria domina pronóstico. FSGS genética/colapsante y membranosa de alto riesgo progresan más. Genética evita inmunosupresión inútil.",
"Anti-PLA2R apoya membranosa pero no borra evaluación secundaria. EM, no LM, muestra fusión. Albúmina muy baja eleva trombosis.",
"Trampas: esteroide a todo adulto; anticoagular a todos; olvidar genética en adulto joven; tratar FSGS secundaria como primaria."
],
"MCD: LM normal/EM fusión, esteroide sensible. FSGS: esclerosis segmentaria, primaria/secundaria/genética. Membranosa: subepitelial, anti-PLA2R, trombosis. Amiloide: Congo rojo verde manzana.",
"Confirmar síndrome → sedimento/TFG+secundarias → anti-PLA2R/genética → biopsia si indicada → soporte → inmunoterapia específica por histología/riesgo → vigilar remisión/toxicidad.",
["https://kdigo.org/guidelines/gd/","https://kdigo.org/guidelines/nephrotic-syndrome-in-children/"],["EF-NEPHROTIC-01","EF-NEPHROTIC-02"]),

make("thyroiditis","Tiroiditis","Endocrinología",
"Caso reconstruido: dolor tiroideo >2 meses. Efiser.pdf prioriza patología tiroidea (Graves/cáncer); este capítulo amplía tiroiditis con el resumen Word y ATA.",
[
"Inflamación tiroidea autoinmune, postviral, bacteriana, farmacológica o fibrosante. Tirotoxicosis destructiva libera hormona almacenada, no la sintetiza.",
"Hashimoto es causa frecuente de hipotiroidismo. De Quervain dura semanas-meses. Posparto afecta ~5%, más con anti-TPO.",
"De Quervain granulomatosa rompe folículos → tirotoxicosis, posible hipotiroidismo y recuperación. Painless/posparto es autoinmune; supurativa infecciosa.",
"Dolorosa: subaguda y supurativa. Indolora: Hashimoto, painless, posparto, fármacos. Riedel es fibrosante.",
"De Quervain postviral/HLA-B35. Posparto: anti-TPO, DM1, episodio previo. Fármacos: amiodarona, litio, interferón, checkpoint. Supurativa: inmunosupresión/fístula piriforme.",
"De Quervain: dolor a mandíbula/oído, fiebre y tiroides sensible >2 meses posible. Painless: palpitaciones sin dolor. Supurativa: dolor focal/toxicidad. Hashimoto: bocio firme/hipotiroidismo.",
"TSH/T4L/T3 y VSG/PCR. Captación baja confirma destructiva frente a Graves. Aspirar/cultivar si supurativa.",
"De Quervain: VSG/PCR altas, Tg alta, TRAb negativo; anti-TPO variable. Posparto: anti-TPO frecuente. Facticia: Tg baja.",
"US: áreas hipoecoicas parcheadas y flujo bajo; Graves hipervascular. Gammagrama: captación baja. Absceso: colección focal/TC si extensión.",
"Graves, hemorragia nodular, carcinoma invasor, absceso/linfadenitis, dolor muscular y AIT.",
"Leve: AINE+betabloqueador; refractaria/moderada-grave: prednisona y descenso. No tionamida en destructiva. Supurativa: antibiótico+drenaje. LT4 si fase hipo sintomática/intensa/embarazo.",
"Vigilar arritmia/IC, hipotiroidismo y recaída. Absceso amenaza vía aérea/sepsis.",
"TSH/T4L cada 4-6 semanas. Posparto: buscar fase hipo 4-8 semanas después; TSH anual si recupera.",
"De Quervain suele resolver; minoría queda hipo. Posparto recupera 12-18 meses, pero una fracción queda permanente.",
"Dolor+VSG alta+captación/flujo bajos = De Quervain. TRAb/captación separan Graves. Antitiroideos no funcionan en destrucción.",
"Trampas: metimazol; anti-TPO como prueba única; confundir hipoecogenicidad con cáncer; olvidar absceso con fiebre focal."
],
"De Quervain: dolor/VSG alta/captación baja/AINE-esteroide. Graves: TRAb/captación y flujo altos/tionamida. Posparto: indolora/anti-TPO/captación baja/betabloqueador. Supurativa: colección/antibiótico+drenaje.",
"TSH baja+dolor → VSG/PCR+US Doppler → flujo/captación bajos: destructiva → AINE y esteroide si refractaria; colección: aspirar+antibiótico → monitorizar fase hipo.",
["https://www.thyroid.org/postpartum-thyroiditis/","https://www.thyroid.org/thyroidguidelines/file/THY_2010_0417.pdf"],["EF-THYR-01","EF-THYR-02"]),
];

export default libraryChapters;
