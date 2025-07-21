

// import React, { useState } from 'react';
// import {
//   Heart, Activity, AlertCircle, CheckCircle, Users, TrendingUp,
//   Phone, MapPin, Star
// } from 'lucide-react';
// import axiosFlask from '../../apis/axiosFlask';

// export default function HearDisease() {
//   const [formData, setFormData] = useState({
//     age: 50, sex: 0, cp: 0, trestbps: 120, chol: 200,
//     fbs: 0, restecg: 0, thalach: 150, exang: 0,
//     oldpeak: 0, slope: 1, ca: 0, thal: 0
//   });

//   const [result, setResult] = useState(null);
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Step 1: Predict risk using Flask model
//       const predictionRes = await axiosFlask.post('/predict', formData);
//       setResult(predictionRes.data);

//       // Step 2: Fetch nearby providers (optionally based on result)
//       const providerRes = await axiosFlask.get('/healthcare-providers');
//       setProviders(providerRes.data);

//       setCurrentStep(1);
//     } catch (error) {
//       console.error('Error during prediction or fetching providers:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const getRiskColor = (riskLevel) => {
//     switch (riskLevel) {
//       case 'Low': return 'text-green-600 bg-green-100';
//       case 'Moderate': return 'text-yellow-600 bg-yellow-100';
//       case 'High': return 'text-red-600 bg-red-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   const formFields = [
//     { key: 'age', label: 'Age', min: 20, max: 100, step: 1 },
//     { key: 'sex', label: 'Sex', options: [{ value: 0, label: 'Female' }, { value: 1, label: 'Male' }] },
//     { key: 'cp', label: 'Chest Pain Type', options: [
//       { value: 0, label: 'Typical Angina' },
//       { value: 1, label: 'Atypical Angina' },
//       { value: 2, label: 'Non-Anginal Pain' },
//       { value: 3, label: 'Asymptomatic' }
//     ]},
//     { key: 'trestbps', label: 'Resting Blood Pressure (mmHg)', min: 80, max: 200, step: 1 },
//     { key: 'chol', label: 'Cholesterol (mg/dl)', min: 100, max: 400, step: 1 },
//     { key: 'fbs', label: 'Fasting Blood Sugar > 120 mg/dl', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
//     { key: 'restecg', label: 'Resting ECG', options: [
//       { value: 0, label: 'Normal' },
//       { value: 1, label: 'ST-T Wave Abnormality' },
//       { value: 2, label: 'Left Ventricular Hypertrophy' }
//     ]},
//     { key: 'thalach', label: 'Max Heart Rate Achieved', min: 60, max: 220, step: 1 },
//     { key: 'exang', label: 'Exercise Induced Angina', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
//     { key: 'oldpeak', label: 'ST Depression (mm)', min: 0, max: 6, step: 0.1 },
//     { key: 'slope', label: 'ST Slope', options: [
//       { value: 0, label: 'Downsloping' },
//       { value: 1, label: 'Flat' },
//       { value: 2, label: 'Upsloping' }
//     ]},
//     { key: 'ca', label: 'Number of Vessels Colored (0-3)', min: 0, max: 3, step: 1 },
//     { key: 'thal', label: 'Thalassemia', options: [
//       { value: 0, label: 'Normal' },
//       { value: 1, label: 'Fixed Defect' },
//       { value: 2, label: 'Reversible Defect' }
//     ]}
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <header className="bg-white shadow-lg border-b-4 border-blue-600">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="bg-blue-600 p-3 rounded-full">
//                 <Heart className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Pulse Guard</h1>
//                 <p className="text-blue-600 font-medium">AI-Powered Heart Health Assessment</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-lg">
//                 <Activity className="w-5 h-5 text-blue-600" />
//                 <span className="text-blue-800 font-medium">Health Monitoring</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {currentStep === 0 ? (
//           /* Assessment Form */
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-xl shadow-lg p-8">
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div className="bg-blue-100 p-2 rounded-lg">
//                     <Heart className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-900">Heart Health Assessment</h2>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {formFields.map((field) => (
//                       <div key={field.key} className="space-y-2">
//                         <label className="block text-sm font-medium text-gray-700">
//                           {field.label}
//                         </label>
//                         {field.options ? (
//                           <select
//                             value={formData[field.key]}
//                             onChange={(e) => handleInputChange(field.key, parseInt(e.target.value))}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                           >
//                             {field.options.map((option) => (
//                               <option key={option.value} value={option.value}>
//                                 {option.label}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           <input
//                             type="number"
//                             value={formData[field.key]}
//                             onChange={(e) => handleInputChange(field.key, parseFloat(e.target.value))}
//                             min={field.min}
//                             max={field.max}
//                             step={field.step}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                           />
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
//                   >
//                     {loading ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                         <span>Analyzing...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Activity className="w-5 h-5" />
//                         <span>Analyze Heart Health</span>
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>

//             <div className="space-y-6">
//               {/* Info Card */}
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="flex items-center space-x-3 mb-4">
//                   <div className="bg-green-100 p-2 rounded-lg">
//                     <CheckCircle className="w-6 h-6 text-green-600" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">Why Pulse Guard?</h3>
//                 </div>
//                 <ul className="space-y-3 text-gray-700">
//                   <li className="flex items-start space-x-2">
//                     <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
//                     <span>AI-powered risk assessment using machine learning</span>
//                   </li>
//                   <li className="flex items-start space-x-2">
//                     <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
//                     <span>Personalized recommendations for heart health</span>
//                   </li>
//                   <li className="flex items-start space-x-2">
//                     <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
//                     <span>Connect with nearby healthcare providers</span>
//                   </li>
//                   <li className="flex items-start space-x-2">
//                     <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
//                     <span>Evidence-based health insights</span>
//                   </li>
//                 </ul>
//               </div>

//               {/* Stats Card */}
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
//                 <div className="flex items-center space-x-3 mb-4">
//                   <TrendingUp className="w-6 h-6" />
//                   <h3 className="text-xl font-bold">Heart Disease Facts</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span>Leading cause of death globally</span>
//                     <span className="font-bold">17.9M deaths/year</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Preventable cases</span>
//                     <span className="font-bold">80%</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Early detection saves lives</span>
//                     <span className="font-bold">✓</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Results Dashboard */
//           <div className="space-y-8">
//             <div className="text-center">
//               <button
//                 onClick={() => setCurrentStep(0)}
//                 className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors mb-6"
//               >
//                 ← New Assessment
//               </button>
//             </div>

//             {result && (
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Results */}
//                 <div className="lg:col-span-2 space-y-6">
//                   <div className="bg-white rounded-xl shadow-lg p-8">
//                     <div className="flex items-center space-x-3 mb-6">
//                       {/* <div className={p-3 rounded-full ${result.riskLevel === 'Low' ? 'bg-green-100' : result.riskLevel === 'Moderate' ? 'bg-yellow-100' : 'bg-red-100'}}>
//                         {result.riskLevel === 'Low' ? (
//                           <CheckCircle className="w-8 h-8 text-green-600" />
//                         ) : (
//                           <AlertCircle className="w-8 h-8 text-red-600" />
//                         )}
//                       </div> */}
//                       <div className={`p-3 rounded-full ${result.riskLevel === 'Low' ? 'bg-green-100' : result.riskLevel === 'Moderate' 
//                         ? 'bg-yellow-100' : 'bg-red-100'}`}>
//                               {result.riskLevel === 'Low' ? (<CheckCircle className="w-8 h-8 text-green-600" />) : 
//                               (<AlertCircle className="w-8 h-8 text-red-600" />)}
//                       </div>

//                       <div>
//                         <h2 className="text-2xl font-bold text-gray-900">Assessment Results</h2>
//                         <p className="text-gray-600">AI-powered analysis of your heart health</p>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                       <div className="text-center">
//                         <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
//                           <svg className="w-32 h-32 transform -rotate-90">
//                             <circle
//                               cx="64"
//                               cy="64"
//                               r="56"
//                               stroke="currentColor"
//                               strokeWidth="8"
//                               fill="none"
//                               className="text-gray-200"
//                             />
//                             <circle
//                               cx="64"
//                               cy="64"
//                               r="56"
//                               stroke="currentColor"
//                               strokeWidth="8"
//                               fill="none"
//                               strokeDasharray={2 * Math.PI * 56}
//                               strokeDashoffset={2 * Math.PI * 56 * (1 - result.riskPercentage / 100)}
//                               className={result.riskLevel === 'Low' ? 'text-green-600' : result.riskLevel === 'Moderate' ? 'text-yellow-600' : 'text-red-600'}
//                               strokeLinecap="round"
//                             />
//                           </svg>
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <span className="text-2xl font-bold text-gray-900">{result.riskPercentage.toFixed(1)}%</span>
//                           </div>
//                         </div>
//                         <p className="text-sm text-gray-600">Risk Percentage</p>
//                       </div>

//                       <div className="text-center">
//                         <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold ${getRiskColor(result.riskLevel)} mb-4`}>
//                           {result.riskLevel} Risk
//                         </div>
//                         <p className="text-sm text-gray-600">Risk Level</p>
//                       </div>
//                     </div>

//                     <div className="bg-gray-50 rounded-lg p-6">
//                       <h3 className="text-lg font-bold text-gray-900 mb-4">Personalized Recommendations</h3>
//                       <div className="space-y-3">
//                         {result.recommendations.map((rec, index) => (
//                           <div key={index} className="flex items-start space-x-3">
//                             <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
//                             <p className="text-gray-700">{rec}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Healthcare Providers */}
//                   <div className="bg-white rounded-xl shadow-lg p-8">
//                     <div className="flex items-center space-x-3 mb-6">
//                       <div className="bg-blue-100 p-2 rounded-lg">
//                         <Users className="w-6 h-6 text-blue-600" />
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-900">Nearby Healthcare Providers</h3>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {providers.slice(0, 4).map((provider) => (
//                         <div key={provider.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//                           <div className="flex items-start justify-between mb-2">
//                             <h4 className="font-semibold text-gray-900">{provider.name}</h4>
//                             <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{provider.type}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
//                             <MapPin className="w-4 h-4" />
//                             <span>{provider.address}</span>
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2">
//                               <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                               <span className="text-sm text-gray-600">{provider.rating}</span>
//                               <span className="text-sm text-gray-400">• {provider.distance} km</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Phone className="w-4 h-4 text-green-600" />
//                               <span className="text-sm text-green-600">{provider.phone}</span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Wellness Tips */}
//                 <div className="space-y-6">
//                   <div className="bg-white rounded-xl shadow-lg p-6">
//                     <h3 className="text-lg font-bold text-gray-900 mb-4">Heart-Healthy Tips</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-start space-x-3">
//                         <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                           <Activity className="w-4 h-4 text-green-600" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900">Exercise Regularly</p>
//                           <p className="text-sm text-gray-600">150 minutes of moderate exercise per week</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start space-x-3">
//                         <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                           <Heart className="w-4 h-4 text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900">Balanced Diet</p>
//                           <p className="text-sm text-gray-600">Focus on fruits, vegetables, and whole grains</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start space-x-3">
//                         <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                           <CheckCircle className="w-4 h-4 text-purple-600" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900">Regular Checkups</p>
//                           <p className="text-sm text-gray-600">Annual health screenings and monitoring</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
//                     <div className="flex items-center space-x-3 mb-4">
//                       <AlertCircle className="w-6 h-6" />
//                       <h3 className="text-lg font-bold">Emergency Warning</h3>
//                     </div>
//                     <p className="text-sm mb-4">
//                       If you experience chest pain, shortness of breath, or other concerning symptoms, seek immediate medical attention.
//                     </p>
//                     <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
//                       Call Emergency: 911
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }



import React, { useState,useEffect } from "react";
import {
  Heart,
  Activity,
  AlertCircle,
  CheckCircle,
  Users,
  TrendingUp,
  Phone,
  MapPin,
  Star,
  AlertTriangle,
  AlertOctagon,
  BookOpen,
  MonitorPlay,
  Calendar,
  Moon,
  ClipboardList,
  Smartphone,
  Home,
  Scale,
  Pill,
  Droplet,
  Utensils,
} from "lucide-react";
import axiosFlask from "../../apis/axiosFlask";
import { useMemo } from "react";



export default function HearDisease() {
  const [formData, setFormData] = useState({
    age: 50,
    sex: 0,
    cp: 0,
    trestbps: 120,
    chol: 200,
    fbs: 0,
    restecg: 0,
    thalach: 150,
    exang: 0,
    oldpeak: 0,
    slope: 1,
    ca: 0,
    thal: 0,
  });


const scrollToMedicalHelp = () => {
  const element = document.getElementById('medical-help-section');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    setShowDropdown(true); // Automatically show the dropdown
  }
};

const [showDropdown, setShowDropdown] = useState(false);
const [selectedState, setSelectedState] = useState("");

const doctorInfoByState = {
  "Telangana": {
    name: "Dr. Ramesh Gupta",
    hospital: "Apollo Hospitals, Hyderabad",
    contact: "+91 9876543210"
  },
  "Maharashtra": {
    name: "Dr. Meena Joshi",
    hospital: "Lilavati Hospital, Mumbai",
    contact: "+91 9123456789"
  },
  "Karnataka": {
    name: "Dr. Suresh Babu",
    hospital: "Manipal Hospitals, Bengaluru",
    contact: "+91 9988776655"
  },
  "Tamil Nadu": {
    name: "Dr. Lakshmi Natarajan",
    hospital: "Apollo Hospitals, Chennai",
    contact: "+91 9911223344"
  }
  // Add more states if needed
};




  const [result, setResult] = useState(null);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const getGoogleCalendarLink = useMemo(() => {
    const now = new Date();
    const nextYear = new Date(now);
    nextYear.setFullYear(now.getFullYear() + 1);

    const pad = (n) => String(n).padStart(2, "0");

    const formatDate = (d) =>
     `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T000000Z`;

    const start = formatDate(now);
    const end = formatDate(nextYear);

    const title = encodeURIComponent("Pulse Guard Annual Heart Checkup");
    const details = encodeURIComponent("Reminder from Pulse Guard to get an annual heart health checkup.");
    const location = encodeURIComponent("Heart Care Clinic, Hyderabad");

    const recur = encodeURIComponent("RRULE:FREQ=YEARLY");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&recur=${recur}`;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Predict risk using Flask model
      const predictionRes = await axiosFlask.post("/predict", formData);
      setResult(predictionRes.data);

      // Step 2: Fetch nearby providers (optionally based on result)
      const providerRes = await axiosFlask.get("/healthcare-providers");
      setProviders(providerRes.data);

      setCurrentStep(1);
    } catch (error) {
      console.error("Error during prediction or fetching providers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "Low":
        return "text-green-600 bg-green-100";
      case "Moderate":
        return "text-yellow-600 bg-yellow-100";
      case "High":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formFields = [
    { key: "age", label: "Age", min: 20, max: 100, step: 1 },
    {
      key: "sex",
      label: "Sex",
      options: [
        { value: 0, label: "Female" },
        { value: 1, label: "Male" },
      ],
    },
    {
      key: "cp",
      label: "Chest Pain Type",
      options: [
        { value: 0, label: "Typical Angina" },
        { value: 1, label: "Atypical Angina" },
        { value: 2, label: "Non-Anginal Pain" },
        { value: 3, label: "Asymptomatic" },
      ],
    },
    {
      key: "trestbps",
      label: "Resting Blood Pressure (mmHg)",
      min: 80,
      max: 200,
      step: 1,
    },
    { key: "chol", label: "Cholesterol (mg/dl)", min: 100, max: 400, step: 1 },
    {
      key: "fbs",
      label: "Fasting Blood Sugar > 120 mg/dl",
      options: [
        { value: 0, label: "No" },
        { value: 1, label: "Yes" },
      ],
    },
    {
      key: "restecg",
      label: "Resting ECG",
      options: [
        { value: 0, label: "Normal" },
        { value: 1, label: "ST-T Wave Abnormality" },
        { value: 2, label: "Left Ventricular Hypertrophy" },
      ],
    },
    {
      key: "thalach",
      label: "Max Heart Rate Achieved",
      min: 60,
      max: 220,
      step: 1,
    },
    {
      key: "exang",
      label: "Exercise Induced Angina",
      options: [
        { value: 0, label: "No" },
        { value: 1, label: "Yes" },
      ],
    },
    { key: "oldpeak", label: "ST Depression (mm)", min: 0, max: 6, step: 0.1 },
    {
      key: "slope",
      label: "ST Slope",
      options: [
        { value: 0, label: "Downsloping" },
        { value: 1, label: "Flat" },
        { value: 2, label: "Upsloping" },
      ],
    },
    {
      key: "ca",
      label: "Number of Vessels Colored (0-3)",
      min: 0,
      max: 3,
      step: 1,
    },
    {
      key: "thal",
      label: "Thalassemia",
      options: [
        { value: 0, label: "Normal" },
        { value: 1, label: "Fixed Defect" },
        { value: 2, label: "Reversible Defect" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-3 rounded-full">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Pulse Guard
                </h1>
                <p className="text-blue-600 font-medium">
                  AI-Powered Heart Health Assessment
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  Health Monitoring
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {currentStep === 0 ? (
          /* Assessment Form */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Heart Health Assessment
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.map((field) => (
                      <div key={field.key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {field.label}
                        </label>
                        {field.options ? (
                          <select
                            value={formData[field.key]}
                            onChange={(e) =>
                              handleInputChange(
                                field.key,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          >
                            {field.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="number"
                            value={formData[field.key]}
                            onChange={(e) =>
                              handleInputChange(
                                field.key,
                                parseFloat(e.target.value)
                              )
                            }
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Activity className="w-5 h-5" />
                        <span>Analyze Heart Health</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              {/* Info Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Why Pulse Guard?
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      AI-powered risk assessment using machine learning
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Personalized recommendations for heart health</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Connect with nearby healthcare providers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Evidence-based health insights</span>
                  </li>
                </ul>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Heart Disease Facts</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Leading cause of death globally</span>
                    <span className="font-bold">17.9M deaths/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Preventable cases</span>
                    <span className="font-bold">80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Early detection saves lives</span>
                    <span className="font-bold">✓</span>
                  </div>
                </div>
              </div>


              
            </div>
            
          </div>
        ) : (
          /* Results Dashboard */
          <div className="space-y-8">
            <div className="text-center">
              <button
                onClick={() => setCurrentStep(0)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors mb-6"
              >
                ← New Assessment
              </button>
            </div>

            {result && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Results */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Common Assessment Results Section */}
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <div
                        className={`p-3 rounded-full ${
                          result.riskLevel === "Low"
                            ? "bg-green-100"
                            : result.riskLevel === "Moderate"
                            ? "bg-yellow-100"
                            : "bg-red-100"
                        }`}
                      >
                        {result.riskLevel === "Low" ? (
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        ) : (
                          <AlertCircle className="w-8 h-8 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Assessment Results
                        </h2>
                        <p className="text-gray-600">
                          AI-powered analysis of your heart health
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="text-center">
                        <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                          <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              className="text-gray-200"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={2 * Math.PI * 56}
                              strokeDashoffset={
                                2 *
                                Math.PI *
                                56 *
                                (1 - result.riskPercentage / 100)
                              }
                              className={
                                result.riskLevel === "Low"
                                  ? "text-green-600"
                                  : result.riskLevel === "Moderate"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-900">
                              {result.riskPercentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Risk Percentage</p>
                      </div>

                      <div className="text-center">
                        <div
                          className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold ${getRiskColor(
                            result.riskLevel
                          )} mb-4`}
                        >
                          {result.riskLevel} Risk
                        </div>
                        <p className="text-sm text-gray-600">Risk Level</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Personalized Recommendations
                      </h3>
                      <div className="space-y-3">
                        {result.recommendations.map((rec, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Risk Level Specific Content */}
                  {result.riskLevel === "Low" ? (
                    /* LOW RISK CONTENT */
                    <div className="bg-white rounded-xl shadow-lg p-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Heart className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Maintain Your Heart Health
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Preventive Activities
                          </h4>
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <div className="bg-blue-100 p-2 rounded-full">
                                <Activity className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Weekly Cardio Plan
                                </p>
                                <p className="text-sm text-gray-600">
                                  3-4 sessions of 30 min brisk walking or
                                  cycling
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="bg-purple-100 p-2 rounded-full">
                                <Utensils className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Mediterranean Diet
                                </p>
                                <p className="text-sm text-gray-600">
                                  Focus on fish, olive oil, and fresh vegetables
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Wellness Resources
                          </h4>
                          <div className="space-y-3">
                            <a
                              href="https://www.foodnetwork.com/healthy/photos/favorite-heart-healthy-recipes"
        
                              className="flex items-center space-x-2 text-blue-600 hover:underline"
                            >
                              <BookOpen className="w-4 h-4" />
                              <span>Heart-Healthy Recipes</span>
                            </a>
                            <a
                              href="https://www.youtube.com/playlist?list=PLDqTr678aIlc1i14hQKknyEko9LLbC0fb"
                              target="_blank"
                              className="flex items-center space-x-2 text-blue-600 hover:underline"
                            >
                              <MonitorPlay className="w-4 h-4" />
                              <span>Guided Meditation Videos</span>
                            </a>

                             <a
                              href={getGoogleCalendarLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-blue-600 hover:underline"
                            >
                              <Calendar className="w-4 h-4" />
                              <span>Annual Checkup Reminder</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : result.riskLevel === "Moderate" ? (
                    /* MODERATE RISK CONTENT */
                    <div className="bg-white rounded-xl shadow-lg p-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-yellow-100 p-2 rounded-lg">
                          <AlertTriangle className="w-6 h-6 text-yellow-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Action Plan for Better Heart Health
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Immediate Actions
                          </h4>
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <div className="bg-red-100 p-2 rounded-full">
                                <ClipboardList className="w-4 h-4 text-red-600" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Medical Consultation
                                </p>
                                <p className="text-sm text-gray-600">
                                  Schedule appointment within 2 weeks
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="bg-blue-100 p-2 rounded-full">
                                <Activity className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Supervised Exercise
                                </p>
                                <p className="text-sm text-gray-600">
                                  Consider cardiac rehab program
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Monitoring Tools
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <div className="bg-green-100 p-2 rounded-full">
                                <Home className="w-4 h-4 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Home Blood Pressure Kit
                                </p>
                                <p className="text-sm text-gray-600">
                                  Monitor twice daily
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="bg-purple-100 p-2 rounded-full">
                                <Smartphone className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Heart Rate Tracking App
                                </p>
                                <p className="text-sm text-gray-600">
                                  Track daily activity and heart rate
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* HIGH RISK CONTENT */
                    <div className="bg-white rounded-xl shadow-lg p-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <AlertOctagon className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Urgent Medical Attention Required
                        </h3>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <div>
                              <h4 className="font-bold text-red-800">
                                Critical Warning
                              </h4>
                              <p className="text-sm text-red-700">
                                Based on your assessment, you should consult a
                                cardiologist immediately.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Next Steps
                          </h4>
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <div className="bg-blue-100 p-2 rounded-full">
                                <Phone className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">Emergency Contact</p>
                                <p className="text-sm text-gray-600">
                                  Call 911 if experiencing chest pain or
                                  shortness of breath
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="bg-purple-100 p-2 rounded-full">
                                <Calendar className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Cardiologist Appointment
                                </p>
                                <p className="text-sm text-gray-600">
                                  Schedule within 48 hours
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Healthcare Providers - More emphasized for Moderate/High risk */}
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {result.riskLevel === "Low"
                          ? "Recommended Health Specialists"
                          : result.riskLevel === "Moderate"
                          ? "Cardiac Care Providers"
                          : "Famous Cardiac Care"}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {providers
                        .slice(0, result.riskLevel === "High" ? 6 : 4)
                        .map((provider) => (
                          <div
                            key={provider.id}
                            className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                              result.riskLevel === "High"
                                ? "border-red-200 bg-red-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {provider.name}
                              </h4>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  result.riskLevel === "High"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {provider.type}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{provider.address}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">
                                  {provider.rating}
                                </span>
                                <span className="text-sm text-gray-400">
                                  • {provider.distance} km
                                </span>
                              </div>
                              <button
                                className={`text-sm px-3 py-1 rounded ${
                                  result.riskLevel === "High"
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                                  onClick={scrollToMedicalHelp}
                              >
                                {result.riskLevel === "High"
                                  ? "Call Now"
                                  : "Contact"}
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>

                    {result.riskLevel === "High" && (
                      <div className="mt-6 bg-red-100 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-800 font-medium">
                          Don't delay - contact a cardiologist immediately
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Sidebar - Different content based on risk level */}
                <div className="space-y-6">
                  {result.riskLevel === "Low" ? (
                    /* LOW RISK SIDEBAR */
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Wellness Journey
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Activity className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              30-Day Fitness Challenge
                            </p>
                            <p className="text-sm text-gray-600">
                              Gradually increase your activity level
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Nutrition Guide
                            </p>
                            <p className="text-sm text-gray-600">
                              Heart-healthy meal plans and recipes
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Moon className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Sleep Tracker
                            </p>
                            <p className="text-sm text-gray-600">
                              Improve your sleep quality
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : result.riskLevel === "Moderate" ? (
                    /* MODERATE RISK SIDEBAR */
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Health Monitoring
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <Droplet className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Blood Pressure Log
                            </p>
                            <p className="text-sm text-gray-600">
                              Track morning and evening readings
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Scale className="w-4 h-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Weight Management
                            </p>
                            <p className="text-sm text-gray-600">
                              Weekly weight tracking
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Pill className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Medication Tracker
                            </p>
                            <p className="text-sm text-gray-600">
                              Set reminders for prescriptions
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* HIGH RISK SIDEBAR */
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
                      <div className="flex items-center space-x-3 mb-4">
                        <AlertTriangle className="w-6 h-6" />
                        <h3 className="text-lg font-bold">
                          Emergency Action Plan
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <Phone className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">Emergency Contacts</p>
                            <p className="text-sm">
                              911 • Nearest Hospital • Your Doctor
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Nearest Cardiac Center
                            </p>
                            <p className="text-sm">
                              2.5 miles away • 24/7 Emergency
                            </p>
                          </div>
                        </div>
                        {/* <div className="pt-4">
                          <button className="w-full bg-white text-red-600 px-4 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                            <Phone className="w-5 h-5" />
                            <span>Call Emergency Services Now</span>
                          </button>
                        </div> */}
                      </div>
                    </div>
                  )}

                  {/* Common emergency warning - more prominent for high risk */}
                  {/* <div
                    className={`rounded-xl shadow-lg p-6 text-white ${
                      result.riskLevel === "High"
                        ? "bg-red-600"
                        : "bg-gradient-to-r from-orange-500 to-pink-500"
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertCircle className="w-6 h-6" />
                      <h3 className="text-lg font-bold">
                        {result.riskLevel === "High"
                          ? "Critical Warning Signs"
                          : "Warning Signs to Watch For"}
                      </h3>
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <p className="flex items-start space-x-2">
                        <span>•</span>
                        <span>Chest pain or discomfort</span>
                      </p>
                      <p className="flex items-start space-x-2">
                        <span>•</span>
                        <span>Shortness of breath</span>
                      </p>
                      <p className="flex items-start space-x-2">
                        <span>•</span>
                        <span>Pain radiating to arm/jaw</span>
                      </p>
                      {result.riskLevel === "High" && (
                        <p className="flex items-start space-x-2">
                          <span>•</span>
                          <span>Sudden dizziness or nausea</span>
                        </p>
                      )}
                    </div>
                    <button
                      className={`w-full px-4 py-2 rounded-lg font-medium ${
                        result.riskLevel === "High"
                          ? "bg-white text-red-600 hover:bg-gray-100"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      {result.riskLevel === "High"
                        ? "Call 911 Immediately"
                        : "Seek Medical Help"}
                    </button>
                  </div> */}

                  <div
                  id="medical-help-section"
                  className={`rounded-xl shadow-lg p-6 text-white ${
    result.riskLevel === "High"
      ? "bg-red-600"
      : "bg-gradient-to-r from-orange-500 to-pink-500"
  }`}
>
  <div className="flex items-center space-x-3 mb-4">
    <AlertCircle className="w-6 h-6" />
    <h3 className="text-lg font-bold">
      {result.riskLevel === "High"
        ? "Critical Warning Signs"
        : "Warning Signs to Watch For"}
    </h3>
  </div>
  <div className="space-y-2 text-sm mb-4">
    <p className="flex items-start space-x-2">
      <span>•</span>
      <span>Chest pain or discomfort</span>
    </p>
    <p className="flex items-start space-x-2">
      <span>•</span>
      <span>Shortness of breath</span>
    </p>
    <p className="flex items-start space-x-2">
      <span>•</span>
      <span>Pain radiating to arm/jaw</span>
    </p>
    {result.riskLevel === "High" && (
      <p className="flex items-start space-x-2">
        <span>•</span>
        <span>Sudden dizziness or nausea</span>
      </p>
    )}
  </div>
  <button
    className={`w-full px-4 py-2 rounded-lg font-medium ${
      result.riskLevel === "High"
        ? "bg-white text-red-600 hover:bg-gray-100"
        : "bg-red-600 text-white hover:bg-red-700"
    }`}
    onClick={() => setShowDropdown((prev) => !prev)}
  >
    {result.riskLevel === "High"
      ? "Call 911 Immediately"
      : "Seek Medical Help"}
  </button>
  
  {/* Add the dropdown and doctor info here */}
  {showDropdown && (
    <div className="mt-4">
      <label htmlFor="state" className="block text-sm font-medium mb-1 text-white">
        Select Your State:
      </label>
      <select
        id="state"
        className="w-full p-2 border rounded bg-white text-gray-800"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">-- Choose State --</option>
        {Object.keys(doctorInfoByState).map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  )}
  
  {selectedState && doctorInfoByState[selectedState] && (
    <div className="mt-4 p-4 border rounded bg-white bg-opacity-20">
      <h3 className="text-lg font-semibold text-white">Recommended Doctor:</h3>
      <p className="text-white"><strong>Name:</strong> {doctorInfoByState[selectedState].name}</p>
      <p className="text-white"><strong>Hospital:</strong> {doctorInfoByState[selectedState].hospital}</p>
      <p className="text-white"><strong>Contact:</strong> {doctorInfoByState[selectedState].contact}</p>
    </div>
  )}
</div>

                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

