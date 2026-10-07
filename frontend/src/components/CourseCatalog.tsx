import React, { useState } from 'react';
import { Plus, Globe, Award, Clock, Users, CheckCircle, Search } from 'lucide-react';
import type { Course } from '../types/erp';

interface CourseCatalogProps {
  courses: Course[];
  onAddCourse: (course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ courses, onAddCourse }) => {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    code: '',
    title: '',
    sector: 'PACS Computerization',
    durationHours: 60,
    creditHours: 3,
    nosCode: 'NOS-PACS-ACC-01',
    languages: ['Hindi', 'English'],
    intakeLimit: 50,
    eligibility: 'PACS Secretaries and Personnel',
    status: 'PUBLISHED',
  });

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    const matchesSector = selectedSector === 'ALL' || c.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.code) return;
    onAddCourse({
      id: `crs-${Date.now()}`,
      code: newCourse.code.toUpperCase(),
      title: newCourse.title,
      sector: newCourse.sector as any,
      durationHours: Number(newCourse.durationHours) || 60,
      creditHours: Number(newCourse.creditHours) || 3,
      nosCode: newCourse.nosCode || 'NOS-GEN-01',
      languages: newCourse.languages || ['Hindi', 'English'],
      intakeLimit: Number(newCourse.intakeLimit) || 50,
      eligibility: newCourse.eligibility || 'Open to verified candidates',
      status: 'PUBLISHED',
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 1.2
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Master Course & Curriculum Management Engine
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Configures accredited programs, NOS competency mapping, ABC credit hours, and 22-language translation settings.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Course</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by course title or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-slate-400 font-semibold whitespace-nowrap">Filter Sector:</span>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 font-medium"
          >
            <option value="ALL">All Cooperative Sectors</option>
            <option value="PACS Computerization">PACS Computerization</option>
            <option value="Cooperative Banking">Cooperative Banking</option>
            <option value="Dairy & Agriculture">Dairy & Agriculture</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-indigo-500/20 text-indigo-300 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-indigo-500/30">
                  {course.code}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>{course.status}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 leading-snug">{course.title}</h3>

              <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mb-4">
                <span className="bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 font-medium text-slate-300">
                  Sector: {course.sector}
                </span>
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-md font-mono font-semibold">
                  {course.nosCode}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-800/60 p-2 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-slate-400 text-[10px] mb-0.5">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span>Duration</span>
                  </div>
                  <span className="font-bold text-white">{course.durationHours} Hours</span>
                </div>

                <div className="bg-slate-800/60 p-2 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-slate-400 text-[10px] mb-0.5">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>ABC Credits</span>
                  </div>
                  <span className="font-bold text-amber-300">{course.creditHours} Credits</span>
                </div>

                <div className="bg-slate-800/60 p-2 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-slate-400 text-[10px] mb-0.5">
                    <Users className="w-3 h-3 text-emerald-400" />
                    <span>Intake Cap</span>
                  </div>
                  <span className="font-bold text-emerald-300">{course.intakeLimit} Seats</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <div className="flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[11px]">Languages: {course.languages.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Publish New Course Framework</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PACS Computerization & Common Accounting System"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PACS-CAS-2026"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value.toUpperCase() })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">NOS Code (National Standard)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NOS-PACS-ACC-01"
                    value={newCourse.nosCode}
                    onChange={(e) => setNewCourse({ ...newCourse, nosCode: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white font-mono text-amber-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Sector</label>
                  <select
                    value={newCourse.sector}
                    onChange={(e) => setNewCourse({ ...newCourse, sector: e.target.value as any })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="PACS Computerization">PACS Computerization</option>
                    <option value="Cooperative Banking">Cooperative Banking</option>
                    <option value="Dairy & Agriculture">Dairy & Agriculture</option>
                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Duration (Hrs)</label>
                  <input
                    type="number"
                    value={newCourse.durationHours}
                    onChange={(e) => setNewCourse({ ...newCourse, durationHours: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">ABC Credit Hours</label>
                  <input
                    type="number"
                    value={newCourse.creditHours}
                    onChange={(e) => setNewCourse({ ...newCourse, creditHours: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 shadow-md"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
