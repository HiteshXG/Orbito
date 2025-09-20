import PolicyChatbot from "@/components/policy-chatbot"

const PolicyChatPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">HR Policy Assistant</h1>
        <p className="text-gray-600 mt-2">Get instant answers to your HR policy questions</p>
      </div>

      <PolicyChatbot />
    </div>
  )
}

export default PolicyChatPage;