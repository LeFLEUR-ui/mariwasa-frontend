import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ApplyPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();


    const [step, setStep] = useState(1);
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isExtracting, setIsExtracting] = useState(false);
    const [error, setError] = useState(null);
    const [resumeData, setResumeData] = useState(null);


    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:8000/hr/jobs/${jobId}`);
                if (!response.ok) throw new Error('Job not found');
                const data = await response.json();
                setJob(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        if (jobId) fetchJobDetails();
    }, [jobId]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsExtracting(true);
            const response = await fetch('http://localhost:8000/hr/extract-resume', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to extract data');
            const data = await response.json();
            
            setResumeData(data);
            setStep(2);
        } catch (err) {
            alert("Extraction failed: " + err.message);
        } finally {
            setIsExtracting(false);
        }
    };

    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState error={error} onBack={() => navigate('/careers')} />;

    return (
        <div className="text-gray-800 bg-[#fcfbfc] min-h-screen font-['Inter',_sans-serif]">

            <nav className="bg-white border-b border-gray-100 px-10 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <img src="/src/assets/logo.png" alt="Mariwasa Logo" className="h-8 w-8 object-contain" />
                    <div>
                        <h1 className="font-bold text-sm tracking-tight">Resume Analysis System</h1>
                        <p className="text-[10px] text-gray-400">AI-Powered Recruitment Platform</p>
                    </div>
                </div>
                <button onClick={() => navigate('/careers')} className="text-xs font-semibold flex items-center gap-2 text-gray-600 hover:text-black">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                    Back to Jobs
                </button>
            </nav>

            <div className="max-w-4xl mx-auto mt-12 px-4 pb-20">

                <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-8 flex justify-between items-start shadow-sm">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">{job?.title}</h2>
                        <p className="text-sm text-gray-400 font-medium">
                            {job?.department} • {job?.location || 'Bulacan, Philippines'} • {job?.job_type || 'Full-time'}
                        </p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">
                        {job?.is_active ? 'Active' : 'Closed'}
                    </span>
                </div>


                <div className="flex items-center justify-between px-4 mb-10 text-xs text-gray-400">
                    <StepItem stepNum={1} label="Upload Resume" currentStep={step} />
                    <div className="flex-1 h-px bg-gray-200 mx-6"></div>
                    <StepItem stepNum={2} label="Preview & Verify" currentStep={step} />
                    <div className="flex-1 h-px bg-gray-200 mx-6"></div>
                    <StepItem stepNum={3} label="Complete Application" currentStep={step} />
                </div>


                <main>
                    {step === 1 && <UploadView onUpload={handleFileUpload} isExtracting={isExtracting} />}
                    {step === 2 && <PreviewView data={resumeData} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
                    {step === 3 && <ApplicationForm job={job} resumeData={resumeData} onBack={() => setStep(2)} />}
                </main>
            </div>
        </div>
    );
};


const StepItem = ({ stepNum, label, currentStep }) => {
    const isCompleted = currentStep > stepNum;
    const isActive = currentStep === stepNum;
    
    return (
        <div className={`flex items-center gap-3 ${isActive || isCompleted ? 'text-pink-600 font-semibold' : ''}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                isCompleted ? 'bg-pink-600 text-white' : 
                isActive ? 'bg-pink-50 text-pink-600 border-2 border-pink-600' : 'bg-gray-100 text-gray-400'
            }`}>
                {isCompleted ? <i className="fas fa-check"></i> : stepNum}
            </span>
            {label}
        </div>
    );
};

const UploadView = ({ onUpload, isExtracting }) => (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
            <h3 className="font-bold">Upload Your Resume</h3>
        </div>
        <label className={`border-2 border-dashed border-gray-200 rounded-2xl py-16 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${isExtracting ? 'opacity-50' : ''}`}>
            <input type="file" className="hidden" onChange={onUpload} accept=".pdf,.docx,.txt" disabled={isExtracting} />
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
            <p className="font-bold text-sm mb-1">{isExtracting ? 'AI is analyzing...' : 'Drag and drop your resume here, or click to browse'}</p>
            <p className="text-xs text-gray-400">Supported formats: PDF, DOCX, TXT (Max 5MB)</p>
            <div className="mt-8 bg-gray-100 px-6 py-2 rounded-xl text-xs font-bold hover:bg-gray-200">Choose File</div>
        </label>
    </div>
);

const PreviewView = ({ data, onBack, onNext }) => (
    <div className="animate-in fade-in duration-500">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8 p-8">
            <div className="flex items-center gap-2 mb-2">
                <i className="far fa-eye text-gray-600"></i>
                <h3 className="font-bold">Extracted Information</h3>
            </div>
            <p className="text-gray-400 text-xs mb-8 font-medium">Review the information extracted from your resume</p>

            <section className="mb-10">
                <h4 className="font-bold text-sm text-gray-900 mb-6">Personal Information</h4>
                <div className="grid grid-cols-2 gap-y-6">
                    <InfoBox label="Name" value={data?.name} />
                    <InfoBox label="Email" value={data?.email} />
                    <InfoBox label="Phone" value={data?.phone} />
                    <InfoBox label="Location" value={data?.location} />
                </div>
            </section>

            <section className="mb-10">
                <h4 className="font-bold text-sm text-gray-900 mb-4">Skills</h4>
                <div className="flex flex-wrap gap-2">
                    {data?.skills?.map((skill, i) => (
                        <span key={i} className="bg-orange-50 text-gray-600 px-4 py-1.5 rounded-full text-[11px] font-medium border border-orange-100">{skill}</span>
                    ))}
                </div>
            </section>
            
 
        </div>
        
        <div className="flex justify-between items-center gap-4">
            <button onClick={onBack} className="px-8 py-3 rounded-2xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                <i className="fas fa-arrow-left"></i> Back
            </button>
            <button onClick={onNext} className="px-8 py-3 rounded-2xl bg-pink-600 text-white text-xs font-bold hover:bg-pink-700 flex items-center gap-3">
                Continue to Application <i className="fas fa-arrow-right"></i>
            </button>
        </div>
    </div>
);

const ApplicationForm = ({ job, resumeData, onBack }) => (
    <div className="animate-in fade-in duration-500">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8 p-8">
            <div className="flex items-center gap-2 mb-2">
                <i className="fa-solid fa-wand-magic-sparkles text-gray-700"></i>
                <h2 className="text-lg font-bold">Application Form</h2>
            </div>
            <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6 font-medium">
                Fields have been auto-filled from your resume. Please review and complete any missing information.
            </p>

            <div className="mb-8">
                <label className="block text-sm font-semibold mb-3 text-gray-900">Experience Summary <span className="text-red-500">*</span></label>
                <textarea defaultValue={resumeData?.experience} className="w-full h-28 p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 text-sm focus:border-pink-300 outline-none" />
            </div>

            <div className="mb-8">
                <label className="block text-sm font-semibold mb-4 text-gray-900">Tools Experience <span className="text-red-500">*</span></label>
                <div className="space-y-3">
                    {['Visual Inspection', 'Precision Tools', 'Data Entry'].map(tool => (
                        <label key={tool} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500 cursor-pointer" />
                            <span className="text-gray-600 text-sm font-medium group-hover:text-gray-900 transition-colors">{tool}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="px-8 py-3.5 border border-gray-200 rounded-2xl bg-white font-bold text-sm text-gray-600">Back</button>
            <button onClick={() => alert("Submitted!")} className="flex-grow py-3.5 bg-pink-600 text-white rounded-2xl font-bold text-sm hover:bg-pink-700 shadow-sm">
                Submit Application <i className="fa-regular fa-circle-check ml-2"></i>
            </button>
        </div>
    </div>
);

const InfoBox = ({ label, value }) => (
    <div>
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">{label}:</p>
        <p className="text-sm font-semibold">{value || "N/A"}</p>
    </div>
);

const LoadingState = () => (
    <div className="flex flex-col justify-center items-center h-screen bg-[#fcfbfc]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mb-4"></div>
        <p className="font-bold text-gray-400">Loading Job Details...</p>
    </div>
);

const ErrorState = ({ error, onBack }) => (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button onClick={onBack} className="bg-pink-600 text-white px-6 py-2 rounded-lg font-bold">Return to Careers</button>
    </div>
);

export default ApplyPage;