import { useEffect, useState } from 'react'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'
import { api } from '../../services/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.myOrders().then(({ orders }) => setOrders(orders)).catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <SEO title="My Orders" description="View your Yukti Artful custom order history and statuses." />
      <section className="section page-hero">
        <div className="container">
          <SectionHeader eyebrow="My Orders" title="Track your custom artwork requests." />
          {error && <div className="unauthorized">{error}</div>}
          <div className="orders-list">
            {orders.length === 0 && <div className="contact-panel">No orders yet. Submit a custom order to begin.</div>}
            {orders.map((order) => (
              <article className="contact-panel order-card" key={order.id}>
                <h3>{order.orderId}</h3>
                <p>{order.artworkType}</p>
                <p>{order.description}</p>
                <span className="availability">{order.orderStatus}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
