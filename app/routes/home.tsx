import { Navbar } from "~/components/Navbar";
import type { Route } from "./+types/home";
import { ResumeCard } from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "RESUMIFY" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/')
    }
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResume = resumes?.map((resume) => JSON.parse(resume.value) as Resume);

      setResumes(parsedResume || []);
      console.log(parsedResume);
      setLoadingResumes(false);
    }
    loadResumes();
  }, [])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-14">
        <h1>Track Your Application & Resume Rating</h1>
        {!loadingResumes && resumes.length === 0 ? (
          <h2>No Resumes Found. Upload your first resume to get feedback.</h2>
        ) : (
          <h2>Drop your resume for an ATS score and improvement tips.</h2>
        )}
      </div>
      {loadingResumes && (
        <div>
          <img src="/images/resume-scan-2.gif" alt="" className="w-60" />
        </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {
            resumes.map((resume, ind) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))
          }
        </div>
      )}
    </section>
  </main>
}
