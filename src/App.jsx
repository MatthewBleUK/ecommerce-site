import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";

function App() {
    const navigationItems = ["Shoes", "Bags", "Dresses"];

    return (
        <>
            <AnnouncementBar title="Free Shipping to Bulgaria" />
            <Header nav={navigationItems} />
            <div></div>
        </>
    );
}

export default App;
