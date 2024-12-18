import { toast } from "sonner";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/interceptors/axios.config";
import { useGeneralHook2 } from "@/hooks/generalHook2";
import { VoteSubjectSchema, createSubject, createSubjectSchema, voteSubject } from "@/interfaces/index2";




//  subjects hook
export const useSubjects = () => {
  const queryClient = useQueryClient();
  const {
    isOpenFormSubject, 
    setIsOpenFormSubject,
    isLoadedSubject, 
    setIsLoadedSubject,
    isLoadedDetailsSubject, 
    setIsLoadedDetailsSubject,
    idSubject,
  } = useGeneralHook2();

  // create
  const createSubject = async (subjectInfos: createSubject) => {
    try {
      const result = createSubjectSchema.safeParse(subjectInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
      await axiosInstance.post("subjects", subjectInfos);
      toast.success("add successfully!!");
      setIsOpenFormSubject(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };
  const { mutate: createSubjectMutation } = useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataSubject"] });
    },
  });

  // vote subject
  const voteSubject = async (subjectInfos: voteSubject) => {
    try {
      const result = VoteSubjectSchema.safeParse(subjectInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
  
      await axiosInstance.patch(
        "subjects/" + subjectInfos.subjectId,
        subjectInfos
      );

      toast.success("updated successfully!!");
      setIsOpenFormSubject(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error updated");
    }
  };
  const { mutate: voteSubjectMutation } = useMutation({
    mutationFn: voteSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataSubject"] });
    },
  });



  //delete
  const deleteSubject = async (subjectInfos: any) => {
    try {
      await axiosInstance.delete("subjects/" + subjectInfos.subjectId);

      toast.success("deleted successfully!!");
      setIsOpenFormSubject(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error deleted");
    }
  };
  const { mutate: deleteSubjectMutation } = useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataSubject"] });
    },
  });


  // get All
  const {
    data: allSubjects,
    error: errorGetSubjects,
    isError: isErrorGetSubjects,
  } = useQuery({
    queryKey: ["dataSubject"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("subjects"); 
      setIsLoadedSubject(false);
      return data;
    },
    
  });
  if (isErrorGetSubjects) toast.error(errorGetSubjects.message || "Error");


  // get Id
  const { data: OneSubject,
          error: errorGetOneSubjects,
          isError: isErrorGetOneSubjects, 
        } = useQuery({
    queryKey: ["dataOneSubject"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("subjects/" + idSubject);
      setIsLoadedDetailsSubject(false);
      return data;
    },
  });
  if (isErrorGetOneSubjects) toast.error(errorGetOneSubjects.message || "Error");

  return {
    allSubjects,
    createSubjectMutation,
    voteSubjectMutation,
    deleteSubjectMutation,
    isOpenFormSubject,
    setIsOpenFormSubject,
    OneSubject,
    setIsLoadedSubject,
    isLoadedSubject,
    isLoadedDetailsSubject,
    setIsLoadedDetailsSubject,
  };
};


