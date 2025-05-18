import axios from "axios";
import { useState } from "react";

interface Props {
  itemId: number;
  isTopic: boolean;
  initialVotes: number;
}

export default function UpvoteDownvote({ itemId, isTopic, initialVotes }: Props) {
  const [votes, setVotes] = useState(initialVotes);

  const handleVote = async (type: "upvote" | "downvote") => {
    try {
      const url = isTopic
        ? `http://localhost:8000/topics/${type}/${itemId}`
        : `http://localhost:8000/replies/${type}/${itemId}`;
      await axios.post(url);
      setVotes((prev) => (type === "upvote" ? prev + 1 : prev - 1));
    } catch (err) {
      console.error("Vote failed", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => handleVote("upvote")} className="text-xl">👍</button>
      <span>{votes}</span>
      <button onClick={() => handleVote("downvote")} className="text-xl">👎</button>
    </div>
  );
}