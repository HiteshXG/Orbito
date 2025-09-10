"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Filter, Mail, Phone, Search, Users } from "lucide-react"
import { toast } from "sonner"

interface Candidate {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  ats_score: number
  status: string
  resume_url: string
  created_at: string
  job_descriptions: {
    title: string
    department: string
  } | null
}

const CandidateList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [scoreFilter, setScoreFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCandidates()
  }, [])

  useEffect(() => {
    filterCandidates()
  }, [candidates, searchTerm, statusFilter, scoreFilter])

  const filterCandidates = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("candidates").select(`
          *,
          job_descriptions (
            title,
            department
          )
        `)
        .order("created_at", { ascending: false })

        if(error) throw error
        setCandidates(data || [])
    } catch (error: any) {
      toast(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const filterCandidates = () => {
    let filtered = candidates

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((candidate) => candidate.status === statusFilter)
    }

    // Score filter
    if (scoreFilter !== "all") {
      filtered = filtered.filter((candidate) => {
        if (!candidate.ats_score) return scoreFilter === "unscored"
        if (scoreFilter === "high") return candidate.ats_score >= 80
        if (scoreFilter === "medium") return candidate.ats_score >= 60 && candidate.ats_score < 80
        if (scoreFilter === "low") return candidate.ats_score < 60
        return true
      })
    }

    setFilteredCandidates(filtered)
  }

  const getScoreBadgeColor = (score: number | null) => {
    if (!score) return "bg-gray-100 text-gray-800"
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "hired":
        return "bg-green-100 text-green-800"
      case "interviewed":
        return "bg-blue-100 text-blue-800"
      case "shortlisted":
        return "bg-purple-100 text-purple-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateCandidateStatus = async (candidateId: string, newStatus: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("candidates").update({ status: newStatus }).eq("id", candidateId)

      if (error) throw error

      setCandidates((prev) =>
        prev.map((candidate) => (candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate)),
      )

      toast({title: "Success", description: "Candidates status updated successfully."})
    } catch (error) {
      toast({title: "Error", description: "Failed to update candidate status.", variant: "destructive",})
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return(
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5"/>
            Filter Candidates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> 
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                <Input placeholder="Search candidates..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="interviewed">Interviewed</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ATS Score</label>
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Score</SelectItem>
                  <SelectItem value="high">High (80+)</SelectItem>
                  <SelectItem value="medium">Medium (60-79)</SelectItem>
                  <SelectItem value="low">Low (&lt;60)</SelectItem>
                  <SelectItem value="unscored">Unscored</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Results</label>
              <div className="text-sm text-gray-600 py-2">
                {filteredCandidates.length} of {candidates.length} candidates
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {candidate.first_name} {candidate.last_name}
                    </h3>
                    <Badge className={getStatusBadgeColor(candidate.status)}>
                      {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                    </Badge>
                    {candidate.ats_score && (
                      <Badge className={getScoreBadgeColor(candidate.ats_score)}>ATS: {candidate.ats_score}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4"/>
                      {candidate.email}
                    </div>
                    {candidate.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4"/>
                      {candidate.phone}
                    </div>
                    )}
                  </div>
                  {candidate.job_descriptions && (
                    <p className="text-sm text-gray-600">
                      Applied for: {candidate.job_descriptions.title} - {candidate.job_descriptions.department}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Applied: {new Date(candidate.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-1"/>
                      View Resume
                    </a>
                  </Button>
                  <Select value={candidate.status} onValueChange={(value) => updateCandidateStatus(candidate.id, value)}
                    >
                      <SelectTrigger className="w-32">
                          <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="shortlisted">Shortlist</SelectItem>
                        <SelectItem value="interviewed">Interviewed</SelectItem>
                        <SelectItem value="hired">Hire</SelectItem>
                        <SelectItem value="rejected">Reject</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filterCandidates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50"/>
              <h3 className="text-lg font-medium mb-2">No candidates found</h3>
              <p className="text-sm">Try adjusting your filters or upload new resumes to get started.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default CandidateList