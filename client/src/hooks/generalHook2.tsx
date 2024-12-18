import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export const useGeneralHook2 = () => {
  const [isOpenFormSubject, setIsOpenFormSubject] = useState(false);
  const [isLoadedSubject, setIsLoadedSubject] = useState(true);
  const [isLoadedDetailsSubject, setIsLoadedDetailsSubject] = useState(true);
  const { idSubject } = useParams();
  
  return {
    isOpenFormSubject, 
    setIsOpenFormSubject,
    isLoadedSubject, 
    setIsLoadedSubject,
    isLoadedDetailsSubject, 
    setIsLoadedDetailsSubject,
    idSubject,
  };
};
