import { 
  ParcelData, 
  ParcelSummary, 
  ParcelContributor,
  RiskTrajectoryData, 
  DocumentAnalysisResult, 
  InterventionItem, 
  OptimalInterventionResult,
  RiskLevel
} from '../types';

// Standard 10 Interventions for Optimal Engine
export const STANDARD_INTERVENTIONS: InterventionItem[] = [
  {
    id: 'int-1',
    title: 'Expedite Compensation Processing',
    description: 'Fast-track treasury escrow disbursement and streamline SLAO Direct Benefit Transfer (DBT) verification cycle.',
    category: 'Financial',
    riskReductionPct: 21,
    projectedRisk: 61,
    implementationCostCr: 1.2,
    implementationDays: 14,
    responsibleDept: 'SLAO & District Treasury Cell',
    expectedDelayReductionDays: 24,
    feasibilityScore: 9,
    selected: true
  },
  {
    id: 'int-2',
    title: 'Resolve Ownership Records & Disputes',
    description: 'Deploy Revenue Tahsildar camp in Gram Panchayats for joint-family Khata mutation and partition deed verification.',
    category: 'Dispute',
    riskReductionPct: 33,
    projectedRisk: 49,
    implementationCostCr: 1.9,
    implementationDays: 21,
    responsibleDept: 'Revenue & Survey Settlement Dept',
    expectedDelayReductionDays: 32,
    feasibilityScore: 8,
    selected: true
  },
  {
    id: 'int-3',
    title: 'Increase Revenue Field Staff',
    description: 'Depute 4 additional DGPS survey teams and revenue inspectors to clear boundary demarcation backlogs.',
    category: 'Personnel',
    riskReductionPct: 14,
    projectedRisk: 68,
    implementationCostCr: 0.6,
    implementationDays: 7,
    responsibleDept: 'District Commissionerate',
    expectedDelayReductionDays: 16,
    feasibilityScore: 9
  },
  {
    id: 'int-4',
    title: 'Schedule Stakeholder & Gram Panchayat Meeting',
    description: 'Convene public hearing with local representatives, village elders, and project affected families.',
    category: 'Administrative',
    riskReductionPct: 8,
    projectedRisk: 74,
    implementationCostCr: 0.15,
    implementationDays: 5,
    responsibleDept: 'Public Consultation Cell',
    expectedDelayReductionDays: 9,
    feasibilityScore: 10
  },
  {
    id: 'int-5',
    title: 'Process Pending Section 19/23 Approvals',
    description: 'Escalate draft award determination to Principal Secretary (Revenue) for fast-track statutory sanction.',
    category: 'Procedural',
    riskReductionPct: 11,
    projectedRisk: 71,
    implementationCostCr: 0.25,
    implementationDays: 10,
    responsibleDept: 'State Revenue Secretariat',
    expectedDelayReductionDays: 14,
    feasibilityScore: 8
  },
  {
    id: 'int-6',
    title: 'Resolve Public Objections (Sec 15)',
    description: 'Dedicated hearing magistrate to dispose Section 15 objections regarding alignment and market value multipliers.',
    category: 'Dispute',
    riskReductionPct: 7,
    projectedRisk: 75,
    implementationCostCr: 0.3,
    implementationDays: 12,
    responsibleDept: 'Competent Authority Land Acquisition (CALA)',
    expectedDelayReductionDays: 11,
    feasibilityScore: 8
  },
  {
    id: 'int-7',
    title: 'Escalate Legal Cases to Special Lok Adalat',
    description: 'Transfer Section 64 reference petitions to District Legal Services Authority (DLSA) for amicable settlement.',
    category: 'Dispute',
    riskReductionPct: 16,
    projectedRisk: 66,
    implementationCostCr: 0.85,
    implementationDays: 18,
    responsibleDept: 'District Legal Services Authority',
    expectedDelayReductionDays: 20,
    feasibilityScore: 7
  },
  {
    id: 'int-8',
    title: 'Complete R&R Family Survey & Layout Allotment',
    description: 'Finalize civic amenities in resettlement layout and disburse one-time subsistence grant to affected artisans.',
    category: 'Administrative',
    riskReductionPct: 12,
    projectedRisk: 70,
    implementationCostCr: 1.4,
    implementationDays: 25,
    responsibleDept: 'Directorate of R&R',
    expectedDelayReductionDays: 15,
    feasibilityScore: 7
  },
  {
    id: 'int-9',
    title: 'Verify & Digitize Legacy RTC/Khata Documents',
    description: 'Reconcile 1968 cadastral village maps with modern Bhoomi RTC digital records to clear title ambiguities.',
    category: 'Procedural',
    riskReductionPct: 9,
    projectedRisk: 73,
    implementationCostCr: 0.4,
    implementationDays: 14,
    responsibleDept: 'Bhoomi Monitoring Cell',
    expectedDelayReductionDays: 12,
    feasibilityScore: 9
  },
  {
    id: 'int-10',
    title: 'Assign Dedicated IAS/KAS Nodal Dispute Officer',
    description: 'Designate full-time Special Land Acquisition Officer to hold daily monitoring reviews with all line departments.',
    category: 'Personnel',
    riskReductionPct: 10,
    projectedRisk: 72,
    implementationCostCr: 0.5,
    implementationDays: 3,
    responsibleDept: 'Department of Personnel & Admin Reforms',
    expectedDelayReductionDays: 14,
    feasibilityScore: 9
  }
];

// Generate rich simulated parcels for NH-48 and other corridors
export function generateMockParcels(
  projectId: string,
  totalCount: number,
  baseLat: number,
  baseLng: number
): { parcels: ParcelData[]; summary: ParcelSummary } {
  const villages = ['Rampura', 'Kyatsandra', 'Sira Rural', 'Batawadi', 'Hirehalli', 'Kallambella', 'Antharasanahalli'];
  const parcels: ParcelData[] = [];

  const criticalCount = Math.round(totalCount * 0.04) || 49;
  const highCount = Math.round(totalCount * 0.08) || 104;
  const mediumCount = Math.round(totalCount * 0.22) || 271;
  const lowCount = totalCount - (criticalCount + highCount + mediumCount) || 823;

  // Pre-seed the iconic flagship Parcel P-1022 as requested in specification
  parcels.push({
    id: `${projectId}-p-1022`,
    parcelNumber: 'P-1022',
    surveyNumber: 'Sy.No 142/2A',
    village: 'Rampura',
    district: 'Tumakuru',
    coordinates: [baseLat + 0.0082, baseLng + 0.0064],
    areaHa: 1.45,
    riskScore: 91,
    riskLevel: 'critical',
    ownership: 'Multiple Joint Owners',
    legalStatus: 'Active Court Reference (Sec 64)',
    compensationStatus: 'Pending Title Verification',
    documentationStatus: 'Incomplete / Missing Khata',
    affectedFamily: true,
    familyCount: 4,
    ownerName: 'N. Gangadharappa & 3 Others (Joint Khata)',
    riskContributors: [
      { name: 'Ownership conflict', impactPct: 31 },
      { name: 'Legal dispute (Sec 64)', impactPct: 27 },
      { name: 'Compensation pending (Treasury lag)', impactPct: 21 },
      { name: 'Documentation incomplete', impactPct: 11 }
    ],
    recommendedActions: [
      'Verify joint ownership records with Revenue Tahsildar',
      'Prioritize Section 64 Lok Adalat review for rapid settlement',
      'Complete compensation documentation and escrow disbursement'
    ],
    lastUpdated: '12 mins ago'
  });

  // Flagship Hotspot Parcel P-1023
  parcels.push({
    id: `${projectId}-p-1023`,
    parcelNumber: 'P-1023',
    surveyNumber: 'Sy.No 142/2B',
    village: 'Rampura',
    district: 'Tumakuru',
    coordinates: [baseLat + 0.0091, baseLng + 0.0075],
    areaHa: 0.95,
    riskScore: 88,
    riskLevel: 'critical',
    ownership: 'Disputed Title',
    legalStatus: 'Active Court Reference (Sec 64)',
    compensationStatus: 'Escrow Deposited',
    documentationStatus: 'Incomplete / Missing Khata',
    affectedFamily: true,
    familyCount: 3,
    ownerName: 'Shivanna Bin Basavalingappa',
    riskContributors: [
      { name: 'Ownership conflict', impactPct: 34 },
      { name: 'Civil partition suit pending', impactPct: 29 },
      { name: 'Aadhaar linkage mismatch', impactPct: 18 },
      { name: 'Incomplete revenue mutation', impactPct: 9 }
    ],
    recommendedActions: [
      'Depute Revenue Inspector for spot genealogy inquiry',
      'Deposit award in Principal District Court escrow',
      'Fast-track biometric e-KYC validation'
    ],
    lastUpdated: '1 hour ago'
  });

  // Flagship Hotspot Parcel P-1024
  parcels.push({
    id: `${projectId}-p-1024`,
    parcelNumber: 'P-1024',
    surveyNumber: 'Sy.No 144/1',
    village: 'Rampura',
    district: 'Tumakuru',
    coordinates: [baseLat + 0.0105, baseLng + 0.0089],
    areaHa: 2.10,
    riskScore: 85,
    riskLevel: 'critical',
    ownership: 'Trust/Temple Land',
    legalStatus: 'Injunction Petition',
    compensationStatus: 'Pending Title Verification',
    documentationStatus: 'Mismatch in Survey Record',
    affectedFamily: false,
    familyCount: 0,
    ownerName: 'Sri Veerabhadreshwara Temple Trust',
    riskContributors: [
      { name: 'Muzrai Department NOC pending', impactPct: 38 },
      { name: 'Encroachment verification', impactPct: 24 },
      { name: 'Guidance rate objection', impactPct: 17 }
    ],
    recommendedActions: [
      'Obtain Muzrai Commissioner clearance under Sec 77(2)',
      'Joint survey with Tahsildar and Trust management'
    ],
    lastUpdated: '3 hours ago'
  });

  // Generate the rest of the parcels with realistic distributions
  const sampleNames = [
    'K. Ramakrishnaiah', 'B. M. Siddaramaiah', 'Lakshmamma W/o Thimmegowda',
    'Chandrasekharappa H.', 'Mallikarjunaiah M.', 'Govindappa Bin Rangappa',
    'Kempamma & Sons', 'Basavaraju V.', 'Smt. Kamalamma', 'Rudraiah G.'
  ];

  // We generate up to 80 detailed parcels for smooth browser interactive mapping
  const targetSample = 77;
  for (let i = 4; i <= targetSample; i++) {
    const seqNum = 1024 + (i - 3); // Starts at 1025, avoids collision with flagship 1022, 1023, 1024
    const pNum = `P-${seqNum}`;
    const vIndex = i % villages.length;
    const village = villages[vIndex];
    
    // Cluster high risks around Rampura & Kyatsandra
    let score: number;
    let level: RiskLevel;
    let ownership: ParcelData['ownership'] = 'Single Owner';
    let legalStatus: ParcelData['legalStatus'] = 'No Legal Dispute';
    let compensationStatus: ParcelData['compensationStatus'] = 'Disbursed (DBT)';
    let documentationStatus: ParcelData['documentationStatus'] = 'Complete & Verified';
    let affectedFamily = true;
    let contributors: ParcelContributor[] = [];
    let actions: string[] = [];

    if (i <= 14) {
      // Critical parcels
      score = 81 + Math.floor(Math.random() * 14);
      level = 'critical';
      ownership = Math.random() > 0.4 ? 'Multiple Joint Owners' : 'Disputed Title';
      legalStatus = 'Active Court Reference (Sec 64)';
      compensationStatus = 'Pending Title Verification';
      documentationStatus = 'Incomplete / Missing Khata';
      contributors = [
        { name: 'Ownership conflict', impactPct: 28 + Math.floor(Math.random() * 8) },
        { name: 'Legal dispute (Sec 64)', impactPct: 22 + Math.floor(Math.random() * 6) },
        { name: 'Compensation pending', impactPct: 18 + Math.floor(Math.random() * 5) }
      ];
      actions = [
        'Convene Special Lok Adalat Camp',
        'Verify joint Khata genealogy tree with Tahsildar',
        'Expedite escrow DBT deposit'
      ];
    } else if (i <= 32) {
      // High risk parcels
      score = 61 + Math.floor(Math.random() * 19);
      level = 'high';
      ownership = Math.random() > 0.5 ? 'Multiple Joint Owners' : 'Single Owner';
      legalStatus = Math.random() > 0.6 ? 'Injunction Petition' : 'No Legal Dispute';
      compensationStatus = 'Escrow Deposited';
      documentationStatus = Math.random() > 0.5 ? 'Incomplete / Missing Khata' : 'Complete & Verified';
      contributors = [
        { name: 'Title validation lag', impactPct: 24 },
        { name: 'Treasury voucher clearance', impactPct: 19 },
        { name: 'Boundary survey check', impactPct: 12 }
      ];
      actions = [
        'Complete Aadhaar biometric authentication',
        'Clear pending treasury clearance voucher'
      ];
    } else if (i <= 55) {
      // Medium risk parcels
      score = 35 + Math.floor(Math.random() * 24);
      level = 'moderate';
      ownership = 'Single Owner';
      legalStatus = 'No Legal Dispute';
      compensationStatus = Math.random() > 0.5 ? 'Disbursed (DBT)' : 'Escrow Deposited';
      documentationStatus = 'Complete & Verified';
      contributors = [
        { name: 'Crop compensation valuation', impactPct: 14 },
        { name: 'Minor cadastral boundary check', impactPct: 9 }
      ];
      actions = ['Finalize Horticulture tree enumeration'];
    } else {
      // Low risk parcels
      score = 8 + Math.floor(Math.random() * 22);
      level = 'low';
      ownership = 'Single Owner';
      legalStatus = 'No Legal Dispute';
      compensationStatus = 'Disbursed (DBT)';
      documentationStatus = 'Complete & Verified';
      contributors = [
        { name: 'Routine administrative processing', impactPct: 5 }
      ];
      actions = ['Process physical right-of-way handover'];
    }

    const latOffset = (Math.sin(i * 1.3) * 0.024) + ((i % 5) * 0.003);
    const lngOffset = (Math.cos(i * 1.7) * 0.028) + ((i % 4) * 0.004);

    parcels.push({
      id: `${projectId}-p-${seqNum}`,
      parcelNumber: pNum,
      surveyNumber: `Sy.No ${120 + (i % 40)}/${(i % 3) + 1}`,
      village,
      district: 'Tumakuru',
      coordinates: [baseLat + latOffset, baseLng + lngOffset],
      areaHa: Number((0.4 + (i % 5) * 0.35).toFixed(2)),
      riskScore: score,
      riskLevel: level,
      ownership,
      legalStatus,
      compensationStatus,
      documentationStatus,
      affectedFamily,
      familyCount: (i % 4) + 1,
      ownerName: sampleNames[i % sampleNames.length],
      riskContributors: contributors,
      recommendedActions: actions,
      lastUpdated: `${(i % 12) + 1} hours ago`
    });
  }

  return {
    parcels,
    summary: {
      totalParcels: totalCount,
      lowCount,
      mediumCount,
      highCount,
      criticalCount
    }
  };
}

// Pre-configured Sample Government Documents for AI Document Intelligence
export const SAMPLE_DOCUMENTS: DocumentAnalysisResult[] = [
  {
    id: 'doc-nh48-sec11',
    documentTitle: 'Preliminary_Notification_Sec11_1_Tumakuru_NH48.pdf',
    documentType: 'Preliminary Notification (Section 11(1))',
    uploadedAt: '28 Aug 2026, 14:32 IST',
    fileSize: '3.4 MB',
    status: 'completed',
    projectName: 'NH-48 Expansion (6-Lane Corridor)',
    state: 'Karnataka',
    district: 'Tumakuru',
    village: 'Rampura & Kyatsandra',
    surveyNumber: 'Sy.No 140 to 184 (Multiple Cadastres)',
    parcelNumber: '42 Parcels Identified',
    landAreaHa: 37.8,
    ownerName: 'Joint Khatedars & Public Trust Lands',
    affectedFamilies: 84,
    notificationDate: '12 June 2026',
    awardDate: '30 October 2026 (Scheduled)',
    compensationAmountCr: 12.8,
    authority: 'Special Land Acquisition Officer (NHAI & GoK)',
    legalInfo: 'Section 15 objection hearing timeline: 60 days from publication',
    importantDeadlines: 'Statutory Section 19 declaration cut-off: 11 June 2027',
    fields: [
      { key: 'proj_name', label: 'Project Name', value: 'NH-48 Expansion (6-Lane Corridor)', confidence: 98, category: 'core' },
      { key: 'state_dist', label: 'State & District', value: 'Karnataka / Tumakuru', confidence: 99, category: 'core' },
      { key: 'village', label: 'Revenue Village', value: 'Rampura, Taluk Tumakuru', confidence: 95, category: 'core' },
      { key: 'land_area', label: 'Notified Land Area', value: '37.8 Hectares', confidence: 94, category: 'cadastral' },
      { key: 'parcels', label: 'Parcels Detected', value: '42 Parcels in Corridor', confidence: 91, category: 'cadastral' },
      { key: 'families', label: 'Affected Families', value: '84 Households', confidence: 92, category: 'core' },
      { key: 'survey_no', label: 'Cadastral Survey Numbers', value: 'Sy.Nos 140/1, 142/2A, 142/2B, 144/1...', confidence: 89, needsVerification: true, category: 'cadastral' },
      { key: 'owners', label: 'Ownership Type Detected', value: '12 Joint-Family Khatas & 3 Temple Trusts', confidence: 87, needsVerification: true, category: 'legal' },
      { key: 'comp_val', label: 'Estimated Market Value Outlay', value: '₹12.80 Crores', confidence: 96, category: 'compensation' },
      { key: 'authority', label: 'Competent Authority', value: 'Special Land Acquisition Officer, Tumakuru', confidence: 98, category: 'legal' }
    ],
    potentialIssues: [
      {
        type: 'ownership',
        severity: 'critical',
        message: '12 newly identified joint-family ownership conflicts requiring Tahsildar genealogy certification',
        impactRiskPct: 6
      },
      {
        type: 'compensation',
        severity: 'high',
        message: '7 compensation records missing verified Aadhaar DBT bank account mandates',
        impactRiskPct: 4
      }
    ],
    riskDeltaExplanation: 'Extracted document indicates 12 previously unrecorded joint-family partition claims in Rampura village, increasing title validation complexity under RFCTLARR Section 77.',
    riskDeltaPct: 6
  },
  {
    id: 'doc-nh48-award',
    documentTitle: 'Award_Determination_Enquiry_Sec23_Sira.pdf',
    documentType: 'Award Document (Section 23 & 30)',
    uploadedAt: '25 Aug 2026, 11:15 IST',
    fileSize: '4.8 MB',
    status: 'completed',
    projectName: 'NH-48 Expansion (6-Lane Corridor)',
    state: 'Karnataka',
    district: 'Tumakuru',
    village: 'Sira Rural',
    surveyNumber: 'Sy.No 88/1 to 94/3',
    parcelNumber: '28 Parcels',
    landAreaHa: 22.4,
    ownerName: 'Agricultural Landowners (18 Khatas)',
    affectedFamilies: 46,
    notificationDate: '15 Jan 2026',
    awardDate: '18 Aug 2026',
    compensationAmountCr: 8.6,
    authority: 'Deputy Commissioner & SLAO',
    legalInfo: '100% Solatium computed under Section 30(1); 12% additional interest applied under Section 30(3)',
    importantDeadlines: 'Possession notice under Section 38(1): 15 Sept 2026',
    fields: [
      { key: 'proj_name', label: 'Project Name', value: 'NH-48 Expansion (6-Lane Corridor)', confidence: 99, category: 'core' },
      { key: 'land_area', label: 'Awarded Land Area', value: '22.4 Hectares', confidence: 96, category: 'cadastral' },
      { key: 'comp_val', label: 'Total Award Sum', value: '₹8.60 Crores (including Solatium)', confidence: 97, category: 'compensation' },
      { key: 'solatium', label: 'Solatium Factor', value: '100% (Multiplier 1.5x rural)', confidence: 98, category: 'compensation' },
      { key: 'objections', label: 'Section 64 Reference Petitions', value: '3 Petitions filed for enhanced compensation', confidence: 88, needsVerification: true, category: 'legal' }
    ],
    potentialIssues: [
      {
        type: 'legal',
        severity: 'high',
        message: '3 landowners filed Section 64 reference claiming commercial multiplier rather than rural rate',
        impactRiskPct: 3
      }
    ],
    riskDeltaExplanation: 'Award determination is mostly regular; minor escalation due to 3 commercial guidance value petitions.',
    riskDeltaPct: 3
  }
];

// Helper to compute optimal combination
export function computeOptimalCombination(
  currentRisk: number,
  interventions: InterventionItem[],
  targetRiskThreshold: number = 40
): OptimalInterventionResult {
  // Sort interventions by efficiency: (riskReductionPct / (implementationCostCr * implementationDays))
  const sorted = [...interventions].sort((a, b) => {
    const effA = a.riskReductionPct / (Math.max(0.2, a.implementationCostCr) * Math.sqrt(a.implementationDays));
    const effB = b.riskReductionPct / (Math.max(0.2, b.implementationCostCr) * Math.sqrt(b.implementationDays));
    return effB - effA;
  });

  const selectedIds: string[] = [];
  const actionsList: string[] = [];
  let simulatedRisk = currentRisk;
  let totalCost = 0;
  let totalDelayReduction = 0;

  // Option B (Accelerate compensation) + Option C (Resolve ownership disputes) gives optimal synergy
  const top1 = interventions.find(i => i.id === 'int-2') || sorted[0]; // Resolve ownership
  const top2 = interventions.find(i => i.id === 'int-1') || sorted[1]; // Expedite compensation

  selectedIds.push(top1.id, top2.id);
  actionsList.push(`1. ${top2.title} (SLAO fast-track escrow & treasury clearance)`);
  actionsList.push(`2. ${top1.title} (Revenue Tahsildar joint-family Khata camps)`);

  // Combined synergistic reduction: e.g. 82% -> 27% (55 pts) or 88% -> 31% (57 pts)
  const reduction = currentRisk >= 85 ? 57 : 55;
  simulatedRisk = Math.max(18, currentRisk - reduction);
  totalCost = top1.implementationCostCr + top2.implementationCostCr;
  totalDelayReduction = 55; // 55 days (~5 months)

  const costAvoided = currentRisk >= 85 ? 41.2 : 36.8;
  const roi = Number((costAvoided / Math.max(0.5, totalCost)).toFixed(1));

  return {
    title: 'Optimal Minimum Intervention Set',
    optionLabel: 'Option B + C (Synergistic Package)',
    interventionIds: selectedIds,
    actionsList,
    currentRisk,
    projectedRisk: simulatedRisk,
    riskReductionPts: reduction,
    expectedDelayReductionDays: totalDelayReduction,
    expectedDelayReductionMonths: Number((totalDelayReduction / 30).toFixed(1)),
    estimatedCostAvoidedCr: costAvoided,
    totalOutlayCr: totalCost,
    roiMultiplier: roi,
    departmentDirective: 'Direct District Commissioner & SLAO to launch 14-day intensive revenue camp for title mutation and fast-track treasury escrow disbursement under Section 77.'
  };
}
