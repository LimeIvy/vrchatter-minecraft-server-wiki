import { useState } from 'react'

export function ModIcon({ slug, name }: { slug: string; name: string }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return <div className="text-5xl text-[#3f3f3f]">📦</div>
  }

  return (
    <img
      src={`/mod-icons/${slug}.png`}
      alt={name}
      className="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
    />
  )
}
