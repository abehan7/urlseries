import { useState, createContext, useContext } from "react";

export const ModalContext = createContext(null);
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const initialize = {
    isOpen: false,
    confirmFn: () => {},
    cancelFn: () => setOptions({ ...options, isOpen: false }),
    message: "수정하시겠습니까?",
    topBtn: "확인",
    bottomBtn: "취소",
  };

  const [options, setOptions] = useState({
    isOpen: false,
    confirmFn: () => {},
    cancelFn: () => setOptions(initialize),
    message: "수정하시겠습니까?",
    topBtn: "확인",
    bottomBtn: "취소",
  });

  const handleAlertTrigger = (confirmFn, message) =>
    setOptions({ ...options, isOpen: true, confirmFn, message });

  const value = { options, setOptions, handleAlertTrigger };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
