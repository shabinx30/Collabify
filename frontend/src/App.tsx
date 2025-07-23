import NavBar from "./components/NavBar";
import Benefits from "./components/home/Benefits";
import Featured from "./components/home/Featured";
import Hero from "./components/home/Hero";

function App() {
    return (
        <>
            <NavBar />
            <main className="flex flex-col gap-[4em] py-[4em] bg-white px-[2em] lg:px-[6em] xl:px-[12em]">
                <Hero />
                <Featured />
                <Benefits />
            </main>
        </>
    );
}

export default App;
