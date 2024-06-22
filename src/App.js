import './Header'
import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import apiRequest from './apiRequest';

import { useState, useEffect } from 'react';


function App() {

  const API_URL = "http://localhost:3500/items" 

  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  /* useEffect will do something when the state of another changes, so when 
  items updates in anyway it will log it out. 
  useEffect(() => {
    console.log('updating item state')
  }, [items])
  */

  // useEffect does everything inside when the state changes. Right now that 
  // check is on line 49 with the [] meaning it only does it when the page is first loaded. 

  useEffect(() => {
    
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error("Did not receive data")
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch (err) {
        console.log(err.stack)
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    (async () => await fetchItems())()
  }, [])


  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1; 
    const myNewItem = {id, checked: false, item}
    const listItems = [...items, myNewItem]
    setItems(listItems)

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      }, 
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchError(result)

  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems)

    // We already have checked the item in listItems so we just need to set the 
    // checked status in the database for the specific item to match what we have
    // in listItems array. 
    const myItem = listItems.filter(item => item.id === id)
    const updateOptions = {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      },
      // We used the filter on line 78 which returns an arr of 1 so we access the 
      // first item in that arr
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions)
    if (result) setFetchError(result)

  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)

    const deleteOptions = {method: 'DELETE'}
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)
    if (result) setFetchError(result)
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return

    addItem(newItem)

    setNewItem('')
    console.log('submitted')
  }


  return (
    <div className="App">
      <Header title='Groceries' />
      <AddItem
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
      <SearchItem
      search={search}
      setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color: 'red'}}>Error: {fetchError}</p>}
      {!fetchError && !isLoading && <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />}
      </main>
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
