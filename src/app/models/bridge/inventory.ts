export interface Inventory {
  inventoryDate: Date;
  generalInformation: generalInformation;
  steps: steps;
  administrativeData: administrativeData;
  technicalData: technicalData;
  superstructurePrimary: superstructurePrimary;
  superstructureSecondary: superstructureSecondary;
  substructureAbutments: substructureAbutments;
  substructureDetails: substructureDetails;
  substructurePiles: substructurePiles;
  substructureSignals: substructureSignals;
  supports: supports;
  stakeholders: stakeholders;
  geographicPosition: geographicPosition;
  legalTrafficLoadCapacity: legalTrafficLoadCapacity;
  transportLoadCapacity: transportLoadCapacity;
  observations: observations;
}

export interface generalInformation {
  name: string;
  image?: string;
  regionalIdentification: string;
  roadIdentification: string;
  bridgeIdentification: string;
  road: string;
  pr: string;
  regional: string;
}

export interface steps {
  stepTypeOne: string;
  firstOne: string;
  supInfOne: string;
  clearanceIOne: string;
  clearanceIMOne: string;
  clearanceDMOne: string;
  clearanceDOne: string;
  stepTypeTwo: string;
  firstTwo: string;
  supInfTwo: string;
  clearanceITwo: string;
  clearanceIMTwo: string;
  clearanceDMTwo: string;
  clearanceDTwo: string;
}

export interface administrativeData {
  constructionYear: string;
  reconstructionYear: string;
  absDirection: string;
  inspectionRequirements: string;
  inspectionSectionsNumber: string;
  countingStation: string;
  dataCollectionDate: Date;
  inspectorInitials: string;
}

export interface technicalData {
  lightsNumber: string;
  minorSpanLength: string;
  majorSpanLength: string;
  totalLength: string;
  boardWidth: string;
  separatorWidth: string;
  leftSidewalkWidth: string;
  rightSidewalkWidth: string;
  roadwayWidth: string;
  curbWidth: string;
  accessWidth: string;
  pileHeight: string;
  abutmentHeight: string;
  supportLengthOnPiles: string;
  supportLengthOnAbutments: string;
  embankmentBridge: string;
  curveBridge: string;
  skewAngle: string;
  geoImage?: string;
}

export interface superstructurePrimary {
  designType: string;
  transversalStructuringType: string;
  longitudinalStructuringType: string;
  material: string;
  image?: string;
}

export interface superstructureSecondary {
  designType: string;
  transversalStructuringType: string;
  longitudinalStructuringType: string;
  material: string;
  image?: string;
}

export interface substructureAbutments {
  type: string;
  material: string;
  foundationType: string;
  image?: string;
}

export interface substructureDetails {
  railingType: string;
  roadwaySurface: string;
  expansionJoint: string;
  image?: string;
}

export interface substructurePiles {
  type: string;
  material: string;
  foundationType: string;
  image?: string;
}

export interface substructureSignals {
  maxLoad: number;
  maxSpeed: number;
  otherInfo: string;
  image?: string;
}

export interface supports {
  fixedSupportsOnAbutments: string;
  movableSupportsOnAbutments: string;
  fixedSupportsOnPiles: string;
  movableSupportsOnPiles: string;
  fixedSupportsOnBeams: string;
  movableSupportsOnBeams: string;
  designVehicle: string;
  loadDistributionClass: string;
  image?: string;
}

export interface stakeholders {
  owner: string;
  department: string;
  roadManager: string;
  designer: string;
  municipality: string;
}

export interface geographicPosition {
  latitudeDegree: string;
  latitudeMinute: string;
  latitudeSecond: string;
  longitudeDegree: string;
  longitudeMinute: string;
  longitudeSecond: string;
  altitude: string;
  seismicAccelerationCoefficient: string;
  causewayPassage: string;
  variantExists: string;
  variantLength: string;
  condition: string;
}

export interface legalTrafficLoadCapacity {
  criticalSpanLength: string;
  classificationFactor: string;
}

export interface transportLoadCapacity {
  shearForce: string;
  moment: string;
  wheelLoadLine: string;
}

export interface observations {
  notes: string;
  image?: string;
}

