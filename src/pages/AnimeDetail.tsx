import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnimeDetail, useAnimeEpisodes, useAnimeRelations } from "../api/anime";
import type { Anime } from "../type/index";
import { useDispatch, useSelector } from "react-redux";
import { Film, Star, Heart, ArrowLeft } from "lucide-react";
import DetailHeroSkeleton from "../components/pages/detail/DetailHeroSkeleton";
import DetailPosterSkeleton from "../components/pages/detail/DetailPosterSkeleton";
import TabContent from "../components/pages/detail/TabContent";
import ErrorContent from "../components/pages/detail/ErrorContent";
import { addToFavorites, removeFromFavorites, selectFavorites } from "../store/favoritesSlice";
import { setActiveTab, selectActiveTab } from "../store/tabSlice";

export default function AnimeDetail() {
  const { id } = useParams<{ id: string }>();
  const [episodesPage, setEpisodesPage] = useState(1);

  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const activeTab = useSelector(selectActiveTab);

  const { data: detail, isLoading: detailLoading, error } = useAnimeDetail(id || '');
  const {
    data: episodesResponse,
    isLoading: episodesLoading,
  } = useAnimeEpisodes(id, episodesPage);

  const { data: relationsData, isLoading: relationsLoading } = useAnimeRelations(id);

  const anime = detail as Anime | undefined;

  const isFavorite = anime ? favorites?.some(fav => fav.mal_id === anime.mal_id) : false;

  const handleAddToFavorites = () => {
    if (anime) {
      if (isFavorite) {
        dispatch(removeFromFavorites(anime.mal_id));
      } else {
        dispatch(addToFavorites(anime));
      }
    }
  };

  const handleTabChange = (tab: 'episodes' | 'details') => {
    dispatch(setActiveTab(tab));
  };

  if (error) return (<ErrorContent />)

  return (
    <div className="px-4 md:px-10 py-5 min-h-screen">
      <div className="relative w-full">
        {detailLoading ? (
          <DetailHeroSkeleton />
        ) : (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-64 md:h-80 xl:h-96 rounded-lg overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${anime?.images?.jpg?.large_image_url ?? anime?.images?.jpg?.image_url})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark dark:from-background-dark via-background-dark/70 dark:via-background-dark/70 to-transparent" />
          </motion.section>
        )}
      </div>

      <div className="mx-auto max-w-screen-xl">
        <div className="relative -mt-32 md:-mt-48 lg:-mt-64 flex flex-col md:flex-row items-end md:items-start gap-6 md:gap-8 pb-8">
          <div className="w-40 md:w-56 lg:w-64 flex-shrink-0">
            {detailLoading ? (
              <DetailPosterSkeleton />
            ) : (
              <motion.div
                className="aspect-[2/3] w-full bg-center bg-no-repeat bg-cover rounded-xl shadow-2xl shadow-primary/20 dark:shadow-primary/30"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45 }}
                style={{ backgroundImage: `url(${anime?.images?.jpg?.image_url})` }}
              />
            )}
          </div>

          <div className="flex flex-col gap-4 py-4 w-full">
            <div className="flex lg:flex-row flex-col flex-wrap justify-between gap-4 items-start">
              <div className="flex flex-col gap-2 min-w-0">
                <h1 className="text-white w-full lg:max-w-[45vw] text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                  {anime?.title ?? "—"}
                </h1>
                <p className="text-white/70 text-lg font-normal">{anime?.title_japanese ?? ""}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToFavorites}
                  className={`rounded-lg h-12 px-4 flex items-center gap-2 border transition-colors ${isFavorite
                    ? 'bg-red-500 border-red-500 text-white hover:bg-red-600'
                    : 'border-gray-300 dark:border-white/10 bg-white dark:bg-background-dark text-gray-700 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-primary/20'
                    }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </button>

                <Link to="/" className="rounded-lg h-12 px-4 flex items-center gap-2 border border-gray-300 dark:border-white/10 bg-white dark:bg-background-dark text-gray-700 dark:text-white/90 hover:bg-gray-50 dark:hover:bg-primary/20 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {(anime?.genres ?? []).map((g) => (
                <div key={g.mal_id} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 px-4">
                  <p className="text-primary dark:text-white text-sm font-medium">{g.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="lg:col-span-2 xl:col-span-3">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Synopsis</h2>
              <p className="text-gray-700 dark:text-white/80 text-base leading-relaxed">
                {anime?.synopsis ?? "No synopsis available."}
              </p>
            </div>

            <div>
              <div className="border-b border-gray-200 dark:border-white/10 mb-6">
                <nav aria-label="Tabs" className="flex gap-8">
                  <button
                    onClick={() => handleTabChange('episodes')}
                    className={`shrink-0 border-b-2 px-1 pb-3 text-base font-semibold transition-colors ${activeTab === 'episodes'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 dark:text-white/60 hover:text-primary'
                      }`}
                  >
                    Episodes
                  </button>
                  <button
                    onClick={() => handleTabChange('details')}
                    className={`shrink-0 border-b-2 px-1 pb-3 text-base font-semibold transition-colors ${activeTab === 'details'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 dark:text-white/60 hover:text-primary'
                      }`}
                  >
                    Details
                  </button>
                </nav>
              </div>

              <TabContent
                anime={anime}
                episodesResponse={episodesResponse}
                episodesLoading={episodesLoading}
                episodesPage={episodesPage}
                setEpisodesPage={setEpisodesPage}
              />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white dark:bg-white/5 p-5 rounded-xl border border-gray-200 dark:border-white/10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Info</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Type:</span> <span className="text-gray-900 dark:text-white font-medium">{anime?.type ?? "—"}</span></li>
                <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Status:</span> <span className="text-gray-900 dark:text-white font-medium">{anime?.status ?? "—"}</span></li>
                <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Aired:</span> <span className="text-gray-900 dark:text-white font-medium">{anime?.aired?.string ?? "—"}</span></li>
                <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Episodes:</span> <span className="text-gray-900 dark:text-white font-medium">{anime?.episodes ?? "—"}</span></li>
                <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Studios:</span> <span className="text-gray-900 dark:text-white font-medium">{(anime?.studios ?? []).map(s => s.name).join(", ") || "—"}</span></li>
              </ul>
            </div>

            <div className="bg-white dark:bg-white/5 p-5 rounded-xl border border-gray-200 dark:border-white/10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Ratings</h3>
              <div className="flex justify-around items-center text-center">
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="text-yellow-400" />
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{anime?.score ?? "—"}</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-white/60">MyAnimeList</p>
                </div>
              </div>
            </div>

            <div className="bg-transparent p-0 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Related Anime</h3>
              <div className="space-y-4">
                {relationsLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-12 bg-primary/10 dark:bg-primary/10 rounded" />
                    <div className="h-12 bg-primary/10 dark:bg-primary/10 rounded" />
                  </div>
                ) : (
                  relationsData?.map((relGroup: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <p className="text-xs text-primary/80 dark:text-primary/80 font-medium">{relGroup.relation}</p>
                      {relGroup.entry?.slice(0, 3).map((r: any) => (
                        <div key={r.mal_id} className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-3 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors border border-gray-200 dark:border-white/5">
                          <div className="w-16 flex-shrink-0">
                            {r.images?.jpg?.image_url ? (
                              <img
                                src={r.images.jpg.image_url}
                                alt={r.name}
                                className="aspect-[2/3] w-full object-cover rounded-md"
                              />
                            ) : (
                              <div className="aspect-[3/3] bg-primary/10 dark:bg-primary/20 rounded-md flex items-center justify-center">
                                <Film className="w-6 h-6 text-primary dark:text-primary/80" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-white/60">{relGroup.relation}</p>
                            <a className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors" href={`/anime/${r.mal_id}`}>{r.name}</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}