export default function AnimeCardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="aspect-[2/3] w-full bg-gray-700/20 rounded-lg"></div>

            <div className="mt-2">
                <div className="h-4 bg-gray-700/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700/20 rounded w-1/2"></div>
            </div>
        </div>
    );
}