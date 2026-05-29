import ProductCatalog from '../../components/ProductCatalog'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'

export default function Products() {
  return (
    <>
      <SEO title="Products" description="Shop Yukti Artful handmade products with prices, filters, and availability." />
      <section className="section page-hero products-section">
        <div className="container">
          <SectionHeader
            eyebrow="Products"
            title="All handmade products with clear prices."
            copy="Browse resin jewellery, custom frames, portraits, paintings, mandala art, and personalized gifts in a clean product catalog."
          />
          <ProductCatalog />
        </div>
      </section>
    </>
  )
}
