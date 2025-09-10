import { Award, Edit, Plus, Star, Target, Trash2, Trophy } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select } from "../ui/select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Textarea } from "../ui/textarea"

interface Achievement {
  id: string
  employee_name: string
  employee_email: string
  title: string
  description: string
  achievement_type: string
  points: number
  awarded_date: string
  awarded_by: string
}

const HRAchievementManagement = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_email: "",
    title: "",
    description: "",
    achievement_type: "recognition",
    points: 10,
  })

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try{
      const mockAchievements: Achievement[] = [
        {
          id: "1",
          employee_name: "John Smith",
          employee_email: "john.smith@company.com",
          title: "Employee of the Month",
          description: "Outstanding performance in Q4 2024",
          achievement_type: "award",
          points: 50,
          awarded_date: "2024-01-10",
          awarded_by: "HR Manager",
        },
        {
          id: "2",
          employee_name: "Sarah Johnson",
          employee_email: "sarah.johnson@company.com",
          title: "Innovation Award",
          description: "Developed new process that improved efficiency by 30%",
          achievement_type: "recognition",
          points: 75,
          awarded_date: "2024-01-08",
          awarded_by: "HR Manager",
        },
      ]
      setAchievements(mockAchievements)
    } catch (error: any) {
      toast(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newAchievement: Achievement = {
        id: Date.now().toString(),
        ...formData,
        awarded_date: new Date().toISOString().split("T")[0],
        awarded_by: "HR Manager",
      }

      setAchievements((prev) => [newAchievement, ...prev])
      setShowForm(false)
      setFormData({
        employee_name: "",
        employee_email: "",
        title: "",
        description: "",
        achievement_type: "recognition",
        points: 10,
      })

      toast("success")
    } catch (error: any) {
      toast(error.message)
    }
  }

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "award":
        return Trophy
      case "recognition":
        return Star
      case "milestone":
        return Target
      default:
        return Award
    }
  }

  const getAchievementColor = (type: string) => {
    switch (type) {
      case "award":
        return "text-yellow-600 bg-yellow-50"
      case "recognition":
        return "text-purple-600 bg-purple-50"
      case "milestone":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-green-600 bg-green-50"
    }
  }

  if (isLoading) {
    return(
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600">
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return(
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Employee Achievements</h2>
          <Badge variant="outline">{achievements.length} Total</Badge>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Award Achievement
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Award New Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee_name">Employee Name</Label>
                  <Input
                    id="employee_name"
                    value={formData.employee_name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, employee_name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee_email">Employee Email</Label>
                  <Input
                  id="employee_email"
                  type="email"
                  value={formData.employee_email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, employee_email: e.target.value }))}
                  required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievement_type">Type</Label>
                  <Select
                  value={formData.achievement_type}
                  onValueChange={(value) =>  setFormData((prev) => ({ ...prev, achievement_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="award">Award</SelectItem>
                      <SelectItem value="recognition">Recognition</SelectItem>
                      <SelectItem value="milestone">Milestone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input
                  id="points"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.points}
                  onChange={(e) => setFormData((prev) =>  ({ ...prev, points: Number.parseInt(e.target.value )}))}
                  required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the achievement and why it's being awarded..."
                required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Award Achievement
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
        {achievements.map((achievement) => {
          const IconComponent =  getAchievementIcon(achievement.achievement_type)
          const colorClass = getAchievementColor(achievement.achievement_type)

          return(
            <Card key={achievement.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${colorClass}`}>
                    <IconComponent className="h-6 w-6"/>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {achievement.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{achievement.points}</Badge>
                        <Badge className="bg-gray-100 text-gray-800">
                          {achievement.achievement_type.charAt(0).toUpperCase() + achievement.achievement_type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div>
                        <strong>Employee:</strong> {achievement.employee_name} ({achievement.employee_email})
                      </div>
                      <div>
                        <strong>Awarded:</strong> {new Date(achievement.awarded_date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1"/>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-1"/>
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {achievements.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="h-12 w-12 mx-auto mb-4 text-gray-400"/>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No achievements awarded yet</h3>
            <p className="text-gray-600 mb-4">
              Start recognizing your team's great work!
            </p>
            <Button onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2"/>
              Award Achievement
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )

}

export default HRAchievementManagement