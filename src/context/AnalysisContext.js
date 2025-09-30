import React, { createContext, useContext, useReducer } from 'react';

const AnalysisContext = createContext();

const initialState = {
  currentAnalysis: null,
  analysisHistory: [],
  dashboardData: null,
  loading: false,
  error: null,
};

const analysisReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CURRENT_ANALYSIS':
      return { 
        ...state, 
        currentAnalysis: action.payload, 
        loading: false, 
        error: null 
      };
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        analysisHistory: [action.payload, ...state.analysisHistory.slice(0, 9)] // Keep last 10
      };
    case 'SET_DASHBOARD_DATA':
      return { ...state, dashboardData: action.payload };
    case 'CLEAR_ANALYSIS':
      return { ...state, currentAnalysis: null };
    default:
      return state;
  }
};

export const AnalysisProvider = ({ children }) => {
  const [state, dispatch] = useReducer(analysisReducer, initialState);

  const setCurrentAnalysis = (analysis) => {
    dispatch({ type: 'SET_CURRENT_ANALYSIS', payload: analysis });
    dispatch({ type: 'ADD_TO_HISTORY', payload: analysis });
    updateDashboardData(analysis);
  };

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearAnalysis = () => {
    dispatch({ type: 'CLEAR_ANALYSIS' });
  };

  const updateDashboardData = (analysis) => {
    if (!analysis) return;

    const skillCategories = analysis.skills.reduce((acc, skill) => {
      acc[skill.category] = (acc[skill.category] || 0) + 1;
      return acc;
    }, {});

    const categoryDistribution = Object.entries(skillCategories).map(([name, count], index) => {
      const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#EC4899'];
      return {
        name,
        value: Math.round((count / analysis.skills.length) * 100),
        color: colors[index % colors.length]
      };
    });

    const averageProficiency = Math.round(
      analysis.skills.reduce((acc, skill) => acc + skill.proficiency, 0) / analysis.skills.length
    );

    const dashboardData = {
      stats: {
        skillsAnalyzed: analysis.skills.length,
        jobMatches: analysis.jobMatches?.length || 0,
        averageProficiency,
        experienceYears: analysis.experience?.totalYears || 0,
      },
      skillsData: analysis.skills.map(skill => ({
        name: skill.name,
        current: skill.proficiency,
        target: Math.min(95, skill.proficiency + 10),
        category: skill.category
      })),
      categoryDistribution,
      progressData: generateProgressData(analysis),
      recentActivity: generateRecentActivity(analysis),
    };

    dispatch({ type: 'SET_DASHBOARD_DATA', payload: dashboardData });
  };

  const generateProgressData = (analysis) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const baseSkillScore = Math.round(
      analysis.skills.reduce((acc, skill) => acc + skill.proficiency, 0) / analysis.skills.length
    );
    
    return months.map((month, index) => ({
      date: `2024-${String(index + 1).padStart(2, '0')}`,
      skills: Math.max(40, baseSkillScore - (5 - index) * 3),
      jobs: Math.floor((analysis.jobMatches?.length || 3) * (0.6 + index * 0.1)),
      learning: Math.floor(3 + index * 1.2),
    }));
  };

  const generateRecentActivity = (analysis) => {
    const activities = [
      {
        type: 'skill_analysis',
        title: 'Resume analyzed',
        description: `${analysis.skills.length} skills identified from ${analysis.fileName}`,
        timestamp: 'Just now',
        icon: 'Brain',
      },
      {
        type: 'job_match',
        title: 'Job matches found',
        description: `${analysis.jobMatches?.length || 0} positions match your profile`,
        timestamp: '5 minutes ago',
        icon: 'TrendingUp',
      }
    ];

    if (analysis.suggestions && analysis.suggestions.length > 0) {
      activities.push({
        type: 'learning_path',
        title: 'Learning recommendations',
        description: `${analysis.suggestions.length} improvement suggestions generated`,
        timestamp: '10 minutes ago',
        icon: 'Award',
      });
    }

    return activities;
  };

  const value = {
    ...state,
    setCurrentAnalysis,
    setLoading,
    setError,
    clearAnalysis,
  };

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};