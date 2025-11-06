import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { IDecode, RoleType } from "@/types/auth/signup.type";
import { useDispatch } from "react-redux";
import { signInWith } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const LoginWith = ({ role }: { role?: RoleType }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleLogin = (credentialResponse: CredentialResponse) => {
        if (credentialResponse && credentialResponse.credential) {
            const decode = jwtDecode(credentialResponse.credential) as IDecode;
            const userData = {
                given_name: decode.given_name,
                email: decode.email,
                picture: decode.picture,
            };
            dispatch(signInWith({ userData, role, router }));
        }
    };

    return (
        <section className="flex gap-2">
            <GoogleLogin
                shape="pill"
                theme={
                    window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "filled_black"
                        : "outline"
                }
                size="large"
                onSuccess={handleLogin}
                onError={() => console.log("failed")}
            />
        </section>
    );
};

export default LoginWith;
