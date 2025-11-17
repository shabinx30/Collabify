import { PiCameraLight } from "react-icons/pi";

const PostsPage = () => {
    const posts: object[] = [];

    if (!posts.length) {
        return (
            <div className="flex flex-col justify-center items-center w-full bg-background h-[10em] mt-[6em] mb-[8em]">
                <div className="mx-auto flex justify-center items-center border-3 rounded-full border-black w-[5.25em] h-[5.25em] dark:border-white">
                    <PiCameraLight
                        size={58}
                        className="text-black dark:text-white"
                    />
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="text-xl md:text-2xl items-center font-bold pt-2">
                        No Post Yet
                    </h1>
                </div>
            </div>
        );
    } else {
        return (
            <div className="grid grid-cols-3 w-full gap-1 pt-[0.5em] pb-[6em]">
                {posts.map((_, index) => (
                    <div
                        onContextMenu={(e) => e.preventDefault()}
                        key={index}
                        className="bg-[#2B2B2B] w-full relative aspect-square"
                    ></div>
                ))}
            </div>
        );
    }
};

export default PostsPage;
