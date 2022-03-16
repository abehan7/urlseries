import { useState, createContext, useContext } from "react";

export const ModalContext = createContext(null);
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [options, setOptions] = useState({
    isOpen: false,
    confirmFn: () => {},
    cancelFn: () => {},
    message: "",
    title: "",
    topBtn: "확인",
    bottomBtn: "취소",
  });
  const value = { options, setOptions };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
