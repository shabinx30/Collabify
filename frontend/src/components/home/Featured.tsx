import Tiles from "../ui/Tiles";

const Featured = () => {
    return (
        <section className="bg-white dark:bg-[#1b1b1b]">
            <h1 className="font-semibold text-xl">Featured</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-[1em]">
                {new Array(4).fill(0).map((creator, i) => (
                    <Tiles key={i} creator={creator}/>
                ))}
            </div>
        </section>
    );
};

export default Featured;
