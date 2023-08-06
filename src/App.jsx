import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";

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
                        element={
                            <ProductGrid
                                category="shoes"
                                title="Shoes"
                                desc="Using mostly recycled fibers, we create sustainable shoes that combine comfort with timeless style. Step into our shoes and experience the difference of artisanal craftsmanship and eco-conscious design."
                            />
                        }
                    />
                    <Route
                        path="/bags"
                        element={
                            <ProductGrid
                                category="bags"
                                title="Bags"
                                desc="Discover artisanal excellence in every bag. Our skilled artisans pour heart and soul into crafting each piece from concept to stitch, using eco-conscious materials for elegance with a greener conscience"
                            />
                        }
                    />
                    <Route
                        path="/hats"
                        element={
                            <ProductGrid
                                category="hats"
                                title="Hats"
                                desc="Our remarkable assortment of hats, where artistry meets functionality. Handpicked materials are thoughtfully sourced, and each hat is crafted to bring you a stunning and versatile accessory. Designed to elevate your style and offer comfort."
                            />
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <ProductGrid
                                title="Products"
                                desc="Experience the latest in fashion trends! Explore a curated collection of stylish shoes, trendy bags, and chic hats for a complete and elevated look. Shop now and define your personal style"
                            />
                        }
                    />
                </Routes>
            </Router>

            <Footer />
        </>
    );
}

export default App;
