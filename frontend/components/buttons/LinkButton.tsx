import { ReactNode } from "react"
export const LinkButton = ({children, onClick}:{
        children:ReactNode,
        onClick: () => void
    }) => {
        return <div className="px-2 py-4 cursor-pointer hover:bg-slate-200" onClick={onClick}>{children}</div>
    }