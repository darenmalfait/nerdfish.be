function Hamburger({
  open,
  onClick,
}: {
  open: boolean
} & JSX.IntrinsicElements['button']) {
  return (
    <button
      className="w-9 h-9 rounded-lg md:hidden"
      type="button"
      name="toggle-navigation"
      aria-label="toon navigatie"
      onClick={onClick}
    >
      <svg fill="currentColor" viewBox="0 0 20 20" className="ml-auto w-6 h-6">
        {!open && (
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        )}
        {open && (
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        )}
      </svg>
    </button>
  )
}

export { Hamburger }
