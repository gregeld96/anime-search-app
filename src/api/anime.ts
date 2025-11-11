import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const searchAnime = async (query: string, page: number) => {
    try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime`, {
            params: { q: query, page, limit: 24 },
        });

        return res.data.data;
    } catch (err: any) {
        if (err.response?.status === 429) {
            console.warn("Rate limited. Retrying...");
            await new Promise((res) => setTimeout(res, 1200)); // wait 1.2s
            return searchAnime(query, page); // retry once
        }

        throw err;
    }
};

export const getAnimeDetail = async (id: string) => {
    try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        return res.data.data;
    } catch (err: any) {
        if (err.response?.status === 429) {
            await new Promise((res) => setTimeout(res, 1000));
            return getAnimeDetail(id);
        }

        throw err;
    }
};

export const useSearchAnime = (query: string, page: number) =>
    useQuery({
        queryKey: ["anime-search", query, page],
        queryFn: () => searchAnime(query, page),
        retry: 2,
        staleTime: 5000,
        refetchOnWindowFocus: false
    });

export const useAnimeDetail = (id: string) =>
    useQuery({
        queryKey: ["anime-detail", id],
        queryFn: () => getAnimeDetail(id),
        retry: 2,
        refetchOnWindowFocus: false
    });


// Episodes
export const getAnimeEpisodes = async (id: string, page = 1) => {
    const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}/videos/episodes`, {
        params: { page },
    });
    return res.data;
};

export const useAnimeEpisodes = (id?: string, page = 1) =>
    useQuery({
        queryKey: ["anime-episodes", id, page],
        queryFn: () => getAnimeEpisodes(id!, page),
        enabled: Boolean(id),
        retry: 2,
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
    });

// Relations (recommendations / related)
export const getAnimeRelations = async (id: string) => {
    const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}/relations`);
    return res.data.data; // array of relation groups
};

export const useAnimeRelations = (id?: string) =>
    useQuery({
        queryKey: ["anime-relations", id],
        queryFn: () => getAnimeRelations(id!),
        enabled: Boolean(id),
        retry: 1,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });