import { Button, Interactive, Labeled } from '/src/components'

export const Footer = () => {
  return (
    <div class="space-y-4 p-2 pb-4">
      <Labeled label="Github">
        <Interactive component={'a'} href="https://github.com/sholong-org" full>
          <span class="w-full text-left">Source Code</span>
        </Interactive>
      </Labeled>
      <Labeled label="NOSTR" color="violet">
        <Button color="violet" full>
          <span class="w-full select-all text-left">
            pqopkdqwpdokqwdpokqwdpok
          </span>
        </Button>
      </Labeled>
      <Labeled label="Bitcoin" color="orange">
        <Button
          color="orange"
          class="leading-tighter select-all break-all text-left text-sm"
        >
          bc1qelhk22gh3hrycyqvager5803ce2z49mh4k2zja
        </Button>
      </Labeled>
      <Labeled label="Lightning" color="yellow">
        <Button color="yellow" class="select-all break-all text-left text-sm">
          lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhkcmmrv9k8x6rpd4jnzvcv2kqc0
        </Button>
      </Labeled>
    </div>
  )
}
