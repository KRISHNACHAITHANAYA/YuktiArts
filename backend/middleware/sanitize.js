function sanitizeValue(value) {
  if (Array.isArray(value)) return value.map(sanitizeValue)
  if (!value || typeof value !== 'object') return value

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !key.startsWith('$') && !key.includes('.'))
      .map(([key, item]) => [key, sanitizeValue(item)]),
  )
}

export default function sanitize(req, _res, next) {
  req.body = sanitizeValue(req.body)
  req.params = sanitizeValue(req.params)
  next()
}
