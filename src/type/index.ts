export interface AnimeImageVariant {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
}

export interface AnimeImages {
    jpg: AnimeImageVariant;
    webp?: AnimeImageVariant;
}

export interface Anime {
    mal_id: number;
    title: string;
    title_japanese?: string | null;
    title_english?: string | null;
    type?: string | null;
    year?: number | null;
    images: AnimeImages;
    synopsis?: string | null;
    background?: string | null;
    rating?: string | null;
    scored_by?: number | null;
    score?: number | null;
    duration?: string | null;
    status?: string | null;
    episodes?: number | null;
    aired?: { from?: string | null; to?: string | null; string?: string };
    producers?: { name: string }[];
    studios?: { name: string }[];
    genres?: { mal_id: number; name: string }[];
    themes?: { mal_id: number; name: string }[];
    demographics?: { mal_id: number; name: string }[];
}

export interface EpisodesTabProps {
    episodesResponse: any;
    episodesLoading: boolean;
    episodesPage: number;
    setEpisodesPage: (page: number) => void;
}