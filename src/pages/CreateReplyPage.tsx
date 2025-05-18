import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function CreateReplyPage() {
  const { id } = useParams(); // topic id
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/replies/", {
        content,
        topic_id: parseInt(id!),
        user_id: 1,
      });
      navigate(`/topics/${id}`);
    } catch (err) {
      console.error("Failed to create reply", err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Reply</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Reply..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-32"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Reply
        </button>
      </form>
    </div>
  );
}