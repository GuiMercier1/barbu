import { ReactNode } from 'react'
import useSpacing from '../../helpers/useSpacing'
import { ImCross } from 'react-icons/im'
import useModal from '../../helpers/useModal'

type ModalContentProps = {
    title: string
    children: ReactNode
}

const ModalContent = ({ title, children }: ModalContentProps) => {
    const { setVisible } = useModal()

    const spacing = useSpacing()

    return (
        <div style={{ minWidth: 300 }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: spacing / 2,
                }}>
                <h3 style={{ margin: 0 }}>{title}</h3>
                <div>
                    <ImCross style={{ cursor: 'pointer' }} onClick={() => setVisible(false)} />
                </div>
            </div>
            <div
                style={{
                    padding: spacing / 2,
                }}>
                {children}
            </div>
        </div>
    )
}

export default ModalContent
