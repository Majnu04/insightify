import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';
import { resumeService } from '../services/api';

const ResumeUpload = ({ onClose }) => {
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setCurrentAnalysis, setLoading, setError: setAnalysisError } = useAnalysis();

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setUploadStatus('uploading');
      setError(null);
      setLoading(true);
      
      try {
        console.log('Starting real resume analysis...');
        const analysisResult = await resumeService.analyzeResume(file);
        console.log('Analysis completed:', analysisResult);
        
        setCurrentAnalysis(analysisResult);
        setUploadStatus('success');
        
        // Navigate to analysis page after a short delay
        setTimeout(() => {
          navigate('/analysis');
          onClose();
        }, 2000);
      } catch (error) {
        console.error('Resume analysis failed:', error);
        setUploadStatus('error');
        setError(error.message);
        setAnalysisError(error.message);
        setLoading(false);
      }
    }
  }, [navigate, onClose, setCurrentAnalysis, setLoading, setAnalysisError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Upload Your Resume</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Upload Area */}
      {uploadStatus === 'idle' && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop your resume or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supports PDF, DOC, and DOCX files (max 10MB)
          </p>
        </div>
      )}

      {/* Uploading Status */}
      {uploadStatus === 'uploading' && uploadedFile && (
        <div className="text-center py-8">
          <Loader className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Analyzing Your Resume
          </h3>
          <p className="text-gray-600 mb-4">
            Our AI is processing your resume with Google Gemini and extracting real insights...
          </p>
          <div className="bg-gray-100 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center space-x-3">
              <File className="w-8 h-8 text-gray-600" />
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">{uploadedFile.name}</div>
                <div className="text-sm text-gray-500">{formatFileSize(uploadedFile.size)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Status */}
      {uploadStatus === 'success' && (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Analysis Complete!
          </h3>
          <p className="text-gray-600 mb-4">
            Your resume has been successfully analyzed. Redirecting to results...
          </p>
        </div>
      )}

      {/* Error Status */}
      {uploadStatus === 'error' && (
        <div className="text-center py-8">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upload Failed
          </h3>
          <p className="text-gray-600 mb-4">
            {error || 'There was an error analyzing your resume. Please try again.'}
          </p>
          <button
            onClick={() => {
              setUploadStatus('idle');
              setUploadedFile(null);
              setError(null);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Info Section */}
      {uploadStatus === 'idle' && (
        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• AI analyzes your skills and experience</li>
            <li>• Identifies skill gaps and strengths</li>
            <li>• Suggests matching job opportunities</li>
            <li>• Creates personalized learning paths</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;