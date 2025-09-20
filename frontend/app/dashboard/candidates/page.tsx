"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database } from "lucide-react";
import ResumeUpload from "@/components/resume-upload";
import CandidateList from "@/components/lists/candidate-list";

interface JobDescription {
  id: string | number;
  title: string;
  department: string;
}

const CandidatesPage = () => {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [dbError, setDbError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDescriptions();
  }, []);

  const fetchJobDescriptions = async () => {
    try {
      setLoading(true);

      await new Promise((res) => setTimeout(res, 800));

      const mockData = [
        { id: "1", title: "Frontend Developer", department: "Engineering" },
        { id: "2", title: "Backend Developer", department: "Engineering" },
        { id: "3", title: "HR Manager", department: "HR" },
      ];

      setJobDescriptions(mockData);
      setDbError(false);
      // const supabase = createClient()
      // const { data, error } = await supabase
      //   .from("job_descriptions")
      //   .select("id, title, department")
      //   .order("created_at", { ascending: false })

      // if (error) {
      //   // Check if it's a table not found error
      //   if (error.message.includes("table") && error.message.includes("not found")) {
      //     setDbError(true)
      //   } else {
      //     throw error
      //   }
      // } else {
      //   setJobDescriptions(data || [])
      //   setDbError(false)
      // }
    } catch (error) {
      console.error("Failed to fetch job descriptions:", error);
      setDbError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading candidates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (dbError) {
    return (
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Candidate Management
          </h1>
          <p className="text-gray-600 mt-2">
            Upload resumes and manage candidates with AI-powered ATS scoring
          </p>
        </div>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              Database Setup Required
            </CardTitle>
            <CardDescription className="text-orange-700">
              The database tables haven't been created yet. Please run the
              database setup script first.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-orange-700">
                To set up the database, please run the following script in your
                Supabase SQL editor:
              </p>
              <div className="bg-white p-4 rounded-lg border border-orange-200">
                <code className="text-sm text-gray-800">
                  scripts/01-create-database-schema.sql
                </code>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={fetchJobDescriptions}
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Retry Connection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Candidate Management
        </h1>
        <p className="text-gray-600 mt-2">
          Upload resumes and manage candidates with AI-powered ATS scoring
        </p>
      </div>

      <ResumeUpload
        jobDescriptions={jobDescriptions}
        onUploadComplete={handleUploadComplete}
      />

      <div key={refreshKey}>
        <CandidateList />
      </div>
    </div>
  );
};

export default CandidatesPage;
