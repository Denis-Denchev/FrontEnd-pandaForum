import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export default function EditTopicModal({ topicTitle, onClose }: { topicTitle: string; onClose: () => void }) {
  const [newTitle, setNewTitle] = useState("");
  const [category, setCategory] = useState("");

  const updateTitle = async () => {
    try {
      await axios.put(`${API}/topics/${topicTitle}/title`, null, {
        params: { new_title: newTitle },
      });
      alert("Title updated");
      onClose();
    } catch {
      alert("Error updating title");
    }
  };

  const updateCategory = async () => {
    try {
      await axios.put(`${API}/topics/${topicTitle}/category`, null, {
        params: { category_name: category },
      });
      alert("Category updated");
      onClose();
    } catch {
      alert("Error updating category");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-bold">Edit Topic</h2>
        <input
          type="text"
          placeholder="New title"
          className="border p-2 w-full"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={updateTitle} className="bg-blue-600 text-white px-4 py-2 rounded">Update Title</button>

        <input
          type="text"
          placeholder="New category"
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={updateCategory} className="bg-green-600 text-white px-4 py-2 rounded">Update Category</button>

        <button onClick={onClose} className="text-red-600">Close</button>
      </div>
    </div>
  );
}
