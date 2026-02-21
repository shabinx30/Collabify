const SavedProfiles = () => {
    return (
        <main className="p-4">
            <section className="flex-col flex-1">
                <h3 className="font-semibold dark:text-base mb-1">Saved Profiles</h3>
                <div className="py-8 w-full bg-gray-100 dark:bg-[#2b2b2b] rounded-2xl">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        No Saved Profiles
                    </p>
                </div>
            </section>
        </main>
    );
};

export default SavedProfiles;
