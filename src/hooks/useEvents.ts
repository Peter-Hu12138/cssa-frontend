import { useQuery } from "@tanstack/react-query";
import { Event, PaginatedResponse } from "@/types/api";
import { API_URL } from "@/lib/config";

async function fetchEvents(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/api/v1/events/events/`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data: PaginatedResponse<Event> = await response.json();
  return data.results || [];
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
}
