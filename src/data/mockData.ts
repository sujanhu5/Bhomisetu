import { Project, PriorityAlert, ReportTemplate } from '../types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'nh-48-expansion',
    code: 'BH-2026-0042',
    name: 'NH-48 Expansion (6-Lane Corridor)',
    district: 'Tumakuru',
    state: 'Karnataka',
    type: 'Highway',
    executingAgency: 'National Highways Authority of India (NHAI)',
    currentStageId: 'compensation',
    overallRisk: 82,
    overallRiskLevel: 'critical',
    expectedDelayMonths: 7.8,
    totalParcels: 842,
    affectedFamilies: 318,
    daysInCurrentStage: 74,
    totalLandAreaHa: 142.5,
    nodalOfficer: 'Dr. S. K. Hiremath, IAS (Special Land Acquisition Officer)',
    contactOffice: 'District Commissionerate, Tumakuru - 572101',
    coordinates: [13.3409, 77.1010],
    stages: [
      {
        id: 'sia',
        name: 'Social Impact Assessment',
        shortCode: 'SIA',
        rfctlarrSec: 'Section 4 & 7',
        riskScore: 12,
        riskLevel: 'low',
        status: 'completed',
        avgDays: 45,
        expectedDays: 60,
        description: 'SIA report approved by Expert Group. Public hearing successfully conducted in 14 Gram Panchayats.'
      },
      {
        id: 'notification',
        name: 'Preliminary Notification',
        shortCode: 'Notification',
        rfctlarrSec: 'Section 11(1)',
        riskScore: 18,
        riskLevel: 'low',
        status: 'completed',
        avgDays: 32,
        expectedDays: 40,
        description: 'Gazette notification published in state & local vernacular dailies with cadastral survey maps.'
      },
      {
        id: 'consent',
        name: 'Declaration of Acquisition',
        shortCode: 'Consent',
        rfctlarrSec: 'Section 19(1)',
        riskScore: 43,
        riskLevel: 'moderate',
        status: 'completed',
        avgDays: 85,
        expectedDays: 75,
        description: 'Section 15 objections disposed. Final declaration published under Section 19.'
      },
      {
        id: 'award',
        name: 'Award Enquiry & Determination',
        shortCode: 'Award',
        rfctlarrSec: 'Section 23 & 30',
        riskScore: 61,
        riskLevel: 'high',
        status: 'completed',
        avgDays: 110,
        expectedDays: 90,
        description: 'Market value determined using multiplier factor (1.5x) and 100% Solatium computed.'
      },
      {
        id: 'compensation',
        name: 'Compensation Disbursement',
        shortCode: 'Compensation',
        rfctlarrSec: 'Section 77',
        riskScore: 82,
        riskLevel: 'critical',
        status: 'active',
        avgDays: 74,
        expectedDays: 45,
        description: 'Direct Benefit Transfer disbursement in progress. 43 claims pending due to title verification and treasury lag.'
      },
      {
        id: 'possession',
        name: 'Taking of Possession',
        shortCode: 'Possession',
        rfctlarrSec: 'Section 38',
        riskScore: 71,
        riskLevel: 'high',
        status: 'upcoming',
        avgDays: 0,
        expectedDays: 45,
        description: 'Physical handover of unencumbered land parcel right-of-way to NHAI project director.'
      },
      {
        id: 'rr',
        name: 'Resettlement & Rehabilitation',
        shortCode: 'R&R',
        rfctlarrSec: 'Section 31',
        riskScore: 76,
        riskLevel: 'high',
        status: 'upcoming',
        avgDays: 0,
        expectedDays: 60,
        description: 'Allotment of alternative housing sites in Sira Industrial Layout and livelihood assistance grant.'
      }
    ],
    riskTrend: [
      { month: 'Feb 2026', risk: 38, delayMonths: 2.1 },
      { month: 'Mar 2026', risk: 46, delayMonths: 3.4 },
      { month: 'Apr 2026', risk: 59, delayMonths: 4.8 },
      { month: 'May 2026', risk: 68, delayMonths: 5.9 },
      { month: 'Jun 2026', risk: 77, delayMonths: 6.9 },
      { month: 'Jul 2026', risk: 82, delayMonths: 7.8 }
    ],
    shapFactors: [
      {
        name: 'Pending compensation claims (43 cases)',
        impact: 24,
        type: 'increase',
        metricValue: '43 pending claims',
        description: 'Disbursement stalled on 43 parcels due to joint-family title validation and court reference requests.'
      },
      {
        name: 'Average payment turnaround delay',
        impact: 18,
        type: 'increase',
        metricValue: '74 days avg (benchmark 45d)',
        description: 'Treasury bill clearance and SLAO escrow release cycle taking 29 days above state baseline.'
      },
      {
        name: 'Active civil court & family disputes',
        impact: 14,
        type: 'increase',
        metricValue: '17 active disputes',
        description: 'Section 64 reference filings pending before Principal District Judge regarding partition shares.'
      },
      {
        name: 'Historical district delay pattern',
        impact: 11,
        type: 'increase',
        metricValue: '+1.6x regional lead time',
        description: 'Tumakuru revenue division historical SLAO disposal velocity lags state average during Kharif crop season.'
      },
      {
        name: 'Family Aadhaar & KYC verification rate',
        impact: -8,
        type: 'reduce',
        metricValue: '82% verified',
        description: 'High biometric authentication and Khata bank account linkage mitigating identity fraud risk.'
      },
      {
        name: 'Land records digitized in Bhoomi portal',
        impact: -5,
        type: 'reduce',
        metricValue: '91% digitized',
        description: 'Karnataka Bhoomi RTC integration verified for rapid automatic mutation verification.'
      }
    ],
    delayStory: 'Compensation is currently the highest-risk stage because 43 claims remain unresolved and the average payment delay is 74 days. Active disputes and the district\'s historical processing pattern further increase the likelihood of delay.',
    costImpact: {
      constructionEscalationCr: 18.4,
      idleResourcesCr: 6.2,
      contractualImpactCr: 3.7,
      totalImpactCr: 28.3,
      interventionCostCr: 1.2,
      potentialAvoidedImpactCr: 14.6,
      roiMultiplier: 12.2
    },
    simulationBaseline: {
      pendingClaims: 43,
      avgProcessingDays: 74,
      activeDisputes: 17,
      familyVerificationPct: 82,
      recordsDigitizedPct: 91
    }
  },
  {
    id: 'bengaluru-ring-road',
    code: 'BH-2026-0019',
    name: 'Bengaluru Satellite Town Ring Road (STRR)',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    type: 'Highway',
    executingAgency: 'National Highways Authority of India (NHAI)',
    currentStageId: 'consent',
    overallRisk: 67,
    overallRiskLevel: 'high',
    expectedDelayMonths: 5.2,
    totalParcels: 1240,
    affectedFamilies: 512,
    daysInCurrentStage: 88,
    totalLandAreaHa: 280.0,
    nodalOfficer: 'Smt. R. Anupama, KAS',
    contactOffice: 'NHAI Regional Office, Bengaluru',
    coordinates: [12.9716, 77.5946],
    stages: [
      { id: 'sia', name: 'Social Impact Assessment', shortCode: 'SIA', rfctlarrSec: 'Sec 4 & 7', riskScore: 22, riskLevel: 'low', status: 'completed', avgDays: 50, expectedDays: 60, description: 'SIA cleared by state advisory council.' },
      { id: 'notification', name: 'Preliminary Notification', shortCode: 'Notification', rfctlarrSec: 'Sec 11', riskScore: 35, riskLevel: 'low', status: 'completed', avgDays: 42, expectedDays: 40, description: 'Notified across 3 taluks.' },
      { id: 'consent', name: 'Declaration of Acquisition', shortCode: 'Consent', rfctlarrSec: 'Sec 19', riskScore: 67, riskLevel: 'high', status: 'active', avgDays: 88, expectedDays: 60, description: 'Sec 15 objections filed by 94 peri-urban landowners demanding commercial guidance valuation.' },
      { id: 'award', name: 'Award Enquiry & Determination', shortCode: 'Award', rfctlarrSec: 'Sec 23', riskScore: 54, riskLevel: 'moderate', status: 'upcoming', avgDays: 0, expectedDays: 90, description: 'Valuation committee draft pending.' },
      { id: 'compensation', name: 'Compensation Disbursement', shortCode: 'Compensation', rfctlarrSec: 'Sec 77', riskScore: 62, riskLevel: 'high', status: 'upcoming', avgDays: 0, expectedDays: 60, description: 'Escrow account sanctioned.' },
      { id: 'possession', name: 'Taking of Possession', shortCode: 'Possession', rfctlarrSec: 'Sec 38', riskScore: 59, riskLevel: 'moderate', status: 'upcoming', avgDays: 0, expectedDays: 45, description: 'Corridor demarcation started.' },
      { id: 'rr', name: 'Resettlement & Rehabilitation', shortCode: 'R&R', rfctlarrSec: 'Sec 31', riskScore: 48, riskLevel: 'moderate', status: 'upcoming', avgDays: 0, expectedDays: 60, description: 'Commercial rehabilitation package.' }
    ],
    riskTrend: [
      { month: 'Feb 2026', risk: 30, delayMonths: 1.5 },
      { month: 'Mar 2026', risk: 42, delayMonths: 2.8 },
      { month: 'Apr 2026', risk: 53, delayMonths: 3.9 },
      { month: 'May 2026', risk: 61, delayMonths: 4.6 },
      { month: 'Jun 2026', risk: 65, delayMonths: 5.0 },
      { month: 'Jul 2026', risk: 67, delayMonths: 5.2 }
    ],
    shapFactors: [
      { name: 'Peri-urban guideline value dispute', impact: 21, type: 'increase', metricValue: '94 objections filed', description: 'Landowners contesting conversion of agricultural to commercial market rates.' },
      { name: 'Multiple title overlap in BDA buffer', impact: 16, type: 'increase', metricValue: '28 overlap claims', description: 'Gramatana boundary discrepancy with survey numbers.' },
      { name: 'High digital record verification', impact: -6, type: 'reduce', metricValue: '94% computerized', description: 'Survey settlement department has completed DGPS boundary mapping.' }
    ],
    delayStory: 'Section 19 declaration is experiencing resistance due to 94 objections on market value multipliers and urban boundary overlaps in Anekal and Hoskote taluks.',
    costImpact: {
      constructionEscalationCr: 32.5,
      idleResourcesCr: 11.2,
      contractualImpactCr: 5.8,
      totalImpactCr: 49.5,
      interventionCostCr: 2.4,
      potentialAvoidedImpactCr: 28.1,
      roiMultiplier: 11.7
    },
    simulationBaseline: { pendingClaims: 94, avgProcessingDays: 88, activeDisputes: 28, familyVerificationPct: 76, recordsDigitizedPct: 94 }
  },
  {
    id: 'dharwad-industrial-corridor',
    code: 'BH-2026-0087',
    name: 'Dharwad-Kittur Industrial Corridor (KIADB)',
    district: 'Dharwad',
    state: 'Karnataka',
    type: 'Industrial',
    executingAgency: 'Karnataka Industrial Areas Development Board (KIADB)',
    currentStageId: 'rr',
    overallRisk: 74,
    overallRiskLevel: 'high',
    expectedDelayMonths: 6.1,
    totalParcels: 620,
    affectedFamilies: 240,
    daysInCurrentStage: 95,
    totalLandAreaHa: 195.0,
    nodalOfficer: 'Sri M. Patil, Special DC KIADB',
    contactOffice: 'KIADB Zonal Office, Rayapur, Dharwad',
    coordinates: [15.4589, 75.0078],
    stages: [
      { id: 'sia', name: 'Social Impact Assessment', shortCode: 'SIA', rfctlarrSec: 'Sec 4', riskScore: 15, riskLevel: 'low', status: 'completed', avgDays: 40, expectedDays: 45, description: 'SIA accepted by expert team.' },
      { id: 'notification', name: 'Preliminary Notification', shortCode: 'Notification', rfctlarrSec: 'Sec 11', riskScore: 24, riskLevel: 'low', status: 'completed', avgDays: 35, expectedDays: 40, description: 'Notified under KIADB Act & RFCTLARR.' },
      { id: 'consent', name: 'Declaration of Acquisition', shortCode: 'Consent', rfctlarrSec: 'Sec 19', riskScore: 38, riskLevel: 'low', status: 'completed', avgDays: 65, expectedDays: 60, description: 'Acquisition finalized.' },
      { id: 'award', name: 'Award Enquiry & Determination', shortCode: 'Award', rfctlarrSec: 'Sec 23', riskScore: 52, riskLevel: 'moderate', status: 'completed', avgDays: 80, expectedDays: 75, description: 'Compensation package determined.' },
      { id: 'compensation', name: 'Compensation Disbursement', shortCode: 'Compensation', rfctlarrSec: 'Sec 77', riskScore: 49, riskLevel: 'moderate', status: 'completed', avgDays: 60, expectedDays: 60, description: '88% funds disbursed to accounts.' },
      { id: 'possession', name: 'Taking of Possession', shortCode: 'Possession', rfctlarrSec: 'Sec 38', riskScore: 68, riskLevel: 'high', status: 'completed', avgDays: 70, expectedDays: 45, description: 'Demarcation stones installed.' },
      { id: 'rr', name: 'Resettlement & Rehabilitation', shortCode: 'R&R', rfctlarrSec: 'Sec 31', riskScore: 74, riskLevel: 'high', status: 'active', avgDays: 95, expectedDays: 60, description: 'Rehabilitation site civil works delayed; affected artisan families awaiting skill development stipend.' }
    ],
    riskTrend: [
      { month: 'Feb 2026', risk: 41, delayMonths: 2.3 },
      { month: 'Mar 2026', risk: 52, delayMonths: 3.6 },
      { month: 'Apr 2026', risk: 60, delayMonths: 4.5 },
      { month: 'May 2026', risk: 68, delayMonths: 5.3 },
      { month: 'Jun 2026', risk: 72, delayMonths: 5.8 },
      { month: 'Jul 2026', risk: 74, delayMonths: 6.1 }
    ],
    shapFactors: [
      { name: 'R&R township infrastructure backlog', impact: 23, type: 'increase', metricValue: 'Civil works 38% pending', description: 'Contractor default on rehabilitation layout drinking water and power distribution.' },
      { name: 'Artisan livelihood compensation claim', impact: 15, type: 'increase', metricValue: '62 families pending grant', description: 'Appeals pending with State Monitoring Committee for augmented stipend.' },
      { name: 'Fast-track bank disbursement speed', impact: -7, type: 'reduce', metricValue: '96% direct transfer', description: 'Direct beneficiary authentication completed via DBT portal.' }
    ],
    delayStory: 'Resettlement & Rehabilitation is causing high delay due to lag in handover of alternate residential layouts and livelihood support disbursement to 62 artisan households.',
    costImpact: {
      constructionEscalationCr: 14.8,
      idleResourcesCr: 5.4,
      contractualImpactCr: 2.9,
      totalImpactCr: 23.1,
      interventionCostCr: 0.9,
      potentialAvoidedImpactCr: 12.2,
      roiMultiplier: 13.5
    },
    simulationBaseline: { pendingClaims: 62, avgProcessingDays: 95, activeDisputes: 14, familyVerificationPct: 89, recordsDigitizedPct: 88 }
  },
  {
    id: 'mysuru-irrigation-project',
    code: 'BH-2026-0063',
    name: 'Kabini Left Bank Canal Modernization',
    district: 'Mysuru',
    state: 'Karnataka',
    type: 'Irrigation',
    executingAgency: 'Cauvery Neeravari Nigam Limited (CNNL)',
    currentStageId: 'award',
    overallRisk: 58,
    overallRiskLevel: 'moderate',
    expectedDelayMonths: 3.7,
    totalParcels: 410,
    affectedFamilies: 195,
    daysInCurrentStage: 62,
    totalLandAreaHa: 68.4,
    nodalOfficer: 'Sri K. Venkataram, Executive Engineer',
    contactOffice: 'CNNL Division, Nanjangud, Mysuru',
    coordinates: [12.2958, 76.6394],
    stages: [
      { id: 'sia', name: 'Social Impact Assessment', shortCode: 'SIA', rfctlarrSec: 'Sec 4', riskScore: 16, riskLevel: 'low', status: 'completed', avgDays: 45, expectedDays: 45, description: 'SIA concluded with public support.' },
      { id: 'notification', name: 'Preliminary Notification', shortCode: 'Notification', rfctlarrSec: 'Sec 11', riskScore: 28, riskLevel: 'low', status: 'completed', avgDays: 38, expectedDays: 40, description: 'Published in 6 panchayats.' },
      { id: 'consent', name: 'Declaration of Acquisition', shortCode: 'Consent', rfctlarrSec: 'Sec 19', riskScore: 41, riskLevel: 'moderate', status: 'completed', avgDays: 55, expectedDays: 60, description: 'Joint inspection survey closed.' },
      { id: 'award', name: 'Award Enquiry & Determination', shortCode: 'Award', rfctlarrSec: 'Sec 23', riskScore: 58, riskLevel: 'moderate', status: 'active', avgDays: 62, expectedDays: 50, description: 'Tree and standing crop valuation pending with Horticulture Department.' },
      { id: 'compensation', name: 'Compensation Disbursement', shortCode: 'Compensation', rfctlarrSec: 'Sec 77', riskScore: 46, riskLevel: 'moderate', status: 'upcoming', avgDays: 0, expectedDays: 45, description: 'Budget provision made in state plan.' },
      { id: 'possession', name: 'Taking of Possession', shortCode: 'Possession', rfctlarrSec: 'Sec 38', riskScore: 44, riskLevel: 'moderate', status: 'upcoming', avgDays: 0, expectedDays: 30, description: 'Canal right of way pegging.' },
      { id: 'rr', name: 'Resettlement & Rehabilitation', shortCode: 'R&R', rfctlarrSec: 'Sec 31', riskScore: 35, riskLevel: 'low', status: 'upcoming', avgDays: 0, expectedDays: 45, description: 'Minor structural relocation.' }
    ],
    riskTrend: [
      { month: 'Feb 2026', risk: 25, delayMonths: 1.1 },
      { month: 'Mar 2026', risk: 34, delayMonths: 1.9 },
      { month: 'Apr 2026', risk: 44, delayMonths: 2.6 },
      { month: 'May 2026', risk: 51, delayMonths: 3.1 },
      { month: 'Jun 2026', risk: 55, delayMonths: 3.4 },
      { month: 'Jul 2026', risk: 58, delayMonths: 3.7 }
    ],
    shapFactors: [
      { name: 'Horticulture crop valuation delay', impact: 19, type: 'increase', metricValue: '31 days in tree census', description: 'Inter-departmental valuation of coconut & areca nut palms awaiting senior officer sign-off.' },
      { name: 'Tenancy rights ambiguity in Inam lands', impact: 12, type: 'increase', metricValue: '19 tenant claims', description: 'Verification of Form-7 grant records under Land Reforms Act.' },
      { name: 'High farmer cooperation index', impact: -9, type: 'reduce', metricValue: '88% support rate', description: 'Irrigation benefit directly enhances surrounding command area.' }
    ],
    delayStory: 'Award stage is currently at moderate risk due to pending tree valuation reports from the Horticulture department and validation of agricultural tenancy claims.',
    costImpact: {
      constructionEscalationCr: 6.8,
      idleResourcesCr: 2.4,
      contractualImpactCr: 1.5,
      totalImpactCr: 10.7,
      interventionCostCr: 0.45,
      potentialAvoidedImpactCr: 6.2,
      roiMultiplier: 13.8
    },
    simulationBaseline: { pendingClaims: 19, avgProcessingDays: 62, activeDisputes: 9, familyVerificationPct: 86, recordsDigitizedPct: 92 }
  },
  {
    id: 'metro-extension',
    code: 'BH-2026-0012',
    name: 'Bengaluru Metro Phase 3 Extension (Silk Board - Hebbal)',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    type: 'Urban Infra',
    executingAgency: 'Bangalore Metro Rail Corporation Ltd (BMRCL)',
    currentStageId: 'sia',
    overallRisk: 24,
    overallRiskLevel: 'low',
    expectedDelayMonths: 1.4,
    totalParcels: 185,
    affectedFamilies: 72,
    daysInCurrentStage: 28,
    totalLandAreaHa: 24.2,
    nodalOfficer: 'Sri C. B. Prakash, General Manager (Land)',
    contactOffice: 'BMRCL Shantinagar, Bengaluru',
    coordinates: [13.0358, 77.5970],
    stages: [
      { id: 'sia', name: 'Social Impact Assessment', shortCode: 'SIA', rfctlarrSec: 'Sec 4', riskScore: 24, riskLevel: 'low', status: 'active', avgDays: 28, expectedDays: 60, description: 'Public consultation completed in 8 metro stations buffer zone.' },
      { id: 'notification', name: 'Preliminary Notification', shortCode: 'Notification', rfctlarrSec: 'Sec 11', riskScore: 20, riskLevel: 'low', status: 'upcoming', avgDays: 0, expectedDays: 45, description: 'Survey scheduled for next month.' },
      { id: 'consent', name: 'Declaration of Acquisition', shortCode: 'Consent', rfctlarrSec: 'Sec 19', riskScore: 28, riskLevel: 'low', status: 'upcoming', avgDays: 0, expectedDays: 60, description: 'Direct acquisition under Metro Act.' },
      { id: 'award', name: 'Award Enquiry & Determination', shortCode: 'Award', rfctlarrSec: 'Sec 23', riskScore: 32, riskLevel: 'low', status: 'upcoming', avgDays: 0, expectedDays: 60, description: 'TDR / Cash compensation option.' },
      { id: 'compensation', name: 'Compensation Disbursement', shortCode: 'Compensation', rfctlarrSec: 'Sec 77', riskScore: 25, riskLevel: 'low', status: 'upcoming', avgDays: 0, expectedDays: 45, description: 'Full escrow funding allocated.' },
      { id: 'possession', name: 'Taking of Possession', shortCode: 'Possession', rfctlarrSec: 'Sec 38', riskScore: 30, riskLevel: 'low', status: 'upcoming', avgDays: 0, expectedDays: 30, description: 'Viaduct pillar locations mapped.' },
      { id: 'rr', name: 'Resettlement & Rehabilitation', shortCode: 'R&R', rfctlarrSec: 'Sec 31', riskScore: 22, riskLevel: 'low', status: 'upcoming', avgDays: 0, expectedDays: 45, description: 'Commercial shop relocation.' }
    ],
    riskTrend: [
      { month: 'Feb 2026', risk: 18, delayMonths: 0.8 },
      { month: 'Mar 2026', risk: 20, delayMonths: 1.0 },
      { month: 'Apr 2026', risk: 22, delayMonths: 1.1 },
      { month: 'May 2026', risk: 23, delayMonths: 1.2 },
      { month: 'Jun 2026', risk: 24, delayMonths: 1.3 },
      { month: 'Jul 2026', risk: 24, delayMonths: 1.4 }
    ],
    shapFactors: [
      { name: 'Dense urban utility line relocation', impact: 12, type: 'increase', metricValue: '14 utility points', description: 'BESCOM cables and BWSSB pipelines require joint corridor shifting.' },
      { name: '100% digitized cadastral records', impact: -14, type: 'reduce', metricValue: '100% complete', description: 'All property IDs cross-verified with BBMP e-Aasthi property records.' },
      { name: 'Dedicated full-time SLAO squad', impact: -9, type: 'reduce', metricValue: 'High SLAO capacity', description: 'Special cell assigned for fast dispute clearance.' }
    ],
    delayStory: 'SIA stage is progressing smoothly within schedule. High digitization rate (100%) and dedicated BMRCL land squad keep projected delay minimal at 1.4 months.',
    costImpact: {
      constructionEscalationCr: 4.2,
      idleResourcesCr: 1.8,
      contractualImpactCr: 0.9,
      totalImpactCr: 6.9,
      interventionCostCr: 0.25,
      potentialAvoidedImpactCr: 4.5,
      roiMultiplier: 18.0
    },
    simulationBaseline: { pendingClaims: 8, avgProcessingDays: 28, activeDisputes: 2, familyVerificationPct: 96, recordsDigitizedPct: 100 }
  },
  {
    id: 'mangaluru-port-connectivity',
    code: 'BH-2026-0055',
    name: 'New Mangaluru Port Container Freight Corridor',
    district: 'Dakshina Kannada',
    state: 'Karnataka',
    type: 'Highway',
    executingAgency: 'NHAI / New Mangalore Port Authority',
    currentStageId: 'notification',
    overallRisk: 31,
    overallRiskLevel: 'low',
    expectedDelayMonths: 1.9,
    totalParcels: 310,
    affectedFamilies: 110,
    daysInCurrentStage: 34,
    totalLandAreaHa: 45.0,
    nodalOfficer: 'Smt. P. Divya, Assistant Commissioner',
    contactOffice: 'Mini Vidhana Soudha, Mangaluru',
    coordinates: [12.9141, 74.8560],
    stages: [
      { id: 'sia', name: 'Social Impact Assessment', shortCode: 'SIA', rfctlarrSec: 'Sec 4', riskScore: 18, riskLevel: 'low', status: 'completed', avgDays: 40, expectedDays: 45, description: 'Coastal CRZ clearance aligned.' },
      { id: 'notification', name: 'Preliminary Notification', shortCode: 'Notification', rfctlarrSec: 'Sec 11', riskScore: 31, riskLevel: 'low', status: 'active', avgDays: 34, expectedDays: 40, description: 'Section 11 published in 4 newspapers.' },
      { id: 'consent', name: 'Declaration of Acquisition', shortCode: 'Consent', rfctlarrSec: 'Sec 19', riskScore: 36, riskLevel: 'low', status: 'upcoming', avgDays: 0, expectedDays: 60, description: 'Objection hearing scheduled.' },
      { id: 'award', name: 'Award Enquiry & Determination', shortCode: 'Award', rfctlarrSec: 'Sec 23', riskScore: 40, riskLevel: 'moderate', status: 'upcoming', avgDays: 0, expectedDays: 60, description: 'Commercial port zone pricing.' },
      { id: 'compensation', name: 'Compensation Disbursement', shortCode: 'Compensation', rfctlarrSec: 'Sec 77', riskScore: 34, riskLevel: 'low', status: 'upcoming', avgDays: 0, expectedDays: 45, description: 'Fund allocated by Sagarmala.' },
      { id: 'possession', name: 'Taking of Possession', shortCode: 'Possession', rfctlarrSec: 'Sec 38', riskScore: 32, riskLevel: 'low', status: 'upcoming', avgDays: 0, expectedDays: 30, description: 'Port boundary wall integration.' },
      { id: 'rr', name: 'Resettlement & Rehabilitation', shortCode: 'R&R', rfctlarrSec: 'Sec 31', riskScore: 28, riskLevel: 'low', status: 'upcoming', avgDays: 0, expectedDays: 45, description: 'Fisherfolk community package.' }
    ],
    riskTrend: [
      { month: 'Feb 2026', risk: 20, delayMonths: 1.0 },
      { month: 'Mar 2026', risk: 24, delayMonths: 1.3 },
      { month: 'Apr 2026', risk: 28, delayMonths: 1.6 },
      { month: 'May 2026', risk: 30, delayMonths: 1.8 },
      { month: 'Jun 2026', risk: 31, delayMonths: 1.9 },
      { month: 'Jul 2026', risk: 31, delayMonths: 1.9 }
    ],
    shapFactors: [
      { name: 'Coastal Regulation Zone (CRZ) review', impact: 14, type: 'increase', metricValue: 'CRZ III classification', description: 'Environmental clearance validation required for coastal strip.' },
      { name: 'High biometric verification', impact: -9, type: 'reduce', metricValue: '93% completed', description: 'Smooth Aadhaar-seeded land title database.' }
    ],
    delayStory: 'Preliminary notification is proceeding steadily. Minor delays linked to coastal CRZ buffer survey, but overall delay risk remains low at 1.9 months.',
    costImpact: {
      constructionEscalationCr: 5.1,
      idleResourcesCr: 1.9,
      contractualImpactCr: 1.1,
      totalImpactCr: 8.1,
      interventionCostCr: 0.35,
      potentialAvoidedImpactCr: 5.2,
      roiMultiplier: 14.8
    },
    simulationBaseline: { pendingClaims: 12, avgProcessingDays: 34, activeDisputes: 3, familyVerificationPct: 93, recordsDigitizedPct: 95 }
  },
  {
    id: 'belagavi-airport-expansion',
    code: 'BH-2026-0071',
    name: 'Belagavi Sambra Airport Runway Extension',
    district: 'Belagavi',
    state: 'Karnataka',
    type: 'Urban Infra',
    executingAgency: 'Airports Authority of India (AAI) / KSIIDC',
    currentStageId: 'possession',
    overallRisk: 71,
    overallRiskLevel: 'high',
    expectedDelayMonths: 5.8,
    totalParcels: 390,
    affectedFamilies: 160,
    daysInCurrentStage: 68,
    totalLandAreaHa: 88.0,
    nodalOfficer: 'Sri R. Hegde, SLAO Belagavi',
    contactOffice: 'DC Office Compound, Belagavi',
    coordinates: [15.8597, 74.6186],
    stages: [
      { id: 'sia', name: 'Social Impact Assessment', shortCode: 'SIA', rfctlarrSec: 'Sec 4', riskScore: 14, riskLevel: 'low', status: 'completed', avgDays: 45, expectedDays: 45, description: 'Cleared by state committee.' },
      { id: 'notification', name: 'Preliminary Notification', shortCode: 'Notification', rfctlarrSec: 'Sec 11', riskScore: 22, riskLevel: 'low', status: 'completed', avgDays: 40, expectedDays: 40, description: 'Notification gazetted.' },
      { id: 'consent', name: 'Declaration of Acquisition', shortCode: 'Consent', rfctlarrSec: 'Sec 19', riskScore: 39, riskLevel: 'low', status: 'completed', avgDays: 60, expectedDays: 60, description: 'Consent acquired.' },
      { id: 'award', name: 'Award Enquiry & Determination', shortCode: 'Award', rfctlarrSec: 'Sec 23', riskScore: 55, riskLevel: 'moderate', status: 'completed', avgDays: 85, expectedDays: 75, description: 'Award passed.' },
      { id: 'compensation', name: 'Compensation Disbursement', shortCode: 'Compensation', rfctlarrSec: 'Sec 77', riskScore: 64, riskLevel: 'high', status: 'completed', avgDays: 80, expectedDays: 60, description: '90% disbursed.' },
      { id: 'possession', name: 'Taking of Possession', shortCode: 'Possession', rfctlarrSec: 'Sec 38', riskScore: 71, riskLevel: 'high', status: 'active', avgDays: 68, expectedDays: 40, description: 'Standing standing sugarcane crop harvesting dispute delaying physical takeover.' },
      { id: 'rr', name: 'Resettlement & Rehabilitation', shortCode: 'R&R', rfctlarrSec: 'Sec 31', riskScore: 60, riskLevel: 'moderate', status: 'upcoming', avgDays: 0, expectedDays: 45, description: 'Alternate agricultural land assistance.' }
    ],
    riskTrend: [
      { month: 'Feb 2026', risk: 35, delayMonths: 2.0 },
      { month: 'Mar 2026', risk: 46, delayMonths: 3.1 },
      { month: 'Apr 2026', risk: 57, delayMonths: 4.2 },
      { month: 'May 2026', risk: 65, delayMonths: 5.0 },
      { month: 'Jun 2026', risk: 69, delayMonths: 5.5 },
      { month: 'Jul 2026', risk: 71, delayMonths: 5.8 }
    ],
    shapFactors: [
      { name: 'Crop compensation harvest moratorium', impact: 22, type: 'increase', metricValue: '38 parcels with sugarcane', description: 'Farmers seeking 90-day extension for harvest or enhanced standing crop payment.' },
      { name: 'Right of Way security perimeter clearance', impact: 16, type: 'increase', metricValue: '12 structures on boundary', description: 'Relocation of farm pump sheds and overhead electric feeders.' }
    ],
    delayStory: 'Possession stage is delayed because farmers on 38 parcels are demanding crop harvesting moratoriums and supplemental utility line shifting by HESCOM.',
    costImpact: {
      constructionEscalationCr: 12.6,
      idleResourcesCr: 4.8,
      contractualImpactCr: 2.4,
      totalImpactCr: 19.8,
      interventionCostCr: 0.8,
      potentialAvoidedImpactCr: 10.4,
      roiMultiplier: 13.0
    },
    simulationBaseline: { pendingClaims: 38, avgProcessingDays: 68, activeDisputes: 12, familyVerificationPct: 87, recordsDigitizedPct: 90 }
  }
];

export const PRIORITY_ALERTS: PriorityAlert[] = [
  {
    id: 'alert-1',
    projectId: 'nh-48-expansion',
    projectName: 'NH-48 Expansion (6-Lane Corridor)',
    district: 'Tumakuru',
    stageName: 'Compensation',
    riskScore: 82,
    riskLevel: 'critical',
    urgency: 'CRITICAL',
    recommendedAction: 'Convene Special Lok Adalat Camp and fast-track 43 pending title validations with SLAO.',
    timestamp: '2 hours ago'
  },
  {
    id: 'alert-2',
    projectId: 'dharwad-industrial-corridor',
    projectName: 'Dharwad-Kittur Industrial Corridor',
    district: 'Dharwad',
    stageName: 'Resettlement & Rehabilitation (R&R)',
    riskScore: 74,
    riskLevel: 'high',
    urgency: 'HIGH',
    recommendedAction: 'Direct KIADB contractor to expedite drinking water civil works in Rayapur R&R layout.',
    timestamp: '5 hours ago'
  },
  {
    id: 'alert-3',
    projectId: 'mysuru-irrigation-project',
    projectName: 'Kabini Left Bank Canal Modernization',
    district: 'Mysuru',
    stageName: 'Award Determination',
    riskScore: 58,
    riskLevel: 'moderate',
    urgency: 'MODERATE',
    recommendedAction: 'Depute Senior Horticulture Inspector for expedited tree census sign-off.',
    timestamp: '1 day ago'
  }
];

export const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: 'weekly-risk',
    title: 'Weekly Risk & Early Warning Dossier',
    category: 'State Infrastructure Steering Committee',
    description: 'Comprehensive risk trajectory for all 127 active land acquisition projects under RFCTLARR Act 2013 across Karnataka.',
    frequency: 'Weekly (Every Monday)',
    lastGenerated: '24 Jul 2026',
    pages: 18
  },
  {
    id: 'district-summary',
    title: 'District Collector Land Acquisition Summary',
    category: 'District Revenue Administration',
    description: 'Detailed stage bottlenecks, pending claims, and Lok Adalat dispute status for Tumakuru & Bengaluru divisions.',
    frequency: 'Bi-weekly',
    lastGenerated: '21 Jul 2026',
    pages: 12
  },
  {
    id: 'critical-projects',
    title: 'Critical Projects Special Directive Report',
    category: 'Chief Secretary Executive Review',
    description: 'Detailed failure mode analysis and SHAP feature importance for the 8 Critical Projects with risk > 80%.',
    frequency: 'On-Demand / Real-Time',
    lastGenerated: '26 Jul 2026',
    pages: 8
  },
  {
    id: 'intervention-impact',
    title: 'What-If Simulation & Cost of Inaction ROI Report',
    category: 'Finance & Infrastructure Planning',
    description: 'Counterfactual analysis demonstrating ₹14.6 Cr avoided project delay impact through targeted ₹1.2 Cr SLAO intervention.',
    frequency: 'Monthly',
    lastGenerated: '25 Jul 2026',
    pages: 14
  }
];

export const DISTRICT_MAP_POINTS = [
  { name: 'Tumakuru', coords: [13.3409, 77.1010], projectCount: 14, criticalCount: 2, topProject: 'NH-48 Expansion', topRisk: 82, riskLevel: 'critical' as const, svgX: 520, svgY: 420 },
  { name: 'Bengaluru Urban', coords: [12.9716, 77.5946], projectCount: 32, criticalCount: 3, topProject: 'Bengaluru Ring Road', topRisk: 67, riskLevel: 'high' as const, svgX: 580, svgY: 510 },
  { name: 'Dharwad', coords: [15.4589, 75.0078], projectCount: 11, criticalCount: 1, topProject: 'Industrial Corridor', topRisk: 74, riskLevel: 'high' as const, svgX: 280, svgY: 230 },
  { name: 'Mysuru', coords: [12.2958, 76.6394], projectCount: 18, criticalCount: 1, topProject: 'Irrigation Project', topRisk: 58, riskLevel: 'moderate' as const, svgX: 430, svgY: 570 },
  { name: 'Hubballi', coords: [15.3647, 75.1240], projectCount: 9, criticalCount: 0, topProject: 'Hubballi Ring Railway', topRisk: 54, riskLevel: 'moderate' as const, svgX: 300, svgY: 260 },
  { name: 'Mangaluru', coords: [12.9141, 74.8560], projectCount: 15, criticalCount: 0, topProject: 'Port Connectivity', topRisk: 31, riskLevel: 'low' as const, svgX: 240, svgY: 510 },
  { name: 'Belagavi', coords: [15.8597, 74.6186], projectCount: 16, criticalCount: 1, topProject: 'Airport Expansion', topRisk: 71, riskLevel: 'high' as const, svgX: 210, svgY: 160 },
  { name: 'Kalaburagi', coords: [17.3297, 76.8343], projectCount: 12, criticalCount: 0, topProject: 'Solapur Rail Link', topRisk: 42, riskLevel: 'moderate' as const, svgX: 540, svgY: 110 }
];
