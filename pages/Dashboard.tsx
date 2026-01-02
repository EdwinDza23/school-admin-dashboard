
import React from 'react';
import { 
  Calendar, 
  Trophy, 
  FileText, 
  Image as ImageIcon, 
  UserCheck 
} from 'lucide-react';
import { 
  Event, 
  Achievement, 
  BlogPost, 
  GalleryImage, 
  AdmissionSubmission, 
  Role 
} from '../types';

interface DashboardProps {
  events: Event[];
  achievements: Achievement[];
  blogs: BlogPost[];
  gallery: GalleryImage[];
  admissions: AdmissionSubmission[];
  role: Role;
}

const StatCard: React.FC<{ 
  label: string; 
  value: number; 
  icon: React.ReactNode; 
  color: string;
  trend?: string;
}> = ({ label, value, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-[14px] border border-slate-200 hover:border-blue-200 shadow-[0_6px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 group overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-[10px] ${color} text-white shadow-lg shadow-black/5 group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      {trend && (
        <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-blue-100">
          {trend}
        </span>
      )}
    </div>
    <p className="text-slate-500 text-[12px] font-medium uppercase tracking-wider">{label}</p>
    <h3 className="text-2xl font-semibold text-slate-900 mt-1 tracking-tight">{value}</h3>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ events, achievements, blogs, gallery, admissions, role }) => {
  const isAdmin = role === Role.SYSTEM_ADMIN;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight">System Oversight</h1>
          <p className="text-slate-500 text-[14px] font-medium">Institutional content analytics & telemetry</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-[10px] text-[11px] font-medium text-blue-600 uppercase tracking-widest">
             Real-time Sync Active
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          label="Active Events" 
          value={events.length} 
          icon={<Calendar size={20} />} 
          color="bg-blue-600" 
          trend="Upcoming"
        />
        <StatCard 
          label="Excellence" 
          value={achievements.length} 
          icon={<Trophy size={20} />} 
          color="bg-amber-500" 
        />
        <StatCard 
          label="Publications" 
          value={blogs.filter(b => b.isPublished).length} 
          icon={<FileText size={20} />} 
          color="bg-emerald-600" 
        />
        <StatCard 
          label="Media Assets" 
          value={gallery.length} 
          icon={<ImageIcon size={20} />} 
          color="bg-purple-600" 
        />
        <StatCard 
          label="Enrollment" 
          value={admissions.length} 
          icon={<UserCheck size={20} />} 
          color="bg-rose-600" 
          trend="Action"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events Section */}
        <section className="bg-white rounded-[14px] border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h3 className="font-medium text-[13px] uppercase tracking-widest text-slate-500">Institutional Calendar</h3>
            <button className="text-blue-600 text-[12px] font-medium hover:underline">Full Log</button>
          </div>
          <div className="divide-y divide-slate-100">
            {events.slice(0, 5).map(event => (
              <div key={event.id} className="px-8 py-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-800 text-[14px] leading-tight">{event.title}</h4>
                  <p className="text-[12px] text-slate-500 mt-1">{event.date}</p>
                </div>
                <span className={`text-[10px] font-medium px-3 py-1 rounded-[8px] uppercase tracking-wider border ${
                  event.status === 'Upcoming' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                  event.status === 'Ongoing' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                  'bg-slate-50 text-slate-500 border-slate-200'
                }`}>
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Achievers Section */}
        <section className="bg-white rounded-[14px] border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h3 className="font-medium text-[13px] uppercase tracking-widest text-slate-500">Academic Honors</h3>
            <button className="text-blue-600 text-[12px] font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {achievements.slice(0, 5).map(ach => (
              <div key={ach.id} className="px-8 py-4 hover:bg-slate-50 transition-colors flex items-center gap-5">
                <div className="w-10 h-10 rounded-[12px] overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img src={ach.photoUrl || `https://ui-avatars.com/api/?name=${ach.studentName}&background=random`} alt={ach.studentName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 text-[14px]">{ach.studentName}</h4>
                  <p className="text-[12px] text-slate-500 mt-0.5">{ach.title} • {ach.classSection}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Admissions Feed */}
        {isAdmin && (
          <section className="bg-white rounded-[14px] border border-slate-200 overflow-hidden shadow-sm lg:col-span-2">
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <h3 className="font-medium text-[13px] uppercase tracking-widest text-slate-500">Application Feed</h3>
              <button className="text-blue-600 text-[12px] font-medium hover:underline">Full Registry</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 font-medium text-[11px] uppercase tracking-wider border-b border-slate-100">
                    <th className="px-8 py-4">Applicant</th>
                    <th className="px-8 py-4">Grade</th>
                    <th className="px-8 py-4">Contact</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {admissions.map((adm, i) => (
                    <tr key={adm.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'} hover:bg-blue-50/30 transition-colors`}>
                      <td className="px-8 py-4 font-medium text-slate-700 text-[14px]">{adm.studentName}</td>
                      <td className="px-8 py-4">
                         <span className="text-[11px] font-medium text-slate-500 bg-white px-2.5 py-1 rounded-[8px] border border-slate-200 uppercase">
                            {adm.grade}
                         </span>
                      </td>
                      <td className="px-8 py-4">
                        <p className="text-[13px] font-medium text-slate-600">{adm.phone}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{adm.email}</p>
                      </td>
                      <td className="px-8 py-4 text-slate-500 text-[13px]">{new Date(adm.submittedAt).toLocaleDateString()}</td>
                      <td className="px-8 py-4 text-right">
                        <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-[8px] text-[11px] font-medium uppercase tracking-wider">
                          Review
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
