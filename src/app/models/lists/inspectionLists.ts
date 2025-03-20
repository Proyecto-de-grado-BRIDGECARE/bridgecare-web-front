export class inspectionLists {
  static componentNames = ['Superficie del puente', 'Juntas de expansión', 'Andenes/ bordillos', 'Barandas', 'Conos/ taludes', 'Aletas', 'Estribos', 'Pilas', 'Apoyos', 'Losa', 'Vigas/ Largueros/ Diafragmas', 'Elementos de arco', 'Cables/ Pendolones/ Torres / Macizas', 'Elementos de armadura', 'Cauce', 'Otros elementos', 'Puente general'];

  static yearList: number[] = Array.from({length: 17}, (v, k) => k + 2024);
  static ratingComponentOptions = [
    {value: 0, label: '0. Sin daño, o con daño insignificante.'},
    {value: 1, label: '1. Daño pequeño pero reparación no es necesaria (excepto mantenimiento rutinario).'},
    {value: 2, label: '2. Algún daño, reparación necesaria cuando se presente la ocasión.'},
    {value: 3, label: '3. Daño significativo, reparación necesaria muy pronto.'},
    {value: 4, label: '4. Daño grave, reparación necesaria inmediatamente.'},
    {value: 5, label: '5. Daño extremo, falla total o riesgo de falla total del componente.'},
    {value: 6, label: '?. Desconocido.'}
  ];

  static damageTypeComponentOptions = [
    {value: 10, label: '10. Daño estructural (Sobrecarga / diseño insuficiente)'},
    {value: 15, label: '15. Vibración excesiva'},
    {value: 20, label: '20. Impacto'},
    {value: 30, label: '30. Asentamiento / Movimiento'},
    {value: 40, label: '40. Erosión / socavación'},
    {value: 45, label: '45. Sedimentación'},
    {value: 50, label: '50. Corrosión de acero estructural'},
    {value: 60, label: '60. Daño en concreto/ Corrosión de reforzamiento'},
    {value: 65, label: '65. Daño en concreto/ Acero Expuesto'},
    {value: 70, label: '70. Descomposición'},
    {value: 80, label: '80. Infiltración'},
    {value: 90, label: '90. Otro'},
    {value: 91, label: '91. No Aplicable'},
    {value: 92, label: '92. Desconocido'},
    {value: 93, label: '93. No Registrado'},
  ];

  static repairTypeComponentOptions = {
    'Superficie del puente': [
      {type: 'A', description: 'A. Cambio del pavimento asfáltico', unit: 'm2'},
      {type: 'B', description: 'B. Cambio del pavimento de concreto', unit: 'm2'},
      {type: 'C', description: 'C. Tratamiento superficial (sello)', unit: 'm2'},
      {type: 'D', description: 'D. Reparación de pavimento de asfalto', unit: 'm2'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Juntas de expansión': [
      {type: 'A', description: 'A. Reparación de junta', unit: 'm'},
      {type: 'B', description: 'B. Cambio de junta de acero', unit: 'm'},
      {type: 'C', description: 'C. Cambio a junta de goma asfáltica', unit: 'm'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Andenes/ bordillos': [
      {type: 'A', description: 'A. Cambio de anden o bordillo', unit: 'm'},
      {type: 'B', description: 'B. Reparación de concreto', unit: 'm2'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Barandas': [
      {type: 'A', description: 'A. Reparación de barandas de concreto', unit: 'm'},
      {type: 'B', description: 'B. Reparación de baranda de acero', unit: 'm'},
      {type: 'C', description: 'C. Cambio de baranda de concreto', unit: 'm'},
      {type: 'D', description: 'D. Cambio de baranda de acero', unit: 'm'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Conos/ taludes': [
      {type: 'A', description: 'A. Rellenar', unit: 'm3'},
      {type: 'B', description: 'B. Reparación de elementos de protección', unit: 'm2'},
      {type: 'C', description: 'C. Protección de conos de derrame', unit: 'm2'},
      {type: 'D', description: 'D. Construcción de cunetas', unit: 'm'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Aletas': [
      {type: 'A', description: 'A. Reparación de concreto', unit: 'm2'},
      {type: 'B', description: 'B. Encamisado de concreto reforzado para protección', unit: 'm2'},
      {type: 'C', description: 'C. Encamisado como reforzamiento estructural', unit: 'm2'},
      {type: 'D', description: 'D. Cambio de la estructura', unit: 'm2'},
      {type: 'E', description: 'E. Cambio de parte de la estructura', unit: 'm2'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Estribos': [
      {type: 'A', description: 'A. Reparación de concreto', unit: 'm2'},
      {type: 'B', description: 'B. Encamisado de concreto reforzado para protección', unit: 'm2'},
      {type: 'C', description: 'C. Encamisado como reforzamiento estructural', unit: 'm2'},
      {type: 'D', description: 'D. Cambio de la estructura', unit: 'm2'},
      {type: 'E', description: 'E. Cambio de parte de la estructura', unit: 'm2'},
      {type: 'F', description: 'F. Nivelación', unit: 'm'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Pilas': [
      {type: 'A', description: 'A. Reparación de concreto', unit: 'm2'},
      {type: 'B', description: 'B. Encamisado de concreto reforzado para protección', unit: 'm2'},
      {type: 'C', description: 'C. Encamisado como reforzamiento estructural', unit: 'm2'},
      {type: 'D', description: 'D. Cambio de la estructura', unit: 'm2'},
      {type: 'E', description: 'E. Cambio de parte de la estructura', unit: 'm2'},
      {type: 'F', description: 'F. Nivelación', unit: 'm'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Apoyos': [
      {type: 'A', description: 'A. Cambio de apoyos', unit: 'm'},
      {type: 'B', description: 'B. Corrección de la posición (incl. superestructura)', unit: 'm'},
      {type: 'C', description: 'C. Reparación de concreto / Lechadear', unit: 'm'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Losa': [
      {type: 'A', description: 'A. Refuerzo (Sobrelosa)', unit: 'm2'},
      {type: 'B', description: 'B. Reparación de concreto', unit: 'm2'},
      {type: 'C', description: 'C. Cambio de la losa', unit: 'm2'},
      {type: 'D', description: 'D. Inyección de grietas con epoxy/resina', unit: 'm'},
      {type: 'E', description: 'E. Reparación de drenes', unit: 'und'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Vigas/ Largueros/ Diafragmas': [
      {type: 'A', description: 'A. Reparación de concreto', unit: 'm2'},
      {type: 'B', description: 'B. Refuerzo de viga de concreto', unit: 'm'},
      {type: 'C', description: 'C. Cambio de viga de concreto', unit: 'm'},
      {type: 'D', description: 'D. Inyección de grietas', unit: 'm'},
      {type: 'E', description: 'E. Reparación de componentes de acero', unit: 'm'},
      {type: 'F', description: 'F. Pintura de acero', unit: 'm2'},
      {type: 'G', description: 'G. Cambio de viga de acero', unit: 'm'},
      {type: 'H', description: 'H. Refuerzo de viga de acero', unit: 'm'},
      {type: 'I', description: 'I. Cambio de viga de concreto prefabricado', unit: 'm'},
      {type: 'J', description: 'J. Cambio de viga de concreto', unit: 'm'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Elementos de arco': [
      {type: 'A', description: 'A. Reemplazar pernos o remaches defectuosos', unit: 'und'},
      {type: 'B', description: 'B. Reparación de componentes de arco', unit: 'm'},
      {type: 'C', description: 'C. Pintura de acero', unit: 'm2'},
      {type: 'D', description: 'D. Reparación de concreto', unit: 'm2'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Cables/ Pendolones/ Torres / Macizas': [
      {type: 'A', description: 'A. Reemplazo de pernos y/o remaches defectuosos', unit: 'und'},
      {type: 'B', description: 'B. Reparación de componentes de acero', unit: 'm'},
      {type: 'C', description: 'C. Pintura de acero', unit: 'm2'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Elementos de armadura': [
      {type: 'A', description: 'A. Remplazar pernos y/o remaches defectuosos', unit: 'und'},
      {type: 'B', description: 'B. Reparación de componentes de acero', unit: 'm'},
      {type: 'C', description: 'C. Pintura de acero', unit: 'm2'},
      {type: 'D', description: 'D. Reposición de elementos faltantes o dañados', unit: 'Kg'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Cauce': [
      {type: 'A', description: 'A. Renivelar', unit: 'm3'},
      {type: 'B', description: 'B. Reencauzamiento', unit: 'm3'},
      {type: 'C', description: 'C. Protección del cauce', unit: 'm2'},
      {type: 'D', description: 'D. Gaviones', unit: 'm3'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Otros elementos': [
      {type: 'A', description: 'A. Reparación de señales', unit: 'und'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
    'Puente general': [
      {type: 'A', description: 'A. Cambio del puente', unit: 'und'},
      {type: 'B', description: 'B. Cambio de la superestructura', unit: 'und'},
      {type: 'C', description: 'C. Cambio de la superestructura', unit: 'und'},
      {type: 'D', description: 'D. Puente nuevo (paralelo)', unit: 'und'},
      {type: 'E', description: 'E. Construcción de puente peatonal', unit: 'm2'},
      {type: 'Z', description: 'Z. Otra', unit: 'unidad'},
    ],
  };
}
