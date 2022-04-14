import { createContext, Fragment, ReactNode, useContext, useState } from 'react'
import StyleHelper from './StyleHelper'

type ModalContext = {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    setContent: React.Dispatch<React.SetStateAction<ReactNode>>
    modal: ReactNode
}

const ModalContext = createContext<ModalContext>(null as unknown as ModalContext)

type ProvideModalProps = {
    children: ReactNode
}

export function ProvideModal({ children }: ProvideModalProps) {
    const modalData = useProvideModal()

    return (
        <ModalContext.Provider value={modalData}>
            <Fragment>
                {children}
                {modalData.modal}
            </Fragment>
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    return useContext(ModalContext)
}

const useProvideModal = (): ModalContext => {
    const [visible, setVisible] = useState<boolean>(false)
    const [content, setContent] = useState<ReactNode | null>(null)

    const onContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
    }

    const modal = visible ? (
        <div
            style={{
                position: 'absolute',
                display: 'flex',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgb(0,0,0,0.6)',
                zIndex: StyleHelper.zIndexes.modal,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={() => setVisible(false)}>
            <div style={{ minWidth: 100, minHeight: 100, backgroundColor: 'white' }} onClick={onContentClick}>
                {content}
            </div>
        </div>
    ) : null

    return {
        visible,
        setVisible,
        setContent,
        modal,
    }
}

export default useModal
