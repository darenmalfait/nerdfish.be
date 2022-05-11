interface BlockquoteProps {
  children: React.ReactNode[]
}

function Blockquote({ children }: BlockquoteProps) {
  return (
    <blockquote className="mx-auto max-w-screen-sm font-serif text-2xl not-italic leading-normal border-none md:pl-0 md:text-4xl mx-automax-w-screen-md text-primary font-bold! px-small md:pr-default">
      <q>{children}</q>
    </blockquote>
  )
}

export { Blockquote }
