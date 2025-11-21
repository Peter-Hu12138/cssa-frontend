import { useQuery } from "@tanstack/react-query";
import { ExternalLink, PaginatedResponse } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchExternalLinks(): Promise<ExternalLink[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/info/external-links/`);
    
    if (!response.ok) {
      console.warn("Failed to fetch external links, using fallback.");
      return [];
    }

    const data: PaginatedResponse<ExternalLink> = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching external links:", error);
    return [];
  }
}

export function useExternalLinks() {
  return useQuery({
    queryKey: ["external-links"],
    queryFn: fetchExternalLinks,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
