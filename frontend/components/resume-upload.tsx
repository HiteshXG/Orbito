"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { FileText, Loader2, Upload } from "lucide-react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"

interface ResumeUploadProps {
  jobDescriptions: Array<{
    id: string
    title: string
    department: string
  }>
  onUploadComplete?: () => void
}

const ResumeUpload = ({ jobDescriptions, onUploadComplete }: ResumeUploadProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobDescriptionId: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.warning("Please select a file smaller than 5MB.")
        return
      }
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile || !formData.firstName || !formData.lastName || !formData.email) {
      toast.warning("Please fill in all required fields and select a resume file.")
      return
    }

    setIsUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append("resume", selectedFile)
      uploadFormData.append("candidateData", JSON.stringify(formData))

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: uploadFormData,
      })

      if (!response.ok) throw new Error("Failed to upload resume")

      const data = await response.json()

      toast.success("Resume uploaded successfully. ATS scoring will begin shortly.")

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        jobDescriptionId: "",
      })
      setSelectedFile(null)

      // Trigger ATS scoring
      if (data.candidate?.id) {
        fetch("/api/ats-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ candidateId: data.candidate.id }),
        }).catch(console.error)
      }

      onUploadComplete?.()
    } catch (error: any) {
      toast(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return(
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-purple-600" />
          Upload Candidate Resume
        </CardTitle>
        <CardDescription>
          Add new candidates and automatically calculate ATS scores against job requirements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Position</Label>
            <Select
              value={formData.jobDescriptionId}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, jobDescriptionId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job position (optional)" />
              </SelectTrigger>
              <SelectContent>
                {jobDescriptions.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title} - {job.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume File *</Label>
            <div className="flex items-center gap-4">
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  {selectedFile.name}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX, TXT (max 5MB)</p>
          </div>

          <Button type="submit" disabled={isUploading} className="w-full">
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading Resume...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Resume
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ResumeUpload