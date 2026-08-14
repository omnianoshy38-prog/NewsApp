import { useState } from 'react'

function Navbar() {
  const [category, setCategory] = useState('Home')

  return (
    <nav>
      <button onClick={() => setCategory('Home')}>
        Home
      </button>

      <button onClick={() => setCategory('Technology')}>
        Technology
      </button>

      <button onClick={() => setCategory('Sports')}>
        Sports
      </button>

      <button onClick={() => setCategory('Business')}>
        Business
      </button>

      <p>Selected category: {category}</p>
    </nav>
  )
}

export default Navbar