import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export default function TopicDetailsPage() {
  const { topicTitle } = useParams();
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await axios.get(`${API}/topics/${topicTitle}`);
        setTopic(res.data);
      } catch (err) {
        setError("Failed to load topic details");
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [topicTitle]);

  if (loading) return <div>Loading topic details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
      <p className="mb-4 text-gray-600">By {topic.owner.username}</p>
      <div className="space-y-4">
        {topic.replies.map((reply: any) => (
          <div key={reply.id} className="border rounded p-3 shadow">
            <p>{reply.content}</p>
            <p className="text-xs text-gray-500">By: {reply.owner.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
