import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'

export default function ShippingPolicy() {
  const items = ['Pan India delivery is available for eligible handmade products.', 'Resin Jewellery: 5-7 days. Portrait Sketches: 7-10 days. Customized Frames: 7-12 days. Paintings: 10-15 days.', 'All delicate items are packed securely. Gift packaging is available on request.', 'Shipping partners may include India Post, DTDC, Delhivery, and Professional Couriers.']
  return (
    <>
      <SEO title="Shipping Policy" description="Shipping timelines, packaging, and delivery information for Yukti Artful handmade orders." />
      <section className="section page-hero"><div className="container"><SectionHeader eyebrow="Policy" title="Shipping Policy" copy="Delivery timelines and packaging details for handmade custom orders." /><div className="policy-card">{items.map((item) => <p key={item}>{item}</p>)}</div></div></section>
    </>
  )
}
