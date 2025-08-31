import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { listVehicleEngineTypes } from "@/actions/vehicle-information.actions";
import EngineList from "@/components/list/EngineList";

// ISR revalidate every 1 week
export const revalidate = 604_800; // 1 week

export default async function EnginesPage({ searchParams }: { searchParams: Promise<{ typeId: string; manuId: string;modelId: string }> }) {
  const search = await searchParams
  const queryClient = new QueryClient();
  console.log("SearchParams models page", search);

  // Pre-fetch engine types data on the server
  await queryClient.prefetchQuery({
    queryKey: ["engines", search.modelId],
    queryFn: () =>
      listVehicleEngineTypes(Number(search.modelId), Number(search.typeId)),
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    gcTime: 1000 * 60 * 60 * 24 * 7,    // 1 week
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EngineList searchParams={search} />
    </HydrationBoundary>
  );
}