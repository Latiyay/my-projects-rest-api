import { APIError } from '../utils/error.js'

export function rateLimitMiddleware(bindingName) {
  return async (c, next) => {
    const limiter = c.env[bindingName]

    if (!limiter) {
        await next()
        return
    }

    const ip = c.req.headers('cf-connecting-ip') ?? 'anonymous'
    const key = `${c.req.path}:${ip}`

    const {success } = await limiter.limit({key})

    if (!success) {
        throw new APIError(
            429,
            'TOO_MANY_REQUESTS',
            'Too many requests, please try again later.',
        )
    }

    await next()
    }
}