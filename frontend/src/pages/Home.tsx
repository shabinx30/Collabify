import Benefits from "../components/home/Benefits";
import Featured from "../components/home/Featured";
import Footer from "../components/Footer";
import Hero from "../components/home/Hero";
import NavBar from "../components/NavBar";

const Home = () => {
    return (
        <>
            <NavBar page="signup" />
            <main className="flex flex-col gap-[4em] py-[4em] bg-white dark:bg-[#1b1b1b] px-[2em] lg:px-[6em] xl:px-[12em]">
                <Hero />
                <Featured />
                <Benefits />
            </main>
            <Footer />
        </>
    );
};

export default Home;
