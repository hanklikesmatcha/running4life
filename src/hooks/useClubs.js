import { useQuery } from "@tanstack/react-query";

const fetchClubs = async () => {
  const res = await fetch("/api/clubs");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useClubs = () => {
  return useQuery({
    queryKey: ["clubs"],
    queryFn: fetchClubs,
    staleTime: 0,
    refetchOnWindowFocus: true,
    cacheTime: 0
  });
};
