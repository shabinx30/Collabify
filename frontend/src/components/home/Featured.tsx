const Featured = () => {
    return (
        <section className="px-[2em] lg:px-[6em] xl:px-[12em] bg-white text-black">
            <h1 className="font-semibold text-xl">Featured</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-[1em]">
                <div className="aspect-square bg-gray-300 rounded-xl"></div>
                <div className="aspect-square bg-gray-300 rounded-xl"></div>
                <div className="aspect-square bg-gray-300 rounded-xl"></div>
                <div className="aspect-square bg-gray-300 rounded-xl"></div>
            </div>
        </section>
    );
};

export default Featured;
