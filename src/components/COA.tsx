import React, { useState, useEffect } from 'react';
import { Shield, Award, CheckCircle, X, ExternalLink, Download, Sparkles, ArrowLeft, Copy, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCOAPageSetting } from '../hooks/useCOAPageSetting';

interface COAReport {
  id: string;
  product_name: string;
  batch: string;
  test_date: string;
  purity_percentage: number;
  quantity: string;
  task_number: string;
  verification_key: string;
  image_url: string;
  featured: boolean;
  laboratory: string;
}

const COA: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [coaReports, setCOAReports] = useState<COAReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    fetchCOAReports();
  }, []);

  const fetchCOAReports = async () => {
    try {
      const { data, error } = await supabase
        .from('coa_reports')
        .select('*')
        .order('test_date', { ascending: false });

      if (error) throw error;
      setCOAReports(data || []);
    } catch (error) {
      console.error('Error fetching COA reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const { coaPageEnabled, loading: settingLoading } = useCOAPageSetting();

  if (settingLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-charcoal-900 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!coaPageEnabled) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <Shield className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-charcoal-800 mb-2">Lab Reports Unavailable</h1>
          <p className="text-charcoal-600 mb-6">The COA page is currently disabled.</p>
          <a href="/" className="px-6 py-2 bg-charcoal-900 text-white rounded-lg hover:bg-charcoal-800 transition-colors">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blush-light">
      {/* Hero Section - Mobile Optimized */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blush-100 to-blush-50 py-6 md:py-12">
        <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-blush-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-charcoal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        {/* Back Button */}
        <a
          href="/"
          className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-md border border-blush-200 text-charcoal-700 hover:text-charcoal-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </a>

        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 md:px-6 md:py-3 rounded-full shadow-soft mb-3 md:mb-6 border-2 border-blush-200">
              <Shield className="w-3.5 h-3.5 md:w-5 md:h-5 text-charcoal-700" />
              <span className="text-xs md:text-sm font-bold text-charcoal-800">Lab Verified</span>
            </div>

            <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-charcoal-900 px-2">
              Lab Reports
              <Sparkles className="inline-block w-5 h-5 md:w-8 md:h-8 text-charcoal-400 ml-2 mb-1 animate-pulse" />
            </h1>

            <p className="text-sm md:text-lg text-charcoal-600 mb-4 md:mb-6 px-4">
              Tested by <strong className="text-charcoal-800">Janoshik + Chromate</strong>
            </p>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm px-2">
              <div className="flex items-center gap-1.5 md:gap-2 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-md border border-blush-200">
                <CheckCircle className="w-3.5 h-3.5 md:w-5 md:h-5 text-charcoal-700" />
                <span className="font-medium text-charcoal-700">99%+ Purity</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-md border border-blush-200">
                <Award className="w-3.5 h-3.5 md:w-5 md:h-5 text-charcoal-700" />
                <span className="font-medium text-charcoal-700">Certified</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-md border border-blush-200">
                <Shield className="w-3.5 h-3.5 md:w-5 md:h-5 text-charcoal-700" />
                <span className="font-medium text-charcoal-700">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COA Reports Grid - Mobile Optimized */}
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
          {coaReports.length === 0 ? (
            <div className="col-span-2 text-center py-20">
              <Shield className="w-20 h-20 text-charcoal-300 mx-auto mb-4" />
              <p className="text-xl text-charcoal-500">No lab reports available yet.</p>
            </div>
          ) : (
            coaReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl md:rounded-3xl shadow-soft hover:shadow-luxury transition-all duration-300 overflow-hidden border-2 border-blush-100 hover:border-blush-200 transform hover:-translate-y-1 md:hover:-translate-y-2"
              >
                {/* Report Image - Mobile Optimized */}
                <div
                  className="relative cursor-pointer group"
                  onClick={() => setSelectedImage(report.image_url)}
                >
                  <img
                    src={report.image_url}
                    alt={`${report.product_name} Certificate of Analysis`}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23F9F9F9" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23737373" font-size="20" font-family="Arial"%3ECOA Image Coming Soon%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl shadow-lg">
                      <p className="text-xs md:text-sm font-bold text-charcoal-800 flex items-center gap-1.5 md:gap-2">
                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                        View full report
                      </p>
                    </div>
                  </div>
                </div>

                {/* Report Details - Mobile Optimized */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 md:mb-4 gap-2">
                    <h3 className="text-base md:text-xl font-bold text-charcoal-900">{report.product_name}</h3>
                    {report.featured && (
                      <span className="bg-blush-100 text-charcoal-800 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold border border-blush-300 whitespace-nowrap">
                        ✓ VERIFIED
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <div className="flex items-center justify-between py-1.5 md:py-2 border-b border-blush-100">
                      <span className="text-xs md:text-sm text-charcoal-600 font-medium">Purity:</span>
                      <span className="text-sm md:text-base font-bold text-charcoal-900">{report.purity_percentage}%</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 md:py-2 border-b border-blush-100">
                      <span className="text-xs md:text-sm text-charcoal-600 font-medium">Quantity:</span>
                      <span className="text-sm md:text-base font-bold text-charcoal-800">{report.quantity}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 md:py-2 border-b border-blush-100">
                      <span className="text-xs md:text-sm text-charcoal-600 font-medium">Test Date:</span>
                      <span className="text-xs md:text-sm text-charcoal-800">{new Date(report.test_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 md:py-2 border-b border-blush-100">
                      <span className="text-xs md:text-sm text-charcoal-600 font-medium">Task:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm text-charcoal-800 font-mono">#{report.task_number}</span>
                        <button
                          onClick={() => handleCopy(report.task_number, `${report.id}-task`)}
                          className="p-1 hover:bg-blush-50 rounded-full transition-colors"
                          title="Copy Task Number"
                        >
                          {copiedId === `${report.id}-task` ? (
                            <Check className="w-3.5 h-3.5 text-charcoal-700" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-charcoal-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-1.5 md:py-2 border-b border-blush-100">
                      <span className="text-xs md:text-sm text-charcoal-600 font-medium">Unique Key:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm text-charcoal-800 font-mono">{report.verification_key}</span>
                        <button
                          onClick={() => handleCopy(report.verification_key, `${report.id}-key`)}
                          className="p-1 hover:bg-blush-50 rounded-full transition-colors"
                          title="Copy Unique Key"
                        >
                          {copiedId === `${report.id}-key` ? (
                            <Check className="w-3.5 h-3.5 text-charcoal-700" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-charcoal-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    {(() => {
                      const isJanoshik = !report.laboratory || report.laboratory.toLowerCase().includes('janoshik');
                      const verificationUrl = isJanoshik
                        ? `https://www.janoshik.com/verify/?key=${report.verification_key}`
                        : 'https://chromate.org';

                      return (
                        <a
                          href={verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1.5 md:gap-2 text-white px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl bg-charcoal-900 hover:bg-charcoal-800"
                        >
                          <Shield className="w-4 h-4 md:w-5 md:h-5" />
                          {isJanoshik ? 'Verify on Janoshik' : 'Verify on Chromate'}
                        </a>
                      );
                    })()}

                    <button
                      onClick={() => setSelectedImage(report.image_url)}
                      className="w-full flex items-center justify-center gap-1.5 md:gap-2 bg-white text-charcoal-800 border-2 border-charcoal-300 hover:border-charcoal-500 hover:bg-blush-50 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base font-medium transition-all duration-300"
                    >
                      <Download className="w-4 h-4 md:w-5 md:h-5" />
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Section - Mobile Optimized */}
        <div className="mt-6 md:mt-12 max-w-4xl mx-auto">
          <div className="bg-blush-50 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border-2 border-blush-200 shadow-soft">
            <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-charcoal-900 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-xl font-bold text-charcoal-900 mb-2 md:mb-3">Independent Laboratory Verification</h3>
                <p className="text-sm md:text-base text-charcoal-700 leading-relaxed mb-3 md:mb-4">
                  We partner with top-tier third-party laboratories like <strong>Janoshik Analytical</strong> and <strong>Chromate</strong> to ensure the highest quality standards.
                  Each batch is rigorously tested for purity and concentration using HPLC and Mass Spectrometry.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.janoshik.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 md:gap-2 text-sm md:text-base text-charcoal-700 hover:text-charcoal-900 font-medium"
                  >
                    <span>Janoshik</span>
                    <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                  <a
                    href="https://chromate.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 md:gap-2 text-sm md:text-base text-charcoal-700 hover:text-charcoal-900 font-medium"
                  >
                    <span>Chromate</span>
                    <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal - Mobile Optimized */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 md:-top-12 right-0 bg-white/95 hover:bg-white text-charcoal-800 rounded-full p-2 md:p-2.5 transition-all shadow-lg"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Certificate of Analysis"
              className="w-full h-auto rounded-2xl md:rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default COA;
