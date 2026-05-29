import { useEffect } from 'react'

export default function SEO({ title, description }) {
  useEffect(() => {
    document.title = `${title} | Yukti Artful`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [description, title])

  return null
}
