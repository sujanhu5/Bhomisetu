export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export type StageId = 
  | 'sia'
  | 'notification'
  | 'consent'
  | 'award'
  | 'compensation'
  | 'possession'
  | 'rr';

export type NavTab = 
  | 'overview'
  | 'projects'
  | 'intelligence'
  | 'intelligence-center'
  | 'risk-analysis'
  | 'gis-map'
  | 'simulator'
  | 'inaction-cost'
  | 'reports';

export type IntelligenceSubTab = 
  | 'trajectory'
  | 'gis-parcels'
  | 'document-ai'
  | 'optimal-intervention';

export type TrendDirection = 'improving' | 'stable' | 'worsening' | 'rapidly-increasing';

export interface RiskTrajectoryPoint {
  dateLabel: string;
  daysAgo: number;
  risk: number;
  delayMonths: number;
  milestone?: string;
}

export interface RiskTrajectoryData {
  currentRisk: number;
  previousRisk: number; // 30 days ago
  change30d: number; // e.g. +21
  riskVelocity: number; // e.g. +0.70 pts/day
  trendDirection: TrendDirection;
  trendExplanation: string;
  points: RiskTrajectoryPoint[];
}

export interface ParcelContributor {
  name: string;
  impactPct: number;
}

export interface ParcelData {
  id: string;
  parcelNumber: string; // e.g. 'P-1022'
  surveyNumber: string; // e.g. 'Sy.No 142/2A'
  village: string; // e.g. 'Rampura'
  district: string;
  coordinates: [number, number];
  areaHa: number;
  riskScore: number; // 0 to 100
  riskLevel: RiskLevel;
  ownership: 'Single Owner' | 'Multiple Joint Owners' | 'Disputed Title' | 'Trust/Temple Land' | 'Inam Land';
  legalStatus: 'No Legal Dispute' | 'Active Court Reference (Sec 64)' | 'Injunction Petition' | 'High Court Writ' | 'Partition Suit';
  compensationStatus: 'Disbursed (DBT)' | 'Pending Title Verification' | 'Escrow Deposited' | 'Aadhaar Linkage Failure' | 'Treasury Clearance Lag';
  documentationStatus: 'Complete & Verified' | 'Incomplete / Missing Khata' | 'Mismatch in Survey Record';
  affectedFamily: boolean;
  familyCount: number;
  ownerName: string;
  riskContributors: ParcelContributor[];
  recommendedActions: string[];
  lastUpdated: string;
}

export interface ParcelSummary {
  totalParcels: number;
  lowCount: number;
  mediumCount: number;
  highCount: number;
  criticalCount: number;
}

export interface ExtractedField {
  key: string;
  label: string;
  value: string;
  confidence: number; // 0 to 100
  needsVerification?: boolean;
  category: 'core' | 'legal' | 'compensation' | 'cadastral';
}

export interface ExtractedIssue {
  type: 'ownership' | 'compensation' | 'legal' | 'cadastral';
  severity: 'high' | 'critical' | 'moderate';
  message: string;
  impactRiskPct: number;
}

export interface DocumentAnalysisResult {
  id: string;
  documentTitle: string;
  documentType: string;
  uploadedAt: string;
  fileSize: string;
  status: 'processing' | 'completed' | 'applied';
  projectName: string;
  state: string;
  district: string;
  village: string;
  surveyNumber: string;
  parcelNumber: string;
  landAreaHa: number;
  ownerName: string;
  affectedFamilies: number;
  notificationDate: string;
  awardDate: string;
  compensationAmountCr: number;
  authority: string;
  legalInfo: string;
  importantDeadlines: string;
  fields: ExtractedField[];
  potentialIssues: ExtractedIssue[];
  riskDeltaExplanation: string;
  riskDeltaPct: number; // e.g. +6 or +13
}

export interface InterventionItem {
  id: string;
  title: string;
  description: string;
  category: 'Administrative' | 'Dispute' | 'Financial' | 'Personnel' | 'Procedural';
  riskReductionPct: number; // e.g. 21%
  projectedRisk: number; // e.g. 61%
  implementationCostCr: number; // e.g. 0.8 Cr
  implementationDays: number; // e.g. 15 days
  responsibleDept: string;
  expectedDelayReductionDays: number; // e.g. 25 days
  feasibilityScore: number; // 1-10
  selected?: boolean;
}

export interface OptimalInterventionResult {
  title: string;
  optionLabel: string;
  interventionIds: string[];
  actionsList: string[];
  currentRisk: number;
  projectedRisk: number;
  riskReductionPts: number;
  expectedDelayReductionDays: number;
  expectedDelayReductionMonths: number;
  estimatedCostAvoidedCr: number;
  totalOutlayCr: number;
  roiMultiplier: number;
  departmentDirective: string;
}

export interface StageData {
  id: StageId;
  name: string;
  shortCode: string;
  rfctlarrSec: string;
  riskScore: number; // 0 to 100
  riskLevel: RiskLevel;
  status: 'completed' | 'active' | 'upcoming';
  avgDays: number;
  expectedDays: number;
  description: string;
}

export interface ShapFactor {
  name: string;
  impact: number; // e.g. +24 or -8
  type: 'increase' | 'reduce';
  description: string;
  metricValue: string;
}

export interface ProjectCostImpact {
  constructionEscalationCr: number; // in Crores INR
  idleResourcesCr: number;
  contractualImpactCr: number;
  totalImpactCr: number;
  interventionCostCr: number;
  potentialAvoidedImpactCr: number;
  roiMultiplier: number;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  district: string;
  state: string;
  type: 'Highway' | 'Railways' | 'Industrial' | 'Irrigation' | 'Urban Infra' | 'Energy';
  executingAgency: string;
  currentStageId: StageId;
  overallRisk: number; // percentage e.g. 82
  overallRiskLevel: RiskLevel;
  expectedDelayMonths: number;
  totalParcels: number;
  affectedFamilies: number;
  daysInCurrentStage: number;
  totalLandAreaHa: number;
  nodalOfficer: string;
  contactOffice: string;
  coordinates: [number, number]; // [lat, lng]
  stages: StageData[];
  riskTrend: { month: string; risk: number; delayMonths: number }[];
  shapFactors: ShapFactor[];
  delayStory: string;
  costImpact: ProjectCostImpact;
  simulationBaseline: {
    pendingClaims: number;
    avgProcessingDays: number;
    activeDisputes: number;
    familyVerificationPct: number;
    recordsDigitizedPct: number;
  };
  // Advanced Intelligence Extensions
  riskTrajectory?: RiskTrajectoryData;
  parcelSummary?: ParcelSummary;
  parcels?: ParcelData[];
  documents?: DocumentAnalysisResult[];
  interventions?: InterventionItem[];
  optimalRecommendation?: OptimalInterventionResult;
  documentIntelligenceApplied?: boolean;
}

export interface PriorityAlert {
  id: string;
  projectId: string;
  projectName: string;
  district: string;
  stageName: string;
  riskScore: number;
  riskLevel: RiskLevel;
  urgency: string;
  recommendedAction: string;
  timestamp: string;
}

export interface ReportTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  frequency: string;
  lastGenerated: string;
  pages: number;
}

