export const headersFebraban = (req, res, next) => {
  res.set('Content-Type', 'application/json')
  res.set('x-v', '1.0.0')
  res.set('Content-Encoding', 'UTF-8')
  next()
}
