import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import PlanItem from '../components/PlanItem';

function CartPage() {
    const items = useSelector((state) => state.cart.items)
    const search = useSelector((state) => state.common.search)
    
    const filtered = useMemo(() => {
        let currentItems = [];
        if(items){
            const toSearch = String(search).toLowerCase();
            if(toSearch.length>0){
                currentItems = [...items].filter(it=>
                    String(it.nombre).toLowerCase().startsWith(toSearch) ||
                    String(it.valor).includes(toSearch) ||
                    String(it.periodo).includes(toSearch)
                );
            } else {
                currentItems = [...items];
            }
        }
        return currentItems;
    }, [search,items])
    
    return (
        <div className="mt-5">
            <div className="row">
                <div className="col-12">
                    {
                        filtered.map((plan)=>{
                            return <PlanItem item={plan} key={plan.id_producto} toRemove/>;
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CartPage
