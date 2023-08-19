function Footer() {
    return (
        <footer className="light-gray-bg-custom dark:bg-zinc-800 mt-2.5">
            <div className="mx-auto max-w-screen-2xl p-9 py-6 lg:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center sm:text-left md:mb-12">
                    <div className="mt-16 sm:mt-8">
                        <h2 className="mb-6 text-sm font-semibold text-gray-700 uppercase dark:text-white">
                            Quick Links
                        </h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="/" className="hover:underline">
                                    Home
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="/" className="hover:underline">
                                    About us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Contact us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-16 sm:mt-8">
                        <h2 className="mb-6 text-sm font-semibold text-gray-700 uppercase dark:text-white">
                            Categories
                        </h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="/shoes" className="hover:underline">
                                    Shoes
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="/bags" className="hover:underline">
                                    Bags
                                </a>
                            </li>
                            <li>
                                <a href="/hats" className="hover:underline">
                                    Hats
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-16 sm:mt-8">
                        <h2 className="mb-6 text-sm font-semibold text-gray-700 uppercase dark:text-white">
                            Follow us
                        </h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="#" className="hover:underline ">
                                    Facebook
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Linkedin
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-16 sm:mt-8">
                        <h2 className="mb-6 text-sm font-semibold text-gray-700 uppercase dark:text-white">
                            Legal
                        </h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Privacy Policy
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="hover:underline">
                                    Terms &amp; Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Refund Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

                <div className="sm:flex sm:justify-between text-center sm:text-left">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2023 Bella Fashion. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
