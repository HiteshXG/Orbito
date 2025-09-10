"use client"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Bot, FileText, Loader2, MessageSquare, Send, User } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: string
}

interface PolicyDocument {
  id: string
  title: string
  category: string
  created_at: string
}

const PolicyChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your HR Policy Assistant. I can help you find information about company policies, benefits, leave procedures, and more. What would you like to know?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [policies, setPolicies] = useState<PolicyDocument[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    fetchPolicies()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchPolicies = async () => {
    try {
      const response = await fetch("/api/policy-documents")
      if (!response.ok) throw new Error("Failed to fetch policies")

      const data = await response.json()
      setPolicies(data.policies || [])
    } catch (error) {
      console.error("Failed to fetch policies:", error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/policy-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: data.timestamp,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error: any) {
      toast(error.message)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I'm having trouble responding right now. Please try again or contact HR directly for assistance.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQuestions = [
    "How many vacation days do I get?",
    "What is the remote work policy?",
    "How do I request sick leave?",
    "What are the maternity leave benefits?",
    "Can I work from home?",
  ]

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question)
  }

  const groupedPolicies = policies.reduce(
    (acc, policy) => {
      if (!acc[policy.category]) {
        acc[policy.category] = []
      }
      acc[policy.category].push(policy)
      return acc
    },
    {} as Record<string, PolicyDocument[]>,
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              HR Policy Assistant
            </CardTitle>
            <CardDescription>Ask questions about company policies, benefits, and procedures</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`p-2 rounded-full ${message.sender === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
                    {message.sender === "user" ? (
                      <User className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about company policies..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Suggested Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start h-auto p-2 text-xs bg-transparent"
                onClick={() => handleSuggestedQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Available Policies
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(groupedPolicies).length === 0 ? (
              <p className="text-sm text-gray-500">No policies available</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(groupedPolicies).map(([category, categoryPolicies]) => (
                  <div key={category}>
                    <h4 className="text-xs font-semibold text-gray-700 mb-1">{category}</h4>
                    <div className="space-y-1">
                      {categoryPolicies.map((policy) => (
                        <div key={policy.id} className="text-xs text-gray-600 pl-2 border-l-2 border-gray-200">
                          {policy.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Need More Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600 mb-2">
              If you can't find the information you need, contact HR directly:
            </p>
            <div className="text-xs text-gray-600">
              <p>📧 hr@company.com</p>
              <p>📞 (555) 123-4567</p>
              <p>🏢 HR Office - Floor 2</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PolicyChatbot