import { EventCalendar } from "@/components/event-calendar"

const CalendarPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Calendar & Events</h1>
        <p className="text-gray-600 mt-2">View upcoming events, deadlines, and important dates</p>
      </div>

      <EventCalendar />
    </div>
  )
}

export default CalendarPage