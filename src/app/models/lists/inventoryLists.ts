export class inventoryLists {

  static typeStepOptions = [
    { value: 10, label: '10. Carretera Nacional (del INV)' },
    { value: 11, label: '11. Carretera concesionada' },
    { value: 12, label: '12. Otra carretera (no del INV)' },
    { value: 13, label: '13. Paso peatonal' },
    { value: 20, label: '20. Ferrocarril' },
    { value: 30, label: '30. Río o Arroyo' },
    { value: 31, label: '31. Canal' },
    { value: 40, label: '40. Valle' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static inspectionRequirementOptions = [
    { value: 0, label: '0. Nada' },
    { value: 1, label: '1. Grúa con canastilla ("Snooper")' },
    { value: 2, label: '2. Grúa con canastilla ("Lift")' },
    { value: 3, label: '3. Bote' },
    { value: 9, label: '9. Otro' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static transversalStructuringOptions = [
    { value: 10, label: '10. Losa' },
    { value: 11, label: '11. Losa/viga, 1 viga' },
    { value: 12, label: '12. Losa/viga, 2 vigas' },
    { value: 13, label: '13. Losa/viga, 3 vigas' },
    { value: 14, label: '14. Losa/viga, 4 o más vigas' },
    { value: 30, label: '30. Trabe cajón, 1 cajón' },
    { value: 31, label: '31. Trabe cajón, 2 o más cajones' },
    { value: 40, label: '40. Armadura de paso inferior' },
    { value: 41, label: '41. Armadura de paso superior' },
    { value: 42, label: '42. Armadura de paso a través' },
    { value: 50, label: '50. Arco superior' },
    { value: 51, label: '51. Arco inferior, tipo abierto' },
    { value: 52, label: '52. Arco inferior, tipo cerrado' },
    { value: 80, label: '80. Provisional, tipo Bailey' },
    { value: 81, label: '81. Provisional, tipo Callender Hamilton' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static longitudinalStructuringOptions = [
    { value: 10, label: '10. Simplemente apoyado, sección transversal constante' },
    { value: 11, label: '11. Simplemente apoyado, sección transversal variable' },
    { value: 20, label: '20. Viga continua, sección transversal constante' },
    { value: 21, label: '21. Viga continua, sección transversal variable' },
    { value: 30, label: '30. Viga Gerber, sección transversal constante' },
    { value: 31, label: '31. Viga Gerber, sección transversal variable' },
    { value: 40, label: '40. Pórtico, sección transversal constante' },
    { value: 41, label: '41. Pórtico, sección transversal variable' },
    { value: 42, label: '42. Cajones (box culvert)' },
    { value: 50, label: '50. Puente colgante' },
    { value: 60, label: '60. Puente atirantado' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static materialConstructionOptions = [
    { value: 10, label: '10. Concreto ciclópeo' },
    { value: 11, label: '11. Concreto sin refuerzo' },
    { value: 20, label: '20. Concreto reforzado, in situ' },
    { value: 21, label: '21. Concreto reforzado, prefabricado & in situ' },
    { value: 30, label: '30. Concreto pretensado, in situ' },
    { value: 31, label: '31. Concreto pretensado, prefabricado' },
    { value: 32, label: '32. Concreto pretensado, prefabricado & in situ' },
    { value: 50, label: '50. Acero' },
    { value: 51, label: '51. Acero y concreto' },
    { value: 60, label: '60. Piedra o roca' },
    { value: 70, label: '70. Ladrillo' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static stirrupstypeOptions = [
    { value: 10, label: '10. Con aletas integradas' },
    { value: 11, label: '11. Con aletas separadas' },
    { value: 20, label: '20. Enterrado; sólido' },
    { value: 21, label: '21. Enterrado; columnas/pilotes con viga cabezal' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ]

  static stirrupsMaterialOptions = [
    { value: 10, label: '10. Mampostería' },
    { value: 20, label: '20. Concreto ciclópeo' },
    { value: 21, label: '21. Concreto reforzado' },
    { value: 30, label: '30. Acero' },
    { value: 40, label: '40. Acero y concreto' },
    { value: 50, label: '50. Tierra armada' },
    { value: 60, label: '60. Ladrillo' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static stirrupsFoundationTypeOptions = [
    { value: 10, label: '10. Cimentación superficial' },
    { value: 20, label: '20. Pilotes de concreto' },
    { value: 21, label: '21. Pilotes de acero' },
    { value: 22, label: '22. Pilotes de madera' },
    { value: 30, label: '30. Caisson de concreto' },
    { value: 40, label: '40. Cajón autofundante' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static railingTypeOptions = [
    { value: 10, label: '10. Mampostería' },
    { value: 20, label: '20. Concreto sólido' },
    { value: 21, label: '21. Concreto sólido con pasamanos metálicas' },
    { value: 30, label: '30. Pasamanos de concreto sobre pilastras de concreto' },
    { value: 40, label: '40. Pasamanos metálicas sobre pilastras de concreto' },
    { value: 41, label: '41. Pasamanos metálicas sobre pilastras metálicas' },
    { value: 50, label: '50. Construcción metálica ligera' },
    { value: 60, label: '60. Parte integral de la superestructura' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static roadwaySurfaceOptions = [
    { value: 10, label: '10. Asfalto' },
    { value: 20, label: '20. Concreto' },
    { value: 30, label: '30. Acero (con dispositivos de fricción)' },
    { value: 40, label: '40. Afirmado' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static expansionJointOptions = [
    { value: 10, label: '10. Placa de acero' },
    { value: 11, label: '11. Placa de acero cubierto de asfalto' },
    { value: 12, label: '12. Placas verticales ángulos de acero' },
    { value: 13, label: '13. Junta dentada' },
    { value: 20, label: '20. Acero con sello fijo de neopreno' },
    { value: 21, label: '21. Acero con neopreno comprimido' },
    { value: 30, label: '30. Bloque de neopreno' },
    { value: 40, label: '40. Junta de goma asfáltica' },
    { value: 50, label: '50. No dispositivo de junta' },
    { value: 51, label: '51. Junta de cartón asfaltado' },
    { value: 52, label: '52. Junta de cartón asfaltado con sello' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static pileTypeOptions = [
    { value: 10, label: '10. Pila sólida' },
    { value: 20, label: '20. Columna sola' },
    { value: 21, label: '21. 2 o más columnas sin viga cabezal' },
    { value: 30, label: '30. Columna sola con viga cabezal' },
    { value: 31, label: '31. 2 o más columnas con vigas cabezales separadas' },
    { value: 32, label: '32. 2 o más columnas con viga cabezal común' },
    { value: 33, label: '33. Columnas con viga cabezal y diafragma' },
    { value: 40, label: '40. Pilotes con viga cabezal' },
    { value: 41, label: '41. Pilotes con viga cabezal y diafragma' },
    { value: 50, label: '50. Mástil (pilón)' },
    { value: 60, label: '60. Torre metálica' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static pileMaterialOptions = [
    { value: 10, label: '10. Mampostería' },
    { value: 20, label: '20. Concreto ciclópeo' },
    { value: 21, label: '21. Concreto reforzado' },
    { value: 30, label: '30. Acero' },
    { value: 40, label: '40. Acero y concreto' },
    { value: 50, label: '50. Tierra armada' },
    { value: 60, label: '60. Ladrillo' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static foundationTypeOptions = [
    { value: 10, label: '10. Cimentación superficial' },
    { value: 20, label: '20. Pilotes de concreto' },
    { value: 21, label: '21. Pilotes de acero' },
    { value: 22, label: '22. Pilotes de madera' },
    { value: 30, label: '30. Caisson de concreto' },
    { value: 40, label: '40. Cajón autofundante' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static fixedSupportTypes = [
    { value: 10, label: '10. Junta de construcción (acaso con una capa de cartón asfaltado o de plomo)' },
    { value: 20, label: '20. Balancín de concreto' },
    { value: 30, label: '30. Placas de neopreno' },
    { value: 40, label: '40. Apoyo fijo de acero' },
    { value: 41, label: '41. Apoyo de deslizamiento (acero)' },
    { value: 42, label: '42. Balancín de acero' },
    { value: 43, label: '43. Apoyos de rodillos (acero)' },
    { value: 50, label: '50. Basculante' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static loadDistributionClasses = [
    { value: 1, label: '1. Distribución en 2 direcciones' },
    { value: 2, label: '2. Distribución en 1 dirección' },
    { value: 3, label: '3. No hay distribución' },
    { value: 90, label: '90. Otro' },
    { value: 91, label: '91. No aplicable' },
    { value: 92, label: '92. Desconocido' },
    { value: 93, label: '93. No registrado' }
  ];

  static snOptions = [
    { value: 0, label: 'S' },
    { value: 1, label: 'N' },
  ]

  static ctOptions = [
    { value: 0, label: 'C' },
    { value: 1, label: 'T' },
  ]

  static siOptions = [
    { value: 0, label: 'S' },
    { value: 1, label: 'I' },
  ]

  static yearOptions = Array.from({ length: 2024 - 1920 + 1 }, (v, k) => ({
    value: 1920 + k,
    label: `${1920 + k}`
  }));

  static abscDirection  = [
    { value: 0, label: 'N' },
    { value: 1, label: 'S' },
    { value: 2, label: 'E' },
    { value: 3, label: 'O' },

  ]

  static sectionOptions = Array.from({ length: 4 }, (v, k) => ({
    value: k + 1,
    label: `${k + 1}`
  }));

  static lightOptions = Array.from({ length: 10 }, (v, k) => ({
    value: k + 1,
    label: `${k + 1}`
  }));

  static longitudinalOptions = Array.from({ length: (100 - 0) / 0.1 + 1 }, (v, k) => ({
    value: (0 + k * 0.1).toFixed(2),
    label: `${(0 + k * 0.1).toFixed(2)} m`
  }));

  static boardWidthOptions = Array.from({ length: (20 - 3) * 10 + 1 }, (v, k) => ({
    value: (0 + k * 0.1).toFixed(2),
    label: `${ (3 + k * 0.1).toFixed(2)} m`
  }));

  static separatorWidthOptions = Array.from({ length: (1.5 - 0.5) * 10 + 1 }, (v, k) => ({
    value: (0.5 + k * 0.1).toFixed(1),
    label: `${ (0.5 + k * 0.1).toFixed(1)} m`
  }));

  static sidewalkWidthOptions = Array.from({ length: (2.0 - 0.5) * 10 + 1 }, (v, k) => ({
    value: (0.5 + k * 0.1).toFixed(1),
    label: `${ (0.5 + k * 0.1).toFixed(1)}`
  }));

  static roadwayWidthOptions = Array.from({ length: (5.0 - 2.0) * 10 + 1 }, (v, k) => ({
    value: (1.0 + k * 0.1).toFixed(1),
    label: `${ (2.0 + k * 0.1).toFixed(1)}`
  }));

  static pileHeightOptions = Array.from({ length: (150.0 - 1.0) * 10 + 1 }, (v, k) => ({
    value: (1.0 + k * 0.1).toFixed(2),
    label: `${(1.0 + k * 0.1).toFixed(2)}`
  }));

  static abutmentHeightOptions = Array.from({ length: (50.0 - 1.0) * 10 + 1 }, (v, k) => ({
    value: (1.0 + k * 0.1).toFixed(2),
    label: `${(1.0 + k * 0.1).toFixed(1)}`
  }));

  static supportLengthOptions = Array.from({ length: (1.5 - 0.2) * 10 + 1 }, (v, k) => ({
    value: (0.2 + k * 0.1).toFixed(2),
    label: `${(0.2 + k * 0.1).toFixed(2)}`
  }));

  static skewAngleOptions = Array.from({ length: (90.0 - 10.0) * 10 + 1 }, (v, k) => ({
    value: (0.0 + k * 0.1).toFixed(2),
    label: `${(10.0 + k * 0.1).toFixed(2)} Grados`
  }));

  static latitudeDegreesOptions = Array.from({ length: (90 - (-90)) + 1 }, (v, k) => ({
    value: (-90 + k).toFixed(1),
    label: `${(-90 + k).toFixed(1)}`
  }));

  static longitudeDegreesOptions = Array.from({ length: (180 - (-180)) + 1 }, (v, k) => ({
    value: (-180 + k).toFixed(1),
    label: `${(-180 + k).toFixed(1)}`
  }));

  static minutesOptions = Array.from({ length: 60 }, (v, k) => ({
    value: k.toFixed(1),
    label: `${k.toFixed(1)}`
  }));

  static secondsOptions = Array.from({ length: (59.9 - 0) * 10 + 1 }, (v, k) => ({
    value: (0 + k * 0.1).toFixed(1),
    label: `${(0 + k * 0.1).toFixed(1)}`
  }));

  static altitudeOptions = Array.from({ length: (9000 - -500) / 1 + 1 }, (v, k) => ({
    value: (-500 + k * 1).toFixed(0),
    label: `${(-500 + k * 1).toFixed(0)} m`
  }));

  static seismicAccelerationCoefficientOptions = Array.from({ length: (1.0 - 0.05) * 20 + 1 }, (v, k) => ({
    value: (0.05 + k * 0.05).toFixed(2),
    label: `${(0.05 + k * 0.05).toFixed(2)}`
  }));

  static variableLengthOptions = Array.from({ length: (500 - 1) + 1 }, (v, k) => ({
    value: (1 + k).toFixed(1),
    label: `${(1 + k).toFixed(1)} km`
  }));

  static brmOptions = [
    { value: 0, label: 'Bueno' },
    { value: 1, label: 'Regular' },
    { value: 2, label: 'Malo' },
  ]

  static criticalSpanLengthOptions = Array.from({ length: (200 - 1) + 1 }, (v, k) => ({
    value: (1 + k).toFixed(1),
    label: `${(1 + k).toFixed(1)} m`
  }));

  static classificationFactorOptions = Array.from({ length: (3.0 - 0.1) * 10 + 1 }, (v, k) => ({
    value: (0.1 + k * 0.1).toFixed(1),
    label: `${(0.1 + k * 0.1).toFixed(1)}`
  }));

  static linealOptions = [
    { value: 0, label: 'Pendiente' },
    { value: 1, label: 'Numerico' },
  ]
}
