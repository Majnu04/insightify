import React, { useState } from 'react';
import { MapPin, DollarSign, Star, ExternalLink, Bookmark, Heart } from 'lucide-react';

const JobMatches = ({ matches }) => {
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [likedJobs, setLikedJobs] = useState(new Set());

  const handleSaveJob = (index) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(index)) {
      newSavedJobs.delete(index);
    } else {
      newSavedJobs.add(index);
    }
    setSavedJobs(newSavedJobs);
  };

  const handleLikeJob = (index) => {
    const newLikedJobs = new Set(likedJobs);
    if (newLikedJobs.has(index)) {
      newLikedJobs.delete(index);
    } else {
      newLikedJobs.add(index);
    }
    setLikedJobs(newLikedJobs);
  };

  const getMatchColor = (match) => {
    if (match >= 90) return 'text-green-600 bg-green-100';
    if (match >= 80) return 'text-blue-600 bg-blue-100';
    if (match >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getMatchLabel = (match) => {
    if (match >= 90) return 'Excellent Match';
    if (match >= 80) return 'Good Match';
    if (match >= 70) return 'Fair Match';
    return 'Potential Match';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Job Matches ({matches.length})
        </h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
            Sort by Match
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
            Filter
          </button>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {matches.map((job, index) => (
          <div key={index} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-xl font-semibold text-gray-900">{job.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.match)}`}>
                    {job.match}% match
                  </span>
                </div>
                <p className="text-lg text-gray-700 font-medium mb-2">{job.company}</p>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleLikeJob(index)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    likedJobs.has(index) 
                      ? 'text-red-600 bg-red-100 hover:bg-red-200' 
                      : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedJobs.has(index) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => handleSaveJob(index)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    savedJobs.has(index) 
                      ? 'text-blue-600 bg-blue-100 hover:bg-blue-200' 
                      : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${savedJobs.has(index) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Match Details */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{getMatchLabel(job.match)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                  style={{ width: `${job.match}%` }}
                ></div>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Key Requirements:</h5>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, reqIndex) => (
                    <span
                      key={reqIndex}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>View Job</span>
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Match Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Match Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {matches.filter(job => job.match >= 90).length}
            </div>
            <div className="text-sm text-gray-600">Excellent Matches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {matches.filter(job => job.match >= 80 && job.match < 90).length}
            </div>
            <div className="text-sm text-gray-600">Good Matches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(matches.reduce((acc, job) => acc + job.match, 0) / matches.length)}%
            </div>
            <div className="text-sm text-gray-600">Average Match</div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-medium text-yellow-800 mb-2">💡 Tips to Improve Matches</h5>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Add more specific skills to your resume</li>
          <li>• Include relevant certifications</li>
          <li>• Quantify your achievements with numbers</li>
          <li>• Update your resume with recent projects</li>
        </ul>
      </div>
    </div>
  );
};

export default JobMatches;