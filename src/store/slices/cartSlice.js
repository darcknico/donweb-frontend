import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ServiciosService from '../../services/Servicios.service';

export const listCart = createAsyncThunk(
  "cart/list", async () => ServiciosService.getCartList().then(({response})=>{
    return response;
  })
);

export const addItem = createAsyncThunk(
  "cart/add", async (item) => ServiciosService.addItem(item).then(({response})=>{
    return {
      ...item,
      id_producto: response.id_producto,
    };
  })
);

export const removeItem = createAsyncThunk(
  "cart/remove", async (id) => ServiciosService.removeItem(id).then(()=>{
    return {id_producto:id};
  })
);


export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(listCart.fulfilled, (state, { payload }) => {
      state.items = payload;
    });
    builder.addCase(addItem.fulfilled, (state, { payload }) => {
      const { items } = state;
      const aux = [...items];
      aux.push({
        ...payload,
      });
      state.items = aux;
    });
    builder.addCase(removeItem.fulfilled, (state, { payload }) => {
      const { items } = state;
      const { id_producto } = payload;
      const aux = [...items];
      const index = aux.findIndex(item=>item.id_producto === id_producto);
      if(index>=0){
        aux.splice(index,1);
        state.items = aux;
      }
    });
  }
})

export const { } = cartSlice.actions

export default cartSlice.reducer