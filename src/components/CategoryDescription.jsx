function CategoryDescription({ title, desc }) {
    return (
        <div className="bg-gray-200">
            <div className="p-9 max-w-screen-2xl mx-auto">
                <div className="bg-white max-w-screen-2xl mx-auto p-10 py-§0">
                    <h1 className="text-2xl mb-4">{title}</h1>
                    <p>{desc}</p>
                </div>
            </div>
        </div>
    );
}

export default CategoryDescription;
