
import React from 'react';
import { ExternalLink, ClipboardCheck, Users, HelpCircle } from 'lucide-react';
import { GOOGLE_FORM_URL } from '../constants';

const SubmissionPortal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
          <ClipboardCheck className="text-indigo-600" />
          Contribute to the Gallery
        </h1>
        <p className="text-lg text-gray-600">
          Our list is growing, and we need your help! Suggest a computer scientist who has made a significant impact, 
          especially those from underrepresented backgrounds in technology.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Who to Suggest?
            </h3>
            <ul className="space-y-4 text-indigo-100 text-sm">
              <li className="flex gap-3">
                <span className="font-bold">1.</span>
                <span>Pioneers who paved the way for modern computing.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">2.</span>
                <span>Contemporary researchers making breakthroughs in AI, Security, or Systems.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">3.</span>
                <span>Diverse individuals whose stories are often untold in standard textbooks.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              Need Help?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Not sure if your suggestion fits? Reach out to us at jyauney@stanford.edu or on GitHub.
            </p>
            <a 
              href="https://scientistspotlights.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:underline"
            >
              Check out the [Non-CS] Scientist Spotlight project <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right: Form iFrame */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden min-h-[700px]">
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Official Submission Form</span>
            <a 
              href={GOOGLE_FORM_URL.replace('?embedded=true', '')} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
            >
              Open in new tab <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <iframe 
            src={GOOGLE_FORM_URL}
            width="100%" 
            height="100%" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="w-full h-full min-h-[600px]"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPortal;
