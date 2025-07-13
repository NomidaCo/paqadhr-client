"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  type: "leave" | "holiday" | "meeting" | "review";
  description?: string;
  time?: string;
}

// Sample events data
const events: CalendarEvent[] = [
  {
    id: 1,
    title: "Team Meeting",
    date: new Date(2025, 4, 15),
    type: "meeting",
    time: "10:00 AM - 11:00 AM",
    description: "Weekly team sync-up",
  },
  {
    id: 2,
    title: "John's Vacation",
    date: new Date(2025, 4, 20),
    type: "leave",
    description: "Annual leave",
  },
  {
    id: 3,
    title: "Memorial Day",
    date: new Date(2025, 4, 26),
    type: "holiday",
    description: "Public holiday",
  },
  {
    id: 4,
    title: "Performance Review",
    date: new Date(2025, 4, 22),
    type: "review",
    time: "2:00 PM - 3:00 PM",
    description: "Quarterly performance review",
  },
];

export const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({
    leave: true,
    holiday: true,
    meeting: true,
    review: true,
  });

  // Filter events by selected type
  const filteredEvents = events.filter((event) => selectedTypes[event.type]);

  // Get events for the selected date
  const selectedDateEvents = date
    ? filteredEvents.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear(),
      )
    : [];

  // Function to get badge color based on event type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "leave":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "holiday":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "meeting":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "review":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "";
    }
  };

  // Function to get event color for the dots
  const getEventColor = (type: string) => {
    switch (type) {
      case "leave":
        return "bg-amber-500";
      case "holiday":
        return "bg-blue-500";
      case "meeting":
        return "bg-purple-500";
      case "review":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Helper function to get events for a specific day
  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    );
  };

  const toggleTypeFilter = (type: string) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Calendar</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filter Events</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <h3 className="text-sm font-medium mb-2">Event Types</h3>
                <DropdownMenuCheckboxItem
                  checked={selectedTypes.leave}
                  onCheckedChange={() => toggleTypeFilter("leave")}
                >
                  <span className="mr-2 h-2 w-2 rounded-full bg-amber-500 inline-block"></span>
                  Leave
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedTypes.holiday}
                  onCheckedChange={() => toggleTypeFilter("holiday")}
                >
                  <span className="mr-2 h-2 w-2 rounded-full bg-blue-500 inline-block"></span>
                  Holiday
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedTypes.meeting}
                  onCheckedChange={() => toggleTypeFilter("meeting")}
                >
                  <span className="mr-2 h-2 w-2 rounded-full bg-purple-500 inline-block"></span>
                  Meeting
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedTypes.review}
                  onCheckedChange={() => toggleTypeFilter("review")}
                >
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500 inline-block"></span>
                  Review
                </DropdownMenuCheckboxItem>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() =>
                    setSelectedTypes({
                      leave: true,
                      holiday: true,
                      meeting: true,
                      review: true,
                    })
                  }
                >
                  Select All
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>New Event</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 flex-1 overflow-auto">
        <div className="md:col-span-3 h-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full h-full rounded-md border pointer-events-auto"
            modifiers={{
              hasEvent: (day) => getEventsForDay(day).length > 0,
            }}
            modifiersStyles={{
              hasEvent: {
                fontWeight: "bold",
              },
            }}
            components={{
              DayContent: (props) => {
                const dayDate = props.date;
                const dayEvents = getEventsForDay(dayDate);
                return (
                  <div className="relative flex flex-col items-center justify-center h-full">
                    <div>{dayDate.getDate()}</div>
                    {dayEvents.length > 0 && (
                      <div className="absolute bottom-1 flex gap-0.5">
                        {dayEvents.slice(0, 3).map((event, i) => (
                          <span
                            key={i}
                            className={`h-1 w-1 rounded-full ${getEventColor(event.type)}`}
                            title={event.title}
                          ></span>
                        ))}
                        {dayEvents.length > 3 && (
                          <span
                            className="h-1 w-1 rounded-full bg-gray-400"
                            title={`+${dayEvents.length - 3} more events`}
                          ></span>
                        )}
                      </div>
                    )}
                  </div>
                );
              },
            }}
          />
        </div>

        <div className="bg-white rounded-md border p-4">
          <h3 className="text-sm font-medium mb-4">
            {date ? (
              <>Events for {format(date, "MMMM d, yyyy")}</>
            ) : (
              <>Select a date</>
            )}
          </h3>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`}
                        ></span>
                        <span className="text-sm font-medium">
                          {event.title}
                        </span>
                      </div>
                      <Badge
                        className={getBadgeVariant(event.type)}
                        variant="outline"
                      >
                        {event.type.charAt(0).toUpperCase() +
                          event.type.slice(1)}
                      </Badge>
                    </div>
                    {event.time && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {event.time}
                      </div>
                    )}
                    {event.description && (
                      <div className="mt-1 text-sm">{event.description}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No events for {date?.toLocaleDateString() || "selected date"}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
