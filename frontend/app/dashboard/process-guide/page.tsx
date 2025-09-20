import ProcessGuide from "@/components/process-guide"

const ProcessGuidePage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Process Guide</h1>
        <p className="text-gray-600 mt-2">Important timelines, deadlines, and HR processes</p>
      </div>

      <ProcessGuide />
    </div>
  )
}

export default ProcessGuidePage