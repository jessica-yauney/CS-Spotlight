
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Award, User, Tag, BookOpen } from 'lucide-react';
import { SCIENTISTS } from '../constants';

const ScientistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scientist = SCIENTISTS.find(s => s.id === id);

  if (!scientist) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Scientist Not Found</h2>
        <Link to="/" className="text-indigo-600 hover:underline">Return to Gallery</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in slide-in-from-bottom-4">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Gallery
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Column: Media */}
          <div className="md:w-2/5 p-8 bg-gray-50">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white mb-6">
              <img 
                src={scientist.imageUrl} 
                alt={scientist.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Identities</h4>
                  <div className="flex flex-wrap gap-2">
                    {scientist.identity.map(id => (
                      <span key={id} className="bg-white border border-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-full">
                        {id}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                < Award className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Main Fields</h4>
                  <div className="flex flex-wrap gap-2">
                    {scientist.fields.map(f => (
                      <span key={f} className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="md:w-3/5 p-8 lg:p-12">
            <div className="mb-8">
              <h1 className="text-4xl font-black text-gray-900 mb-2">{scientist.name}</h1>
              <p className="text-indigo-600 font-medium text-lg italic">"{scientist.contribution}"</p>
            </div>

            <div className="prose prose-indigo max-w-none space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-3 text-indigo-700">
                  <User className="w-5 h-5" />
                  <h3 className="text-xl font-bold m-0">About</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {scientist.longBio}
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3 text-indigo-700">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="text-xl font-bold m-0">Resources</h3>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-500 text-sm mb-4">Want to learn more about {scientist.name}'s work?</p>
                  <a 
                    href={scientist.wikiUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-all text-sm font-medium shadow-sm"
                  >
                    Wikipedia Article
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientistDetail;
