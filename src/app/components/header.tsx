import Logo from '/src/assets/svgs/logo/current.svg'

export const Header = () => {
  return (
    <a class="flex items-center justify-center p-2 lg:p-4" href="/">
      <span class="-ml-4 inline-block h-8 w-8 lg:h-16 lg:w-16">
        <Logo />
      </span>
      <span class="mt-1 font-druk text-4xl lg:text-7xl">SATONOMICS</span>
      {/* <span class="absolute bottom-0 right-0 -z-10 pr-2 font-druk text-2xl uppercase text-white/40 lg:text-4xl">
        {packageJSON.version}
      </span> */}
    </a>
  )
}
