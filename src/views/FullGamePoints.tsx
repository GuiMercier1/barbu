import { CSSProperties, ReactNode } from 'react'
import ModalContent from '../components/modal/ModalContent'
import { Player } from '../model'

type FullGamePointsProps = {
    players: Player[]
}

const FullGamePoints = ({ players }: FullGamePointsProps) => {
    return (
        <ModalContent title="Total des points">
            <table style={{ minWidth: '100%' }}>
                <thead>
                    <tr>
                        <TableCell>Nom du joueur</TableCell>
                        <TableCell>Score</TableCell>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player.id}>
                            <TableCell>{player.name}</TableCell>
                            <TableCell>
                                {player.games
                                    .map((game) => game.gamePoints)
                                    .reduce((prev, current) => prev + current, 0)}
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </ModalContent>
    )
}

type TableCellProps = {
    style?: CSSProperties
    children: ReactNode
}

const TableCell = ({ style, children }: TableCellProps) => {
    return <td style={{ padding: 10, ...style }}>{children}</td>
}

export default FullGamePoints
