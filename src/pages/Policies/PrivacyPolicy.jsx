import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'

export default function PrivacyPolicy() {
  return <PolicyPage title="Privacy Policy" description="How Yukti Artful handles inquiry details, references, contact information, and order communication." items={['We collect only the details needed to respond to inquiries and process custom orders.', 'Reference images are used only for discussing and creating your requested artwork.', 'Contact details are not sold or shared for unrelated marketing.', 'You may request correction or deletion of your inquiry details.']} />
}

function PolicyPage({ title, description, items }) {
  return (
    <>
      <SEO title={title} description={description} />
      <section className="section page-hero"><div className="container"><SectionHeader eyebrow="Policy" title={title} copy={description} /><div className="policy-card">{items.map((item) => <p key={item}>{item}</p>)}</div></div></section>
    </>
  )
}
