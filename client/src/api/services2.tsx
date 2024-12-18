import { toast } from "sonner";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  createField,
  createFieldSchema,
} from "@/interfaces";
import axiosInstance from "@/interceptors/axios.config";
import { useGeneralHook2 } from "@/hooks/generalHook2";
import { createSubject, createSubjectSchema } from "@/interfaces/index2";




//  subjects hook
export const useSubjects = () => {
  const queryClient = useQueryClient();
  const {
    isOpenFormSubject, 
    setIsOpenFormSubject,
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

  // update
  const updateField = async (fieldInfos: updateField) => {
    try {
      const result = updateFieldSchema.safeParse(fieldInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
     /* await axios.patch(
        baseUrl + "fields/" + fieldInfos.idFieldUpdt,
        fieldInfos,
        {
          withCredentials: true,
        }
      ); */
      await axiosInstance.patch(
        "fields/" + fieldInfos.idFieldUpdt,
        fieldInfos
      );

      toast.success("updated successfully!!");
      setIsOpenFormField(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error updated");
    }
  };
  const { mutate: updateFieldMutation } = useMutation({
    mutationFn: updateField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataFields"] });
      queryClient.invalidateQueries({ queryKey: ["dataChart2"] });
    },
  });

  //delete
  const deleteField = async (fieldInfos: any) => {
    try {
    /*  await axios.delete(baseUrl + "fields/" + fieldInfos.idFieldUpdt, {
        withCredentials: true,
      }); */
      await axiosInstance.delete("fields/" + fieldInfos.idFieldUpdt);

      toast.success("deleted successfully!!");
      setIsOpenFormField(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error deleted");
    }
  };
  const { mutate: deleteFieldMutation } = useMutation({
    mutationFn: deleteField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataFields"] });
      queryClient.invalidateQueries({ queryKey: ["dataChart2"] });
    },
  });

  // get All
  const {
    error: errorGetFields,
    data: allFields,
    isError: isErrorGetFields,
  } = useQuery({
    queryKey: ["dataFields"],
    queryFn: async () => {
    /* const { data } = await axios.get(baseUrl + "fieldsNotD", {
        withCredentials: true,
      });*/
      const { data } = await axiosInstance.get("fieldsNotD"); // "fieldsNotD" automatically suffixed to the base url
      setIsLoadedField(false);
      return data;
    },
    
  });
  if (isErrorGetFields) toast.error(errorGetFields.message || "Error");


  // get Id
  const { data: OneField } = useQuery({
    queryKey: ["dataOneFields"],
    queryFn: async () => {
     /* const { data } = await axios.get(baseUrl + "fields/" + idField, {
        withCredentials: true,
      });*/
      const { data } = await axiosInstance.get("fields/" + idField);

      setIsLoadedDetailsField(false);
      return data;
    },
  });
  if (isErrorGetFields) toast.error(errorGetFields.message || "Error");

  return {
    allFields,
    createFieldMutation,
    updateFieldMutation,
    deleteFieldMutation,
    isOpenFormField,
    setIsOpenFormField,
    OneField,
    setIsLoadedField,
    isLoadedField,
    isLoadedDetailsField,
    setIsLoadedDetailsField,
  };
};


