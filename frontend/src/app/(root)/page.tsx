import Benefits from "@/components/home/Benefits";
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";

const Home = () => {
    return (
        <main className="flex flex-col gap-[4em] py-[4em] bg-white dark:bg-[#1b1b1b] px-[2em] lg:px-[6em] xl:px-[12em]">
            <Hero />
            <Featured />
            <Benefits />
        </main>
    );
};

export default Home;
