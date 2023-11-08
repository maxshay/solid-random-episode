import { createSignal, Match, Show, Switch } from "solid-js";
import Header from "./components/layout/Header";
import SearchSeries from "./components/SearchSeries";
import ChooseEpisode from "./components/ChooseEpisode";

function App() {
  const [view, setView] = createSignal(0);
  const [selectedShow, setSelectedShow] = createSignal<{
    name: string;
    slug: string;
  } | null>(null);

  return (
    <div class="absolute inset-x-0 inset-y-0 overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
      <Header />
      <main>
        <div class="relative pb-20 pt-8 sm:py-12 text-white h-full">
          <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
            <Switch>
              <Match when={view() === 0}>
                <SearchSeries
                  setSelectedShow={setSelectedShow}
                  setView={setView}
                />
              </Match>
              <Match when={view() === 1}>
                <ChooseEpisode
                  setSelectedShow={setSelectedShow}
                  selectedShow={selectedShow()}
                  setView={setView}
                />
              </Match>
            </Switch>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
