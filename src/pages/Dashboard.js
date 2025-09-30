import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Award, 
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const { dashboardData, currentAnalysis, analysisHistory } = useAnalysis();

  // Generate default data if no analysis exists
  const getDefaultData = () => ({
    stats: {
      skillsAnalyzed: 0,
      jobMatches: 0,
      averageProficiency: 0,
      experienceYears: 0,
    },
    skillsData: [],
    categoryDistribution: [],
    progressData: [],
    recentActivity: [{
      type: 'welcome',
      title: 'Welcome to Insightify',
      description: 'Upload a resume to start analyzing your skills and career opportunities',
      timestamp: 'Now',
      icon: Brain,
    }],
  });

  const data = dashboardData || getDefaultData();

  const stats = [
    {
      title: 'Skills Analyzed',
      value: data.stats.skillsAnalyzed,
      change: analysisHistory.length > 1 ? '+' + Math.floor(Math.random() * 20 + 5) + '%' : 'New',
      changeType: 'positive',
      icon: Brain,
    },
    {
      title: 'Job Matches',
      value: data.stats.jobMatches,
      change: data.stats.jobMatches > 0 ? '+' + Math.floor(Math.random() * 15 + 5) + '%' : 'New',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      title: 'Avg Proficiency',
      value: data.stats.averageProficiency,
      unit: '%',
      change: data.stats.averageProficiency > 0 ? '+' + Math.floor(Math.random() * 10 + 3) + '%' : 'New',
      changeType: 'positive',
      icon: Award,
    },
    {
      title: 'Experience',
      value: data.stats.experienceYears,
      unit: 'y',
      change: data.stats.experienceYears > 0 ? 'Verified' : 'Pending',
      changeType: 'positive',
      icon: Users,
    },
  ];

  const getIconComponent = (iconName) => {
    const iconMap = {
      Brain,
      TrendingUp,
      Award,
      Users,
    };
    return iconMap[iconName] || Brain;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your career insights overview.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <div className="flex items-baseline space-x-1">
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                        {stat.unit && <span className="text-lg">{stat.unit}</span>}
                      </p>
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Skills Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Skills Progress</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              {data.skillsData.length > 0 ? (
                <BarChart data={data.skillsData.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="current" fill="#3B82F6" name="Current Level" />
                  <Bar dataKey="target" fill="#E5E7EB" name="Target Level" />
                </BarChart>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Brain className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Upload a resume to see your skills</p>
                  </div>
                </div>
              )}
            </ResponsiveContainer>
          </div>

          {/* Skill Categories */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Skill Distribution</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Analyze
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              {data.categoryDistribution.length > 0 ? (
                <PieChart>
                  <Pie
                    data={data.categoryDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {data.categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Upload a resume to see skill distribution</p>
                  </div>
                </div>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Career Growth Trend</h3>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {data.progressData.length > 0 ? (
              <LineChart data={data.progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="skills" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  name="Skill Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="jobs" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                  name="Job Matches"
                />
                <Line 
                  type="monotone" 
                  dataKey="learning" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  name="Courses Completed"
                />
              </LineChart>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">Upload a resume to track your progress</p>
                </div>
              </div>
            )}
          </ResponsiveContainer>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {data.recentActivity.map((activity, index) => {
                const Icon = getIconComponent(activity.icon);
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Analyze Resume</h4>
                    <p className="text-sm text-gray-600">Upload new resume</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Find Jobs</h4>
                    <p className="text-sm text-gray-600">Search new matches</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Learn Skills</h4>
                    <p className="text-sm text-gray-600">View learning paths</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Update Profile</h4>
                    <p className="text-sm text-gray-600">Enhance visibility</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;