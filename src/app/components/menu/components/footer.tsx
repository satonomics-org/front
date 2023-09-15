import { Interactive } from '/src/components'

export const Footer = () => {
  return (
    <div class="space-y-2 px-2 py-4">
      <Interactive
        component={'a'}
        rightIcon={IconTablerAt}
        href="mailto:contact@satonomics.xyz"
        full
      >
        <span class="w-full text-left">Contact</span>
      </Interactive>
      <Interactive
        component={'a'}
        rightIcon={IconTablerBrandGithub}
        href="https://github.com/satonomics-org"
        full
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="w-full text-left">Source Code</span>
      </Interactive>
      <Interactive
        component={'a'}
        rightIcon={IconTablerAnalyze}
        href="https://counter.dev/dashboard.html?user=wjfpwo2032fk&token=GAP9y3FM4o0%3D"
        full
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="w-full text-left">Analytics</span>
      </Interactive>

      {/* <Button
          color="orange"
          class="leading-tighter select-all break-all text-left text-sm"
        >
          bc1qelhk22gh3hrycyqvager5803ce2z49mh4k2zja
        </Button> */}
      {/* <Button color="yellow" class="select-all break-all text-left text-sm">
          lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhkcmmrv9k8x6rpd4jnzvcv2kqc0
        </Button> */}
    </div>
  )
}
