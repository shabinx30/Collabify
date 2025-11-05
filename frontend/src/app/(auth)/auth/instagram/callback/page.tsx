import Image from "next/image";

const page = () => {

    return (
        <div className="flex flex-col items-center">
            <Image
                className="contrast-79 w-[18em]"
                src={"/animations/preloading_animation.gif"}
                alt="loading"
                width={100}
                height={100}
            />
            <p>We are gather your info...</p>
        </div>
    );
};

export default page;
