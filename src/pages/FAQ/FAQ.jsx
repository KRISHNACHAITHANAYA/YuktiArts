import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'
import { faqs } from '../../data/siteData'

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(0)
  return (
    <>
      <SEO title="FAQ" description="Frequently asked questions about Yukti Artful custom orders, personalization, delivery, and shipping across India." />
      <section className="section page-hero"><div className="container"><SectionHeader eyebrow="FAQ" title="Everything clients usually ask before ordering." /><div className="faq-list">{faqs.map(([question, answer], index) => <article className="faq-item" key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>{question}{openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</button><div className={`faq-answer ${openFaq === index ? 'open' : ''}`}><p>{answer}</p></div></article>)}</div></div></section>
    </>
  )
}
