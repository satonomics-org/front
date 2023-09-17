interface Props extends ParentProps {
  onClose?: () => void
}

export const Sticky = (props: Props) => {
  return (
    <div class="fixed inset-x-0 top-0 z-10 flex items-center gap-x-6 border border-white bg-black px-6 py-2 sm:px-3 sm:before:flex-1">
      <p class="leading-6 text-white">{props.children}</p>
      <div class="flex flex-1 justify-end">
        <button
          type="button"
          class="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          onClick={props.onClose}
        >
          <span class="sr-only">Dismiss</span>
          <svg
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
