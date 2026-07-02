
import { Link, useNavigate } from 'react-router-dom';

export default function ActivityTimelinePage() {
  const navigate = useNavigate();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const formatDateHeader = (date: Date, prefix: string) => {
    return `${prefix}, ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`.toUpperCase();
  };

  const todayStr = formatDateHeader(today, 'TODAY');
  const yesterdayStr = formatDateHeader(yesterday, 'YESTERDAY');

  return (
    <div className="p-6 text-on-background min-h-screen bg-background">
      <div className="mb-8">
        <h1 className="font-headline-lg text-primary mb-2">Activity Timeline</h1>
        <p className="font-body-md text-text-secondary flex items-center gap-2">
          Viewing activity for: <Link to="/audit" className="text-primary hover:underline font-medium">CS-101 Introduction to Programming</Link>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Column - Timeline */}
        <div className="flex-1">
          {/* Date Group: TODAY */}
          <div className="mb-10">
            <h3 className="font-label-md text-text-secondary mb-6 tracking-widest uppercase">{todayStr}</h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-outline-variant">
              
              {/* Timeline Item 1 */}
              <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 border-4 border-background">
                  <span className="material-symbols-outlined text-sm">edit_document</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] surface-card p-5 rounded-xl border border-outline-variant shadow-sm bg-surface ml-4 md:ml-0 md:group-even:text-right md:group-odd:text-left">
                  <div className="flex items-center justify-between md:group-even:flex-row-reverse mb-2">
                    <h4 className="font-headline-sm text-on-surface">Syllabus Updated</h4>
                    <span className="font-label-sm text-text-secondary">10:30 AM</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant">Prof. Alan Turing updated the mid-term examination schedule.</p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 border-4 border-background">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] surface-card p-5 rounded-xl border border-outline-variant shadow-sm bg-surface ml-4 md:ml-0 md:group-even:text-right md:group-odd:text-left">
                  <div className="flex items-center justify-between md:group-even:flex-row-reverse mb-2">
                    <h4 className="font-headline-sm text-on-surface">Assignment Graded</h4>
                    <span className="font-label-sm text-text-secondary">09:15 AM</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant">Grades published for "Homework 3: Loops & Conditionals" for 45 students.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Date Group: YESTERDAY */}
          <div className="mb-10">
            <h3 className="font-label-md text-text-secondary mb-6 tracking-widest uppercase">{yesterdayStr}</h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-outline-variant">
              
              {/* Timeline Item 3 */}
              <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 border-4 border-background">
                  <span className="material-symbols-outlined text-sm">campaign</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] surface-card p-5 rounded-xl border border-outline-variant shadow-sm bg-surface ml-4 md:ml-0 md:group-even:text-right md:group-odd:text-left">
                  <div className="flex items-center justify-between md:group-even:flex-row-reverse mb-2">
                    <h4 className="font-headline-sm text-on-surface">Announcement Posted</h4>
                    <span className="font-label-sm text-text-secondary">04:45 PM</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant mb-3">New announcement broadcasted to all enrolled students.</p>
                  <blockquote className="border-l-4 border-outline-variant pl-4 py-1 italic font-body-sm text-text-secondary bg-surface-container-low rounded-r">
                    "Guest lecture tomorrow by Dr. Grace Hopper in Room 402."
                  </blockquote>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 border-4 border-background">
                  <span className="material-symbols-outlined text-sm">group</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] surface-card p-5 rounded-xl border border-outline-variant shadow-sm bg-surface ml-4 md:ml-0 md:group-even:text-right md:group-odd:text-left">
                  <div className="flex items-center justify-between md:group-even:flex-row-reverse mb-2">
                    <h4 className="font-headline-sm text-on-surface">Roster Update</h4>
                    <span className="font-label-sm text-text-secondary">01:20 PM</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant">2 students added via late registration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Course Context */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="surface-card p-6 rounded-xl border border-outline-variant shadow-sm bg-surface sticky top-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-outline-variant">
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center text-xl font-bold">
                CS
              </div>
              <div>
                <h2 className="font-headline-md text-on-surface">Course Context</h2>
                <p className="font-label-sm text-text-secondary">Metadata Snapshot</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <div className="font-label-sm text-text-secondary mb-1">Entity ID</div>
                <div className="font-body-md text-on-surface font-mono bg-surface-container-low px-2 py-1 rounded inline-block">CRS-2023-101</div>
              </div>
              <div>
                <div className="font-label-sm text-text-secondary mb-1">Primary Instructor</div>
                <div className="font-body-md text-on-surface">Alan Turing</div>
              </div>
              <div>
                <div className="font-label-sm text-text-secondary mb-1">Department</div>
                <div className="font-body-md text-on-surface">Computer Science</div>
              </div>
              <div>
                <div className="font-label-sm text-text-secondary mb-1">Status</div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-white">
                  Active Term
                </span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/')}
              className="w-full bg-surface text-primary border border-outline-variant hover:bg-primary-container hover:text-on-primary-container font-label-md py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">dashboard</span>
              Go to Course Dashboard
            </button>

            <div className="mt-8 pt-6 border-t border-outline-variant">
              <h3 className="font-label-md text-on-surface mb-3">Filters</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full font-label-sm cursor-pointer border border-primary">All Activity</span>
                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-label-sm cursor-pointer border border-outline-variant hover:bg-surface-container-high">Content Updates</span>
                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-label-sm cursor-pointer border border-outline-variant hover:bg-surface-container-high">Grades</span>
                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-label-sm cursor-pointer border border-outline-variant hover:bg-surface-container-high">Roster</span>
                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-label-sm cursor-pointer border border-outline-variant hover:bg-surface-container-high">System</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
