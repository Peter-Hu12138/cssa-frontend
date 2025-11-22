import { useQuery } from "@tanstack/react-query";
import { Guide, PaginatedResponse } from "@/types/api";
import { API_URL } from "@/lib/config";

async function fetchGuides(): Promise<Guide[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/info/guides/`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch guides");
    }

    const data = await response.json();
    
    if (Array.isArray(data)) {
      return data;
    } else if (data.results && Array.isArray(data.results)) {
      return data.results;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching guides:", error);
    return [];
  }
}

export function useGuides() {
  return useQuery({
    queryKey: ["guides"],
    queryFn: fetchGuides,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
