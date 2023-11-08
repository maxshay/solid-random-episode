import { fetchSeriesDetails } from "@/data/client";
import { Setter, Show, createEffect, createSignal } from "solid-js";
import Button from "./layout/Button";
import { createLocalStore } from "@/utils/localStorage";
import { AiOutlineArrowLeft, AiOutlineUndo } from "solid-icons/ai";

type ChooseEpisodeProps = {
  setSelectedShow: Setter<{
    name: string;
    slug: string;
  } | null>;
  selectedShow: {
    name: string;
    slug: string;
  } | null;
  setView: Setter<number>;
};

type Episdoe = {
  air_date: string;
  episode: number;
  name: string;
  season: number;
};

function encodeEpisode(season: number, episode: number) {
  return `${season}:${episode}`;
}
function decodeEpisode(text: string) {
  const temp = text.split(":");
  return {
    season: temp[0],
    episode: temp[1],
  };
}

function ChooseEpisode(props: ChooseEpisodeProps) {
  const [random, setRandom] = createSignal<{
    season: string;
    episode: string;
  } | null>(null);
  const [episodes, setEpisodes] = createLocalStore<Array<string>>(
    props.selectedShow?.slug ?? "",
    []
  );

  createEffect(async () => {
    if (!props.selectedShow) {
      return;
    }
    // check localstorage
    if (episodes.length > 0) {
      return;
    }
    const data = await fetchSeriesDetails(props.selectedShow.slug);
    if (!data.tvShow.id) {
      window.alert(
        "Something went wrong. We coun't find any episodes for this show\n:("
      );
      return;
    }
    const episodesTemp = data.tvShow.episodes;
    const encodedEpisodes = episodesTemp.map((episode: Episdoe) =>
      encodeEpisode(episode.season, episode.episode)
    );

    setEpisodes(encodedEpisodes);
  });

  function handleChooseRandom() {
    if (!props.selectedShow) {
      return;
    }
    const notPickedEpisodes = episodes.filter((episode) => episode[0] !== "-");

    if (notPickedEpisodes.length < 1) {
      window.alert(
        `You've went through all the episodes of ${props.selectedShow.name}.\nPlease click on the reset button.`
      );
      return;
    }

    let idx = Math.floor(Math.random() * notPickedEpisodes.length);
    const randomEpisode = notPickedEpisodes[idx];

    const decoded = decodeEpisode(randomEpisode);
    setRandom(decoded);

    idx = episodes.indexOf(randomEpisode);
    if (idx !== -1) {
      const episodesCopy = [...episodes];
      episodesCopy[idx] = `-${randomEpisode}`;
      setEpisodes(episodesCopy);
    } else {
      window.alert(`Could not find ${randomEpisode} in list of episodes`);
    }
  }

  function handleReset() {
    const episodesCopy = [...episodes];
    episodesCopy.forEach((episode, index) => {
      if (episode[0] === "-") {
        episodesCopy[index] = episode.slice(1);
      }
    });
    setEpisodes(episodesCopy);
    setRandom(null);
  }

  if (!props.selectedShow) {
    return <div>No Show Selected</div>;
  }

  return (
    <div id="choose" class="-mt-4">
      <div class="text-center">
        <h1 class="text-5xl">
          <span class="text-2xl text-gray-200">Selected Show:</span>{" "}
          {props.selectedShow.name}
        </h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 relative mt-8">
        <div class="flex justify-center md:justify-start">
          <button
            class="inline-flex items-center px-2.5 py-1.5 text-white hover:underline hover:text-indigo-400 mt-4 md:mt-0"
            onClick={() => props.setView(0)}
          >
            <AiOutlineArrowLeft /> <span class="ml-2">Back to Search</span>
          </button>
        </div>
        <div class="flex justify-center">
          <Button
            onClick={handleChooseRandom}
            class="my-4 md:my-0"
            disabled={episodes.length < 1}
            classList={{
              "select-none": episodes.length < 1,
              "cursor-not-allowed": episodes.length < 1,
              "!hover:none": episodes.length < 1,
            }}
          >
            Choose random episode
          </Button>
        </div>
        <div class="flex justify-center md:justify-end">
          <button
            class="inline-flex items-center px-2.5 py-1.5 text-white hover:underline hover:text-indigo-400"
            onClick={handleReset}
          >
            <AiOutlineUndo /> <span class="ml-2">Reset</span>
          </button>
        </div>
      </div>
      <Show when={random()}>
        <h1 class="text-5xl text-center mt-8">
          <span class="text-2xl text-gray-200">season: </span>
          {random()?.season}{" "}
          <span class="text-2xl text-gray-200">season: </span>
          {random()?.episode}
        </h1>
      </Show>
    </div>
  );
}

export default ChooseEpisode;
