import Benefits from "@/components/home/Benefits";
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import Instagram from "@/components/home/Instagram";
import "../../../components/home/home.css";

const Home = () => {
    return (
        <main className="flex flex-col gap-[3em] py-[2em] bg-white dark:bg-black px-[1em] lg:px-[6em] xl:px-[12em]">
            <Hero />
            <Featured/>
            <Instagram/>
            <Benefits />
        </main>
    );
};

export default Home;
