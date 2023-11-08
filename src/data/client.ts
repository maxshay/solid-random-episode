const OMDB_API_KEY = "59c4edd8";
const OMDB_BASE_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

const EPISODATE_BASE_URL = `https://www.episodate.com`;

export const fetchSeries = async (seriesName: string) =>
  (await fetch(`${OMDB_BASE_URL}&s=${seriesName}&type=series`)).json();

export const fetchSeriesDetails = async (permaLinkName: string) =>
  (
    await fetch(`${EPISODATE_BASE_URL}/api/show-details?q=${permaLinkName}`)
  ).json();
