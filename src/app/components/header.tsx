import Logo from '/src/assets/svgs/logo/current.svg'

export const Header = () => {
  return (
    <a class="flex items-center justify-center p-2" href="/">
      <span class="-ml-4 inline-block h-8 w-8 lg:h-14 lg:w-14">
        <Logo />
      </span>
      <span class="mt-1 font-druk text-4xl lg:text-7xl">SATONOMICS</span>
    </a>
  )
}
