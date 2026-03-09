"use client";
import { useEffect, useState } from 'react';
import { ExternalLink, Rocket, Settings, Users, BarChart3 } from 'lucide-react';

export default function CRMPage() {
  const [loading, setLoading] = useState(true);
  const [crmExists, setCrmExists] = useState(false);

  useEffect(() => {
    // Check if CRM build exists
    const checkCRMBuild = async () => {
      try {
        const response = await fetch('/crm/index.html');
        if (response.ok) {
          setCrmExists(true);
          
          // Don't automatically open - let user click the button
          // setTimeout(() => {
          //   openCRMWindow();
          // }, 1000);
        }
      } catch (error) {
        console.log('CRM build not found:', error);
      } finally {
        setLoading(false);
      }
    };

    checkCRMBuild();
  }, []);

  const openCRMWindow = () => {
    // Use current origin to ensure correct port
    const crmUrl = `${window.location.origin}/crm/login`;
    const windowFeatures = 'width=1400,height=900,scrollbars=yes,resizable=yes,location=yes,menubar=yes,toolbar=yes';
    
    const crmWindow = window.open(crmUrl, 'OEC_CRM', windowFeatures);
    
    if (crmWindow) {
      crmWindow.focus();
      
      // Optional: Close this tab after opening CRM
      // setTimeout(() => {
      //   window.close();
      // }, 2000);
    } else {
      alert('Pop-up blocked! Please allow pop-ups for this site to access the CRM.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-800 to-primary-600">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-white border-t-transparent mx-auto"></div>
          <p className="mt-6 text-xl font-medium">Initializing OEC CRM...</p>
          <p className="mt-2 text-primary-100">Please wait while we prepare your workspace</p>
        </div>
      </div>
    );
  }

  if (!crmExists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-3xl mx-auto p-8">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary-800 to-primary-600 px-8 py-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white rounded-full p-3">
                  <Settings className="h-8 w-8 text-amber-900" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">CRM Setup Required</h2>
              <p className="text-primary-100 text-lg">
                Your CRM build needs to be deployed before you can access it.
              </p>
            </div>
            
            <div className="p-8">
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-amber-900 mb-4 flex items-center">
                  <Rocket className="h-5 w-5 mr-2" />
                  Quick Setup Guide
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <strong className="text-amber-900">Build your React CRM:</strong>
                      <code className="block bg-gray-100 p-3 mt-2 rounded-lg text-sm font-mono">npm run build</code>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <strong className="text-amber-900">Deploy to OEC:</strong>
                      <code className="block bg-gray-100 p-3 mt-2 rounded-lg text-sm font-mono">npm run deploy-crm [build-directory]</code>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <strong className="text-amber-900">Access your CRM:</strong>
                      <p className="text-amber-700 mt-1">Visit this page again and your CRM will open automatically!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-secondary-50 to-orange-50 rounded-xl p-6 border border-secondary-200">
                <h4 className="font-semibold text-secondary-800 mb-3 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  What you'll get:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                    CRM opens in a dedicated browser window
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                    Full-screen experience without iframe limitations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                    Better performance and functionality
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                    Easy window management and multitasking
                  </li>
                </ul>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Need help? Check the documentation in <code className="bg-gray-100 px-2 py-1 rounded">/crm/README.md</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <ExternalLink className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">CRM Window Opened!</h1>
            <p className="text-amber-700 text-lg">
              Your OEC CRM has been launched in a new browser window.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-amber-900 mb-3">Can't see the CRM window?</h3>
            <ul className="text-left space-y-2 text-gray-700 text-sm">
              <li>• Check if pop-ups are blocked in your browser</li>
              <li>• Look for a new tab or window in your browser</li>
              <li>• Click the button below to manually open the CRM</li>
            </ul>
          </div>

          <div className="space-y-4">
            <button
              onClick={openCRMWindow}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="h-5 w-5" />
              Open CRM Window
            </button>
            
            <div className="text-center">
              <a
                href={`${typeof window !== 'undefined' ? window.location.origin : ''}/crm/login`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-amber-900 text-sm font-medium inline-flex items-center gap-1"
              >
                <ExternalLink className="h-4 w-4" />
                Or open CRM directly
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              <Users className="h-4 w-4 inline mr-1" />
              Managing customer relationships with OEC CRM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}