import Container from "./Container";
import DiamondIcon from "./DiamondIcon";

function Header() {
  return (
    <header class="relative z-50 pb-11 lg:pt-11">
      <Container class="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div class="mt-10 lg:mt-0 lg:grow lg:basis-0">
          {/* <span class="leading-[3rem]">Logo</span> */}
        </div>
        <div class="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm text-blue-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
          <div class="mx-auto flex items-center gap-4 px-4">
            <p>Random</p>
            <DiamondIcon class="h-1.5 w-1.5 overflow-visible fill-current stroke-current" />
            <p>Episode</p>
            <DiamondIcon class="h-1.5 w-1.5 overflow-visible fill-current stroke-current" />
            <p>Picker</p>
          </div>
        </div>
        <div class="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end"></div>
      </Container>
    </header>
  );
}

export default Header;
