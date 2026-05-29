import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'

export default function Terms() {
  const items = ['Custom handmade orders may vary slightly because each product is made by hand.', 'Order timelines begin after customization details and references are confirmed.', 'Personalized products may not be eligible for cancellation once artwork creation has started.', 'Prices, timelines, and shipping availability may vary by product complexity.']
  return (
    <>
      <SEO title="Terms & Conditions" description="Terms and conditions for ordering handmade art and custom products from Yukti Artful." />
      <section className="section page-hero"><div className="container"><SectionHeader eyebrow="Policy" title="Terms & Conditions" copy="Simple terms for custom handmade artwork and product orders." /><div className="policy-card">{items.map((item) => <p key={item}>{item}</p>)}</div></div></section>
    </>
  )
}
