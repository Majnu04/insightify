import React, { useState } from 'react';
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

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for dashboard
  const skillsData = [
    { name: 'JavaScript', current: 85, target: 90 },
    { name: 'React', current: 90, target: 95 },
    { name: 'Python', current: 80, target: 85 },
    { name: 'Node.js', current: 75, target: 80 },
    { name: 'AWS', current: 65, target: 75 },
  ];

  const progressData = [
    { date: '2024-01', skills: 65, jobs: 12, learning: 3 },
    { date: '2024-02', skills: 68, jobs: 15, learning: 4 },
    { date: '2024-03', skills: 72, jobs: 18, learning: 5 },
    { date: '2024-04', skills: 75, jobs: 22, learning: 6 },
    { date: '2024-05', skills: 78, jobs: 25, learning: 7 },
    { date: '2024-06', skills: 82, jobs: 28, learning: 8 },
  ];

  const categoryDistribution = [
    { name: 'Programming', value: 30, color: '#3B82F6' },
    { name: 'Frontend', value: 25, color: '#8B5CF6' },
    { name: 'Backend', value: 20, color: '#10B981' },
    { name: 'Database', value: 15, color: '#F59E0B' },
    { name: 'DevOps', value: 10, color: '#EF4444' },
  ];

  const recentActivity = [
    {
      type: 'skill_analysis',
      title: 'Resume analyzed',
      description: 'New skills identified: TypeScript, Docker',
      timestamp: '2 hours ago',
      icon: Brain,
    },
    {
      type: 'job_match',
      title: 'New job matches found',
      description: '3 new positions match your profile',
      timestamp: '5 hours ago',
      icon: TrendingUp,
    },
    {
      type: 'learning_path',
      title: 'Learning milestone reached',
      description: 'Completed React Advanced Concepts',
      timestamp: '1 day ago',
      icon: Award,
    },
    {
      type: 'profile_update',
      title: 'Profile updated',
      description: 'Added new project to portfolio',
      timestamp: '2 days ago',
      icon: Users,
    },
  ];

  const stats = [
    {
      title: 'Skills Analyzed',
      value: 47,
      change: '+12%',
      changeType: 'positive',
      icon: Brain,
    },
    {
      title: 'Job Matches',
      value: 28,
      change: '+8%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      title: 'Learning Hours',
      value: 156,
      change: '+23%',
      changeType: 'positive',
      icon: Award,
    },
    {
      title: 'Profile Views',
      value: 1.2,
      unit: 'k',
      change: '+15%',
      changeType: 'positive',
      icon: Users,
    },
  ];

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
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="current" fill="#3B82F6" name="Current Level" />
                <Bar dataKey="target" fill="#E5E7EB" name="Target Level" />
              </BarChart>
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
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
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
            <LineChart data={progressData}>
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
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
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