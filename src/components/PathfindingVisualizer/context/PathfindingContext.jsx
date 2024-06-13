import { useContext, useState,createContext, useEffect, useRef } from "react";
import { getGrid } from "../utils/startingGrid";

const context = createContext()

export const useParams=()=>{
    return useContext(context)
}

export const ParamsProvider = ({children}) => {

     const [mode,setmode] = useState(null)
     const [algo,setalgo] = useState('')
     const [run,setrun] = useState(false)
     const [grid,setgrid] = useState(getGrid(25,25))
     const [editing,seteditFlag] = useState(false)
     const [res,setres] = useState(false)
     const start=useRef({x:12,y:12})
     const end=useRef({x:17,y:17})
    
    useEffect(()=>{
      
      restart(),
      setStartEnd()
    },[res])


     function restart(){
      setgrid(getGrid(25,25))
     }

     function setStartEnd(){
        start.current={ x: 12, y: 12 };
        end.current={x:17, y:17};
     }

      return (<div>
      <context.Provider value={{mode,
        setmode,
        algo,
        setalgo,
        grid,
        setgrid,
        setres,
        editing,
        seteditFlag,
        start,end,run,setrun,res}}>
        {children}
      </context.Provider>
      </div>)

}