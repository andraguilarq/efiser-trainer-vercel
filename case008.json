import compact from "./compactWordCases.js";

function packRows(p) {
  const mk=(suffix,extra,q,opts,ans,r,key)=>[`${p.n}: ${suffix}`,p.tags,`${p.patient} ${p.clues} ${extra}`,q,opts,ans,r,key];
  return [
    mk("integración diagnóstica","",p.qd||"¿Cuál es el diagnóstico más probable?",p.dx,0,p.rd,p.key),
    mk("estudio que cambia conducta",p.studyCase||"La duda diagnóstica persiste pese a la evaluación inicial.",p.qs||"¿Cuál es el siguiente estudio más útil?",p.tests,0,p.rs,p.studyKey||p.key),
    mk("tratamiento prioritario",p.treatmentCase||"El diagnóstico se confirma y no hay una contraindicación no mencionada.",p.qt||"¿Cuál es la conducta terapéutica más apropiada?",p.tx,0,p.rt,p.txKey||p.key),
    mk("complicación crítica",p.compCase||"Durante la evolución aparece deterioro clínico.",p.qc||"¿Qué complicación debe buscarse o tratarse primero?",p.comp,0,p.rc,p.compKey||p.key),
    mk("trampa EFISER",p.diffCase||"Un dato adicional obliga a reconsiderar diagnósticos cercanos.",p.qf||"¿Qué opción integra mejor el dato discriminador?",p.diff,0,p.rf,p.diffKey||p.key),
  ];
}

export function buildPacks(config, packs) {
  return compact(config, packs.flatMap(packRows));
}
