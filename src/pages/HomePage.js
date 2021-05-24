import React, { useMemo } from 'react'
import PlanItem from '../components/PlanItem';
import useGetListHook from '../hooks/useGetListHook'
import { useSelector } from 'react-redux'

function HomePage() {

    const { response, isLoading } = useGetListHook();

    const search = useSelector((state) => state.common.search)
    
    const items = useMemo(() => {
        let currentItems = [];
        if(response && response.items){
            const toSearch = String(search).toLowerCase();
            if(toSearch.length>0){
                currentItems = [...response.items].filter(it=>
                    String(it.nombre).toLowerCase().startsWith(toSearch) ||
                    String(it.valor).includes(toSearch) ||
                    String(it.periodo).includes(toSearch)
                );
            } else {
                currentItems = [...response.items];
            }
        }
        return currentItems;
    }, [search,isLoading])
    
    return (
        <div className="mt-5">
            <div className="row my-2">
                <h4 className="text-center">Listado</h4>
            </div>
            <div className="row">
                <div className="col-12">
                    {
                        items.map((plan)=>{
                            return <PlanItem item={plan} key={plan.id} toAdd/>;
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage
