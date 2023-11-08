import { fetchSeries } from "@/data/client";
import { For, Setter, Show, createSignal } from "solid-js";
import { ImSpinner2 } from "solid-icons/im";
import Button from "./layout/Button";

type SeriesResult = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

type SearchSeriesProps = {
  setSelectedShow: Setter<{
    name: string;
    slug: string;
  } | null>;
  setView: Setter<number>;
};

function toLowerDash(text: string) {
  return text.toLocaleLowerCase().replaceAll(" ", "-");
}

function SearchSeries(props: SearchSeriesProps) {
  // form
  const [seriesName, setValue] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [searchError, setSearchError] = createSignal<string | null>(null);

  // data
  const [searchResults, setSearchResults] = createSignal<Array<SeriesResult>>(
    []
  );

  async function searchSeries() {
    setSearchError(null);
    if (seriesName().length < 1) {
      window.alert(`Invalid input: "name" length must be greater than 0.`);
      return;
    }
    setLoading(true);
    const data = await fetchSeries(seriesName());
    setLoading(false);
    if (data.Error) {
      setSearchError(data.Error);
    } else if (!data.Search) {
      window.alert(`Sorry, something went wrong.`);
    } else {
      setSearchResults(data.Search);
    }
  }

  function selectSeries(seriesName: string) {
    console.log(`selected: ${seriesName}`);
  }

  return (
    <>
      <div id="search">
        <label for="seriesName" class="block font-medium leading-6 text-2xl">
          TV Series&#47;Show Name
        </label>
        <div class="mt-4">
          <input
            name="seriesName"
            id="seriesName"
            placeholder="Friends"
            value={seriesName()}
            onInput={(e) => setValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchSeries();
              }
            }}
            class="block w-full bg-transparent rounded-md py-1.5 px-2.5 shadow-sm placeholder:text-gray-400 border border-gray-200 focus:border-white outline-none sm:text-sm sm:leading-6"
          />
          <div class="flex justify-end mt-4">
            <Button
              disabled={loading()}
              onClick={searchSeries}
              class="w-full md:w-auto"
            >
              <Show when={loading()} fallback={"Search"}>
                <ImSpinner2 class="fill-white animate-spin" />
                <span class="ml-1">Searching</span>
              </Show>
            </Button>
          </div>
        </div>
      </div>
      <Show when={searchError()} fallback={null}>
        <div class="text-red-400 text-sm">{searchError()}</div>
      </Show>
      <Show when={searchResults().length > 0}>
        <h1 class="block text-2xl font-medium leading-6 mt-8 mb-4">Results</h1>
        <div id="results" class="mt-4 max-h-[30rem] overflow-y-scroll pr-2.5">
          <ul role="list" class="divide-y divide-gray-200/25">
            <For each={searchResults()}>
              {(series) => (
                <li class="py-4">
                  <div class="flex">
                    <div class="flex-none bg-neutral-200">
                      <img
                        class="object-cover w-52 h-72"
                        src={series.Poster}
                        alt={`${series.Title} poster`}
                      />
                    </div>
                    <div class="mx-4">
                      <h1 class="text-5xl text-neutral-200 whitespace-break-spaces">
                        {series.Title}
                      </h1>
                      <Button
                        onClick={() => {
                          props.setSelectedShow({
                            name: series.Title,
                            slug: toLowerDash(series.Title),
                          });
                          props.setView(1);
                        }}
                        class="mt-2"
                      >
                        select
                      </Button>
                    </div>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>
    </>
  );
}

export default SearchSeries;
