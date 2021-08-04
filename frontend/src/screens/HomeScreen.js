import React, { useEffect, useRef, useState } from 'react'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'




export default function HomeScreen() {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")

  
  // const [error, setError] = useState(false)

  // const [loading, setLoading] = useState(false)
  // const [products,setProducts] = useState([])
  const productList = useSelector(state => state.productList)
  const {loading , error , products}= productList
  const searchText=useRef()
  useEffect (()=>{
   dispatch(listProducts())
  },[dispatch])
  const handleSearchSubmit= (e)=>{
    e.preventDefault()
setSearch(searchText.current.value)
  }
  return (
    <div>
              <hi style={{fontFamily:"cursive", fontSize:"30px", textAlign:"center",marginLeft:"30%",marginRight:"30%",color:"darkgray"}}>Welcome to your music equipment shop </hi>
<br/>
<br/>
       <form style ={{marginLeft:"65%",marginRight:"10%"}} action="/" method="get">
        <label htmlFor="header-search">
            <span  className="visually-hidden">Search for items</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search items"
            name="s" 
            ref={searchText}
        />
        <button type="submit" onClick={handleSearchSubmit}>Search</button>
    </form>
    <br/>
        {/* <hi style={{fontFamily:"cursive", fontSize:"30px", textAlign:"center",marginLeft:"30%",marginRight:"30%",color:"darkgray"}}>Welcome to your music equipment shop </hi> */}

      {loading ? (
       <LoadingBox></LoadingBox> 
      ) : error ? (
        <MessageBox variant ="danger">{error}</MessageBox>
      ) : (
        <div className="row center">{products.filter(product=>product.name.toLowerCase().trim().includes(search.toLowerCase().trim())).map((product)=>(
          <Product key = {product._id} product = {product}></Product>
        ))}
        

        </div>
      )}
      </div>
      )
      }
    
