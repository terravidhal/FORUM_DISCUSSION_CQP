import axios from "axios";
import { toast } from "sonner";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import baseUrl from "@/constants/baseUrl";
import {
  Login,
  createField,
  createFieldSchema,
  createSession,
  createSessionSchema,
  createStudent,
  createStudentSchema,
  loginSchema,
  updateField,
  updateFieldSchema,
  updateSession,
  updateSessionSchema,
  updateStudent,
  updateStudentSchema,
} from "@/interfaces";
import { useGeneralHook } from "@/hooks/generalHook";
import axiosInstance from "@/interceptors/axios.config";





export const useLogin = () => {
  const { isLogginSuccess, setIsLogginSuccess,
          logginError, 
          setLogginError,
   } = useGeneralHook();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // login hook
  const login = async (userInfos: Login) => {
    try {
      const result = loginSchema.safeParse(userInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
      const response = await axios.post(baseUrl + "login", userInfos, {
        withCredentials: true,
      });
      setIsLogginSuccess(true);
      toast.success("login successfully!!");
      localStorage.setItem("USER_OBJ", JSON.stringify(response.data.user));
      navigate(`/dashboard`);
    } catch (err: any) {
      setLogginError(true);
      toast.error(err.response?.data?.message || "Error login");
    }
  };

  const {
    mutate: loginMutation,
   // isPending: isPendingLogin,
   // isError: isErrorLogin,
   // isSuccess: isSuccessLogin,
   // error: errorLogin,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatAllOrgs"] });
    },
  });

  return {
    loginMutation,
    isLogginSuccess,
    logginError,
  };
};

// logout hook
export const useLogout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.post(
        baseUrl + "logout",
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("logout successfully!!");
      localStorage.removeItem("USER_OBJ");
      navigate(`/`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "logout failed !!");
    }
  };
  const {
    mutate: logoutMutation,
    isPending: isPendingLogout,
    isError: isErrorLogout,
    isSuccess: isSuccessLogout,
    error: errorLogout,
  } = useMutation({
    mutationFn: logout,
  });

  return {
    logoutMutation,
    isPendingLogout,
    isErrorLogout,
    isSuccessLogout,
    errorLogout,
  };
};

// field hook
export const useFields = () => {
  const queryClient = useQueryClient();
  const {
    isOpenFormField,
    setIsOpenFormField,
    idField,
    isLoadedField,
    setIsLoadedField,
    isLoadedDetailsField,
    setIsLoadedDetailsField,
  } = useGeneralHook();

  // create
  const createField = async (fieldInfos: createField) => {
    try {
      const result = createFieldSchema.safeParse(fieldInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
    /*  await axios.post(baseUrl + "fields", fieldInfos, {
        withCredentials: true,
      });*/
      await axiosInstance.post("fields", fieldInfos);

      toast.success("add successfully!!");
      setIsOpenFormField(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };
  const { mutate: createFieldMutation } = useMutation({
    mutationFn: createField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataFields"] });
      queryClient.invalidateQueries({ queryKey: ["dataChart2"] });
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

// Sessions hook
export const useSessions = () => {
  const queryClient = useQueryClient();
  const {
    isOpenFormSession,
    setIsOpenFormSession,
    idSession,
    isLoadedDetailsSession,
    setIsLoadedDetailsSession,
    isLoadedSession,
    setIsLoadedSession,
  } = useGeneralHook();

  // create
  const createSession = async (sessionInfos: createSession) => {
    try {
      const result = createSessionSchema.safeParse(sessionInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
      /*await axios.post(baseUrl + "sessions", sessionInfos, {
        withCredentials: true,
      });*/
      await axiosInstance.post("sessions", sessionInfos);

      toast.success("add successfully!!");
      setIsOpenFormSession(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };
  const { mutate: createSessionMutation } = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataOneFields"] });
      queryClient.invalidateQueries({ queryKey: ["dataSessions"] });
      queryClient.invalidateQueries({ queryKey: ["dataChart2"] });
    },
  });

  // update
  const updateSession = async (sessionInfos: updateSession) => {
    try {
      const result = updateSessionSchema.safeParse(sessionInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
    /*  await axios.patch(
        baseUrl + "sessions/" + sessionInfos.idSessionUpdt,
        sessionInfos,
        {
          withCredentials: true,
        }
      );*/
      await axiosInstance.patch(
        "sessions/" + sessionInfos.idSessionUpdt, 
        sessionInfos
      );

      toast.success("updated successfully!!");
      setIsOpenFormSession(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error updated");
    }
  };
  const { mutate: updateSessionMutation } = useMutation({
    mutationFn: updateSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataOneFields"] });
      queryClient.invalidateQueries({ queryKey: ["dataSessions"] });
      queryClient.invalidateQueries({ queryKey: ["dataChart2"] });
    },
  });

  //delete
  const deleteSession = async (sessionInfos: any) => {
    try {
     /* await axios.delete(baseUrl + "sessions/" + sessionInfos.idSessionUpdt, {
        withCredentials: true,
      });*/
      await axiosInstance.delete("sessions/" + sessionInfos.idSessionUpdt);

      toast.success("deleted successfully!!");
      setIsOpenFormSession(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error deleted");
    }
  };
  const { mutate: deleteSessionMutation } = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataOneFields"] });
      queryClient.invalidateQueries({ queryKey: ["dataSessions"] });
      queryClient.invalidateQueries({ queryKey: ["dataChart2"] });
    },
  });

  // get All
  const {
    error: errorGetSessions,
    data: allSessions,
    isError: isErrorGetSessions,
  } = useQuery({
    queryKey: ["dataSessions"],
    queryFn: async () => {
     /* const { data } = await axios.get(baseUrl + "sessions", {
        withCredentials: true,
      });*/
      const { data } = await axiosInstance.get("sessions");
      setIsLoadedSession(false);
      return data;
    },
  });
  if (isErrorGetSessions) toast.error(errorGetSessions.message || "Error");

  // get Id
  const {
    error: errorGetSessionsId,
    data: OneSession,
    isError: isErrorGetSessionsId,
  } = useQuery({
    queryKey: ["dataOneSessions"],
    queryFn: async () => {
      /*const { data } = await axios.get(baseUrl + "sessions/" + idSession, {
        withCredentials: true,
      });*/
      const { data } = await axiosInstance.get("sessions/" + idSession);

      setIsLoadedDetailsSession(false);
      return data;
    },
  });
  if (isErrorGetSessionsId)
    console.log(errorGetSessionsId.message || "Error");

  return {
    createSessionMutation,
    updateSessionMutation,
    deleteSessionMutation,
    isOpenFormSession,
    setIsOpenFormSession,
    OneSession,
    isLoadedDetailsSession,
    setIsLoadedDetailsSession,
    isLoadedSession,
    setIsLoadedSession,
    allSessions,
  };
};

// students  hook
export const useStudent = () => {
  const queryClient = useQueryClient();
  const {
    isOpenFormStudent,
    setIsOpenFormStudent,
    idStudentss,
    isLoadedStudent,
    setIsLoadedStudent,
    isLoadedDetailsStudent,
    setIsLoadedDetailsStudent,
  } = useGeneralHook();

  // create
  const createStudent = async (studentInfos: createStudent) => {
    try {
      const result = createStudentSchema.safeParse(studentInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
     /* await axios.post(baseUrl + "students", studentInfos, {
        withCredentials: true,
      });*/
      await axiosInstance.post("students", studentInfos);

      toast.success("add successfully!!");
      setIsOpenFormStudent(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };
  const { mutate: createStudentMutation } = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataOneSessions"] });
      queryClient.invalidateQueries({ queryKey: ["dataChart2"] });
      queryClient.invalidateQueries({ queryKey: ["dataStudents"] });
    },
  });

  // update
  const updateStudent = async (studentInfos: updateStudent) => {
    try {
      const result = updateStudentSchema.safeParse(studentInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
     /* await axios.patch(
        baseUrl + "students/" + studentInfos.idStudentUpdt,
        studentInfos,
        {
          withCredentials: true,
        }
      );*/
      await axiosInstance.patch(
        "students/" + studentInfos.idStudentUpdt,
        studentInfos
      );

      toast.success("updated successfully!!");
      setIsOpenFormStudent(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error updated");
    }
  };
  const { mutate: updateStudentMutation } = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataOneSessions"] });
      queryClient.invalidateQueries({ queryKey: ["dataChart2"] });
      queryClient.invalidateQueries({ queryKey: ["dataStudents"] });
    },
  });

  //delete
  const deleteStudent = async (studentInfos: any) => {
    try {
     /* await axios.delete(baseUrl + "students/" + studentInfos.idStudentUpdt, {
        withCredentials: true,
      });*/
      await axiosInstance.delete("students/" + studentInfos.idStudentUpdt);

      toast.success("deleted successfully!!");
      setIsOpenFormStudent(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error deleted");
    }
  };
  const { mutate: deleteStudentMutation } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataOneSessions"] });
      queryClient.invalidateQueries({ queryKey: ["dataChart2"] });
      queryClient.invalidateQueries({ queryKey: ["dataStudents"] });
    },
  });

  // get All
  const {
    error: errorGetStudents,
    data: allStudents,
    isError: isErrorGetStudents,
  } = useQuery({
    queryKey: ["dataStudents"],
    queryFn: async () => {
     /* const { data } = await axios.get(baseUrl + "students", {
        withCredentials: true,
      });*/
      const { data } = await axiosInstance.get("students");

      setIsLoadedStudent(false);
      return data;
    },
  });
  if (isErrorGetStudents) toast.error(errorGetStudents.message || "Error");

  // get Id
  const {
    error: errorGetStudentId,
    data: OneStudent,
    isError: isErrorGettudentId,
  } = useQuery({
    queryKey: ["dataOneStudent"],
    queryFn: async () => {
      /*const { data } = await axios.get(baseUrl + "students/" + idStudentss, {
        withCredentials: true,
      });*/
      const { data } = await axiosInstance.get("students/" + idStudentss);
      
      setIsLoadedDetailsStudent(false);
      return data;
    },
  });
  if (isErrorGettudentId) console.log(errorGetStudentId.message || "Error");

  // send emails
  const sendEmails = async (certifInfos: any) => {
    try {
     /* await axios.post(baseUrl + "notifs", certifInfos, {
        withCredentials: true,
      });*/
      await axiosInstance.post("notifs", certifInfos);

      toast.success("successfully send email!!");
      console.log("successfully send email!!");
    } catch (err: any) {
      console.log(err.response?.data?.message || "Error send email");
      toast.error(err.response?.data?.message || "Error send email");
    }
  };
  const { mutate: sendEmailsMutation } = useMutation({
    mutationFn: sendEmails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataOneSessions"] });
    },
  });

  return {
    createStudentMutation,
    updateStudentMutation,
    deleteStudentMutation,
    isOpenFormStudent,
    setIsOpenFormStudent,
    OneStudent,
    sendEmailsMutation,
    isLoadedStudent,
    setIsLoadedStudent,
    allStudents,
    isLoadedDetailsStudent,
    setIsLoadedDetailsStudent,
  };
};

// hook AudLogCertificate
export const useAudLogCertificate = () => {
  const queryClient = useQueryClient();

  // create
  const createAudLogCertif = async (CertifInfos: any) => {
    try {
     /* await axios.post(baseUrl + "audLog", CertifInfos, {
        withCredentials: true,
      });*/
      await axiosInstance.post("audLog", CertifInfos);

      console.log("add successfully log!!");
    } catch (err: any) {
      console.log(err.response?.data?.message || "Error add log!");
    }
  };
  const { mutate: createAudLogCertifMutation } = useMutation({
    mutationFn: createAudLogCertif,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataAllAudLog"] });
      queryClient.invalidateQueries({ queryKey: ["dataOneSessions"] });
      queryClient.invalidateQueries({ queryKey: ["dataChart2"] });
    },
  });

  return { createAudLogCertifMutation };
};



// hook Payment
export const usePayment = () => {
  const queryClient = useQueryClient();
 const {
  isOpenFormPayment,
  setIsOpenFormPayment,
  } = useGeneralHook();

   // get All
   const {
    error: errorGetPayments,
    data: allPayments,
    isError: isErrorGetPayments,
  } = useQuery({
    queryKey: ["dataPayments"],
    queryFn: async () => {
      /*const { data } = await axios.get(baseUrl + "payments", {
        withCredentials: true,
      });*/
      const { data } = await axiosInstance.get("payments");
      return data;
    },
  });
  if (isErrorGetPayments) toast.error(errorGetPayments.message || "Error");

  // create
  const createPayment = async (PaymentInfos: any) => {
    try {
     /* await axios.post(baseUrl + "payment", PaymentInfos, {
        withCredentials: true,
      }); */
      await axiosInstance.post("payment", PaymentInfos);
    
      toast.success("add successfully payment!!");
    } catch (err: any) {
      console.log(err.response?.data?.message || "Error add payment!");
    }
  };
  const { mutate: createPaymentMutation } = useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataOneSessions"] });
      queryClient.invalidateQueries({ queryKey: ["dataPayments"] });
    },
  });


  //delete Payment
  const deletePayment = async (paymentInfos: any) => {
    try {
     /* await axios.delete(baseUrl + "payments/" + paymentInfos.paymentId+"/"+paymentInfos.studentId, {
        withCredentials: true,
      });*/
      await axiosInstance.delete(`payments/${paymentInfos.paymentId}/${paymentInfos.studentId}`);

      toast.success("deleted successfully!!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error deleted");
    }
  };
  const { mutate: deletePaymentMutation } = useMutation({
    mutationFn: deletePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataOneSessions"] });
      queryClient.invalidateQueries({ queryKey: ["dataPayments"] });
    },
  });

  return { createPaymentMutation,
            isOpenFormPayment,
            setIsOpenFormPayment,
            allPayments,
            deletePaymentMutation,
   };
};


// hook templates
export const useTemplates = () => {
 const queryClient = useQueryClient();
 const {
  isOpenFormTemplate, 
    setIsOpenTemplate,
  } = useGeneralHook();

   // get All
   const {
    error: errorGetTemplates,
    data: allTemplates,
    isError: isErrorGetTemplates,
  } = useQuery({
    queryKey: ["dataTemplates"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("templates");
      return data;
    },
  });
  if (isErrorGetTemplates) toast.error(errorGetTemplates.message || "Error");

  // create
  const createTemplate = async (PaymentInfos: any) => {
    try {
      await axiosInstance.post("templates", PaymentInfos);
    
      toast.success("add successfully template!!");
    } catch (err: any) {
      console.log(err.response?.data?.message || "Error add template!");
    }
  };
  const { mutate: createTemplateMutation } = useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataTemplates"] });
    },
  });


  //delete
  const deleteTemplates = async (templateInfos: any) => {
    try {
      await axiosInstance.delete("students/" + templateInfos.templateId);
      toast.success("deleted successfully!!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error deleted");
    }
  };
  const { mutate: deleteTemplatesMutation } = useMutation({
    mutationFn: deleteTemplates,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataTemplates"] });
    },
  });


  return { createTemplateMutation,
            isOpenFormTemplate, 
            setIsOpenTemplate,
            allTemplates,
            deleteTemplatesMutation,
   };
};




// hook Charts
export const useAudLogChart = () => {
  // get All stud an certif
  const {
    error: errorGetDataChart,
    data: AllDataChart,
    isError: isErrorlDataChart,
  } = useQuery({
    queryKey: ["dataChart"],
    queryFn: async () => {
    /*  const { data } = await axios.get(baseUrl + "allStudCertif", {
        withCredentials: true,
      });*/
      const { data } = await axiosInstance.get("allStudCertif");

      return data;
    },
  });
  if (isErrorlDataChart) console.log(errorGetDataChart.message || "Error");

  // get All collections
  const {
    error: errorGetDataChart2,
    data: DataChart,
    isError: isErrorlDataChart2,
  } = useQuery({
    queryKey: ["dataChart2"],
    queryFn: async () => {
     /* const { data } = await axios.get(baseUrl + "allCollections", {
        withCredentials: true,
      });*/
      const { data } = await axiosInstance.get("allCollections");

      return data;
    },
  });
  if (isErrorlDataChart2)
    console.log(errorGetDataChart2.message || "Error");

  return { AllDataChart, DataChart };
};

