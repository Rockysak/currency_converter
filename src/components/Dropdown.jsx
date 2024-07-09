import React from 'react'

function Dropdown({title,currencies,selectedCurrency,onconvert}) {
  return (
    <div>
      <label className='fs-5'>{title}</label>
      <select value={selectedCurrency} onChange={onconvert} className='w-100 rounded p-1 m-1'>
        {

            Object.keys(currencies).map((c,i) => {
                const data = currencies[c]
                console.log(data);
                return(
                    <option key={i} value={c}>
                        {data}
                    </option>
                )
            })
            
        }
      </select>
    </div>
  )
}

export default Dropdown
