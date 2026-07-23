
export const getCurrentUserId = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );
    return decoded?._id || decoded?.id || decoded?.userId || null;
  } catch {
    return null;
  }
};