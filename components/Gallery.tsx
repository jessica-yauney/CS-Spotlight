
import React, { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SCIENTISTS } from '../constants';
import { Field, IdentityTag } from '../types';

const FIELDS: Field[] = [
  'Artificial Intelligence', 'Systems & Networking', 'Theory', 
  'Human-Computer Interaction', 'Security & Privacy', 'Software Engineering'
];

const IDENTITIES: IdentityTag[] = [
  'Woman', 'Person of Color', 'LGBTQ+', 'Pioneer', 'Contemporary'
];

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<Field | 'All'>('All');
  const [selectedIdentity, setSelectedIdentity] = useState<IdentityTag | 'All'>('All');

  const filteredScientists = useMemo(() => {
    return SCIENTISTS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           s.shortBio.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesField = selectedField === 'All' || s.fields.includes(selectedField as Field);
      const matchesIdentity = selectedIdentity === 'All' || s.identity.includes(selectedIdentity as IdentityTag);
      return matchesSearch && matchesField && matchesIdentity;
    });
  }, [searchTerm, selectedField, selectedIdentity]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
          CS Scientist Spotlights
        </h1>
        <p className="text-xl text-gray-600">
          Discover the diverse faces behind the technologies that shape our world. 
          Use these profiles to inspire your learning and see yourself in computer science.
        </p>
      </header>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or keyword..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <select
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value as any)}
              >
                <option value="All">All Fields</option>
                {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedIdentity('All')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedIdentity === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Identities
          </button>
          {IDENTITIES.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedIdentity(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedIdentity === tag ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredScientists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredScientists.map((s) => (
            <Link 
              key={s.id} 
              to={`/scientist/${s.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={s.imageUrl} 
                  alt={s.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {s.identity.slice(0, 2).map(id => (
                    <span key={id} className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-indigo-600 rounded">
                      {id}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {s.name}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                  {s.shortBio}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.fields.map(field => (
                    <span key={field} className="text-[11px] font-medium bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No scientists found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedField('All'); setSelectedIdentity('All'); }}
            className="mt-4 text-indigo-600 font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
