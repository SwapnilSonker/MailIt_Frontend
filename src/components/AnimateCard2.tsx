import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  test1: string;
  test2: string;
  pdfFile: File | null;
  csvFile: File | null;
}

export function AnimatedCard2() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    test1: '',
    test2: '',
    pdfFile: null,
    csvFile: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'csv') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [type === 'pdf' ? 'pdfFile' : 'csvFile']: file
    }));
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }}
      className="w-full max-w-2xl bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Upload Documents
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Upload Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                PDF Document
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'pdf')}
                  className="hidden"
                  id="pdf-upload"
                />
                <label
                  htmlFor="pdf-upload"
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
                >
                  <Upload className="mr-2 text-purple-500" size={20} />
                  <span className="text-gray-600">
                    {formData.pdfFile ? formData.pdfFile.name : 'Upload PDF'}
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                CSV File
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileChange(e, 'csv')}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
                >
                  <Upload className="mr-2 text-purple-500" size={20} />
                  <span className="text-gray-600">
                    {formData.csvFile ? formData.csvFile.name : 'Upload CSV'}
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Input Fields */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="Enter your email"
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="Enter your password"
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Field 1
            </label>
            <input
              type="text"
              value={formData.test1}
              onChange={(e) => setFormData({ ...formData, test1: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="Test field 1"
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Field 2
            </label>
            <input
              type="text"
              value={formData.test2}
              onChange={(e) => setFormData({ ...formData, test2: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="Test field 2"
            />
          </motion.div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity mt-8"
        >
          <span>Submit</span>
          <Send size={20} />
        </motion.button>
      </form>
    </motion.div>
  );
}