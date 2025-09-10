"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles, Save, Copy } from "lucide-react"
import { toast } from "sonner"
// import { createClient } from "@/lib/supabase/client"

const JobDescriptionGenerator = () => {
    const [formData, setFormData] = useState({
    jobTitle: "",
    keySkills: "",
    department: "",
    experienceLevel: "",
    location: "",
    employmentType: "Full-time",
  })
  const [generatedJD, setGeneratedJD] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleGenerate = async () => {
    if (!formData.jobTitle.trim() || !formData.keySkills.trim()) {
      toast.error("Please provide at least job title and key skills.")
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-job-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to generate job description")

      const data = await response.json()
      setGeneratedJD(data.jobDescription)
      toast.success("Job description generated successfully.")
    } catch (error: any) {
      toast(error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!generatedJD) return

    setIsSaving(true)
    try {
      // // const supabase = createClient()
      // const {
      //   data: { user },
      // } = await supabase.auth.getUser()

      // if (!user) throw new Error("User not authenticated")

      // const { error } = await supabase.from("job_descriptions").insert({
      //   title: formData.jobTitle,
      //   department: formData.department,
      //   experience_level: formData.experienceLevel,
      //   location: formData.location,
      //   employment_type: formData.employmentType,
      //   key_skills: formData.keySkills.split(",").map((s) => s.trim()),
      //   description: generatedJD,
      //   created_by: user.id,
      //   status: "draft",
      // })

      // if (error) throw error

      // toast({
      //   title: "Saved!",
      //   description: "Job description saved successfully.",
      // })
    } catch (error: any) {
      toast(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopy = async () => {
    if (!generatedJD) return

    try {
      await navigator.clipboard.writeText(generatedJD)
      toast.success("Job description copied to clipboard.")
    } catch (error: any) {
      toast(error.message)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Job Description Generator
          </CardTitle>
          <CardDescription>
            Generate comprehensive job descriptions using AI. Provide basic details and let AI create a professional,
            engaging job posting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Senior Software Engineer"
                value={formData.jobTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="e.g., Engineering"
                value={formData.department}
                onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keySkills">Key Skills *</Label>
            <Input
              id="keySkills"
              placeholder="e.g., React, Node.js, TypeScript, AWS"
              value={formData.keySkills}
              onChange={(e) => setFormData((prev) => ({ ...prev, keySkills: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, experienceLevel: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entry Level">Entry Level</SelectItem>
                  <SelectItem value="Mid Level">Mid Level</SelectItem>
                  <SelectItem value="Senior Level">Senior Level</SelectItem>
                  <SelectItem value="Lead/Principal">Lead/Principal</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employmentType">Employment Type</Label>
              <Select
                value={formData.employmentType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, employmentType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !formData.jobTitle.trim() || !formData.keySkills.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Job Description...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Job Description
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedJD && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Job Description</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save to Database
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">{generatedJD}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default JobDescriptionGenerator
