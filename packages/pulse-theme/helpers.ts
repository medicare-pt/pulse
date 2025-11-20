export const rescue = (fn, fallback = null) => {
    try {
        const result = fn()
        return result === undefined ? fallback : result
    } catch (error) {
        return (typeof fallback === 'function') ? fallback(error) : fallback
    }
}

export const rem = px => `${(px/16).toFixed(3).replace(/\.?0+$/, '')}rem`

export const color = value => String(value||'').slice(0,7)

export const mapColors = (colors, fallback = 500) => {
    return Object.assign(
        Object.fromEntries(Object.entries(colors).map(([key, val]) => [key, color(val.value)])),
        fallback ? { DEFAULT: color(colors[fallback].value) } : {},
    )
}

export const mapTypography = cases => {
    return Object.fromEntries(
        Object.entries(cases)
            .filter(([key]) => !key.endsWith('bold'))
            .map(([key, { value }]) => {
                const selector = `.${key.trim().replace(/\s+/g,'-')}`
                const style = {
                    fontSize: rem(value.fontSize),
                    lineHeight: rem(value.lineHeight),
                    fontWeight: String(value.fontWeight),
                    textTransform: value.textCase,
                }
                return [selector, style]
            })
    )
}
