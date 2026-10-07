/* Atlas de Ventilación Mecánica — preguntas de opción múltiple. Fuente: content-src/paket (los números de fuente son comunes a todo el paquete). */
window.MVA_QUIZ = [
  {
    id: "m-vc-cmv", mode: "vc-cmv", topic: "mod",
    q: "En VC-CMV, si aumenta la resistencia de la vía aérea (R) manteniendo el mismo VT y el mismo flujo inspiratorio, ¿qué se espera ver primero en la pantalla?",
    o: [
      "Aumenta la presión pico (Ppeak); la presión resulta de la mecánica",
      "Como el dispositivo mantiene la presión constante, disminuye el VT administrado",
      "La onda de flujo inspiratorio adopta por sí sola una forma decreciente",
      "La Pplat y la ΔP disminuyen en proporción al aumento de la resistencia"
    ],
    a: 0,
    ex: "En VC se aplica el patrón de volumen/flujo seleccionado y la presión necesaria resulta de la mecánica del paciente. Con el mismo VT y flujo, un aumento de R eleva la presión pico y una disminución de C eleva la presión elástica.",
    src: [1, 3, 16, 38]
  },
  {
    id: "m-pc-cmv", mode: "pc-cmv", topic: "mod",
    q: "En PC-CMV, sin cambiar el ajuste de presión, ¿qué puede ocurrir si mejora la distensibilidad o si el paciente realiza un esfuerzo intenso?",
    o: [
      "El dispositivo reduce la presión inspiratoria para mantener constante el VT",
      "El VT no cambia; solo disminuye claramente la presión pico",
      "El VT puede aumentar; limitar la presión no es limitar el volumen",
      "La respiración termina antes de tiempo al alcanzar el umbral de flujo"
    ],
    a: 2,
    ex: "En PC se fijan la presión y el tiempo; el volumen es resultado de C, R, Ti y el esfuerzo del paciente. Cuando mejora C o aparece un esfuerzo intenso, el VT puede aumentar; limitar la presión no equivale a limitar el volumen ni la tensión transpulmonar.",
    src: [1, 3, 16]
  },
  {
    id: "m-vc-simv", mode: "vc-simv", topic: "mod",
    q: "En VC-SIMV el paciente respira espontáneamente entre las respiraciones obligatorias. ¿Cuál es la interpretación correcta de esta situación?",
    o: [
      "Que el paciente respire espontáneamente entre ellas demuestra que la carga está suficientemente soportada",
      "El esfuerzo en las respiraciones espontáneas puede ser distinto del de las obligatorias",
      "Las respiraciones espontáneas intercaladas también se administran con el VT obligatorio ajustado",
      "Reducir la frecuencia obligatoria sustituye a la evaluación diaria con SBT"
    ],
    a: 1,
    ex: "En SIMV, las respiraciones obligatorias y espontáneas se generan con reglas de control distintas; el esfuerzo puede diferir entre ambos tipos de respiración. En el destete, reducir la frecuencia obligatoria no debe sustituir a la evaluación diaria actual con SBT.",
    src: [1, 15, 16, 11]
  },
  {
    id: "m-pc-simv", mode: "pc-simv", topic: "mod",
    q: "Al usar PC-SIMV, ¿cuál de los siguientes es un error frecuente señalado en la ficha?",
    o: [
      "Ajustar la presión obligatoria, el Ti y la frecuencia por separado de la PS",
      "Considerar la PEEP y la FiO₂ como base común para ambos tipos de respiración",
      "Vigilar por separado el VT de las respiraciones espontáneas intercaladas",
      "Considerar el nivel de PS igual a la presión inspiratoria obligatoria"
    ],
    a: 3,
    ex: "En PC-SIMV, las respiraciones obligatorias se definen por presión y tiempo, y las espontáneas intercaladas, si las hay, se soportan con una PS aparte. Confundir el nivel de PS con la presión inspiratoria obligatoria y suponer que el VT de las respiraciones intercaladas es seguro son errores frecuentes.",
    src: [1, 15, 16, 11]
  },
  {
    id: "m-prvc", mode: "prvc", topic: "mod",
    q: "En la familia PRVC, si con un esfuerzo intenso del paciente el VT medido supera el objetivo, ¿cuál es la respuesta probable del algoritmo y la interpretación correcta?",
    o: [
      "Aumenta la presión; el VT objetivo queda garantizado en cada respiración",
      "Cambia a respiraciones VC de flujo constante para fijar el volumen",
      "Puede reducir la presión; esto puede ocultar el aumento del trabajo del paciente",
      "La presión no cambia; solo se acorta el Ti de la siguiente respiración"
    ],
    a: 2,
    ex: "En PRVC, el control instantáneo es la presión y el objetivo de retroalimentación es el volumen. Cuando el VT aumenta por un esfuerzo intenso, el algoritmo puede reducir la presión; no se debe concluir que “menos presión es mejor” sin advertir que el trabajo del paciente ha aumentado, y el objetivo no está garantizado en cada respiración.",
    src: [15, 16, 18, 19]
  },
  {
    id: "m-prvc-simv", mode: "prvc-simv", topic: "mod",
    q: "En SIMV con presión adaptativa con objetivo de volumen, ¿a qué respiraciones corresponde la adaptación de la presión según el VT objetivo?",
    o: [
      "A las respiraciones obligatorias; las respiraciones espontáneas en PS se soportan por separado",
      "Se aplica por igual a las respiraciones obligatorias y a las espontáneas",
      "Corresponde solo a las respiraciones espontáneas en PS disparadas por el paciente",
      "A ninguna; el VT objetivo funciona solo como umbral de alarma"
    ],
    a: 0,
    ex: "La adaptación según el VT objetivo corresponde a las respiraciones obligatorias; no se espera que las respiraciones espontáneas en PS alcancen el mismo volumen. Para evitar el error de “la pantalla muestra un VT objetivo, luego cada respiración tiene ese volumen”, se vigilan por separado el volumen total y cada tipo de respiración.",
    src: [15, 16, 18]
  },
  {
    id: "m-psv", mode: "psv", topic: "mod",
    q: "En PSV, ¿qué es correcto respecto al final de la inspiración y al VT?",
    o: [
      "Termina con el Ti ajustado; el VT queda fijado en el valor ajustado",
      "Termina al alcanzar el VT ajustado; la presión resulta de la mecánica",
      "Termina al alcanzar el límite de alarma de presión; el VT depende solo del nivel de PEEP",
      "Suele terminar por un umbral de flujo; el VT varía con el esfuerzo y la mecánica"
    ],
    a: 3,
    ex: "En PSV el paciente inicia la respiración, el dispositivo aporta una presión de ayuda sobre la PEEP y la inspiración suele terminar por un umbral de flujo. Una presión de ayuda constante no implica un volumen constante; si no hay un soporte de respaldo eficaz en apnea, no asegura una ventilación suficiente.",
    src: [1, 6, 16, 11]
  },
  {
    id: "m-cpap", mode: "cpap", topic: "mod",
    q: "¿Cuál de las siguientes afirmaciones sobre la CPAP pura es correcta?",
    o: [
      "En apnea, el dispositivo administra respiraciones de respaldo temporizadas a la frecuencia ajustada",
      "No hay VT definido ni frecuencia obligatoria; el trabajo corriente recae en el paciente",
      "En cada inspiración añade una PS fija sobre el nivel basal de presión",
      "En ninguna circunstancia puede influir en la eliminación de CO₂"
    ],
    a: 1,
    ex: "La CPAP proporciona un nivel basal de presión positiva durante todo el ciclo respiratorio; en la CPAP pura no hay PS adicional, VT definido ni frecuencia obligatoria. Tanto “la CPAP no puede influir en absoluto en el CO₂” como “administra respiraciones en apnea” son generalizaciones erróneas.",
    src: [10, 16, 41]
  },
  {
    id: "m-volume-support", mode: "volume-support", topic: "mod",
    q: "¿Cuál es la diferencia fundamental entre Volume Support (VS) y el PRVC obligatorio?",
    o: [
      "En VS la presión se mantiene constante y solo cambia el Ti según el VT objetivo",
      "En VS las respiraciones son disparadas por el paciente y suelen ciclarse por flujo",
      "En VS el dispositivo administra respiraciones obligatorias disparadas por tiempo",
      "VS tiene como objetivo y completa la ventilación minuto en lugar del volumen"
    ],
    a: 1,
    ex: "VS adapta el nivel de PS respiración a respiración para acercarse al VT objetivo en las respiraciones espontáneas; la respiración es disparada por el paciente y suele ciclarse por flujo. No es la misma secuencia respiratoria que el PRVC obligatorio; un esfuerzo elevado y la fuga pueden falsear la adaptación.",
    src: [18, 19]
  },
  {
    id: "m-bilevel", mode: "bilevel", topic: "mod",
    q: "En la ventilación invasiva con dos niveles de presión (p. ej., Dräger BIPAP), ¿cuál es el error frecuente señalado en la ficha?",
    o: [
      "Permitir la respiración espontánea en ambos niveles de presión",
      "Comprobar respecto a qué nivel de presión se define la PS",
      "Considerar la diferencia de presión y los tiempos como determinantes del volumen obligatorio",
      "Olvidar sumar al VT obligatorio el volumen espontáneo del nivel superior"
    ],
    a: 3,
    ex: "La diferencia de presión y el tiempo de permanencia en cada nivel forman el componente de volumen obligatorio; las respiraciones espontáneas se suman a este. No tener en cuenta el volumen espontáneo del nivel superior o considerarlo automáticamente APRV es un error; el BIPAP de Dräger no es el mismo concepto que la BiPAP S/T con mascarilla.",
    src: [16, 17]
  },
  {
    id: "m-aprv", mode: "aprv", topic: "mod",
    q: "En APRV, ¿cuál es la interpretación correcta de un ajuste bajo de Plow?",
    o: [
      "No significa que la PEEP alveolar esté al mismo nivel",
      "Indica que con un Tlow corto la presión alveolar desciende hasta Plow",
      "Indica que el volumen de liberación lo determina solo Plow",
      "Indica que el riesgo de hiperinsuflación ha desaparecido"
    ],
    a: 0,
    ex: "En APRV, el volumen de liberación varía con la diferencia de presión, el tiempo y la mecánica. Que Plow sea bajo no significa que la PEEP alveolar sea la misma; pueden pasar desapercibidos un VT espontáneo grande, un esfuerzo excesivo, la hiperinsuflación y el efecto hemodinámico.",
    src: [14, 17, 8]
  },
  {
    id: "m-mmv", mode: "mmv", topic: "mod",
    q: "En MMV, si el paciente alcanza la ventilación minuto objetivo con una respiración rápida y superficial, ¿qué cabe esperar?",
    o: [
      "El dispositivo mide la ventilación alveolar y añade respiraciones obligatorias",
      "La frecuencia de respiraciones obligatorias se aumenta automáticamente",
      "Aunque se alcance el VE objetivo, la ventilación eficaz puede ser insuficiente",
      "Como se alcanza el objetivo de VE, no es necesario vigilar el CO₂"
    ],
    a: 2,
    ex: "En MMV lo que se controla es el volumen minuto total; el mismo VE puede generar distinta ventilación alveolar con distintas combinaciones de VT/frecuencia. Una respiración rápida y superficial puede alcanzar el VE objetivo mientras la ventilación eficaz es insuficiente; alcanzar el VE objetivo no sustituye a la vigilancia del CO₂ y del esfuerzo.",
    src: [17, 44]
  },
  {
    id: "m-pav-plus", mode: "pav-plus", topic: "mod",
    q: "¿Cuál de las siguientes afirmaciones sobre PAV+ es correcta?",
    o: [
      "Administra en cada respiración una presión de ayuda fija ajustada",
      "También proporciona un soporte completo y seguro en el paciente apneico, sin impulso respiratorio",
      "En PROMIZING 2025 acortó el tiempo de destete en comparación con PSV",
      "Asume una fracción seleccionada de la carga del paciente; requiere impulso respiratorio"
    ],
    a: 3,
    ex: "PAV+ calcula el soporte necesario a partir de la carga R/E estimada con el flujo y el volumen, y asume una fracción seleccionada de la carga; requiere impulso respiratorio del paciente. PROMIZING 2025 no mostró una diferencia significativa frente a PSV en el tiempo hasta la desconexión del ventilador.",
    src: [19, 21, 54]
  },
  {
    id: "m-pps", mode: "pps", topic: "mod",
    q: "En PPS, ¿qué carga pretenden compensar, respectivamente, los componentes Flow Assist y Volume Assist?",
    o: [
      "La carga elástica y la carga resistiva",
      "La carga resistiva y la carga elástica",
      "La PEEP intrínseca y la carga resistiva",
      "El retraso del disparo y la carga elástica"
    ],
    a: 1,
    ex: "El soporte proporcional al flujo pretende compensar la carga resistiva, y el soporte proporcional al volumen, la carga elástica. Estos ajustes no son iguales al porcentaje de asistencia de PAV+; una ganancia incorrecta puede producir sobreasistencia o un soporte insuficiente.",
    src: [17, 54]
  },
  {
    id: "m-nava", mode: "nava", topic: "mod",
    q: "En NAVA, ¿según qué se determinan principalmente el momento y la magnitud del soporte?",
    o: [
      "Según la caída de la presión de la vía aérea en el disparo",
      "Según la fuerza muscular medida con la presión esofágica",
      "Según la actividad eléctrica del diafragma (Edi)",
      "Según el nivel de PS ajustado en cmH₂O"
    ],
    a: 2,
    ex: "En NAVA, la señal Edi obtenida de un catéter con electrodos esofágicos dirige el momento y la magnitud de la asistencia; la excitación neural no es lo mismo que la generación de presión. El nivel NAVA no es una PS clásica en cmH₂O; si no hay señal, la ventilación de respaldo es crítica.",
    src: [20, 29, 54]
  },
  {
    id: "m-niv-nava", mode: "niv-nava", topic: "mod",
    q: "¿Cuál de las siguientes afirmaciones sobre la NAVA no invasiva es correcta?",
    o: [
      "El disparo por Edi no elimina el efecto fisiológico de la fuga",
      "El disparo neural resuelve el riesgo de secreciones y de aspiración",
      "Cuando hay fuga, la medición del volumen se vuelve más fiable",
      "Ha ampliado las indicaciones generales de NIV a todos los adultos"
    ],
    a: 0,
    ex: "La sincronización por Edi puede reducir la dependencia del disparo neumático cuando hay fuga, pero no elimina el efecto fisiológico de la fuga. La permeabilidad de la vía aérea superior y el riesgo de secreciones y aspiración no se resuelven con el disparo neural.",
    src: [20, 29, 49]
  },
  {
    id: "m-asv-adaptive-support", mode: "asv-adaptive-support", topic: "mod",
    q: "¿Cuál de las siguientes afirmaciones sobre Hamilton ASV (Adaptive Support Ventilation) es correcta?",
    o: [
      "Elige la combinación de VT y frecuencia para una ventilación minuto objetivo",
      "Es el mismo algoritmo que la servoventilación adaptativa de la medicina del sueño",
      "En su forma básica ajusta automáticamente el oxígeno según la SpO₂",
      "Usa en sus cálculos el peso corporal real del paciente"
    ],
    a: 0,
    ex: "Hamilton ASV elige la combinación de VT y frecuencia para una ventilación minuto objetivo según las propiedades mecánicas; el peso se deriva de la talla/sexo. No es lo mismo que la servoventilación adaptativa de la medicina del sueño, y la ASV básica no se equipara a un control automático de la oxigenación.",
    src: [16, 15]
  },
  {
    id: "m-intellivent-asv", mode: "intellivent-asv", topic: "mod",
    q: "Respecto a las mediciones que sirven de entrada de control a INTELLiVENT-ASV, ¿qué limitación destaca la ficha?",
    o: [
      "La PetCO₂ se considera un equivalente invariable del CO₂ arterial",
      "La señal de SpO₂ no se ve afectada por la alteración de la perfusión periférica",
      "La diferencia PaCO₂–PetCO₂ puede aumentar; la perfusión puede alterar la SpO₂",
      "Aunque la medición sea errónea, el algoritmo llega al ajuste correcto"
    ],
    a: 2,
    ex: "INTELLiVENT-ASV añade a ASV la retroalimentación de PetCO₂ y SpO₂. La diferencia PaCO₂–PetCO₂ puede aumentar y la perfusión periférica puede alterar la SpO₂; una señal errónea puede conducir a un ajuste erróneo.",
    src: [22, 23]
  },
  {
    id: "m-automode", mode: "automode", topic: "mod",
    q: "Al usar Automode, ¿cuál es el error frecuente señalado en la ficha?",
    o: [
      "Comprobar por separado los ajustes del par de modos seleccionado",
      "Confundir el autodisparo con respiración espontánea real",
      "Verificar el comportamiento del intervalo de apnea según el dispositivo",
      "Separar el cambio automático de la decisión de extubación"
    ],
    a: 1,
    ex: "Automode alterna entre modos controlados y asistidos emparejados evaluando el disparo y el intervalo de apnea. El autodisparo puede confundirse con respiración espontánea real; Automode tampoco debe confundirse con un protocolo de reducción automática de PS.",
    src: [18]
  },
  {
    id: "m-smartcare", mode: "smartcare", topic: "mod",
    q: "¿Qué es correcto respecto a los protocolos de destete automático como SmartCare/PS?",
    o: [
      "La recomendación del algoritmo sustituye a la decisión de extubación",
      "Verifica la protección de la vía aérea y el manejo de las secreciones",
      "Realiza el destete administrando respiraciones obligatorias de volumen en lugar de PS",
      "No cambia la física de la respiración en PS; adapta el nivel de soporte"
    ],
    a: 3,
    ex: "SmartCare/PS no es un modo sino una capa de automatización: la física básica de la respiración en PS no cambia; el nivel de soporte se adapta dentro del protocolo según variables medidas como la frecuencia, el volumen y el CO₂. La recomendación del algoritmo no equivale a una orden de extubación sin evaluación clínica.",
    src: [17, 11]
  },
  {
    id: "m-variable-ps", mode: "variable-ps", topic: "mod",
    q: "En Variable PS, ¿cómo debe interpretarse que la asistencia varíe de una respiración a otra?",
    o: [
      "Es una asistencia proporcional al esfuerzo del paciente, como en PAV/NAVA",
      "Esta variabilidad se considera un indicador de avería del dispositivo",
      "Es una variación dentro de un rango predefinido; no es proporcional al esfuerzo",
      "El valor medio descarta con seguridad la aparición de un VT alto"
    ],
    a: 2,
    ex: "Variable PS modifica la magnitud de la asistencia dentro de una variabilidad predefinida; esto no significa que sea proporcional al esfuerzo como en PAV/NAVA. El valor medio puede ocultar un VT o una presión altos que aparezcan dentro de esa variabilidad.",
    src: [52, 54]
  },
  {
    id: "m-niv-s", mode: "niv-s", topic: "mod",
    q: "En el soporte no invasivo de dos niveles, ¿qué es correcto respecto al modo S (espontáneo) puro?",
    o: [
      "El paciente dispara cada respiración; no cabe esperar respiraciones de respaldo temporizadas",
      "En apnea, el dispositivo administra respiraciones temporizadas a la frecuencia ajustada",
      "La presión de soporte es directamente el propio valor de IPAP",
      "El puerto espiratorio diseñado se considera una fuga y se cierra"
    ],
    a: 0,
    ex: "En el modo S el paciente dispara cada respiración; se aplica IPAP en la inspiración y EPAP en la espiración, y la presión de soporte es la diferencia IPAP−EPAP. En el modo S puro no se debe actuar como si hubiera respiraciones de respaldo temporizadas; en un circuito de rama única no se cierra el puerto espiratorio diseñado.",
    src: [10, 24, 49]
  },
  {
    id: "m-niv-st", mode: "niv-st", topic: "mod",
    q: "Un paciente con una exacerbación aguda acidótica de EPOC (KOAH) que recibe NIV de dos niveles en modo S/T presenta empeoramiento del nivel de conciencia y del intercambio gaseoso. ¿Qué enfoque es coherente con el contenido?",
    o: [
      "Mantener la NIV aumentando solo la IPAP y la frecuencia de respaldo",
      "Desactivar las respiraciones de respaldo temporizadas y pasar al modo S puro",
      "No cambiar la NIV porque cuenta con un fuerte respaldo de las guías",
      "Evaluar sin demora la necesidad de soporte invasivo"
    ],
    a: 3,
    ex: "En la exacerbación aguda acidótica de EPOC, la NIV de dos niveles cuenta con un fuerte respaldo de las guías, pero requiere protección de la vía aérea y una vigilancia estrecha de la respuesta. Mantener la NIV solo aumentando los ajustes mientras empeoran la conciencia, la circulación o el intercambio gaseoso puede retrasar el soporte invasivo.",
    src: [10, 16, 24]
  },
  {
    id: "m-niv-t-pc", mode: "niv-t-pc", topic: "mod",
    q: "En la aplicación no invasiva T / PC, ¿qué riesgo relacionado con la elección del circuito destaca la ficha?",
    o: [
      "Que la compensación de fugas sea totalmente innecesaria en las respiraciones temporizadas",
      "Que un circuito incorrecto pueda provocar reinhalación de CO₂",
      "Que los modos T y PC se comporten igual en todos los dispositivos",
      "Que en las respiraciones controladas por tiempo el dispositivo no pueda determinar el Ti"
    ],
    a: 1,
    ex: "En la aplicación T/PC, el tiempo inspiratorio puede ser determinado más directamente por el dispositivo, pero T y PC no se comportan igual en todos los dispositivos. El circuito, la válvula espiratoria y la compatibilidad de la mascarilla deben verificarse según las IFU del modelo de dispositivo; un circuito incorrecto puede provocar reinhalación de CO₂.",
    src: [24, 25, 16]
  },
  {
    id: "m-avaps", mode: "avaps", topic: "mod",
    q: "En un paciente con obesidad e hipoventilación crónica, al fijar el objetivo de AVAPS, ¿cuál de las siguientes opciones contradice la advertencia de la ficha?",
    o: [
      "Vigilar si se alcanza el límite superior de presión",
      "Aumentar el volumen objetivo basándose en el peso real (obeso)",
      "Saber que la fuga puede impedir alcanzar el objetivo",
      "Saber que la velocidad de adaptación puede variar según el dispositivo"
    ],
    a: 1,
    ex: "AVAPS ajusta con el tiempo la presión inspiratoria dentro del rango permitido para acercarse al VT objetivo; el objetivo puede no alcanzarse por el límite de presión o por la fuga. El objetivo de volumen no debe aumentarse en función del peso real del paciente obeso.",
    src: [24, 26, 53]
  },
  {
    id: "m-avaps-ae", mode: "avaps-ae", topic: "mod",
    q: "Al vigilar las tendencias del soporte en un paciente con AVAPS-AE, ¿qué es correcto?",
    o: [
      "La EPAP es fija; basta con vigilar solo la tendencia de la IPAP",
      "Las funciones “Auto” evalúan automáticamente la seguridad de la vía aérea",
      "La EPAP automática mantiene constante la diferencia de asistencia en cualquier circunstancia",
      "Junto con la IPAP también puede cambiar la EPAP; una sola tendencia no basta"
    ],
    a: 3,
    ex: "AVAPS-AE añade al soporte con objetivo de volumen la EPAP automática y otras funciones de temporización automática; la IPAP y la EPAP pueden cambiar con el tiempo, y mirar solo la tendencia de la IPAP es insuficiente. La palabra “Auto” no automatiza el diagnóstico ni la evaluación de la seguridad de la vía aérea.",
    src: [24, 26]
  },
  {
    id: "m-ivaps", mode: "ivaps", topic: "mod",
    q: "¿Qué es correcto respecto a la magnitud que iVAPS usa como objetivo?",
    o: [
      "La ventilación alveolar calculada con el espacio muerto estimado a partir de la talla",
      "La ventilación alveolar medida directamente a partir de la PaCO₂ de la gasometría",
      "Solo el VT ajustado; no se tiene en cuenta la frecuencia respiratoria",
      "El espacio muerto fisiológico medido con capnografía volumétrica"
    ],
    a: 0,
    ex: "iVAPS estima el espacio muerto anatómico a partir de la talla y, teniendo en cuenta la frecuencia, tiene como objetivo la ventilación alveolar estimada; no es una medición directa de la ventilación alveolar ni de la PaCO₂. El espacio muerto fisiológico patológico puede diferir del estimado a partir de la talla.",
    src: [24, 25]
  },
  {
    id: "m-sleep-asv", mode: "sleep-asv", topic: "mod",
    q: "¿Qué es correcto respecto a la servoventilación adaptativa utilizada en medicina del sueño?",
    o: [
      "Usa el mismo algoritmo de volumen minuto que Hamilton ASV",
      "Es el tratamiento recomendado sin condiciones en la insuficiencia cardíaca con FE baja",
      "En los eventos centrales usa asistencia variable y respiraciones de respaldo",
      "Su objetivo es optimizar el volumen minuto en cuidados intensivos"
    ],
    a: 2,
    ex: "La ASV del sueño usa una asistencia de presión variable y respiraciones de respaldo frente a la respiración periódica y los eventos centrales; es distinta de Hamilton ASV. La AASM 2025 formula recomendaciones condicionales para determinadas causas de apnea central; en la insuficiencia cardíaca con FE baja se insiste en un centro con experiencia y una vigilancia estrecha.",
    src: [35, 53]
  },
  {
    id: "m-apap", mode: "apap", topic: "mod",
    q: "¿Cuál de las siguientes afirmaciones sobre APAP es correcta?",
    o: [
      "Adapta la presión inspiratoria para alcanzar el VT objetivo",
      "Es la solución automática de la insuficiencia ventilatoria hipercápnica aguda",
      "Como la PS clásica, aporta en cada inspiración una presión de ayuda adicional sobre la PEEP",
      "Cambia el nivel de CPAP según los signos de eventos obstructivos"
    ],
    a: 3,
    ex: "APAP es un enfoque de dispositivo de sueño que modifica el nivel de CPAP dentro de un rango definido según los signos de eventos obstructivos; no es ventilación controlada por volumen ni PS clásica. No se considera la solución automática de la insuficiencia ventilatoria hipercápnica aguda; no es lo mismo que AVAPS/ASV.",
    src: [57, 41, 53]
  },
  {
    id: "m-neonatal-tcpl", mode: "neonatal-tcpl", topic: "mod",
    q: "En la ventilación neonatal ciclada por tiempo y limitada por presión, si la distensibilidad mejora rápidamente tras el surfactante, ¿qué cabe esperar?",
    o: [
      "Por el límite de presión, el VT se mantiene sin cambios",
      "La misma presión puede generar un VT mayor",
      "El Ti se acorta automáticamente y mantiene constante el VT",
      "El flujo de base (bias flow) impide por sí solo el aumento del VT"
    ],
    a: 1,
    ex: "En este método se fijan la presión y el tiempo inspiratorio; el VT varía con la mecánica del pulmón pequeño. Si C mejora rápidamente tras el surfactante, la misma presión puede generar un VT mayor.",
    src: [28, 29, 50]
  },
  {
    id: "m-neonatal-ac-sippv", mode: "neonatal-ac-sippv", topic: "mod",
    q: "¿Qué es correcto respecto a la asistida-controlada sincronizada (SIPPV) en neonatos?",
    o: [
      "Es la misma secuencia de respiraciones obligatorias de flujo constante que la VCV del adulto",
      "Es igual a la SIMV neonatal; solo cambia el nombre del fabricante",
      "Los esfuerzos adecuados se soportan con una respiración obligatoria; en apnea hay frecuencia de respaldo",
      "El objetivo de volumen (VG) está incluido automáticamente en todas las aplicaciones"
    ],
    a: 2,
    ex: "En SIPPV, los esfuerzos adecuados del paciente que se detectan se soportan con una respiración obligatoria y en apnea actúa una frecuencia de respaldo; la sincronización es una función de temporización. Debe indicarse aparte si se añade VG; SIPPV no se considera igual a la VCV del adulto ni a la SIMV neonatal.",
    src: [28, 29]
  },
  {
    id: "m-neonatal-vg", mode: "neonatal-vg", topic: "mod",
    q: "¿Qué es correcto respecto a la ventilación con objetivo de volumen (VTV/VG) en neonatos?",
    o: [
      "Se añade al modo base; adapta la presión según el VT medido",
      "El VT objetivo se calcula con la fórmula de PBW del adulto",
      "El espacio muerto del sensor y la fuga del tubo no afectan a la medición",
      "Garantiza que se administre el volumen objetivo en cada respiración"
    ],
    a: 0,
    ex: "VG es una función de objetivo que se añade a la secuencia respiratoria base y adapta la presión según el VT pequeño medido. El espacio muerto del sensor y la fuga del tubo son importantes; los cálculos de PBW del adulto no se aplican a los neonatos.",
    src: [28, 29, 50]
  },
  {
    id: "m-ncpap", mode: "ncpap", topic: "mod",
    q: "¿Qué es correcto respecto a la CPAP nasal en el prematuro?",
    o: [
      "La vibración del sistema de burbujas no equivale a la HFOV",
      "Burbujas (bubble) y flujo variable (variable-flow) son algoritmos distintos de respiraciones obligatorias",
      "Ante apnea o aumento del esfuerzo, basta con mantener la CPAP",
      "No requiere vigilancia de la nariz/piel ni de la distensión gástrica"
    ],
    a: 0,
    ex: "La CPAP nasal proporciona una presión de distensión continua durante la respiración espontánea; burbujas/flujo variable son métodos de generación de presión y la vibración de burbujas no equivale a la HFOV. Ante apnea, aumento del esfuerzo o de la necesidad de oxígeno, se evalúa la necesidad de escalar el soporte.",
    src: [28, 50]
  },
  {
    id: "m-nippv", mode: "nippv", topic: "mod",
    q: "Durante la NIPPV, ¿cuál es la interpretación correcta de los pulsos de presión inspiratoria que se ven en la pantalla?",
    o: [
      "Cada pulso indica que pasa el mismo volumen al pulmón",
      "La glotis y la fuga no afectan al volumen administrado al pulmón",
      "Ver un pulso no demuestra que haya pasado el mismo volumen",
      "Todos los dispositivos nasales de dos niveles aplican la misma NIPPV"
    ],
    a: 2,
    ex: "La NIPPV añade pulsos intermitentes de soporte sobre un nivel basal de presión nasal; la fuga y la glotis afectan al volumen administrado al pulmón. Que haya un pulso en la pantalla no demuestra que pase el mismo volumen al pulmón; no todos los dispositivos nasales de dos niveles aplican lo mismo.",
    src: [28, 29]
  },
  {
    id: "m-hfov", mode: "hfov", topic: "mod",
    q: "En HFOV, al aumentar la frecuencia, ¿cuál es la afirmación correcta sobre la eliminación de CO₂?",
    o: [
      "Siempre aumenta; la frecuencia es el único determinante",
      "No siempre aumenta; el VT oscilatorio puede cambiar",
      "No cambia; el CO₂ depende solo de la presión media",
      "Se considera suficiente cuanto más aumenta la vibración torácica"
    ],
    a: 1,
    ex: "En HFOV se superponen oscilaciones bidireccionales pequeñas y rápidas sobre una presión de distensión media. Al aumentar la frecuencia el CO₂ no siempre se elimina mejor y el VT oscilatorio puede cambiar; la vibración torácica por sí sola no es una medida suficiente del intercambio gaseoso.",
    src: [28, 27, 8, 29]
  },
  {
    id: "m-hfov-vg", mode: "hfov-vg", topic: "mod",
    q: "En la HFOV con objetivo de volumen, ¿qué ajuste adapta la retroalimentación?",
    o: [
      "La presión de distensión media",
      "La fracción de oxígeno (FiO₂)",
      "El objetivo de volumen corriente del VG convencional",
      "La amplitud para el volumen oscilatorio"
    ],
    a: 3,
    ex: "HFOV-VG adapta la amplitud (oscilación de presión) para mantener el objetivo de volumen oscilatorio. Los objetivos del VG convencional no se trasladan aquí; la medición de volúmenes muy pequeños, la fuga y la precisión del sensor son críticas.",
    src: [28, 51]
  },
  {
    id: "m-hfjv", mode: "hfjv", topic: "mod",
    q: "En HFJV, ¿cuál es el punto crítico de seguridad respecto a la espiración?",
    o: [
      "Como la espiración es activa, la vía de salida no tiene importancia",
      "La presión de impulso del jet puede considerarse igual a la presión alveolar",
      "Si se obstruye la salida puede producirse atrapamiento aéreo/barotrauma grave",
      "Las curvas clásicas de VT se vigilan de forma fiable en todas las plataformas"
    ],
    a: 2,
    ex: "En HFJV se administran chorros cortos por una cánula estrecha y la espiración depende sobre todo de una vía de salida pasiva. Si se obstruye la salida espiratoria puede producirse atrapamiento aéreo/barotrauma grave; la presión de la fuente del jet no es igual a la presión alveolar.",
    src: [30]
  },
  {
    id: "m-hfpv", mode: "hfpv", topic: "mod",
    q: "¿Cuál es el mecanismo respiratorio básico de la HFPV?",
    o: [
      "Pulsos pequeños y rápidos superpuestos a ciclos respiratorios lentos",
      "Oscilación con inspiración y espiración activas alrededor de una presión media",
      "Chorros cortos de gas administrados por una cánula estrecha, con salida pasiva",
      "Flujo constante en el que también se controla activamente el flujo espiratorio"
    ],
    a: 0,
    ex: "La HFPV añade pequeños pulsos de gas de alta frecuencia sobre ciclos respiratorios más lentos; combina componentes convencionales y de alta frecuencia. No es lo mismo que HFOV ni que HFJV; los estudios son heterogéneos.",
    src: [31]
  },
  {
    id: "m-nhfov", mode: "nhfov", topic: "mod",
    q: "¿Qué es correcto respecto al soporte oscilatorio nasal de alta frecuencia (nHFOV)?",
    o: [
      "Proporciona la misma transmisión de presión que la HFOV con intubación",
      "Es otro nombre del mismo método que la CPAP y la NIPPV",
      "Se ha definido una única plantilla de ajustes válida para todos los centros",
      "La vía aérea superior y la fuga modifican la transmisión de la oscilación"
    ],
    a: 3,
    ex: "En la nHFOV, la vía aérea superior y la fuga modifican la transmisión de las oscilaciones al pulmón; no hay la misma transmisión que en la HFOV con intubación. CPAP, NIPPV y nHFOV no son el mismo método y no puede darse una única plantilla de ajustes para todos los centros.",
    src: [28]
  },
  {
    id: "m-fcv", mode: "fcv", topic: "mod",
    q: "¿Cuál es la característica fundamental que distingue la ventilación controlada por flujo (FCV) de la VC clásica?",
    o: [
      "Que el flujo inspiratorio se administre constante, en onda cuadrada",
      "Que el flujo espiratorio también se controle activamente",
      "Que la espiración se deje totalmente pasiva",
      "Que el objetivo de presión se adapte respiración a respiración"
    ],
    a: 1,
    ex: "En la FCV, además de la inspiración, también se controla activamente el flujo espiratorio; es distinto de la espiración pasiva de la VC clásica. Elegir solo un flujo cuadrado en un ventilador estándar no es FCV; la evidencia clínica es limitada y heterogénea.",
    src: [32, 33, 34]
  },
  {
    id: "m-mouthpiece", mode: "mouthpiece", topic: "mod",
    q: "¿Qué es correcto respecto a la ventilación con boquilla (MPV)?",
    o: [
      "Es un modo independiente con su propio algoritmo de respiraciones obligatorias",
      "Es un método de administración; la conexión intermitente cambia la lógica de las alarmas",
      "Muestra el mismo comportamiento de alarmas y circuito que la NIV con mascarilla",
      "Puede aplicarse con independencia del nivel de conciencia y de la función bulbar"
    ],
    a: 1,
    ex: "La MPV es un método de interfaz/administración; se aplica con respiraciones de volumen o de presión en un ventilador adecuado, y el carácter intermitente de la conexión cambia la lógica de fuga y de alarmas. Son importantes el nivel de conciencia, la función bulbar y el acceso a la boquilla.",
    src: [24]
  },
  {
    id: "m-negative-pressure", mode: "negative-pressure", topic: "mod",
    q: "¿Qué es correcto respecto al mecanismo y al límite de la ventilación con presión negativa?",
    o: [
      "Empuja con presión positiva por la boca y protege la vía aérea",
      "Es el método de soporte por defecto en cuidados intensivos rutinarios",
      "La curva de presión de la vía aérea es idéntica a la de los modos de presión positiva",
      "Reduce la presión externa; el colapso de la vía aérea superior puede ser un problema"
    ],
    a: 3,
    ex: "La ventilación con presión negativa reduce la presión fuera del tórax en lugar de empujar con presión positiva. El colapso de la vía aérea superior y el ajuste de la interfaz pueden ser un problema; no resuelve la necesidad de proteger la vía aérea y no es la opción por defecto en cuidados intensivos rutinarios.",
    src: [48]
  },
  {
    id: "m-vaps-intrabreath", mode: "vaps-intrabreath", topic: "mod",
    q: "¿Cuál es la diferencia entre el control dual intrarrespiración (VAPS) y AVAPS?",
    o: [
      "VAPS adapta dentro de la misma respiración; AVAPS, a lo largo del tiempo",
      "Ambos realizan una adaptación de la presión entre respiraciones",
      "VAPS adapta entre respiraciones; AVAPS, dentro de la misma respiración",
      "Ambos administran solo respiraciones de volumen con flujo constante"
    ],
    a: 0,
    ex: "En VAPS la respiración empieza con presión de ayuda y, si no se alcanza el objetivo de volumen, el comportamiento de control puede cambiar en la misma respiración; AVAPS, en cambio, adapta la presión a lo largo del tiempo. Al ver el nombre VAPS debe determinarse si la adaptación es intrarrespiración o entre respiraciones.",
    src: [59, 60]
  },
  {
    id: "m-independent-lung", mode: "independent-lung", topic: "mod",
    q: "¿Qué es correcto respecto a la ventilación pulmonar independiente (ILV)?",
    o: [
      "Es un modo de respiraciones obligatorias independiente que reparte la carga por igual a ambos lados con un solo ajuste",
      "En la enfermedad asimétrica es la primera opción rutinaria con evidencia sólida",
      "No es un algoritmo de modo, sino una estrategia que maneja ambos pulmones por separado",
      "Las curvas de ambos lados se interpretan como una única curva combinada"
    ],
    a: 2,
    ex: "La ILV es una estrategia de aplicación dirigida al problema de que un solo ajuste impone cargas distintas a cada lado por diferencias de C/R o por fuga; no es un algoritmo independiente de respiraciones obligatorias. Las curvas y los datos de fuga de cada lado se interpretan por separado; la evidencia y la experiencia son limitadas.",
    src: [58]
  },
  {
    id: "e01", mode: null, topic: "ekran",
    q: "En VC con flujo constante, si la Ppeak aumenta mientras la Pplat se mantiene similar, ¿cuál es el primer mecanismo que debe considerarse?",
    o: [
      "Disminución de la distensibilidad o atrapamiento aéreo",
      "Fuga o problema de compensación del sensor/circuito",
      "Aumento del ajuste de PEEP o de VT",
      "Aumento de la resistencia o del flujo inspiratorio"
    ],
    a: 3,
    ex: "La diferencia Ppeak–Pplat refleja la presión gastada contra el flujo; un aumento de la Ppeak sin cambio de la Pplat sugiere un aumento de la resistencia o del flujo. Se comprueban acodamiento/mordedura del tubo, secreciones, filtro, broncoespasmo y cambios de ajustes.",
    src: [3]
  },
  {
    id: "e02", mode: null, topic: "ekran",
    q: "¿Con qué relación y en qué condición tiene sentido la presión de distensión (driving pressure, ΔP)?",
    o: [
      "Ppeak − PEEPset; se lee automáticamente en cada respiración",
      "Pplat − PEEPtotal; en condición estática/pasiva",
      "Ppeak − Pplat; en VC con flujo constante",
      "Pmean − PEEPset; en la respiración espontánea"
    ],
    a: 1,
    ex: "ΔP = Pplat − PEEPtotal y requiere una medición estática; no es Ppeak−PEEP. Tiene sentido en un contexto pasivo/estático y no existe un único punto de corte universal.",
    src: [3, 4, 46]
  },
  {
    id: "e03", mode: null, topic: "ekran",
    q: "Hay una diferencia marcada entre VTi y VTe y el bucle flujo–volumen no cierra. ¿Cuál es la primera causa que debe considerarse?",
    o: [
      "Hiperinsuflación dinámica y PEEP intrínseca",
      "Carga elástica por disminución de la distensibilidad",
      "Fuga o problema del sensor/de compensación",
      "Hambre de flujo en VC con flujo constante"
    ],
    a: 2,
    ex: "La diferencia VTi–VTe y un bucle que no cierra sugieren una fuga o un problema de medición/compensación del volumen. Se comprueban el neumotaponamiento, las conexiones, el circuito y la posibilidad de una fuga broncopleural.",
    src: [5, 16]
  },
  {
    id: "e04", mode: null, topic: "ekran",
    q: "En un paciente ventilado, la EtCO₂ desciende de forma marcada. ¿Qué interpretación es coherente con el contenido?",
    o: [
      "También puede deberse a disminución de la perfusión, fuga o un problema de muestreo",
      "Es en todos los casos un indicador definitivo de hiperventilación",
      "Demuestra que la PaCO₂ también ha descendido en la misma medida",
      "Solo indica que la frecuencia ajustada del dispositivo es excesiva"
    ],
    a: 0,
    ex: "El descenso de la EtCO₂ no indica solo hiperventilación: puede deberse a disminución de la circulación/perfusión, cambio del espacio muerto, fuga o un problema de muestreo. No se supone que la diferencia entre la gasometría y la EtCO₂ sea constante.",
    src: [44]
  },
  {
    id: "e05", mode: null, topic: "ekran",
    q: "¿Qué es correcto respecto al valor de P0.1 que se ve en la pantalla?",
    o: [
      "Es una aproximación al impulso respiratorio; no es idéntico a la fuerza muscular",
      "Muestra la actividad eléctrica del diafragma en μV",
      "Los umbrales de investigación son una regla de tratamiento automática en todos los dispositivos",
      "Es la fuerza inspiratoria máxima medida durante una oclusión completa"
    ],
    a: 0,
    ex: "La P0.1 es la caída de presión en los primeros 100 ms de una oclusión y aproxima el impulso respiratorio; no es idéntica a la fuerza muscular ni al esfuerzo. Los umbrales utilizados en investigación no son umbrales de tratamiento definitivos independientes del dispositivo.",
    src: [42]
  },
  {
    id: "a01", mode: null, topic: "asenkroni",
    q: "En la curva de presión se ve una muesca descendente y una desviación en el flujo espiratorio, pero no llega ninguna respiración asistida. ¿Qué patrón es este?",
    o: [
      "Autodisparo",
      "Ciclado tardío",
      "Esfuerzo inefectivo",
      "Disparo reverso"
    ],
    a: 2,
    ex: "En el esfuerzo inefectivo el paciente se esfuerza; puede haber una muesca en la presión y una desviación en el flujo, pero no llega ninguna respiración. Se consideran la PEEP intrínseca, un esfuerzo débil, el exceso de soporte o un disparo poco sensible; la solución no es en todos los casos más sedación.",
    src: [6, 7]
  },
  {
    id: "a02", mode: null, topic: "asenkroni",
    q: "Ante la sospecha de autodisparo, ¿cuál es la primera comparación que debe hacerse?",
    o: [
      "Los valores de Ppeak y Pplat",
      "La frecuencia real del paciente con la frecuencia del dispositivo",
      "El VT ajustado con el VTi medido",
      "La EtCO₂ con la PaCO₂ arterial"
    ],
    a: 1,
    ex: "En el autodisparo, el dispositivo inicia respiraciones sin esfuerzo del paciente; pueden causarlo la fuga, el agua en el circuito, las oscilaciones de origen cardíaco y un disparo demasiado sensible. Primero se compara la frecuencia real del paciente con la frecuencia del dispositivo.",
    src: [6, 49]
  },
  {
    id: "a03", mode: null, topic: "asenkroni",
    q: "En VC con flujo constante, si la demanda inspiratoria del paciente supera el flujo administrado (hambre de flujo), ¿qué se ve en la curva presión–tiempo?",
    o: [
      "El flujo espiratorio no vuelve a cero hasta la siguiente respiración",
      "Hay un aumento adicional de la presión al final de la inspiración",
      "La onda del capnograma no vuelve a la línea basal",
      "La curva de presión inspiratoria se hunde hacia dentro"
    ],
    a: 3,
    ex: "En el hambre de flujo, la demanda del paciente supera el flujo administrado y la curva de presión inspiratoria se hunde hacia dentro. Se investigan causas de la demanda como el dolor, la acidosis o la hipoxemia, y se evalúa la relación entre flujo y Ti.",
    src: [7]
  },
  {
    id: "a04", mode: null, topic: "asenkroni",
    q: "Primero llega la respiración de la máquina y después un esfuerzo inspiratorio del paciente vinculado a ella. ¿Cuál es este patrón y con qué puede confundirse?",
    o: [
      "Ciclado precoz; puede confundirse con el retraso del disparo",
      "Esfuerzo inefectivo; se confunde con el autodisparo",
      "Disparo reverso; puede confundirse con el doble disparo",
      "Ciclado tardío; puede confundirse con el hambre de flujo"
    ],
    a: 2,
    ex: "En el disparo reverso, primero llega la respiración de la máquina y después un esfuerzo inspiratorio reflejo/vinculado del paciente; si se cree que ha disparado el paciente, puede confundirse con un doble disparo habitual. Cuando es necesario, se realiza una evaluación avanzada con Edi/Pes.",
    src: [7]
  },
  {
    id: "f01", mode: null, topic: "fizik",
    q: "Ejemplo hipotético: en un paciente pasivo, VT = 0,42 L, Pplat = 22 cmH₂O, PEEPtotal = 8 cmH₂O. ¿Cuánto vale la Cstat?",
    o: [
      "0,030 L/cmH₂O",
      "0,019 L/cmH₂O",
      "0,053 L/cmH₂O",
      "0,014 L/cmH₂O"
    ],
    a: 0,
    ex: "Cstat = VT / (Pplat − PEEPtotal) = 0,42 / 14 = 0,030 L/cmH₂O. Es un ejemplo de cálculo; no es un valor normal ni un objetivo para el paciente.",
    src: [3]
  },
  {
    id: "f02", mode: null, topic: "fizik",
    q: "En el mismo ejemplo hipotético, si Ppeak = 30, Pplat = 22 cmH₂O y el flujo constante es de 0,5 L/s, ¿cuál es la resistencia inspiratoria estimada?",
    o: [
      "8 cmH₂O·s/L",
      "44 cmH₂O·s/L",
      "60 cmH₂O·s/L",
      "16 cmH₂O·s/L"
    ],
    a: 3,
    ex: "R ≈ (Ppeak − Pplat) / flujo = 8 / 0,5 = 16 cmH₂O·s/L; la fórmula es para VC con flujo constante. Dividir directamente la diferencia de presión por el flujo en L/min hace que el cálculo sea erróneo.",
    src: [3]
  },
  {
    id: "f03", mode: null, topic: "fizik",
    q: "Con un espacio muerto hipotético constante de 150 mL, ¿qué es correcto para los patrones respiratorios 500 mL × 12/min y 250 mL × 24/min?",
    o: [
      "Tanto el VE como la VA son iguales en ambos patrones",
      "El VE es igual (6 L/min); la VA es de 4,2 y 2,4 L/min",
      "En el segundo patrón son más altos tanto el VE como la VA",
      "El VE es distinto; la VA es de 4,2 L/min en ambos patrones"
    ],
    a: 1,
    ex: "VE = VT × f es de 6 L/min en ambos patrones; VA = (VT − VD) × f resulta de 4,2 y 2,4 L/min. Esto explica por qué la respiración rápida y superficial puede ser ineficiente; el VD real varía con el paciente y el circuito.",
    src: [44]
  },
  {
    id: "f04", mode: null, topic: "fizik",
    q: "En un modelo lineal de un solo compartimento con R = 10 cmH₂O·s/L y C = 0,05 L/cmH₂O, τ = 0,5 s. ¿Qué ocurre si R se duplica?",
    o: [
      "τ baja a 0,25 s; el vaciado se acelera",
      "τ pasa a 1 s; con el mismo Te puede quedar más gas",
      "τ no cambia; solo C es determinante",
      "τ pasa a 2 s; el riesgo de atrapamiento aéreo desaparece por completo"
    ],
    a: 1,
    ex: "Como τ = R × C, al duplicarse R, τ pasa a 1 segundo y con el mismo tiempo espiratorio puede quedar más gas dentro. En la obstrucción, la heterogeneidad puede no explicarse con una sola τ.",
    src: [4, 55]
  },
  {
    id: "k01", mode: null, topic: "klinik",
    q: "En el SDRA del adulto, ¿qué afirmación sobre la elección del modo es coherente con el contenido?",
    o: [
      "La APRV es el modo estándar superior demostrado en el SDRA",
      "Cuando se usa PC no se produce barotrauma",
      "Se recomienda el uso rutinario de HFOV en adultos",
      "No se puede inferir la supervivencia solo a partir del nombre del modo"
    ],
    a: 3,
    ex: "En el SDRA pueden usarse VC-A/C, PC-A/C o presión adaptativa con objetivo de volumen; el objetivo es mantener el volumen/presión, el esfuerzo y el intercambio gaseoso dentro de límites protectores, y no se puede inferir la supervivencia a partir del nombre del modo. Las ideas memorizadas “SDRA = APRV” y “en PC no hay barotrauma” son erróneas; no se recomienda la HFOV rutinaria en adultos.",
    src: [8, 14, 60]
  },
  {
    id: "k02", mode: null, topic: "klinik",
    q: "En un paciente con asma grave bajo ventilación invasiva, la Ppeak es muy alta y la Pplat es claramente más baja. ¿Cuál es la interpretación correcta?",
    o: [
      "Esta diferencia sugiere predominantemente una carga resistiva",
      "Se considera que la presión elástica también es tan alta como la Ppeak",
      "Es la prueba definitiva de una disminución de la distensibilidad",
      "Es un error de medición; la Pplat puede ignorarse con seguridad"
    ],
    a: 0,
    ex: "La diferencia Ppeak–Pplat sugiere una carga resistiva; suponer, mirando solo la Ppeak, que la presión elástica del pulmón es igual de alta es un error. En el asma se vigilan conjuntamente el Te, el atrapamiento aéreo, el VT y la Pplat.",
    src: [3, 13]
  },
  {
    id: "k03", mode: null, topic: "klinik",
    q: "Según la guía de SBT de la AARC 2024, ¿qué es correcto?",
    o: [
      "La SBT debe realizarse solo con pieza en T sin soporte",
      "Una SBT superada es suficiente por sí sola para la extubación",
      "El cálculo del RSBI no es obligatorio para determinar si el paciente está preparado para la SBT",
      "Se recomienda aumentar la FiO₂ durante la prueba si es necesario"
    ],
    a: 2,
    ex: "Según la AARC 2024, el RSBI no es obligatorio para determinar si el paciente está preparado para la SBT y la prueba puede realizarse con o sin PS; no se recomienda enmascarar el fracaso aumentando la FiO₂. En la decisión de extubación se evalúan además la protección de la vía aérea, la tos/secreciones y la permeabilidad de la vía aérea superior.",
    src: [11]
  },
  {
    id: "k04", mode: null, topic: "klinik",
    q: "En un paciente adulto obeso se mide una Pplat alta. ¿Qué interpretación es coherente con el contenido?",
    o: [
      "Una Pplat alta refleja total y exclusivamente la rigidez pulmonar",
      "El VT debe aumentarse según el peso corporal real",
      "A todos los pacientes obesos se les aplica la misma PEEP alta",
      "Una parte puede deberse a la carga de la pared torácica y del abdomen"
    ],
    a: 3,
    ex: "En la obesidad o con presión abdominal elevada, parte de una presión meseta alta puede proceder de la pared torácica; la Pes, con una técnica adecuada, aproxima la presión pleural. El VT no se aumenta según el peso real; en el adulto se usa el PBW basado en la talla.",
    src: [3, 37, 42]
  },
  {
    id: "p01", mode: null, topic: "pediatri",
    q: "Según PALICC-2, ¿qué es correcto respecto a la elección del modo convencional en el SDRA pediátrico?",
    o: [
      "El modo PC ha resultado superior al VC",
      "No hay evidencia de resultados suficiente sobre la superioridad de un modo",
      "Se aplican tal cual las recomendaciones de modo del SDRA del adulto",
      "Se recomienda la HFOV como modo rutinario de primera línea"
    ],
    a: 1,
    ex: "PALICC-2 indica que no hay evidencia de resultados suficiente para preferir un modo convencional concreto sobre otro. Las recomendaciones pediátricas se interpretan en su propio contexto; las recomendaciones del adulto no se trasladan directamente.",
    src: [27]
  },
  {
    id: "p02", mode: null, topic: "pediatri",
    q: "¿Qué es correcto respecto al uso de la fórmula de PBW de ARDSNet del adulto y del rango de volumen del adulto en niños/neonatos?",
    o: [
      "Se aplica también a neonatos reduciendo los kilogramos",
      "Se usa con corrección solo en prematuros",
      "No se aplica automáticamente; se necesitan objetivos específicos para la edad",
      "Si el dispositivo tiene el modo, es válida a cualquier edad"
    ],
    a: 2,
    ex: "La fórmula de PBW no se aplica automáticamente a niños ni neonatos; no es correcto trasladar a los neonatos los objetivos del SDRA del adulto reduciendo los kilogramos. Se necesitan sensor neonatal, control de la fuga y objetivos específicos para la edad.",
    src: [47, 28, 50]
  },
  {
    id: "p03", mode: null, topic: "pediatri",
    q: "En el niño pequeño, ¿por qué puede diferir el VT que muestra el dispositivo del volumen que llega al paciente?",
    o: [
      "Espacio muerto del sensor, distensibilidad del circuito y fuga",
      "Porque la ley de Boyle no es válida en el niño",
      "Porque los dispositivos pediátricos no miden el VTe",
      "Porque el efecto de la fuga es despreciable en volúmenes pequeños"
    ],
    a: 0,
    ex: "El espacio muerto del sensor proximal, la distensibilidad del circuito y la fuga son importantes sobre todo en el niño pequeño. Debe comprobarse la concordancia entre el volumen que muestra el dispositivo y el que llega al paciente.",
    src: [50]
  }
];
