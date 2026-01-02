
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  ArrowRight, 
  FileText, 
  Info,
  Download
} from 'lucide-react';
import { AdmissionSubmission, Role } from '../types';
import Modal from '../components/Modal';
import Dropdown, { DropdownOption } from '../components/Dropdown';

interface AdmissionsProps {
  admissions: AdmissionSubmission[];
  role: Role;
}

const GRADE_OPTIONS: DropdownOption[] = [
  { label: 'All Grades', value: 'All' },
  { label: 'LKG / UKG', value: 'LKG / UKG' },
  { label: 'Grade 1-5', value: 'Grade 1-5' },
  { label: 'Grade 6-10', value: 'Grade 6-10' }
];

const VerticalSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-6 pt-2 first:pt-0">
    <h4 className="text-[12px] font-semibold text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100 pb-2">{title}</h4>
    <div className="space-y-6">{children}</div>
  </div>
);

const VerticalField: React.FC<{ label: string; value?: string; highlight?: boolean }> = ({ label, value, highlight }) => (
  <div className="space-y-1">
    <label className="text-[11px] font-medium text-slate-400 uppercase tracking-widest block">{label}</label>
    <p className={`text-[15px] leading-relaxed ${highlight ? 'text-blue-600 font-semibold' : 'text-slate-800 font-normal'}`}>{value || 'Not provided'}</p>
  </div>
);

const Admissions: React.FC<AdmissionsProps> = ({ admissions, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<AdmissionSubmission | null>(null);
  const [gradeFilter, setGradeFilter] = useState('All');

  const handleViewApplication = (submission: AdmissionSubmission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight">Admission Registry</h1>
          <p className="text-slate-500 text-[14px] font-medium">Systematic review of enrollment requests</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-[10px] text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <Download size={16} /> Export CSV
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[14px] border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-6 justify-between items-end bg-white">
           <div className="relative w-full md:w-96 group">
              <label className="text-[11px] font-medium text-slate-400 uppercase tracking-widest block mb-1.5 ml-0.5">Lookup Applicant</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input type="text" placeholder="Search by name..." className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-[12px] text-[14px] text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all font-normal shadow-sm" />
              </div>
           </div>
           <div className="flex gap-4 w-full md:w-auto items-end">
              <Dropdown 
                options={GRADE_OPTIONS} 
                value={gradeFilter} 
                onChange={setGradeFilter} 
                className="md:w-48"
                label="Grade Level"
              />
              <button className="h-[44px] flex items-center gap-2 px-5 py-2 bg-slate-50 border border-slate-200 rounded-[12px] text-[12px] font-medium uppercase tracking-wider text-slate-600 hover:bg-slate-100 transition-all">
                <Filter size={14} /> Advanced
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 font-medium text-[11px] uppercase tracking-[0.15em] border-b border-slate-100">
                <th className="px-8 py-5">Applicant</th>
                <th className="px-8 py-5">Grade</th>
                <th className="px-8 py-5">Submission</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {admissions.map((adm, i) => (
                <tr key={adm.id} className={`group ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'} hover:bg-blue-50/30 transition-colors`}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-[10px] bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600 font-semibold text-[14px]">{adm.studentName.charAt(0)}</div>
                      <div>
                        <h4 className="font-medium text-slate-800 text-[14px]">{adm.studentName}</h4>
                        <p className="text-[12px] text-slate-400 font-medium mt-0.5">{adm.parentName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6"><span className="px-3 py-1 bg-white border border-slate-200 text-slate-500 rounded-[8px] text-[11px] font-medium uppercase tracking-wide">{adm.grade}</span></td>
                  <td className="px-8 py-6"><div className="text-[13px] text-slate-500 font-medium flex items-center gap-2"><Calendar size={14} className="text-slate-300" />{new Date(adm.submittedAt).toLocaleDateString()}</div></td>
                  <td className="px-8 py-6"><span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-[8px] text-[11px] font-medium uppercase tracking-wide">New</span></td>
                  <td className="px-8 py-6 text-right"><button onClick={() => handleViewApplication(adm)} className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-600 hover:bg-blue-600 hover:text-white rounded-[10px] text-[12px] font-medium uppercase tracking-widest transition-all border border-slate-200 shadow-sm">Inspect <ArrowRight size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Institutional Application Review"
        footer={
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-2 text-slate-400"><Info size={14} /><span className="text-[12px] font-medium uppercase tracking-widest">Protected File · Read-only</span></div>
             <button onClick={() => setIsModalOpen(false)} className="bg-slate-900 text-white px-8 py-2.5 rounded-[10px] font-medium uppercase tracking-widest text-[12px] hover:bg-slate-800 transition-all shadow-sm">Dismiss File</button>
          </div>
        }
      >
        {selectedSubmission && (
          <div className="space-y-12">
            <div className="space-y-3 pb-4">
              <h2 className="text-[26px] font-bold text-slate-900 leading-tight tracking-tight">{selectedSubmission.studentName}</h2>
              <div className="flex flex-col gap-2">
                <div className="inline-flex self-start items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-md border border-blue-100 text-[12px] font-bold uppercase tracking-wider">Applying for {selectedSubmission.grade}</div>
                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-[0.2em]">Registry Index: #{selectedSubmission.id.toUpperCase().substring(0, 10)}</p>
              </div>
            </div>
            <div className="space-y-4">
               <h4 className="text-[12px] font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Process Metrics</h4>
               <VerticalField label="Current System Status" value="Verification Pending Review" highlight />
               <VerticalField label="Submission Timestamp" value={`${new Date(selectedSubmission.submittedAt).toLocaleDateString(undefined, { dateStyle: 'long' })} at ${new Date(selectedSubmission.submittedAt).toLocaleTimeString()}`} />
            </div>
            <VerticalSection title="Student Personal Profile">
              <VerticalField label="Legal Gender" value={selectedSubmission.details.gender} />
              <VerticalField label="Date of Birth" value={selectedSubmission.details.dob} />
              <VerticalField label="Former Institution / School" value={selectedSubmission.details.previousSchool} />
            </VerticalSection>
            <VerticalSection title="Guardian Credentials">
              <VerticalField label="Primary Guardian Name" value={selectedSubmission.parentName} highlight />
              <VerticalField label="Relationship to Student" value={selectedSubmission.details.relationship} />
              <VerticalField label="Contact Phone Number" value={selectedSubmission.phone} />
              <VerticalField label="Email Communication Address" value={selectedSubmission.email} />
              <VerticalField label="Current Professional Occupation" value={selectedSubmission.details.occupation} />
            </VerticalSection>
            <VerticalSection title="Primary Residential Location">
              <VerticalField label="Full Street Address" value={selectedSubmission.details.address} />
              <VerticalField label="City / Town" value={selectedSubmission.details.city} />
              <VerticalField label="State / Province" value={selectedSubmission.details.state} />
              <VerticalField label="Postal / Pin Code" value={selectedSubmission.details.pincode} />
            </VerticalSection>
            <VerticalSection title="Attached Digital Records">
              <div className="space-y-2">
                {['Birth_Certificate_Verification.pdf', 'Former_School_Leaving_Certificate.pdf', 'Academic_History_Transcript.pdf'].map((file) => (
                  <div key={file} className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 rounded-[12px] border border-slate-100 transition-all cursor-pointer shadow-sm group">
                    <div className="flex items-center gap-4"><FileText size={18} className="text-blue-500" /><span className="text-[14px] text-slate-700 font-medium">{file}</span></div>
                    <div className="flex items-center gap-2 text-blue-600 font-medium text-[12px] uppercase tracking-wider">Download <Download size={14} /></div>
                  </div>
                ))}
              </div>
            </VerticalSection>
            <VerticalSection title="Institutional Narrative Remarks">
              <div className="p-6 bg-slate-50/50 border-l-4 border-blue-500 rounded-r-[16px]">
                <p className="text-[15px] text-slate-600 italic leading-relaxed">"{selectedSubmission.details.remarks || 'No additional institutional remarks provided.'}"</p>
              </div>
            </VerticalSection>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Admissions;
