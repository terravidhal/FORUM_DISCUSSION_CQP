import { useState } from "react";



export const useGeneralHook2 = () => {
  const [isOpenFormSubject, setIsOpenFormSubject] = useState(false);
  
  return {
    isOpenFormSubject, 
    setIsOpenFormSubject,
  };
};
