import { useQuery } from "@tanstack/react-query";
import { Event, PaginatedResponse } from "@/types/api";
import { API_URL } from "@/lib/config";

async function fetchEvents(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/api/v1/events/events/`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  const paginated = data as PaginatedResponse<Event>;
  if (Array.isArray(paginated.results)) {
    return paginated.results;
  }

  return [];
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
}
