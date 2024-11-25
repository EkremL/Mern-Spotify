import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

//!check if user is authenticated or not authenticated
const updateApiToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          await checkAdminStatus();
        }
      } catch (error) {
        updateApiToken(null);
        console.error("Failed to initialize auth", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken, checkAdminStatus]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;

// import { axiosInstance } from "@/lib/axios";
// import { useAuth } from "@clerk/clerk-react";
// import { Loader } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const updateApiToken = (token: string | null) => {
//   if (token) {
//     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete axiosInstance.defaults.headers.common["Authorization"];
//   }
// };

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const { getToken, isLoaded, isSignedIn } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const initAuth = async () => {
//       if (!isLoaded) return; // Clerk yüklenmediyse bekle

//       try {
//         // Kullanıcı oturum açmış mı kontrol et
//         if (isSignedIn) {
//           const token = await getToken();
//           updateApiToken(token);
//         } else {
//           // Eğer kullanıcı giriş yapmamışsa, giriş sayfasına yönlendir
//           navigate("/sign-in");
//         }
//       } catch (error) {
//         updateApiToken(null);
//         console.error("Failed to initialize auth", error);
//         navigate("/sign-in"); // Hata durumunda giriş sayfasına yönlendir
//       } finally {
//         setLoading(false);
//       }
//     };

//     initAuth();
//   }, [getToken, isLoaded, isSignedIn, navigate]);

//   if (loading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//         <Loader className="size-8 text-emerald-500 animate-spin" />
//       </div>
//     );
//   }

//   return <>{children}</>;
// };

// export default AuthProvider;
