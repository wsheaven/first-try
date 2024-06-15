import React from 'react'

const Footer = ({ length }) => {
    const today = new Date();
    return (
        <footer>
            <p>{length} list {length === 1 ? 'item' : 'items'}</p>
        </footer>
    )
}

export default Footer