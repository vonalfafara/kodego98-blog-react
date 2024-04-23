import { useState } from "react";

const useLocalStorage = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  function setItem(key, value) {
    localStorage.setItem(key, value);
  }

  function getItem(key) {
    const value = localStorage.getItem(key);
    return value;
  }

  function removeItem(key) {
    localStorage.removeItem(key);
  }

  return {
    token,
    user,
    setToken,
    setUser,
    setItem,
    getItem,
    removeItem,
  };
};

export default useLocalStorage;
