import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader, Send, Upload } from 'lucide-react';

interface FormData {
  sender_password: string;
  sender_email: string;
  csv_file: File | null;
  resume_pdf: File | null;
}

export function AnimatedCard() {
  const [Loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    sender_password: '',
    sender_email: '',
    csv_file: null,
    resume_pdf: null,
  });

  const [showPassword , setshowPassword] = useState(false)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'csv') => {
    const file = e?.target?.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [type === 'pdf' ? 'resume_pdf' : 'csv_file']: file
    }));
  };
  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    const apiPayload = new FormData()

    apiPayload.append('sender_email', formData.sender_email)
    apiPayload.append('sender_password', formData.sender_password)
    if (formData.csv_file) {
      apiPayload.append('csv_file', formData.csv_file);
    }
    if(formData.resume_pdf){
      apiPayload.append('resume_pdf', formData.resume_pdf)
    }
    try{
      const response = await fetch('https://mailit-2.onrender.com/send-email-via-csv/', {
        method: 'POST',
        body: apiPayload,
      })

      if (!response.ok) {
        throw new Error("failed to perform the api operation");
      }

      const result = await response.json();
      console.log("API response", result);
      
    } catch (error) {
      console.error("Error", error);
    }
    finally{
      setLoading(false);
    }

    // Further processing can be done here, such as sending the files to the server.
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      }}
      className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          SEND EMAIL IN BULK
        </h2>

        <div className="space-y-4">
          {/* Email Field */}
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
              value={formData.sender_email}
              onChange={(e) =>
                setFormData({ ...formData, sender_email: e.target.value })
              }
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.sender_password}
                onChange={(e) =>
                  setFormData({ ...formData, sender_password: e.target.value })
                }
                className="w-full px-4 py-3 pr-10 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setshowPassword(!showPassword)}
                className="absolute right-3 top-1/2 flex inset-y-0 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </motion.div>

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
                  onChange={(e) => handleFileChange(e, "pdf")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="pdf-upload"
                />
                <label
                  htmlFor="pdf-upload"
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-yellow-300 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors"
                >
                  <Upload className="mr-2 text-yellow-500" size={20} />
                  <span className="text-gray-600">
                    {formData.resume_pdf
                      ? formData.resume_pdf.name
                      : "Upload PDF"}
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
                  onChange={(e) => handleFileChange(e, "csv")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-yellow-300 rounded-lg cursor-pointer hover:border-yellow-500 transition-colors"
                >
                  <Upload className="mr-2 text-yellow-500" size={20} />
                  <span className="text-gray-600">
                    {formData.csv_file ? formData.csv_file.name : "Upload CSV"}
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
        >
          {!Loading ? (
            <>
              <span>Submit</span>
              <Send size={20} />
            </>
          ) : (
            <>
              <span>Loading</span>
              <Loader size={20} />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
