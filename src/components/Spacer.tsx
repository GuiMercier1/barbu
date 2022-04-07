type SpacerProps = {
    half?: boolean
    quarter?: boolean
    double?: boolean
    grow?: boolean
}

export default function Spacer(props: SpacerProps) {
    const { half, double, quarter, grow } = props

    let size = 32
    if (half) size = size / 2
    else if (quarter) size = size / 4
    else if (double) size = size * 2
    return (
        <div
            style={{
                width: size,
                height: size,
                flexShrink: 0,
                flexGrow: grow ? 1 : undefined,
            }}
        />
    )
}
