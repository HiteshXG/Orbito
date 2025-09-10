import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, Clock, Edit, MapPin, Plus, Trash2, User } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Interview {
  id: string;
  candidate_name: string;
  candidate_email: string;
  position: string;
  interview_date: string;
  interview_time: string;
  location: string;
  interviewer: string;
  status: string;
  notes: string;
  created_at: string;
}

const InterviewManagement = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    candidate_name: "",
    candidate_email: "",
    position: "",
    interview_time: "",
    location: "",
    interviewer: "",
    notes: "",
  });

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const mockInterviews: Interview[] = [
        {
          id: "1",
          candidate_name: "John Smith",
          candidate_email: "john.smith@email.com",
          position: "Software Engineer",
          interview_date: "2024-01-15",
          interview_time: "10:00",
          location: "Conference Room A",
          interviewer: "Sarah Johnson",
          status: "scheduled",
          notes: "Technical interview - focus on React and Node.js",
          created_at: "2024-01-10",
        },
        {
          id: "2",
          candidate_name: "Emily Davis",
          candidate_email: "emily.davis@email.com",
          position: "Product Manager",
          interview_date: "2024-01-16",
          interview_time: "14:00",
          location: "Meeting Room B",
          interviewer: "Mike Wilson",
          status: "completed",
          notes: "Great communication skills, strong product background",
          created_at: "2024-01-12",
        },
      ];
      setInterviews(mockInterviews);
    } catch (error: any) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      toast("Please select an interview date.");
      return;
    }

    try {
      const newInterview: Interview = {
        id: Date.now().toString(),
        ...formData,
        interview_date: format(selectedDate, "yyyy-MM-dd"),
        status: "scheduled",
        created_at: new Date().toISOString(),
      };

      setInterviews((prev) => [newInterview, ...prev]);
      setShowForm(false);
      setFormData({
        candidate_name: "",
        candidate_email: "",
        position: "",
        interview_time: "",
        location: "",
        interviewer: "",
        notes: "",
      });
      setSelectedDate(undefined);

      toast("Interview scheduled successfully.");
    } catch (error: any) {
      toast(error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "rescheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
          <Badge variant="outline">{interviews.length} Total</Badge>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Interview</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="candidate_name">Candidate Name</Label>
                  <Input
                    id="candidate_name"
                    value={formData.candidate_name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        candidate_name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="candidate_email">Candidate Email</Label>
                  <Input
                    id="candidate_email"
                    type="email"
                    value={formData.candidate_email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        candidate_email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        position: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interview_time">Time</Label>
                  <Input
                    id="interview_time"
                    type="time"
                    value={formData.interview_time}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        interview_time: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewer">Interviewer</Label>
                  <Input
                    id="interviewer"
                    value={formData.interviewer}
                    onChange={(e) => setFormData((prev) => ({ ...prev, interviewer: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Interview Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Interview notes, focus areas, etc."
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Schedule Interview
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      <div className="grid gap-4">
        {interviews.map((interview) => (
          <Card key={interview.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <User className="h-5 w-5 text-purple-600"/>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{interview.candidate_name}</h3>
                    <p className="text-sm text-gray-600">{interview.candidate_email}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(interview.status)}>
                  {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarIcon className="h-4 w-4" />
                  {format(new Date(interview.interview_date), "MMM dd, yyyy")}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {interview.interview_time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {interview.location}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarIcon className="h-4 w-4" />
                  {format(new Date(interview.interview_date), "MMM dd, yyyy")}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {interview.interview_time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {interview.location}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Select defaultValue={interview.status}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="rescheduled">Reschedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
      
        {interviews.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No interviews scheduled</h3>
            <p className="text-gray-600 mb-4">Schedule your first interview to get started.</p>
            <Button onClick={() => setShowForm(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterviewManagement;
