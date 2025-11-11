import type { Anime } from '../../../../type/index';

interface DetailsTabProps {
  anime: Anime | undefined;
}

export default function DetailsTab({ anime }: DetailsTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-lg border border-gray-200 dark:border-white/10">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Detailed Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">General Info</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Type:</span> <span className="text-gray-900 dark:text-white font-medium">{anime?.type ?? "—"}</span></li>
              <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Status:</span> <span className="text-gray-900 dark:text-white font-medium">{anime?.status ?? "—"}</span></li>
              <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Aired:</span> <span className="text-gray-900 dark:text-white font-medium">{anime?.aired?.string ?? "—"}</span></li>
              <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Episodes:</span> <span className="text-gray-900 dark:text-white font-medium">{anime?.episodes ?? "—"}</span></li>
              <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Duration:</span> <span className="text-gray-900 dark:text-white font-medium">{anime?.duration ?? "—"}</span></li>
              <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Rating:</span> <span className="text-gray-900 dark:text-white font-medium">{anime?.rating ?? "—"}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Production</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-gray-600 dark:text-white/60">Studios:</span> <span className="text-gray-900 dark:text-white font-medium">{(anime?.studios ?? []).map(s => s.name).join(", ") || "—"}</span></li>
              <li className="flex flex-col gap-1 justify-between">
                <p className="text-gray-600 dark:text-white/60">Producers:</p>
                <p className="text-gray-900 dark:text-white font-medium">{(anime?.producers ?? []).map(p => p.name).join(", ") || "—"}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}