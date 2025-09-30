import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SkillChart = ({ skills }) => {
  const categoryData = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = { category, totalProficiency: 0, count: 0 };
    }
    acc[category].totalProficiency += skill.proficiency;
    acc[category].count += 1;
    return acc;
  }, {});

  const categoryChartData = Object.values(categoryData).map(item => ({
    category: item.category,
    avgProficiency: Math.round(item.totalProficiency / item.count),
  }));

  const topSkills = [...skills].sort((a, b) => b.proficiency - a.proficiency).slice(0, 8);

  const COLORS = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', 
    '#EF4444', '#6366F1', '#14B8A6', '#F97316'
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-blue-600">
            Proficiency: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Skills Overview */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Skills Bar Chart */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-4">Top Skills</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSkills} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="proficiency" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution Pie Chart */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-4">Skills by Category</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="avgProficiency"
                  label={({ category, avgProficiency }) => `${category}: ${avgProficiency}%`}
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Skills List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Skills Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">{skill.name}</h4>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {skill.category}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {skill.proficiency}%
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {skill.proficiency >= 80 ? 'Expert' : 
                 skill.proficiency >= 60 ? 'Proficient' : 
                 skill.proficiency >= 40 ? 'Intermediate' : 'Beginner'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Categories Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Averages</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Average Proficiency']}
              />
              <Bar 
                dataKey="avgProficiency" 
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SkillChart;