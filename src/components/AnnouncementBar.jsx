function AnnouncementBar(props) {
    return (
        <div
            id="announcementBar"
            className="h-12 flex items-center text-center"
        >
            <span className="grow text-white text-sm font-light">
                {props.title}
            </span>
        </div>
    );
}

export default AnnouncementBar;
