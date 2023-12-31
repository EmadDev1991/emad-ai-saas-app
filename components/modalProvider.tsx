'use client'

import { useEffect, useState } from "react"
import ProModal from "./proModal"

const ModalProvider = () => {
    const [isMounted, setIsMounted ] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    }, [])

 if(!isMounted) return

  return (
    <>
    <ProModal/>
    </>
  )
}

export default ModalProvider