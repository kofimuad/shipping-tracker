import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { uploadAPI } from '../utils/api';

function EmployeeUploadPage({ user }) {
  const [file, setFile] = useState(null);
  const [columnMapping, setColumnMapping] = useState({
    tracking: 'Column A',
    status: 'Column B',
    location: 'Column C',
    destination: 'Column D',
    phone: 'Column E'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Check if user is an employee
  if (!user || user.role !== 'employee') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-600" size={24} />
            <div>
              <h3 className="font-bold text-red-900">Access Denied</h3>
              <p className="text-red-700 text-sm">
                Only employees can access this page. Please log in with an employee account.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is Excel
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
      ];
      
      if (validTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError('');
        setSuccess('');
      } else {
        setError('Please upload a valid Excel file (.xlsx, .xls) or CSV file');
        setFile(null);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileChange({ target: { files: [droppedFile] } });
    }
  };

  const handleColumnMappingChange = (field, value) => {
    setColumnMapping({
      ...columnMapping,
      [field]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);

      const response = await uploadAPI.uploadExcel(file, columnMapping);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Success message
      setSuccess(
        `✅ Upload successful! ${response.data.data?.length || 0} shipment records have been imported.`
      );
      
      // Reset form
      setFile(null);
      setColumnMapping({
        tracking: 'Column A',
        status: 'Column B',
        location: 'Column C',
        destination: 'Column D',
        phone: 'Column E'
      });
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Upload failed. Please check your file format and try again.'
      );
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Upload Shipment Records</h1>
        <p className="text-gray-600 max-w-2xl">
          Import bulk tracking data from Excel files. Map your columns and upload to add multiple shipments at once.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* File Upload Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Select File</h2>
            
            {/* File Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
                file
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv"
                className="hidden"
              />
              
              {file ? (
                <>
                  <CheckCircle className="text-green-600 mx-auto mb-3" size={48} />
                  <h3 className="text-lg font-semibold text-green-900 mb-2">File Selected</h3>
                  <p className="text-green-700 font-mono text-sm">{file.name}</p>
                  <p className="text-green-600 text-xs mt-2">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="mt-4 text-green-600 hover:text-green-800 text-sm font-semibold underline"
                  >
                    Choose Different File
                  </button>
                </>
              ) : (
                <>
                  <Upload className="text-gray-400 mx-auto mb-3" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop your file here</h3>
                  <p className="text-gray-600 mb-3">or click to browse</p>
                  <p className="text-gray-500 text-sm">
                    Supports .xlsx, .xls, and .csv files (Max 10MB)
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Column Mapping Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Map Columns</h2>
            <p className="text-gray-600 mb-6">
              Tell us which columns in your file contain which information
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tracking Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Tracking Number Column
                </label>
                <select
                  value={columnMapping.tracking}
                  onChange={(e) => handleColumnMappingChange('tracking', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['Column A', 'Column B', 'Column C', 'Column D', 'Column E'].map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">e.g., GHA-1234-2024X</p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Status Column
                </label>
                <select
                  value={columnMapping.status}
                  onChange={(e) => handleColumnMappingChange('status', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['Column A', 'Column B', 'Column C', 'Column D', 'Column E'].map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">e.g., In Transit, Delivered</p>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Location Column
                </label>
                <select
                  value={columnMapping.location}
                  onChange={(e) => handleColumnMappingChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['Column A', 'Column B', 'Column C', 'Column D', 'Column E'].map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">e.g., Tema Port, Accra Hub</p>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Destination Column
                </label>
                <select
                  value={columnMapping.destination}
                  onChange={(e) => handleColumnMappingChange('destination', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['Column A', 'Column B', 'Column C', 'Column D', 'Column E'].map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">e.g., Kumasi, Takoradi</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Column
                </label>
                <select
                  value={columnMapping.phone}
                  onChange={(e) => handleColumnMappingChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['Column A', 'Column B', 'Column C', 'Column D', 'Column E'].map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">e.g., +233 20 123 4567</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {loading && uploadProgress > 0 && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">Uploading...</span>
                <span className="text-sm text-gray-600">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading || !file}
              className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                loading || !file
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload File
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setError('');
                setSuccess('');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Sidebar - Help & Template */}
        <div className="space-y-6">
          {/* Template Info */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <FileSpreadsheet size={20} />
              File Requirements
            </h3>
            <ul className="space-y-3 text-sm text-blue-900">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span>Format: .xlsx, .xls, or .csv</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span>Maximum file size: 10MB</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span>First row should contain data (no headers)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span>Tracking numbers must be unique</span>
              </li>
            </ul>
          </div>

          {/* Example Data */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Example Format</h3>
            <div className="bg-white rounded p-3 text-xs font-mono space-y-2 text-gray-700 overflow-x-auto">
              <div className="grid grid-cols-5 gap-1">
                <div className="font-bold text-blue-600">GHA-001</div>
                <div className="font-bold text-blue-600">In Transit</div>
                <div className="font-bold text-blue-600">Tema Port</div>
                <div className="font-bold text-blue-600">Kumasi</div>
                <div className="font-bold text-blue-600">+233201234567</div>
              </div>
              <div className="grid grid-cols-5 gap-1">
                <div>GHA-002</div>
                <div>Delivered</div>
                <div>Accra Hub</div>
                <div>Takoradi</div>
                <div>+233241234567</div>
              </div>
              <div className="grid grid-cols-5 gap-1">
                <div>GHA-003</div>
                <div>Pending</div>
                <div>Processing</div>
                <div>Ashanti</div>
                <div>+233301234567</div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <h3 className="font-bold text-orange-900 mb-3">Need Help?</h3>
            <p className="text-sm text-orange-800 mb-4">
              Contact support if you're having issues with your upload.
            </p>
            <a
              href="tel:+233302001234"
              className="inline-block w-full text-center bg-orange-500 text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition"
            >
              📞 Call Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeUploadPage;