import React, { useEffect } from 'react' 
import '../App.css'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dropdown from './Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import {

    setamount,
    setfromcurrency,
    settocurrency,
    setconvertedAmount,
    fetchApi,
    convertercurrency,
    convertCurrency

} from '../features/converter/converterSlice'
import { useDispatch, useSelector } from 'react-redux';


function Converter() {
    const dispatch = useDispatch();
    const currency = useSelector((state) => state.converter.currency);
    const amount = useSelector((state) => state.converter.amount);
    const fromCurrency = useSelector((state) => state.converter.fromCurrency);
    const toCurrency = useSelector((state) => state.converter.toCurrency);
    const convertedAmount = useSelector((state) => state.converter.convertedAmount);

    useEffect(()=>{
        dispatch(fetchApi())
    },[dispatch]);

    useEffect(() => {
        if (amount && fromCurrency && toCurrency) {
            dispatch(convertercurrency({fromCurrency,toCurrency,amount}))
        }
    },[amount,fromCurrency,toCurrency,dispatch])


    const handleAmountChange = (e) => {   
       const newAmount  = e.target.value;
       dispatch(convertCurrency());
       if(fromCurrency === toCurrency) 
       {
        dispatch(setconvertedAmount(newAmount));
       }
       dispatch(setamount(newAmount));
    }


    const handleSwipe = () => {
        if (fromCurrency === toCurrency) {
            dispatch(setconvertedAmount(amount));
        } else {
            dispatch(setfromcurrency(toCurrency));
            dispatch(settocurrency(fromCurrency));
        }
    }

  return (
    <div className='w-25 border m-auto mt-5 rounded-3 main bg-black text-white'>
        <h2 className='text-center pt-3'>Currency Converter</h2>
        <div className='mt-5 px-5'>
            <Dropdown
             currencies={currency}
             title='From:'
             selectedCurrency={fromCurrency}
             onconvert={(e) => 
                {
                    dispatch(setfromcurrency(e.target.value))
                    dispatch(convertCurrency())
                }}
             />
            <br/>
            <div className='border text-center bg-white text-black w-25 rounded m-auto' onClick={handleSwipe}>
                <FontAwesomeIcon icon={faArrowDown} />
                <FontAwesomeIcon icon={faArrowUp} />
            </div>
            <Dropdown
            currencies={currency}
            title='To:'
            selectedCurrency={toCurrency}
            onconvert={(e) => 
            {
                dispatch(settocurrency(e.target.value))
                dispatch(convertCurrency())
            }}
             />
        </div>
        <div>
            <label htmlFor='currency' className='fs-5 p-5'>Amount</label>
            <input 
            type="number"
            value={amount}
            className='my-2'
            onChange={handleAmountChange}
             />
        </div>
        <p className='text-center fs-4 fw-bold'>1 USD = 83.49 INR</p>
        {amount && convertedAmount && (
                <h4 className=' text-center'>
                    <p className='fs-4 fw-bold'>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
                </h4>
            )}
       
    </div>
  )
}

export default Converter;