import { Button, Interactive, Labeled } from '/src/components'

export const Footer = () => {
  return (
    <div class="space-y-4 p-2 pb-4">
      <Labeled label="Github">
        <Interactive
          component={'a'}
          href="https://github.com/sholong-org"
          target="_blank"
          full
        >
          <span class="w-full text-left">Source Code</span>
        </Interactive>
      </Labeled>
      {/* <Labeled label="NOSTR" color="violet">
          <Interactive
            component={'a'}
            href="https://github.com/sholong-org"
            color="violet"
            full
            class="w-full select-all text-left"
          >
            pqopkdqwpdokqwdpokqwdpok
          </Interactive>
        </Labeled>
        <Labeled label="Bitcoin" color="orange">
          <Interactive
            component={'a'}
            href="bitcoin:bc1qelhk22gh3hrycyqvager5803ce2z49mh4k2zja"
            target="_blank"
            color="orange"
            full
          >
            Donate
          </Interactive>
          <p class="leading-tighter select-all break-all px-2 text-left text-sm">
            bc1qelhk22gh3hrycyqvager5803ce2z49mh4k2zja
          </p>
        </Labeled>
        <Labeled label="Lightning" color="yellow">
          <Interactive
            component={'a'}
            href="lightning:lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhkcmmrv9k8x6rpd4jnzvcv2kqc0"
            target="_blank"
            color="yellow"
            class="select-all break-all text-left text-sm"
          >
            lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhkcmmrv9k8x6rpd4jnzvcv2kqc0
          </Interactive>
        </Labeled> */}
    </div>
  )
}
