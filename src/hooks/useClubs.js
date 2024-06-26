import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
    queryFn: fetchClubs
  });
};

const handleReaction = async ({ clubId, emoji, userId }) => {
  console.log("Visitor gives a reaction:", userId);
  const response = await fetch("/api/reactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ clubId, emoji, userId })
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return response.json();
};

export const useReactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleReaction,
    onMutate: async ({ clubId, emoji, userId }) => {
      await queryClient.cancelQueries({ queryKey: ["clubs"] });
      const previousClubs = queryClient.getQueryData(["clubs"]);

      queryClient.setQueryData(["clubs"], (oldClubs) =>
        oldClubs.map((club) => {
          if (club._id === clubId) {
            const updatedReactions = { ...club.reactions };

            for (const [key, value] of Object.entries(updatedReactions)) {
              if (value > 0 && key !== emoji) {
                updatedReactions[key] -= 1;
                break;
              }
            }

            updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;

            return { ...club, reactions: updatedReactions };
          }
          return club;
        })
      );
      return { previousClubs };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["clubs"], context.previousClubs);
      throw err; // Ensure error is propagated
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
    }
  });
};
