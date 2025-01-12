import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload } from 'lucide-react';

interface FormData {
  sender_email: string;
  sender_password: string;
  data_source: string;
  html_body: string;
  temporary_pdf: File | null;
  CSV: File | null;
}

export function AnimatedCard2() {
  const [formData, setFormData] = useState<FormData>({
    sender_email: '',
    sender_password: '',
    data_source: '',
    html_body: '',
    temporary_pdf: null,
    CSV: null
  });

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const apiPayload = new FormData()

    apiPayload.append('sender_email', formData.sender_email)
    apiPayload.append('sender_password', formData.sender_password)
    apiPayload.append('html_body', formData.html_body)

    if(formData.temporary_pdf){
      apiPayload.append('temporary_pdf', formData.temporary_pdf)
    }
    if(formData.CSV){
      apiPayload.append('CSV', formData.CSV)
    }
    if(formData.data_source){
      apiPayload.append('data_source', formData.data_source)
    }

    if(!formData.temporary_pdf && !formData.CSV && !formData.data_source){
      alert("You must provide atleast one");
      return
    }

    try{
      const response = await fetch('https://mailit-2.onrender.com//send-html-via-email/', {
        method: 'POST',
        body: apiPayload,
      })

      if(!response.ok){
        throw new Error("failed to perform the api operation")
      }

      const result = await response.json()
      console.log('API response', result)

    }
    catch(error){
      console.error('Error', error)
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'csv') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [type === 'pdf' ? 'temporary_pdf' : 'CSV']: file
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
          SEND CUSTOM EMAIL
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
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-yellow-300 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors"
                >
                  <Upload className="mr-2 text-yellow-500" size={20} />
                  <span className="text-gray-600">
                    {formData.temporary_pdf ? formData.temporary_pdf.name : 'Upload PDF'}
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
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-yellow-300 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors"
                >
                  <Upload className="mr-2 text-yellow-500" size={20} />
                  <span className="text-gray-600">
                    {formData.CSV ? formData.CSV.name : 'Upload CSV'}
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
              type="sender_email"
              value={formData.sender_email}
              onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none"
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
              type="sender_password"
              value={formData.sender_password}
              onChange={(e) => setFormData({ ...formData, sender_password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="Enter your password"
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Receiver's Email
            </label>
            <input
              type="text"
              value={formData.data_source}
              onChange={(e) => setFormData({ ...formData, data_source: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="Receiver's Email"
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              HTML or Text
            </label>
            <input
              type="text"
              value={formData.html_body}
              onChange={(e) => setFormData({ ...formData, html_body: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="HTML or Text"
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