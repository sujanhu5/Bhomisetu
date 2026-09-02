import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, PriorityAlert, RiskLevel, DocumentAnalysisResult } from '../types';
import { MOCK_PROJECTS as INITIAL_PROJECTS, PRIORITY_ALERTS } from '../data/mockData';
import { 
  STANDARD_INTERVENTIONS, 
  generateMockParcels, 
  SAMPLE_DOCUMENTS,
  computeOptimalCombination 
} from '../data/intelligenceData';

interface ProjectContextType {
  projects: Project[];
  alerts: PriorityAlert[];
  selectedProjectId: string;
  currentProject: Project;
  setSelectedProjectId: (id: string) => void;
  applyDocumentIntelligence: (projectId: string, docResult: DocumentAnalysisResult) => void;
  resetDocumentIntelligence: (projectId: string) => void;
  updateInterventionSelection: (projectId: string, interventionId: string, selected: boolean) => void;
  recomputeRiskWithTarget: (projectId: string, targetRisk: number) => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
  lastUpdatedTimestamp: string;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('nh-48-expansion');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<string>('Live (Synchronized)');

  // Initialize all projects with full predictive intelligence data structures
  const [projects, setProjects] = useState<Project[]>(() => {
    return INITIAL_PROJECTS.map((proj) => {
      const { parcels, summary } = generateMockParcels(
        proj.id,
        proj.totalParcels,
        proj.coordinates[0],
        proj.coordinates[1]
      );

      // Trajectory data points
      let change30d = 0;
      let trendDirection: Project['riskTrajectory']['trendDirection'] = 'stable';
      let velocity = 0;
      let prevRisk = proj.overallRisk;
      let points = [];
      let explanation = '';

      if (proj.id === 'nh-48-expansion') {
        prevRisk = 61;
        change30d = 21;
        velocity = 0.70;
        trendDirection = 'rapidly-increasing';
        explanation = 'Project risk has increased significantly over the last 30 days (+21% pts), primarily due to mounting compensation claims, title validation lags in Rampura village, and Section 64 court references.';
        points = [
          { dateLabel: '30 Days Ago', daysAgo: 30, risk: 61, delayMonths: 4.8, milestone: 'Sec 23 Award enquiry initiated' },
          { dateLabel: '15 Days Ago', daysAgo: 15, risk: 70, delayMonths: 5.9, milestone: '43 Title partition claims filed' },
          { dateLabel: '7 Days Ago', daysAgo: 7, risk: 77, delayMonths: 6.9, milestone: 'Treasury voucher clearance delayed' },
          { dateLabel: 'Current Status', daysAgo: 0, risk: 82, delayMonths: 7.8, milestone: 'Active Section 77 DBT bottleneck' }
        ];
      } else if (proj.id === 'dharwad-industrial-corridor') {
        prevRisk = 61;
        change30d = 13;
        velocity = 0.43;
        trendDirection = 'worsening';
        explanation = 'Project risk is worsening (+13% pts) due to lag in R&R civic amenities handover and artisan household appeals.';
        points = [
          { dateLabel: '30 Days Ago', daysAgo: 30, risk: 61, delayMonths: 4.5 },
          { dateLabel: '15 Days Ago', daysAgo: 15, risk: 68, delayMonths: 5.3 },
          { dateLabel: '7 Days Ago', daysAgo: 7, risk: 72, delayMonths: 5.8 },
          { dateLabel: 'Current Status', daysAgo: 0, risk: 74, delayMonths: 6.1 }
        ];
      } else if (proj.id === 'bengaluru-ring-road') {
        prevRisk = 59;
        change30d = 8;
        velocity = 0.27;
        trendDirection = 'worsening';
        explanation = 'Project risk is gradually worsening (+8% pts) due to urban guidance valuation objections and BDA buffer overlaps.';
        points = [
          { dateLabel: '30 Days Ago', daysAgo: 30, risk: 59, delayMonths: 4.1 },
          { dateLabel: '15 Days Ago', daysAgo: 15, risk: 63, delayMonths: 4.7 },
          { dateLabel: '7 Days Ago', daysAgo: 7, risk: 65, delayMonths: 5.0 },
          { dateLabel: 'Current Status', daysAgo: 0, risk: 67, delayMonths: 5.2 }
        ];
      } else if (proj.id === 'belagavi-airport-expansion') {
        prevRisk = 53;
        change30d = 18;
        velocity = 0.60;
        trendDirection = 'rapidly-increasing';
        explanation = 'Project risk is rapidly increasing (+18% pts) due to standing crop moratorium demands and boundary feeder shifting delays.';
        points = [
          { dateLabel: '30 Days Ago', daysAgo: 30, risk: 53, delayMonths: 3.8 },
          { dateLabel: '15 Days Ago', daysAgo: 15, risk: 64, delayMonths: 4.9 },
          { dateLabel: '7 Days Ago', daysAgo: 7, risk: 68, delayMonths: 5.4 },
          { dateLabel: 'Current Status', daysAgo: 0, risk: 71, delayMonths: 5.8 }
        ];
      } else if (proj.id === 'metro-extension') {
        prevRisk = 32;
        change30d = -8;
        velocity = -0.27;
        trendDirection = 'improving';
        explanation = 'Project risk is improving (-8% pts) as 100% digitized cadastral records and fast-track BBMP verification resolve hurdles.';
        points = [
          { dateLabel: '30 Days Ago', daysAgo: 30, risk: 32, delayMonths: 1.8 },
          { dateLabel: '15 Days Ago', daysAgo: 15, risk: 28, delayMonths: 1.6 },
          { dateLabel: '7 Days Ago', daysAgo: 7, risk: 26, delayMonths: 1.5 },
          { dateLabel: 'Current Status', daysAgo: 0, risk: 24, delayMonths: 1.4 }
        ];
      } else {
        prevRisk = proj.overallRisk - 3;
        change30d = 3;
        velocity = 0.10;
        trendDirection = 'stable';
        explanation = 'Project risk is holding steady within normal historical bounds across the district.';
        points = [
          { dateLabel: '30 Days Ago', daysAgo: 30, risk: prevRisk, delayMonths: proj.expectedDelayMonths - 0.3 },
          { dateLabel: '15 Days Ago', daysAgo: 15, risk: prevRisk + 1, delayMonths: proj.expectedDelayMonths - 0.2 },
          { dateLabel: '7 Days Ago', daysAgo: 7, risk: prevRisk + 2, delayMonths: proj.expectedDelayMonths - 0.1 },
          { dateLabel: 'Current Status', daysAgo: 0, risk: proj.overallRisk, delayMonths: proj.expectedDelayMonths }
        ];
      }

      const optimal = computeOptimalCombination(proj.overallRisk, STANDARD_INTERVENTIONS);

      return {
        ...proj,
        riskTrajectory: {
          currentRisk: proj.overallRisk,
          previousRisk: prevRisk,
          change30d,
          riskVelocity: velocity,
          trendDirection,
          trendExplanation: explanation,
          points
        },
        parcelSummary: summary,
        parcels,
        documents: SAMPLE_DOCUMENTS,
        interventions: STANDARD_INTERVENTIONS.map(i => ({ ...i })),
        optimalRecommendation: optimal,
        documentIntelligenceApplied: false
      };
    });
  });

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Action: Apply Document Intelligence
  const applyDocumentIntelligence = (projectId: string, docResult: DocumentAnalysisResult) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      // When document intelligence is applied (e.g. 12 newly extracted ownership conflicts in Rampura),
      // Project risk increases dynamically (e.g., 82% -> 88%)
      const newRisk = Math.min(99, p.overallRisk + (docResult.riskDeltaPct || 6));
      const newLevel: RiskLevel = newRisk >= 80 ? 'critical' : newRisk >= 60 ? 'high' : 'moderate';
      const newDelay = Number((p.expectedDelayMonths + 0.8).toFixed(1));

      // Append new data point to trajectory
      const updatedPoints = [
        ...p.riskTrajectory.points,
        {
          dateLabel: 'Post-Doc AI Extraction',
          daysAgo: 0,
          risk: newRisk,
          delayMonths: newDelay,
          milestone: `+${docResult.riskDeltaPct}% from Doc Intelligence (12 Conflicts Ingested)`
        }
      ];

      // Update parcels in Rampura to reflect the extracted 12 conflicts
      const updatedParcels = p.parcels.map(parcel => {
        if (parcel.village === 'Rampura' && parcel.riskScore < 85) {
          return {
            ...parcel,
            riskScore: Math.min(95, parcel.riskScore + 12),
            riskLevel: 'critical' as RiskLevel,
            ownership: 'Multiple Joint Owners' as const,
            documentationStatus: 'Incomplete / Missing Khata' as const,
            lastUpdated: 'Just now (AI Extraction)'
          };
        }
        return parcel;
      });

      // Update parcel summary
      const critCount = updatedParcels.filter(pc => pc.riskLevel === 'critical').length;
      const highCount = updatedParcels.filter(pc => pc.riskLevel === 'high').length;
      const medCount = updatedParcels.filter(pc => pc.riskLevel === 'moderate').length;
      const lowCount = updatedParcels.filter(pc => pc.riskLevel === 'low').length;

      // Recompute optimal recommendation with the higher baseline
      const newOptimal = computeOptimalCombination(newRisk, p.interventions);

      return {
        ...p,
        overallRisk: newRisk,
        overallRiskLevel: newLevel,
        expectedDelayMonths: newDelay,
        riskTrajectory: {
          ...p.riskTrajectory,
          currentRisk: newRisk,
          change30d: p.riskTrajectory.change30d + (docResult.riskDeltaPct || 6),
          riskVelocity: Number(((p.riskTrajectory.change30d + 6) / 30).toFixed(2)),
          trendDirection: 'rapidly-increasing',
          trendExplanation: `Project risk increased by +${docResult.riskDeltaPct}% (${p.overallRisk}% → ${newRisk}%) because newly extracted document intelligence identified 12 additional joint-family ownership conflicts in Rampura village.`,
          points: updatedPoints
        },
        parcelSummary: {
          ...p.parcelSummary,
          criticalCount: critCount,
          highCount,
          mediumCount: medCount,
          lowCount
        },
        parcels: updatedParcels,
        optimalRecommendation: newOptimal,
        documentIntelligenceApplied: true
      };
    }));

    setToastMessage(`Document Intelligence Ingested: +${docResult.riskDeltaPct}% Risk Increase (82% → 88%) logged across all decision modules.`);
    setLastUpdatedTimestamp('Just now (Doc AI Pipeline)');
  };

  // Action: Reset Document Intelligence
  const resetDocumentIntelligence = (projectId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      const baseRisk = 82;
      const baseDelay = 7.8;
      const { parcels, summary } = generateMockParcels(p.id, p.totalParcels, p.coordinates[0], p.coordinates[1]);
      const baseOptimal = computeOptimalCombination(baseRisk, STANDARD_INTERVENTIONS);

      return {
        ...p,
        overallRisk: baseRisk,
        overallRiskLevel: 'critical',
        expectedDelayMonths: baseDelay,
        riskTrajectory: {
          currentRisk: baseRisk,
          previousRisk: 61,
          change30d: 21,
          riskVelocity: 0.70,
          trendDirection: 'rapidly-increasing',
          trendExplanation: 'Project risk has increased significantly over the last 30 days (+21% pts), primarily due to increasing compensation and ownership-related issues.',
          points: [
            { dateLabel: '30 Days Ago', daysAgo: 30, risk: 61, delayMonths: 4.8 },
            { dateLabel: '15 Days Ago', daysAgo: 15, risk: 70, delayMonths: 5.9 },
            { dateLabel: '7 Days Ago', daysAgo: 7, risk: 77, delayMonths: 6.9 },
            { dateLabel: 'Current Status', daysAgo: 0, risk: baseRisk, delayMonths: baseDelay }
          ]
        },
        parcelSummary: summary,
        parcels,
        optimalRecommendation: baseOptimal,
        documentIntelligenceApplied: false
      };
    }));

    setToastMessage('Project risk and cadastral dataset restored to baseline state (82% Risk).');
    setLastUpdatedTimestamp('Live (Synchronized)');
  };

  // Action: Toggle individual intervention selection
  const updateInterventionSelection = (projectId: string, interventionId: string, selected: boolean) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      const updatedInterventions = p.interventions.map(item => {
        if (item.id === interventionId) {
          return { ...item, selected };
        }
        return item;
      });

      return {
        ...p,
        interventions: updatedInterventions
      };
    }));
  };

  // Action: Recompute with custom Target Risk threshold
  const recomputeRiskWithTarget = (projectId: string, targetRisk: number) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      const optimal = computeOptimalCombination(p.overallRisk, p.interventions, targetRisk);
      return {
        ...p,
        optimalRecommendation: optimal
      };
    }));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        alerts: PRIORITY_ALERTS,
        selectedProjectId,
        currentProject,
        setSelectedProjectId,
        applyDocumentIntelligence,
        resetDocumentIntelligence,
        updateInterventionSelection,
        recomputeRiskWithTarget,
        toastMessage,
        setToastMessage,
        lastUpdatedTimestamp
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
