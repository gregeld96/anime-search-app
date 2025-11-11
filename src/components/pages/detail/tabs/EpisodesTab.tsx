import { Film } from 'lucide-react';
import type { EpisodesTabProps } from '../../../../type/index';

export default function EpisodesTab({ 
  episodesResponse, 
  episodesLoading, 
  episodesPage, 
  setEpisodesPage 
} : EpisodesTabProps) {
  return (
    <div className="space-y-4 max-h-[450px] overflow-auto">
      {episodesLoading && !episodesResponse ? (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 bg-gray-100 dark:bg-white/5 p-3 rounded-lg animate-pulse">
              <div className="w-40 h-24 bg-primary/10 dark:bg-primary/10 rounded-md" />
              <div className="flex-grow">
                <div className="h-4 bg-primary/10 dark:bg-primary/10 rounded w-1/3 mb-2" />
                <div className="h-3 bg-primary/10 dark:bg-primary/10 rounded w-3/4" />
              </div>
              <div className="w-14 h-4 bg-primary/10 dark:bg-primary/10 rounded" />
            </div>
          ))}
        </>
      ) : (
        <>
          {(episodesResponse?.data ?? []).map((ep: any) => (
            <div key={ep.mal_id} className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-3 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors border border-gray-200 dark:border-white/5">
              <div className="w-40 flex-shrink-0">
                {ep?.images?.jpg?.image_url ? (
                  <img
                    src={ep?.images?.jpg?.image_url ?? ""}
                    alt={ep.title}
                    className="aspect-video w-full object-cover rounded-md"
                  />
                ) : (
                  <div className="aspect-video bg-primary/10 dark:bg-primary/20 rounded-md flex items-center justify-center">
                    <Film className="w-6 h-6 text-primary dark:text-primary/80" />
                  </div>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm text-primary/80 dark:text-primary/80">Episode {ep.episode || ep.mal_id}</p>
                <h3 className="font-bold text-gray-900 dark:text-white truncate">{ep.title || ep.title_japanese || "Episode"}</h3>
              </div>
              <span className="text-sm text-gray-500 dark:text-white/60 ml-auto">{ep?.duration ?? "—"}</span>
            </div>
          ))}

          {episodesResponse?.pagination?.has_next_page && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setEpisodesPage(episodesPage + 1)}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Load more episodes
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}