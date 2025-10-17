const API_URL = "http://localhost:3000";

export const getUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};
