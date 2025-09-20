import JobDescriptionGenerator from "@/components/job-description-generator"
import JobDescriptionManager from "@/components/management/job-description-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JobDescriptionsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Job Descriptions</h1>
        <p className="text-gray-600 mt-2">Create and manage job descriptions with AI assistance</p>
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="manage">Manage Existing</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <JobDescriptionGenerator />
        </TabsContent>

        <TabsContent value="manage">
          <JobDescriptionManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
