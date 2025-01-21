import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
    error: parseAsString,
    token: parseAsString,
});
