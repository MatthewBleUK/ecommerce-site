function CategoryDescription({ title, desc }) {
    return (
        <div className="light-gray-bg-custom">
            <div className="p-9 pt-16 pb-16 max-w-screen-2xl mx-auto">
                <div className="bg-white max-w-screen-2xl mx-auto p-10 py-§0">
                    <h1 className="text-3xl mb-4">All {title}</h1>
                    <p className="md:w-2/4 text-lg font-light">{desc}</p>
                </div>
            </div>
        </div>
    );
}

export default CategoryDescription;
