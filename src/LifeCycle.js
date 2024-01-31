import React,{useEffect,useState} from "react";


const UnMounttest = ()=>{
    useEffect(()=>{
        console.log('mount')

        return ()=>{
            console.log('unmount')
        };
    },[])
    return <div>UnMounttest component</div>
}


const LifeCycle = ()=>{
    const [isvisible,setIsvisible] = useState(false);
    const toggle = () => setIsvisible(!isvisible)

    return (
        <div style={{padding : 20}}>
            <button onClick={toggle}>on/off</button>
            {isvisible && <UnMounttest />}
        </div>
    )
};

export default LifeCycle;