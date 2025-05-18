import axios from "axios";

const API_URL = "http://localhost:8000/topics";

export const useTopics = () => {
  const fetchTopics = async (categoryName: string, page = 1, perPage = 10, searchTerm = "", sortBy = "id", sortOrder = "asc") => {
    const response = await axios.get(`${API_URL}/view`, {
      params: {
        category_name: categoryName,
        search_term: searchTerm,
        page,
        per_page: perPage,
        sort_by: sortBy,
        sort_order: sortOrder,
      },
    });
    return response.data;
  };

  const fetchTopicByTitle = async (title: string, page = 1, perPage = 10, search = "", sortBy = "created_at", sortOrder = "asc") => {
    const response = await axios.get(`${API_URL}/${title}`, {
      params: { page, per_page: perPage, search, sort_by: sortBy, sort_order: sortOrder },
    });
    return response.data;
  };

  const createTopic = async (topicData: any) => {
    const response = await axios.post(`${API_URL}/create`, topicData, { withCredentials: true });
    return response.data;
  };

  const updateTopicTitle = async (title: string, newTitle: string) => {
    const response = await axios.put(`${API_URL}/${title}/title`, null, {
      params: { new_title: newTitle },
    });
    return response.data;
  };

  const updateTopicCategory = async (title: string, categoryName: string) => {
    const response = await axios.put(`${API_URL}/${title}/category`, null, {
      params: { category_name: categoryName },
    });
    return response.data;
  };

  const updateTopicLock = async (title: string, isLocked: boolean) => {
    const response = await axios.put(`${API_URL}/${title}/lock`, null, {
      params: { is_locked: isLocked },
      withCredentials: true,
    });
    return response.data;
  };

  const deleteTopic = async (title: string) => {
    const response = await axios.delete(`${API_URL}/${title}`);
    return response.data;
  };

  return {
    fetchTopics,
    fetchTopicByTitle,
    createTopic,
    updateTopicTitle,
    updateTopicCategory,
    updateTopicLock,
    deleteTopic,
  };
};
