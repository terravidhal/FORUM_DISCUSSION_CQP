import { useState } from "react";
import { useParams } from "react-router-dom";


export const useGeneralHook2 = () => {
  const [isOpenFormSubject, setIsOpenFormSubject] = useState(false);
  const [isLoadedSubject, setIsLoadedSubject] = useState(true);
  const [isLoadedDetailsSubject, setIsLoadedDetailsSubject] = useState(true);
  const { idSubject } = useParams();
  const [isOpenFormComment, setIsOpenFormComment] = useState(false);
  const [isLoadedComment, setIsLoadedComment] = useState(true);
  const [isLoadedDetailsComment, setIsLoadedDetailsComment] = useState(true);
  const { idComment } = useParams();
  
  return {
    isOpenFormSubject, 
    setIsOpenFormSubject,
    isLoadedSubject, 
    setIsLoadedSubject,
    isLoadedDetailsSubject, 
    setIsLoadedDetailsSubject,
    idSubject,
    isOpenFormComment, 
    setIsOpenFormComment,
    isLoadedComment, 
    setIsLoadedComment,
    isLoadedDetailsComment, 
    setIsLoadedDetailsComment,
    idComment,
  };
};
