import { useQuery } from "@tanstack/react-query";
import { DepartmentTeam } from "@/types/api";
import { API_URL } from "@/lib/config";

async function fetchTeam(): Promise<DepartmentTeam[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/info/team/`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch team data");
    }

    const data = await response.json();
    // The API returns a list of departments directly (ReadOnlyModelViewSet list)
    // or a paginated response depending on DRF settings. 
    // Based on previous patterns, it might be paginated. 
    // However, for a team list, pagination might be disabled or we just take results.
    // Let's assume standard pagination for now, but check if it's a list.
    
    if (Array.isArray(data)) {
      return data;
    } else if (data.results && Array.isArray(data.results)) {
      return data.results;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching team data:", error);
    return [];
  }
}

export function useTeam() {
  return useQuery({
    queryKey: ["team"],
    queryFn: fetchTeam,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
