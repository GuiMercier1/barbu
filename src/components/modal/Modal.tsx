import { ReactNode, useEffect } from 'react'
import useModal from '../../helpers/useModal'

type ModalProps = {
    children: ReactNode
    open: boolean
    onClose: () => void
}

const Modal = ({ children, open, onClose }: ModalProps) => {
    const { setContent, visible, setVisible } = useModal()

    useEffect(() => {
        setVisible(open)
    }, [open])

    useEffect(() => {
        setContent(children)
    }, [children])

    useEffect(() => {
        if (!visible) {
            setContent(null)
            onClose()
        }
    }, [visible])

    return <></>
}

export default Modal
