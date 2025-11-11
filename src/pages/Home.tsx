import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useSearchAnime } from "../api/anime";
import useDebounce from "../hooks/useDebounce";
import { 
  appendList, 
  nextPage, 
  resetList, 
  selectQuery, 
  selectPage, 
  selectList, 
  selectHasNextPage 
} from "../store/searchSlice";
import AnimeCardSkeleton from "../components/pages/home/AnimeCardSkeleton";
import AnimeCard from "../components/pages/home/AnimeCard";
import NoResult from "../components/pages/home/NoResult";

export default function Home() {
  const dispatch = useDispatch();

  const query = useSelector(selectQuery);
  const page = useSelector(selectPage);
  const list = useSelector(selectList);
  const hasNextPage = useSelector(selectHasNextPage);

  const debouncedQuery = useDebounce(query, 250);

  const { data, isLoading } = useSearchAnime(debouncedQuery, page);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(resetList());
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(appendList(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!hasNextPage || isLoading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isLoading) {
        dispatch(nextPage());
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [isLoading, dispatch, hasNextPage]);

  const showNoResult = !isLoading && debouncedQuery && list.length === 0 && !hasNextPage;

  return (
    <div>
      {showNoResult && (
        <NoResult />
      )}

      {isLoading && list.length === 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {list.map((anime: any) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={loaderRef} className="h-10"></div>
      )}

      {isLoading && list.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!hasNextPage && list.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Semua hasil telah ditampilkan.
          </p>
        </div>
      )}
    </div>
  );
}