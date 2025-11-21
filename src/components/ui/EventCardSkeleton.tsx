import { Skeleton } from "@/components/ui/skeleton";

export default function EventCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden h-full border border-gray-100">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 flex flex-col flex-grow space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-16 w-full" />
        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
