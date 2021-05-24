import React, { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux'
import { addItem,removeItem } from '../store/slices/cartSlice';

const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function PlanItem({
    item,
    toAdd,
    toRemove,
}) {
    const {
        id,
        plan,
        nombre,
        periodo,
        valor,
        id_producto,
    } = item;
    const [isLoading, setIsLoading] = useState(false)
    const items = useSelector((state) => state.cart.items)
    const dispatch = useDispatch()

    /*
    const isSelected = useMemo(() => items.findIndex(it=>it.plan === plan && Number(it.periodo) === Number(periodo)) >= 0, [items]);
    */

    const onClickAdd = async () => {
        setIsLoading(true);
        if(toAdd && !toRemove){
            await dispatch(addItem(item))
        } else if(!toAdd && toRemove) {
            await dispatch(removeItem(id_producto))
        }
        setIsLoading(false);
    }

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
                <div className="row">
                    <div className="col-4">
                        <h5 className="card-title">{nombre}</h5>
                    </div>
                    <div className="col-4 col-md-6">
                        <div className="row">
                            <h4>
                                {`${periodo} Mo`}
                            </h4>
                            <h5>{formatter.format(valor)}</h5>
                        </div>
                    </div>
                    <div className="col-4 col-md-2 d-flex">
                        <button type="button" disabled={isLoading} className="btn btn-outline-secondary btn-block d-flex flex-row justify-content-center align-items-center" onClick={onClickAdd}>
                            { 
                                toAdd && !toRemove && (<b>Agregar al carrito</b>)
                            }
                            {
                                !toAdd && toRemove && (<b>Quitar del carrito</b>)
                            }
                            <FontAwesomeIcon className="mr-2" icon={['fas','cart-plus']} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

PlanItem.defaultProps = {
    toAdd: false,
    toRemove: false,
}

export default PlanItem

