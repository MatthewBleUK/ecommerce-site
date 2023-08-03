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
                                desc="Every bag is meticulously handcrafted with utmost care and attention to detail. From conceptualization to the final stitches, our skilled artisans pour their heart and soul into creating each masterpiece. We take pride in using eco-conscious materials, with a primary focus on recycled fibers and sustainable fabrics, to ensure our bags not only exude elegance but also contribute to a greener planet. "
                            />
                        }
                    />
                    <Route
                        path="/hats"
                        element={
                            <ProductGrid
                                category="hats"
                                title="Hats"
                                desc="Introducing our remarkable assortment of hats, where artistry meets functionality. Handpicked materials are thoughtfully sourced, and each hat is crafted to bring you a stunning and versatile accessory. Designed to elevate your style and offer unparalleled comfort, our hats are a perfect blend of form and function."
                            />
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <ProductGrid
                                category="shoes"
                                title="Shoes"
                                desc="Using mostly recycled fibers, we create sustainable shoes that combine comfort with timeless style. Step into our shoes and experience the difference of artisanal craftsmanship and eco-conscious design."
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
