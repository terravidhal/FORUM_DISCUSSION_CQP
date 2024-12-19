import { toast } from "sonner";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/interceptors/axios.config";
import { useGeneralHook2 } from "@/hooks/generalHook2";
import {
  Login,
  VoteSubjectSchema,
  createComment,
  createCommentSchema,
  createSubject,
  createSubjectSchema,
  loginSchema,
  voteComment,
  voteCommentSchema,
  voteSubject,
} from "@/interfaces/index2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "@/constants/baseUrl";



// login hook
export const useLogin = () => {
  const { isLogginSuccess, setIsLogginSuccess, logginError, setLogginError } =
    useGeneralHook2();
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
      navigate(`/homeForum`);
    } catch (err: any) {
      setLogginError(true);
      toast.error(err.response?.data?.message || "Error login");
    }
  };

  const { mutate: loginMutation } = useMutation({
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
  const {
    data: OneSubject,
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
  if (isErrorGetOneSubjects)
    toast.error(errorGetOneSubjects.message || "Error");

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

//  comments hook
export const useComments = () => {
  const queryClient = useQueryClient();
  const {
    isOpenFormComment,
    setIsOpenFormComment,
    isLoadedComment,
    setIsLoadedComment,
    isLoadedDetailsComment,
    setIsLoadedDetailsComment,
    idComment,
  } = useGeneralHook2();

  // create
  const createComment = async (commentInfos: createComment) => {
    try {
      const result = createCommentSchema.safeParse(commentInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
      await axiosInstance.post("comments", commentInfos);
      toast.success("add successfully!!");
      setIsOpenFormComment(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };
  const { mutate: createCommentMutation } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataComment"] });
    },
  });

  // vote comment
  const voteComment = async (commentInfos: voteComment) => {
    try {
      const result = voteCommentSchema.safeParse(commentInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }

      await axiosInstance.patch(
        "comments/" + commentInfos.commentId,
        commentInfos
      );

      toast.success("updated successfully!!");
      setIsOpenFormComment(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error updated");
    }
  };
  const { mutate: voteCommentMutation } = useMutation({
    mutationFn: voteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataComment"] });
    },
  });

  //delete
  const deleteComment = async (commentInfos: any) => {
    try {
      await axiosInstance.delete("comments/" + commentInfos.commentId);

      toast.success("deleted successfully!!");
      setIsOpenFormComment(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error deleted");
    }
  };
  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dataComment"] });
    },
  });

  // get All
  const {
    data: allComments,
    error: errorGetComments,
    isError: isErrorGetComments,
  } = useQuery({
    queryKey: ["dataComment"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("comments");
      setIsLoadedComment(false);
      return data;
    },
  });
  if (isErrorGetComments) toast.error(errorGetComments.message || "Error");

  // get Id
  const {
    data: OneComment,
    error: errorGetOneComments,
    isError: isErrorGetOneComments,
  } = useQuery({
    queryKey: ["dataOneSubject"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("comments/" + idComment);
      setIsLoadedDetailsComment(false);
      return data;
    },
  });
  if (isErrorGetOneComments)
    toast.error(errorGetOneComments.message || "Error");

  return {
    allComments,
    createCommentMutation,
    voteCommentMutation,
    deleteCommentMutation,
    isOpenFormComment,
    setIsOpenFormComment,
    OneComment,
    setIsLoadedComment,
    isLoadedComment,
    isLoadedDetailsComment,
    setIsLoadedDetailsComment,
  };
};
