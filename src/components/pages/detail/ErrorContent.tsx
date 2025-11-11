import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorContent() {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed 
        border-black/20 dark:border-white/20 
        bg-black/5 dark:bg-white/5 py-16 text-center transition-colors">

            <div className="flex size-16 items-center justify-center rounded-full  bg-primary/15 dark:bg-primary/20 text-primary">
                <SearchX className="w-10 h-10" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-black dark:text-white">
                Anime not found
            </h3>

            <p className="mt-2 max-w-sm text-sm text-black/60 dark:text-white/60">
                We couldn’t find the anime detail that you are selected.
            </p>

            <Link to="/" className="mt-6 rounded-lg py-3 px-4 bg-primary text-center text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                Back Home
            </Link>
        </div>
    );
}
