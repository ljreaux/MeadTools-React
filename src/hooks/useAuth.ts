import { toast } from "@/components/ui/use-toast";
import { getUserInfo } from "@/helpers/Login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export interface UserInfo {
  id: number;
  email: string;
  google_id: string | null;
  role: "user" | "admin";
  recipes: { id: number; user_id: number; name: string; private: boolean }[];
}

function useAuth(
  token: string | null,
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: number;
      role: "user" | "admin";
      email: string;
    } | null>
  >
) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
    else
      (async () => {
        const user = await getUserInfo(token);
        if (user) {
          setUserInfo(user);
          setUser((prev) => ({
            ...prev,
            id: user.id,
            role: user.role,
            email: user.email,
          }));
        } else {
          toast({
            title: "Account Error",
            description: "Please Login Again",
            variant: "destructive",
          });
          navigate("/login");
        }
      })();
  }, [token, reload]);

  return {
    userInfo,
    reload,
    setReload,
  };
}

export default useAuth;
