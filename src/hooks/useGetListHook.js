import React, { useEffect, useState } from 'react'
import ServiciosService from '../services/Servicios.service';

function useGetListHook({
    defaultQuery
}={}) {
    const [query, setQuery] = useState(defaultQuery);
    const [response, setResponse] = useState({items:[],total:0});
    const [isLoading, setIsLoading] = useState(false);
    
    const request = () => {
        
        setIsLoading(true);
        ServiciosService.getList(query).then((newResponse)=>{
            if(newResponse){
                let id = 0;
                const {planes} = newResponse.response;
                const items = [];
                planes.forEach(({plan,nombre,periodos})=>{
                    periodos.forEach(({periodo,valor})=>{
                        id = id + 1;
                        items.push({
                            id,
                            plan,
                            nombre,
                            periodo,
                            valor,
                        })
                    })
                })
                setResponse({
                    items,
                    total: items.length,
                });
            }
        })
        .finally(()=>{
            setIsLoading(false);
        });
    }

    useEffect(() => {
        request();
        return () => {
            
        }
    }, [query])

    return {response, setQuery, isLoading };
}

useGetListHook.defaultProps = {
    defaultQuery:{},
}

export default useGetListHook
