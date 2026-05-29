import { useEffect, useState } from 'react'
import SEO from '../../components/SEO'
import { api } from '../../services/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.allOrders().then(({ orders }) => setOrders(orders)).catch((err) => setError(err.message))
  }, [])

  const updateStatus = async (id, orderStatus) => {
    const { order } = await api.updateOrderStatus(id, orderStatus)
    setOrders((current) => current.map((item) => (item.id === id ? order : item)))
  }

  return (
    <>
      <SEO title="Manage Orders" description="Protected admin order management." />
      <section className="admin-section">
        <h1>Manage Orders</h1>
        <p>Review custom order requests, update order status, and track delivery notes.</p>
        {error && <div className="unauthorized">{error}</div>}
        <div className="orders-list">
          {orders.length === 0 && <div className="contact-panel">No orders found.</div>}
          {orders.map((order) => (
            <article className="contact-panel order-card" key={order.id}>
              <h3>{order.orderId}</h3>
              <p>{order.userId?.fullName} - {order.userId?.email}</p>
              <p>{order.artworkType}</p>
              <p>{order.description}</p>
              <select value={order.orderStatus} onChange={(event) => updateStatus(order.id, event.target.value)}>
                {['Pending', 'In Progress', 'Completed', 'Delivered'].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export function AdminManager({ title, copy }) {
  return (
    <>
      <SEO title={title} description={`Protected admin page: ${title}.`} />
      <section className="admin-section">
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className="admin-table">
          <div>Upload Images</div>
          <div>Edit Content</div>
          <div>Delete Items</div>
        </div>
      </section>
    </>
  )
}
