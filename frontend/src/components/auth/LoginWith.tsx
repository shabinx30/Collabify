import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { IDecode, RoleType } from "@/types/auth/signup.type";
import { useDispatch } from "react-redux";
import { signInWith } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { SiInstagram } from "react-icons/si";
import axios from "axios";

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

    const handleInsta = async () => {
        const response = await axios.post(
            "https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=1099021975409872&redirect_uri=https://unknown-shabin.vercel.app/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights"
        );
        console.log({ insta: response.data });
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
            <div
                onClick={handleInsta}
                className="flex flex-1 justify-center items-center gap-2 min-h-full bg-gray-200 dark:bg-[#3b3b3b] rounded-full cursor-pointer"
            >
                <SiInstagram size={18} />
                <p>Link with Instagram</p>
            </div>
        </section>
    );
};

export default LoginWith;
