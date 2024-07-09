import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


// const initialstate = {

//     currency:{} ,
//     amount:0,
//     fromCurrency:'USD',
//     toCurrency:'INR',
//     convertedAmount:'',
//     Loading:'idle'
// }

export const fetchApi = createAsyncThunk('converter/fetchApi' , async () => {
    const res = await fetch('https://api.frankfurter.app/currencies');
    const data =await res.json();
    console.log(data)
    return data;
})

export const convertercurrency = createAsyncThunk('dataconverter/convertercurrency' , async ({fromCurrency,toCurrency,amount}) => {
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
    const data =await res.json();
    console.log(toCurrency)
    return data.rates[toCurrency];
})

const converterSlice = createSlice({
    name: 'converter',
    initialState:{
        currency:{} ,
        amount:0,
        fromCurrency:'USD',
        toCurrency:'INR',
        convertedAmount:'',
        Loading:'idle'
    },
    reducers:{
        setamount:(state,action) => {
            state.amount=action.payload;
        },
        setfromcurrency:(state,action) => {
            console.log(action)
            state.fromCurrency=action.payload;
        },
        settocurrency:(state,action) =>{
            state.toCurrency=action.payload;
        },
        setconvertedAmount:(state,action) => {
            state.convertedAmount=action.payload;
        },
        convertCurrency: (state) => {
            if (state.fromCurrency === state.toCurrency) {
              state.convertedAmount = state.amount;
            } else {
              // Your conversion logic here, for example:
              // state.convertedAmount = state.amount * conversionRate;
            }
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApi.pending,(state) => {
            state.Loading = 'idle';
        })
        builder.addCase(fetchApi.fulfilled,(state,action) => {
            state.Loading = 'succeded';
            state.currency = action.payload;
        })
        builder.addCase(fetchApi.rejected,(state) => {

            state.Loading = 'failed';
        })
        builder.addCase(convertercurrency.pending,(state) => {
            state.Loading = 'idle';
        })
        builder.addCase(convertercurrency.fulfilled,(state,action) => {
            state.Loading = 'succeeded';
            state.convertedAmount=action.payload;
        })
        builder.addCase(convertercurrency.rejected,(state) => {
            state.Loading = 'failed';
        })
    }
})

export const {
    setamount,
    setfromcurrency,
    settocurrency,
    setconvertedAmount,
    convertCurrency
} = converterSlice.actions

export default converterSlice.reducer;























// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialstate = {
//     currency : {},
//     Amount : 0,
//     fromcurrency:'USD',
//     tocurrency : 'INR',
//     convertedamount : '',
//     Loading : 'loading'
// }

// const fetchApi = createAsyncThunk('converter/fetchApi' , async ()=>{

//     const response = await fetch('https://api.frankfurter.app/currencies')
//     const data = await response.json();
//     console.log(data)
//     return data ;
// })

// const converterSlice = createSlice({
//     name : 'converter',
//     Initialstate:initialstate,
//     reducers: {
//         setamount: (state,action) => {
//             state.Amount=action.payload
//         },
//         setfromcurrency: (state,action) => {
//             state.fromcurrency=action.payload
//         },
//         settocurrency: (state,action) => {
//             state.tocurrency=action.payload
//         },
//         setconvertedamount: (state,action) => {
//             state.convertedamount=action.payload
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchApi.pending, (state) => {
//             state.Loading='loading'
//         });
//         builder.addCase(fetchApi.fulfilled, (state,action) =>{
//             state.Loading='succeded'
//             state.currency = action.payload
//         })
//         builder.addCase(fetchApi.rejected, (state,action) => {
//             state.Loading='failed'
//         })
//     }
// })

// export const {
//     setamount,
//     setfromcurrency,
//     settocurrency,
//     setconvertedamount,
// } = converterSlice.actions;

// export default converterSlice.reducer;

