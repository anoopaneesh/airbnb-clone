import {useContext,createContext, useState} from 'react'
import DialogBox from '../components/DialogBox'

interface DialogContextProps{
    isOpen:boolean,
    setIsOpen:any
}
const DialogContext = createContext<DialogContextProps>({} as DialogContextProps)

const DialogProvider = ({children}:any) => {
    let [isOpen, setIsOpen] = useState(false)
    return <DialogContext.Provider value={{isOpen,setIsOpen}}>
        {children}
        <DialogBox isOpen={isOpen} setIsOpen={setIsOpen}/>
    </DialogContext.Provider>
}

export default DialogProvider

export const useDialog = () => useContext(DialogContext)