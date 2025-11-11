import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Anime } from "../../../type";

export default function AnimeCard({
    anime,
}: {
    anime: Anime
}) {
    return (
        <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`} className="group block">
            <motion.div
                className="relative w-full h-full [transform-style:preserve-3d]"
                initial={false}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ perspective: 1000 }}
            >
                <div className="inset-0 [backface-visibility:hidden] flex flex-col">
                    <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-white/5">
                        <div
                            className="bg-cover bg-center h-full w-full transition-transform duration-300 group-hover:scale-105"
                            style={{ backgroundImage: `url(${anime.images.jpg.image_url})` }}
                        />
                    </div>

                    <div className="mt-2">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate text-sm sm:text-base">
                            {anime.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            {anime.type || "Anime"} • {anime.year || "Unknown"}
                        </p>
                    </div>
                </div>

                <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-background-light dark:bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col justify-center gap-2">
                    <h3 className="font-bold text-primary text-sm sm:text-base text-center">
                        {anime.title}
                    </h3>

                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-5">
                        {anime.background}
                    </p>

                    <p className="text-xs text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Type: </span>{anime.type}
                    </p>

                    <p className="text-xs text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Rating: </span>{anime.rating}
                    </p>

                    <p className="text-xs text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Score: </span>{anime.score}
                    </p>

                    <p className="text-xs text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Duration: </span>{anime.duration}
                    </p>

                    <p className="text-xs text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Airing: </span>{anime.status}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}