import React from 'react'
import ItemList from './ItemList'

const Content = ({ items, handleCheck, handleDelete }) => {


    return (
        <main>
            {items.length ? (
                <ItemList
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                ></ItemList>
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty </p>
            )}
        </main>
    )
}

export default Content







/* From prevois tutorials. 
import React from 'react'
import { useState } from 'react'

const Content = () => {
    const [name, setName] = useState('Sam')
    const [count, setCount] = useState(0)

    const handleNameChange = () => {
        const names = ['Bob', 'Kevin', 'Dave']
        const int = Math.floor(Math.random() * 3); 
        setName(names[int])
      }

    const handleClick = () => {
        setCount(count + 1)
        console.log(count)
    }
    const handleClick2 = () => {
        console.log(count)
    }
    const handleClick3 = (e) => {
        console.log(e.target.innerText)
    }

  return (
    <main>
        <p onDoubleClick={handleClick}>
            Hello {name}!
        </p>
        <button onClick={handleNameChange}>Change Name</button>
        <button onClick={handleClick}>Click it</button>
        <button onClick={handleClick2}>Click it</button>
    </main>
  )
}

export default Content */