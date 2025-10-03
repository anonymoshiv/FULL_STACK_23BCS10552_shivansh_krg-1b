import './App.css'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2
})

const products = [
  {
    id: 1,
    name: 'Steel Water Bottle',
    price: 899,
    description: 'Garam ko garam, thande ko thanda rakhne wali bottle.',
    inStock: true
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: 2499,
    description: 'Armaan malik bagal mai baitha hai aisa feel dete hai.',
    inStock: false
  },
  {
    id: 3,
    name: 'Table Lamp',
    price: 1399,
    description: 'Din mai pad liya kro, I mean raat ko bhi padhai krne ke liye badiya si lamp',
    inStock: true
  }
]

function ProductCard({ name, price, description, inStock }) {
  return (
    <article className="product-card">
      <header className="product-card__header">
        <h2 className="product-card__title">{name}</h2>
        <p className="product-card__price">{currencyFormatter.format(price)}</p>
      </header>

      <p className="product-card__description">{description}</p>

      {inStock ? (
        <button type="button" className="product-card__cta">
          Please Khareed Lo
        </button>
      ) : (
        <span className="product-card__badge" aria-live="polite">
          Kal aana
        </span>
      )}
    </article>
  )
}

function App() {
  return (
    <main className="app">
      <section className="app__intro">
        <h1 className="app__headline">Roz ke samaan ke liye site banayi hai</h1>
        <p className="app__subtext">
          Hamare yaha saari cheeze milti hai (lekin tumhe sirf teen hi dikhaunga!!!!)
        </p>
      </section>

      <section className="product-grid" aria-label="Product listings">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>
    </main>
  )
}

export default App
