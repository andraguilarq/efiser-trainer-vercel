export const chapterHeadings=["Definición","Epidemiología","Fisiopatología","Clasificación","Factores de riesgo","Manifestaciones clínicas","Diagnóstico","Estudios de laboratorio","Estudios de imagen y gabinete","Diagnóstico diferencial","Tratamiento actualizado","Manejo de complicaciones","Seguimiento","Pronóstico","Perlas clínicas de alto rendimiento para EFISER","Trampas frecuentes del examen","Tablas comparativas","Algoritmos diagnósticos y terapéuticos","Relación con el examen EFISER previo","Casos clínicos nuevos tipo EFISER","Preguntas tipo EFISER R2-R3"];

export const buildChapter=(id,title,specialty,trigger,items,comparison,algorithm,refs,caseSets)=>({
  id,title,specialty,updated:"2026-07",priority:"EFISER alta",trigger,refs,caseSets,
  sections:chapterHeadings.map((heading,index)=>({
    heading,
    body:index<16?items[index]:index===16?comparison:index===17?algorithm:index===18?trigger:index===19?"Casos vinculados: "+caseSets.join(", ")+". Cada opción incluye retroalimentación.":"Reactivos R2-R3 vinculados: "+caseSets.join(", ")+"."
  }))
});
