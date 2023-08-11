function AnnouncementBar({ title }) {
    return (
        <div className="h-12 flex items-center text-center washed-gray-bg">
            <span className="grow text-white text-sm font-light tracking-wide">
                {title}
            </span>
        </div>
    );
}

export default AnnouncementBar;
