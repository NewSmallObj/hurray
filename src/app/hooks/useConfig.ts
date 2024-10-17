import { useEffect } from "react"

export const useConfig = () => {
  useEffect(()=>{
    
  },[])
  const getConfig = ()=>{
    return window.config
  }
  
  return {
    getConfig
  }
}