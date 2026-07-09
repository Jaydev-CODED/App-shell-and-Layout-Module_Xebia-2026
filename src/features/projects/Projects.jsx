import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { projectsService } from '../../services/api';

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // 1. Fetch projects on mount
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await projectsService.getProjects();
        setProjects(data);
      } catch (err) {
        console.warn('[Projects] Could not load projects from API, using fallback.');
      }
    }
    loadProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      const created = await projectsService.createProject(newProjectName);
      setProjects((prev) => [...prev, created]);
      setNewProjectName('');
      setIsAdding(false);
    } catch (err) {
      console.error('[Projects] Error adding project:', err);
    }
  };

  const handleUpdateProgress = async (id, currentProgress) => {
    // Increment progress by 10%
    const nextProgress = Math.min(100, currentProgress + 10);
    const nextStatus = nextProgress === 100 ? 'COMPLETED' : 
                       nextProgress >= 80 ? 'IN_REVIEW' : 
                       nextProgress >= 10 ? 'IN_PROGRESS' : 'NOT_STARTED';

    try {
      const updated = await projectsService.updateProject(id, { 
        progress: nextProgress, 
        status: nextStatus 
      });
      if (updated) {
        setProjects((prev) => prev.map(p => p.id === id ? updated : p));
      } else {
        // Fallback local modification
        setProjects((prev) => prev.map(p => p.id === id ? { ...p, progress: nextProgress, status: nextStatus } : p));
      }
    } catch (err) {
      console.error('[Projects] Update progress error:', err);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const query = searchQuery.toLowerCase();
    const ownerName = p.owner?.name || '';
    return (
      p.name.toLowerCase().includes(query) ||
      ownerName.toLowerCase().includes(query) ||
      p.status.toLowerCase().includes(query)
    );
  });

  const getStatusClasses = (status) => {
    switch (status) {
      case 'ACTIVE_CODING':
      case 'Active Coding':
        return { text: 'text-primary bg-primary/10', dot: 'bg-primary' };
      case 'IN_REVIEW':
      case 'In Review':
        return { text: 'text-warning bg-warning/10', dot: 'bg-warning' };
      case 'IN_PROGRESS':
      case 'In Progress':
        return { text: 'text-success bg-success/10', dot: 'bg-success' };
      case 'COMPLETED':
      case 'Completed':
        return { text: 'text-emerald-700 bg-emerald-50', dot: 'bg-emerald-600' };
      default:
        return { text: 'text-gray-600 bg-gray-100', dot: 'bg-gray-600' };
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Project Board</h1>
          <p className="text-sm text-gray-600 mt-1">Track project lifecycle, team assignments, and delivery deadlines.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primaryDark text-white text-xs font-semibold rounded-md shadow-sm transition-colors cursor-pointer select-none"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Add Project Form Drawer/Card */}
      {isAdding && (
        <form onSubmit={handleAddProject} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-fade-in">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Create New Deliverable</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter project name..."
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-primary"
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-success text-white text-xs font-semibold rounded-md hover:bg-success/90 cursor-pointer"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md hover:bg-gray-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Main Deliverables Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <span className="text-sm font-semibold text-gray-600">Workspace Deliverables</span>
          
          <div className="relative max-w-[280px] w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Table wrapper */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 font-semibold">
                <th className="py-3 px-4">Project Name</th>
                <th className="py-3 px-4">Assigned Buddy</th>
                <th className="py-3 px-4">Milestone Status</th>
                <th className="py-3 px-4">Completion</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-600 italic">
                    No matching projects found.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p, idx) => {
                  const statusColors = getStatusClasses(p.status);
                  return (
                    <tr
                      key={p.id || idx}
                      className="border-b border-gray-200/60 hover:bg-gray-50/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-4 font-bold text-gray-900">{p.name}</td>
                      <td className="py-4 px-4 text-gray-600">{p.owner?.name || 'Unassigned'}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full font-bold text-2xs uppercase tracking-wider ${statusColors.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`} />
                          {p.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-100 h-2 rounded-full max-w-[100px] overflow-hidden">
                            <div className="bg-primary h-full rounded-full transition-all duration-500 ease-in-out" style={{ width: `${p.progress}%` }} />
                          </div>
                          <span className="font-bold text-gray-900 min-width-[30px]">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleUpdateProgress(p.id, p.progress)}
                          disabled={p.progress === 100}
                          className="px-2.5 py-1 text-3xs font-bold text-gray-600 hover:text-primary hover:bg-gray-100 border border-gray-200 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed select-none cursor-pointer"
                        >
                          +10% Progress
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
