import axios from "axios";

const url_path = 'http://c1300044.ferozo.com';

function getList(){
    return axios.get([url_path,'getListado.php'].join('/'));
}

/**
 * plan
 * periodo
 * @param {Producto} item 
 * @returns 
 */
function addItem(item){
    return axios.get([url_path,'agregarItem.php'].join('/'),{
        params:item,
    });
}

function getCartList(){
    return axios.get([url_path,'getListadoCarrito.php'].join('/'));
}

function removeItem(id){
    return axios.get([url_path,'removerItem.php'].join('/'),{
        params:{
            id_producto: id,
        }
    });
}

const ServiciosService ={
    getList,
    addItem,
    getCartList,
    removeItem,
};
export default ServiciosService;