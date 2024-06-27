import { useMutation, useQueryClient } from "@tanstack/react-query";

const handleReaction = async ({ clubId, emoji, userId }) => {
  const response = await fetch("/api/reactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ clubId, emoji, userId })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
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

            // Decrease the count for the user's previous emoji reaction, if any
            for (const [key, value] of Object.entries(updatedReactions)) {
              if (
                value > 0 &&
                key !== emoji &&
                key === club.reactions[userId]
              ) {
                updatedReactions[key] -= 1;
                break;
              }
            }

            // Set or update the emoji reaction for the user
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
