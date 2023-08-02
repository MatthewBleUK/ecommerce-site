import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductGrid from "./components/ProductGrid";

function App() {
    const navigationItems = ["Shoes", "Bags", "Hats"];

    return (
        <>
            <AnnouncementBar title="Free Shipping to Bulgaria" />
            <Header nav={navigationItems} />

            <Router>
                <Routes>
                    <Route
                        path="/shoes"
                        element={<ProductGrid category="shoes" />}
                    />
                    <Route
                        path="/bags"
                        element={<ProductGrid category="bags" />}
                    />
                    <Route
                        path="/hats"
                        element={<ProductGrid category="hats" />}
                    />

                    <Route
                        path="/"
                        element={<ProductGrid category="shoes" />}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
