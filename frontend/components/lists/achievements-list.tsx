"use client"

import { Award, Star, Target, Trophy } from "lucide-react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { toast } from "sonner"
import { Badge } from "../ui/badge"

interface Achievement {
  id: string
  title: string
  description: string
  achievement_type: string
  points: number
  awarded_date: string
  awarded_by_user: {
    first_name: string
    last_name: string
  }
}
const AchievementsList =  () => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await fetch("/api/achievements")
      if(!response.ok) throw new Error("failed to fetch achievements")

        const data = await response.json()
        setAchievements(data.achievements || [])
    } catch (error: any){
      toast(error.message);
    }finally {
      setIsLoading(false)
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

  const totalPoints = achievements.reduce((sum, achievement) => sum + (achievement.points || 0), 0)

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
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600"/>
            Achievement Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{achievements.length}</div>
              <div className="text-sm text-gray-600">Total Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{new Date().getFullYear()}</div>
              <div className="text-sm text-gray-600">Current Year</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          {achievements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Award className="h-12 w-12 mx-auto mb-4 opacity-50"/>
              <p>No achievements yet</p>
              <p className="text-sm">Keep up the great work to earn your first achievement!</p>
            </div>
          ):(
            <div className="space-y-4">
              {achievements.map((achievement) => {
                const IconComponent = getAchievementIcon(achievement.achievement_type)
                const colorClass = getAchievementColor(achievement.achievement_type)
                
                return(
                  <div key={achievement.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${colorClass}`}>
                        <IconComponent className="h-6 w-6"/>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                          <div className="flex items-center gap-2">
                              {achievement.points > 0 && <Badge variant="outline">{achievement.points} pts</Badge>}
                              <Badge className="bg-gray-100 text-gray-800">
                                {achievement.achievement_type.charAt(0).toUpperCase() + achievement.achievement_type.slice(1)}
                              </Badge>
                          </div>
                        </div>
                        {achievement.description && <p className="text-gray-600 mb-2">{achievement.description}</p>}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>
                            Awarded by: {achievement.awarded_by_user.first_name} {achievement.awarded_by_user.last_name}
                          </span>
                          <span>{new Date(achievement.awarded_date).toDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AchievementsList