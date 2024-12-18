import axios from "axios";
import baseURL_API from "@/constants/baseURL_API";
import baseUrl from "@/constants/baseUrl";



const baseURL: string = baseURL_API;

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, // Include cookies with every query
});

// Interceptor to handle expired token and errors
axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is OK, we return it directly
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response) {
            const status = error.response.status;
            
            // Handling 401 errors
            if (status === 401 && !originalRequest._retry) { //the request is executed once, avoids infinite retry loops.
                originalRequest._retry = true; 
                
                try {
                    // Try to refresh the token
                    await axios.get(baseUrl + "refresh-token", { withCredentials: true });
                    return axiosInstance(originalRequest); // Retry the original query
                } catch (err:any) {
                    console.error("Failed to refresh token", err);
                    window.location.href = "/home/signin";
                    localStorage.removeItem("USER_OBJ"); // pr l "protected routes"
                }
            }

            // Handling 401 errors
            if (status === 401 && originalRequest._retry) {
                window.location.href = "/home/signin"; 
                localStorage.removeItem("USER_OBJ"); // pr l "protected routes"
            }

            // Handling 403 errors
            if (status === 403) {
                console.error("Access prohibited: status 403");
                //window.location.href = "/not-authorized";
                window.location.href = "/home/signin";
                localStorage.removeItem("USER_OBJ"); // pr l "protected routes"
            }

        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
