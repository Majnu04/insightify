import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  Star, 
  Target,
  TrendingUp,
  Award,
  Users,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react';

const LearningPath = () => {
  const [selectedTrack, setSelectedTrack] = useState('fullstack');
  const [filter, setFilter] = useState('all');

  const learningTracks = {
    fullstack: {
      title: 'Full Stack Development',
      description: 'Master both frontend and backend technologies',
      duration: '6-8 months',
      difficulty: 'Intermediate',
      progress: 65,
      totalCourses: 12,
      completedCourses: 8,
    },
    ai_ml: {
      title: 'AI & Machine Learning',
      description: 'Learn artificial intelligence and machine learning concepts',
      duration: '8-10 months',
      difficulty: 'Advanced',
      progress: 30,
      totalCourses: 15,
      completedCourses: 4,
    },
    cloud: {
      title: 'Cloud Architecture',
      description: 'Become proficient in cloud platforms and architecture',
      duration: '4-6 months',
      difficulty: 'Intermediate',
      progress: 45,
      totalCourses: 10,
      completedCourses: 4,
    },
    devops: {
      title: 'DevOps Engineering',
      description: 'Learn continuous integration and deployment practices',
      duration: '5-7 months',
      difficulty: 'Advanced',
      progress: 20,
      totalCourses: 11,
      completedCourses: 2,
    },
  };

  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      provider: 'TechEdu',
      duration: '4 weeks',
      difficulty: 'Advanced',
      rating: 4.8,
      students: 12500,
      status: 'completed',
      track: 'fullstack',
      progress: 100,
      skills: ['React', 'JavaScript', 'State Management'],
    },
    {
      id: 2,
      title: 'Node.js Microservices',
      provider: 'CloudAcademy',
      duration: '6 weeks',
      difficulty: 'Intermediate',
      rating: 4.6,
      students: 8200,
      status: 'in_progress',
      track: 'fullstack',
      progress: 75,
      skills: ['Node.js', 'Microservices', 'API Design'],
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      provider: 'AI Institute',
      duration: '8 weeks',
      difficulty: 'Beginner',
      rating: 4.9,
      students: 25000,
      status: 'not_started',
      track: 'ai_ml',
      progress: 0,
      skills: ['Python', 'Machine Learning', 'Data Science'],
    },
    {
      id: 4,
      title: 'AWS Solutions Architect',
      provider: 'CloudGuru',
      duration: '10 weeks',
      difficulty: 'Advanced',
      rating: 4.7,
      students: 15000,
      status: 'in_progress',
      track: 'cloud',
      progress: 40,
      skills: ['AWS', 'Cloud Architecture', 'Solutions Design'],
    },
    {
      id: 5,
      title: 'Docker & Kubernetes',
      provider: 'DevOps Pro',
      duration: '5 weeks',
      difficulty: 'Intermediate',
      rating: 4.5,
      students: 9800,
      status: 'not_started',
      track: 'devops',
      progress: 0,
      skills: ['Docker', 'Kubernetes', 'Container Orchestration'],
    },
    {
      id: 6,
      title: 'TypeScript Mastery',
      provider: 'CodeMaster',
      duration: '3 weeks',
      difficulty: 'Intermediate',
      rating: 4.4,
      students: 7500,
      status: 'completed',
      track: 'fullstack',
      progress: 100,
      skills: ['TypeScript', 'JavaScript', 'Type Safety'],
    },
  ];

  const achievements = [
    {
      title: 'React Expert',
      description: 'Completed advanced React courses',
      icon: '⚛️',
      earned: true,
    },
    {
      title: 'Full Stack Developer',
      description: 'Mastered both frontend and backend',
      icon: '🚀',
      earned: true,
    },
    {
      title: 'Cloud Architect',
      description: 'Completed cloud architecture track',
      icon: '☁️',
      earned: false,
    },
    {
      title: 'AI Enthusiast',
      description: 'Started machine learning journey',
      icon: '🤖',
      earned: false,
    },
  ];

  const recommendations = [
    {
      title: 'Based on your job matches',
      courses: ['Advanced React Patterns', 'AWS Solutions Architect'],
      reason: 'These skills appear in 85% of your job matches',
    },
    {
      title: 'Trending in your field',
      courses: ['Machine Learning Fundamentals', 'Docker & Kubernetes'],
      reason: 'High demand skills in the current market',
    },
    {
      title: 'Fill skill gaps',
      courses: ['TypeScript Mastery', 'Node.js Microservices'],
      reason: 'Complement your existing skillset',
    },
  ];

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in_progress':
        return 'text-blue-600 bg-blue-100';
      case 'not_started':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Play className="w-4 h-4" />;
      case 'not_started':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-100';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'Advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Learning Paths</h1>
              <p className="text-gray-600">Personalized learning recommendations based on your career goals</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Courses</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not_started">Not Started</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Learning Tracks */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(learningTracks).map(([key, track]) => (
              <div
                key={key}
                onClick={() => setSelectedTrack(key)}
                className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                  selectedTrack === key 
                    ? 'ring-2 ring-blue-500 shadow-lg' 
                    : 'shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{track.title}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(track.difficulty)}`}>
                    {track.difficulty}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{track.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{track.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${track.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{track.completedCourses}/{track.totalCourses} courses</span>
                    <span>{track.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 text-center ${
                  achievement.earned ? 'shadow-sm' : 'opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-medium text-gray-900 mb-1">{achievement.title}</h4>
                <p className="text-xs text-gray-600">{achievement.description}</p>
                {achievement.earned && (
                  <div className="mt-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{rec.reason}</p>
                <div className="space-y-2">
                  {rec.courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="text-sm font-medium text-blue-600">
                      • {course}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">All Courses</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{filteredCourses.length} courses</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(course.status)}`}>
                        {getStatusIcon(course.status)}
                        <span className="capitalize">{course.status.replace('_', ' ')}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{course.provider}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                </div>

                {/* Progress Bar */}
                {course.status === 'in_progress' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  {course.status === 'not_started' && (
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                      Start Course
                    </button>
                  )}
                  {course.status === 'in_progress' && (
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                      Continue
                    </button>
                  )}
                  {course.status === 'completed' && (
                    <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Completed</span>
                    </button>
                  )}
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;