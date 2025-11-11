import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setQuery } from "../store/searchSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Sun, Moon } from "lucide-react";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
    const dispatch = useDispatch();
    const query = useSelector((state: RootState) => state.search.query);

    const location = useLocation();
    const navigate = useNavigate();

    const [isDark, setIsDark] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    const toggleDark = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark((prev) => !prev);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchExpanded(!isSearchExpanded);
    };

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchExpanded(false);
    }, [location]);

    const handleSearch = (value: string) => {
        const isDetailPage = location.pathname.startsWith("/anime/");

        if (isDetailPage) {
            navigate("/");
        }

        dispatch(setQuery(value));
        
        // Auto-close mobile search on small screens after search
        if (window.innerWidth < 768) {
            setIsSearchExpanded(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors">
            {/* Navigation */}
            <nav className="w-full border-b border-gray-300 dark:border-gray-700 px-4 sm:px-6 py-4">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="text-xl sm:text-2xl font-bold text-primary tracking-tight flex-shrink-0"
                    >
                        AnimeSearch
                    </Link>

                    {/* Desktop Search & Controls */}
                    <div className="hidden md:flex gap-3 items-center flex-1 max-w-lg mx-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search anime..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                    bg-white dark:bg-gray-800 focus:outline-primary text-sm"
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Desktop Dark Mode Toggle */}
                    <div className="hidden md:flex items-center gap-3">
                        <motion.button
                            onClick={toggleDark}
                            className="p-2 rounded-full border border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-800 relative overflow-hidden w-10 h-10 flex items-center justify-center"
                            whileTap={{ scale: 0.85 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isDark ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Sun className="w-5 h-5 text-yellow-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex md:hidden items-center gap-2">
                        {/* Mobile Search Toggle */}
                        <motion.button
                            onClick={toggleSearch}
                            className="p-2 rounded-full border border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-800 w-10 h-10 flex items-center justify-center"
                            whileTap={{ scale: 0.85 }}
                        >
                            <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </motion.button>

                        {/* Mobile Dark Mode Toggle */}
                        <motion.button
                            onClick={toggleDark}
                            className="p-2 rounded-full border border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-800 w-10 h-10 flex items-center justify-center"
                            whileTap={{ scale: 0.85 }}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isDark ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Sun className="w-5 h-5 text-yellow-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-full border border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-800 w-10 h-10 flex items-center justify-center"
                            whileTap={{ scale: 0.85 }}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <AnimatePresence>
                    {isSearchExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden mt-4"
                        >
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search anime..."
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                        bg-white dark:bg-gray-800 focus:outline-primary text-base"
                                    value={query}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                        >
                            <div className="space-y-3">
                                <Link
                                    to="/"
                                    className="block py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 
                                    text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/favorites"
                                    className="block py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 
                                    text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-colors"
                                >
                                    Favorites
                                </Link>
                                <Link
                                    to="/watchlist"
                                    className="block py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 
                                    text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-colors"
                                >
                                    Watchlist
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="px-4 sm:px-6 py-6 max-w-[1440px] mx-auto">
                {children}
            </main>
        </div>
    );
}