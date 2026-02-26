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
    const [selectedFile, setSelectedFile] = useState(null);

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

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) setSelectedFile(file);
    };

    const handleProcessAI = async () => {
        if (!selectedFile || !jobId) return;

        const formData = new FormData();
        formData.append('job_id', jobId);
        formData.append('files', selectedFile);

        try {
            setIsExtracting(true);
            const response = await fetch('http://localhost:8000/candidate/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to extract data');
            }
            
            const data = await response.json();
            
            const result = data[0];
            
            setResumeData({
                resumeId: result.resume_id,
                email: result.emails?.[0] || 'N/A',
                phone: result.phone_numbers?.[0] || 'N/A',
                followupQuestions: result.followup_questions || [],
                recommendations: result.recommended_jobs || [],
                name: selectedFile.name.split('.')[0].replace(/_/g, ' '),
                location: 'Not Specified'
            });
            
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
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-100 px-10 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <img src="/src/assets/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
                    <div>
                        <h1 className="font-bold text-sm tracking-tight text-gray-900">Resume Analysis System</h1>
                        <p className="text-[10px] text-gray-400">AI-Powered Recruitment Platform</p>
                    </div>
                </div>
                <button onClick={() => navigate('/careers')} className="text-xs font-semibold flex items-center gap-2 text-gray-600 hover:text-black">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                    Back to Jobs
                </button>
            </nav>

            <div className={`mx-auto mt-12 px-4 pb-20 transition-all duration-300 ${step === 2 ? 'max-w-6xl' : 'max-w-4xl'}`}>
                {/* Job Header */}
                <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-8 flex justify-between items-start shadow-sm">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">{job?.title}</h2>
                        <p className="text-sm text-gray-400 font-medium lowercase first-letter:uppercase">
                            {job?.department} • {job?.location || 'Bulacan, Philippines'} • {job?.job_type || 'Full-time'}
                        </p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">
                        {job?.is_active ? 'Active' : 'Closed'}
                    </span>
                </div>

                {/* Stepper */}
                <div className="flex items-center justify-between px-4 mb-10 text-xs text-gray-400 max-w-4xl mx-auto">
                    <StepItem stepNum={1} label="Upload Resume" currentStep={step} />
                    <div className="flex-1 h-px bg-gray-200 mx-6"></div>
                    <StepItem stepNum={2} label="Preview & Verify" currentStep={step} />
                    <div className="flex-1 h-px bg-gray-200 mx-6"></div>
                    <StepItem stepNum={3} label="Complete Application" currentStep={step} />
                </div>

                <main>
                    {step === 1 && (
                        <UploadView 
                            onFileSelect={handleFileSelect} 
                            selectedFile={selectedFile}
                            removeFile={() => setSelectedFile(null)}
                            onProcess={handleProcessAI}
                            isExtracting={isExtracting} 
                        />
                    )}
                    {step === 2 && (
                        <PreviewView 
                            data={resumeData} 
                            file={selectedFile}
                            onBack={() => setStep(1)} 
                            onNext={() => setStep(3)} 
                        />
                    )}
                    {step === 3 && (
                        <ApplicationForm 
                            job={job} 
                            resumeData={resumeData} 
                            onBack={() => setStep(2)} 
                        />
                    )}
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
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border transition-all ${
                isCompleted ? 'bg-pink-600 text-white border-pink-600' : 
                isActive ? 'bg-pink-50 text-pink-600 border-pink-600' : 'bg-gray-100 text-gray-400 border-gray-100'
            }`}>
                {isCompleted ? '✓' : stepNum}
            </span>
            {label}
        </div>
    );
};

const UploadView = ({ onFileSelect, selectedFile, removeFile, onProcess, isExtracting }) => (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-8 shadow-sm flex flex-col items-center w-full">
        <div className="flex items-center gap-3 mb-8 justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            <h3 className="font-bold text-gray-900">Upload Your Resume</h3>
        </div>

        <div className={`w-full border border-dashed border-gray-200 rounded-2xl py-16 flex flex-col items-center justify-center transition-all ${!selectedFile ? 'hover:bg-gray-50 cursor-pointer' : 'bg-white'}`}>
            {!selectedFile ? (
                <>
                    <input type="file" className="hidden" id="fileUpload" onChange={onFileSelect} accept=".pdf,.docx,.txt" />
                    <label htmlFor="fileUpload" className="flex flex-col items-center cursor-pointer w-full text-center">
                        <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                        </svg>
                        <p className="font-bold text-sm mb-1 text-gray-700 px-4">Drag and drop your resume here, or click to browse</p>
                        <p className="text-xs text-gray-400">Supported formats: PDF, DOCX, TXT (Max 5MB)</p>
                        <div className="mt-8 bg-gray-100 px-6 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 border border-gray-100 transition-colors">
                            Choose File
                        </div>
                    </label>
                </>
            ) : (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-4 border border-pink-100">
                        <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <p className="font-bold text-sm text-gray-800 mb-1">{selectedFile.name}</p>
                    <p className="text-xs text-gray-400 mb-6">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    <button onClick={removeFile} className="text-xs font-bold text-gray-500 hover:text-red-500 underline transition-colors">
                        Remove File
                    </button>
                </div>
            )}
        </div>

        {selectedFile && (
            <div className="w-full flex justify-center">
                <button 
                    onClick={onProcess}
                    disabled={isExtracting}
                    className="w-full max-w-md mt-8 bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg shadow-pink-100 active:scale-[0.98]"
                >
                    {isExtracting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                        <>
                            <span>Process with AI</span>
                            <i className="fas fa-arrow-right text-xs"></i>
                        </>
                    )}
                </button>
            </div>
        )}
    </div>
);

const PreviewView = ({ data, file, onBack, onNext }) => {
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [file]);

    return (
        <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 max-h-[600px] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <i className="far fa-eye text-gray-600"></i>
                        <h3 className="font-bold text-gray-900">Extracted Information</h3>
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

                    {data?.recommendations?.length > 0 && (
                        <section>
                            <h4 className="font-bold text-sm text-gray-900 mb-4">Job Fit Score</h4>
                            <div className="bg-pink-50 border border-pink-100 p-4 rounded-2xl">
                                <p className="text-xs text-pink-600 font-bold mb-1">Match Percentage</p>
                                <p className="text-2xl font-black text-pink-700">
                                    {data.recommendations.find(r => r.job_primary_applied)?.skills_match_percentage || 0}%
                                </p>
                            </div>
                        </section>
                    )}
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <i className="fas fa-file-pdf text-pink-600"></i> {file?.name}
                        </span>
                        <a href={fileUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-pink-600 hover:text-pink-700 transition-colors">OPEN FULLSCREEN</a>
                    </div>
                    <div className="flex-grow bg-gray-50/50">
                        {file?.type === "application/pdf" ? (
                            <iframe src={fileUrl} className="w-full h-full border-none" title="Resume Preview" />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center p-12 text-center text-gray-400">
                                <i className="fas fa-file-word text-4xl mb-4"></i>
                                <p className="text-sm font-bold">Preview unavailable for this format</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="flex justify-between items-center gap-4">
                <button onClick={onBack} className="px-8 py-3 rounded-2xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    <i className="fas fa-arrow-left"></i> Re-upload
                </button>
                <button onClick={onNext} className="px-8 py-3 rounded-2xl bg-pink-600 text-white text-xs font-bold hover:bg-pink-700 flex items-center gap-3 shadow-lg shadow-pink-100 transition-all">
                    Continue to Application <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};



const ApplicationForm = ({ job, resumeData, onBack }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = () => {
        // You can add your submission logic/API calls here
        console.log("Application Submitted!");
        
        // Redirect to the success page
        navigate('/success');
    };

    return (
        <div className="animate-in fade-in duration-500 max-w-2xl mx-auto space-y-8">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-wand-magic-sparkles text-gray-700"></i>
                    <h2 className="text-lg font-bold text-gray-900">Application Form</h2>
                </div>
                <p className="text-sm text-gray-400 mb-8 border-b border-gray-100 pb-6 font-medium">
                    Please answer the follow-up questions generated based on your resume analysis.
                </p>

                <div className="space-y-8">
                    {resumeData?.followupQuestions?.length > 0 ? (
                        resumeData.followupQuestions.map((q, idx) => (
                            <div key={q.id || idx}>
                                <label className="block text-sm font-semibold mb-3 text-gray-900">
                                    {q.question_text} <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    placeholder="Write your detailed answer here..."
                                    className="w-full h-28 p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 text-sm focus:border-pink-300 focus:bg-white outline-none transition-all" 
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-sm text-gray-500 italic">No additional questions required for this application.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack} 
                    className="px-8 py-3.5 border border-gray-200 rounded-2xl bg-white font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    Back
                </button>
                <button 
                    onClick={handleSubmit} 
                    className="flex-grow py-3.5 bg-pink-600 text-white rounded-2xl font-bold text-sm hover:bg-pink-700 shadow-lg shadow-pink-100 transition-all"
                >
                    Submit Application <i className="fa-regular fa-circle-check ml-2"></i>
                </button>
            </div>
        </div>
    );
};


const InfoBox = ({ label, value }) => (
    <div>
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-1">{label}:</p>
        <p className="text-sm font-semibold text-gray-800">{value || "N/A"}</p>
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
        <button onClick={onBack} className="bg-pink-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-pink-700 transition-all">Return to Careers</button>
    </div>
);

export default ApplyPage;