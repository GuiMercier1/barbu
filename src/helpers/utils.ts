type RGB = {
    r: number
    g: number
    b: number
}

export function hexToRgb(hex: string): RGB {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    if (!result) {
        console.log('Error while encoding hex color', hex, result)
        throw 'Error while encoding hex color'
    }

    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)

    return { r, g, b }
}
