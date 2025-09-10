"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { AlertTriangle, RefreshCw, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface JobDescription {
  id: string;
  title: string;
  department: string;
  key_skills: string[];
  description: string;
  responsibilities: string;
  qualifications: string;
  benefits: string;
  created_at: string;
  created_by: {
    first_name: string;
    last_name: string;
  };
}

const JobDescriptionManager = () => {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchJobDescriptions = async () => {
    try {
      const response = await fetch("/api/job-descriptions");
      const data = await response.json();

      if (response.ok) {
        setJobDescriptions(data.jobDescriptions || []);
      } else {
        console.error("Failed to fetch job descriptions:", data.error);
        setJobDescriptions([]);
      }
    } catch (error) {
      console.error("Error fetching job descriptions:", error);
      setJobDescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllJobDescriptions = async () => {
    if (
      !confirm(
        "Are you sure you want to delete ALL job descriptions? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch("/api/job-descriptions", {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("All job descriptions deleted successfully");
        setJobDescriptions([]);
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete job descriptions");
      }
    } catch (error) {
      console.error("Error deleting job descriptions:", error);
      toast.error("Failed to delete job descriptions");
    } finally {
      setDeleting(false);
    }
  };

  const deleteJobDescription = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job description?")) {
      return;
    }

    try {
      const response = await fetch(`/api/job-descriptions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Job description deleted successfully");
        setJobDescriptions((prev) => prev.filter((jd) => jd.id !== id));
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete job description");
      }
    } catch (error) {
      console.error("Error deleting job description:", error);
      toast.error("Failed to delete job description");
    }
  };

  useEffect(() => {
    fetchJobDescriptions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="h-6 w-6 animate-spin text-purple-600" />
        <span className="ml-2 text-gray-600">Loading job descriptions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Manage Job Descriptions
          </h2>
          <p className="text-gray-600 mt-1">
            {jobDescriptions.length} job description
            {jobDescriptions.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {jobDescriptions.length > 0 && (
          <Button
            onClick={deleteAllJobDescriptions}
            disabled={deleting}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <AlertTriangle className="h-4 w-4" />
            {deleting ? "Deleting All..." : "Delete All"}
          </Button>
        )}
      </div>

      {jobDescriptions.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">No job descriptions found.</p>
            <p className="text-sm text-gray-400 mt-1">
              Create new job descriptions using the generator.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobDescriptions.map((jd) => (
            <Card key={jd.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-gray-900">
                      {jd.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{jd.department}</Badge>
                      <span className="text-sm text-gray-500">
                        Created by {jd.created_by?.first_name}{" "}
                        {jd.created_by?.last_name}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => deleteJobDescription(jd.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {jd.key_skills && jd.key_skills.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Key Skills:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {jd.key_skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Description:
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {jd.description}
                    </p>
                  </div>

                  <div className="text-xs text-gray-400">
                    Created: {new Date(jd.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobDescriptionManager;
