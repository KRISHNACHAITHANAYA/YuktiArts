import {
  PackageCheck,
  Palette,
  ShieldCheck,
  Sparkles,
  Truck,
  UserCheck,
} from 'lucide-react'

export const artStyles = [
  'radial-gradient(circle at 28% 30%, #fff8f2 0 7%, transparent 8%), radial-gradient(circle at 70% 46%, #d4af37 0 9%, transparent 10%), linear-gradient(135deg, #3a2d24, #b87333 52%, #ead4c0)',
  'repeating-radial-gradient(circle at 50% 45%, #3a2d24 0 2px, #ead4c0 3px 9px, #b87333 10px 12px), linear-gradient(135deg, #fff8f2, #d4af37)',
  'linear-gradient(135deg, rgba(255,248,242,.86), transparent 48%), repeating-linear-gradient(45deg, #b87333 0 12px, #ead4c0 13px 24px, #d4af37 25px 29px)',
  'radial-gradient(ellipse at 52% 24%, #f2c9aa 0 13%, transparent 14%), linear-gradient(145deg, #2c211b 0 47%, #8c542b 48% 58%, #fff8f2 59%)',
  'conic-gradient(from 35deg, #3a2d24, #b87333, #ead4c0, #d4af37, #7a4625, #3a2d24)',
  'radial-gradient(circle at 68% 28%, rgba(255,255,255,.78), transparent 12%), linear-gradient(160deg, #ead4c0, #d4af37 42%, #7c4924)',
  'repeating-linear-gradient(90deg, #fff8f2 0 12px, #ead4c0 13px 19px, #b87333 20px 23px), linear-gradient(135deg, #d4af37, #3a2d24)',
  'radial-gradient(circle at 30% 35%, #d4af37 0 8%, transparent 9%), radial-gradient(circle at 68% 58%, #fff8f2 0 10%, transparent 11%), linear-gradient(135deg, #7c4924, #c78247 48%, #ead4c0)',
]

export const categories = [
  'Resin Jewellery',
  'Personalized Frames',
  'Couple Memory Frames',
  'Portrait Sketches',
  'Traditional Art',
  'Mandala Art',
  'Acrylic Paintings',
  'Abstract Art',
  'Bleach Painting',
  'Customized Gifts',
]

export const galleryFilters = ['All', 'Resin Art', 'Portraits', 'Mandala', 'Traditional Art', 'Acrylic Paintings', 'Custom Gifts']

export const galleryItems = Array.from({ length: 24 }, (_, index) => {
  const filters = galleryFilters.slice(1)
  const category = filters[index % filters.length]
  return {
    id: index + 1,
    category,
    title: `${category} ${String(index + 1).padStart(2, '0')}`,
    height: `${index % 5 === 0 ? 420 : index % 3 === 0 ? 350 : index % 2 === 0 ? 285 : 245}px`,
    art: artStyles[index % artStyles.length],
  }
})

export const productCategories = ['All', 'Resin Jewellery', 'Frames', 'Portraits', 'Paintings', 'Mandala', 'Custom Gifts']

export const productArtStyles = [
  'radial-gradient(circle at 50% 28%, rgba(255,255,255,.88) 0 4%, transparent 5%), radial-gradient(ellipse at 50% 72%, rgba(212,175,55,.42) 0 20%, transparent 21%), linear-gradient(180deg, #fff 0 66%, #fff8f2 100%)',
  'radial-gradient(circle at 34% 34%, #b87333 0 4%, transparent 5%), radial-gradient(circle at 66% 35%, #d4af37 0 4%, transparent 5%), conic-gradient(from 210deg at 50% 18%, transparent 0 35%, #d4af37 36% 40%, transparent 41% 100%), linear-gradient(180deg, #fff, #fff8f2)',
  'repeating-radial-gradient(circle at 50% 48%, #3a2d24 0 2px, #ead4c0 3px 9px, #b87333 10px 12px), linear-gradient(180deg, #fff, #fff8f2)',
  'radial-gradient(ellipse at 50% 24%, #f2c9aa 0 12%, transparent 13%), linear-gradient(145deg, #2c211b 0 42%, #8c542b 43% 55%, #fff 56%)',
  'radial-gradient(circle at 28% 35%, #d4af37 0 7%, transparent 8%), radial-gradient(circle at 72% 35%, #b87333 0 7%, transparent 8%), linear-gradient(135deg, #fff8f2, #ead4c0)',
  'linear-gradient(35deg, transparent 44%, #d4af37 45% 48%, transparent 49%), repeating-linear-gradient(90deg, #fff 0 24px, #fff8f2 25px 48px)',
]

export const starterProducts = [
  ['Double Stone Resin Pendant Combo Set', 'Resin Jewellery', 369, 'In Stock', 'Gift Ready'],
  ['Multi Drop Floral Resin Necklace Set', 'Resin Jewellery', 399, 'In Stock', 'Bestseller'],
  ['Gold Leaf Resin Earrings', 'Resin Jewellery', 249, 'In Stock', 'New'],
  ['Couple Memory Resin Frame', 'Frames', 1299, 'Made To Order', 'Custom'],
  ['Personalized Birthday Photo Frame', 'Frames', 899, 'Made To Order', 'Personalized'],
  ['Handmade Pencil Portrait Sketch', 'Portraits', 799, 'Made To Order', 'Custom'],
  ['Traditional Kerala Mural Artwork', 'Paintings', 2499, 'Made To Order', 'Premium'],
  ['Copper Gold Mandala Canvas', 'Mandala', 1499, 'In Stock', 'Handpainted'],
  ['Acrylic Floral Mini Painting', 'Paintings', 999, 'In Stock', 'Decor'],
  ['Bleach Painting Portrait Art', 'Paintings', 1199, 'Made To Order', 'Artistic'],
  ['Anniversary Customized Gift Hamper', 'Custom Gifts', 1799, 'Made To Order', 'Couple Gift'],
  ['Name Initial Resin Keychain Pair', 'Custom Gifts', 299, 'In Stock', 'Personalized'],
].map(([name, category, price, availability, badge], index) => ({
  id: `p-${index + 1}`,
  name,
  category,
  price,
  availability,
  badge,
  art: productArtStyles[index % productArtStyles.length],
}))

export const trustCards = [
  ['Handmade Craftsmanship', 'Every piece is shaped with patient handwork and a deeply personal finish.', Palette],
  ['Premium Quality', 'Thoughtful materials, clean finishing, and a refined presentation for gifting.', ShieldCheck],
  ['Custom Designs', 'Personalized names, portraits, colors, themes, and memories made tangible.', Sparkles],
  ['Safe Packaging', 'Gift-ready protective packaging designed for delicate handmade artwork.', PackageCheck],
  ['Pan India Delivery', 'Reliable delivery support for orders across India.', Truck],
  ['Customer Satisfaction', 'Warm communication and careful updates from idea to doorstep.', UserCheck],
]

export const testimonials = [
  ['Beautiful craftsmanship and attention to detail.', 'Aaradhya S.'],
  ['Perfect personalized gift. Highly recommended.', 'Nisha K.'],
  ['The portrait exceeded all expectations.', 'Meera R.'],
  ['The resin jewellery felt delicate, premium, and so special.', 'Tanvi P.'],
  ['Our anniversary frame preserved the memory perfectly.', 'Rohan M.'],
]

export const faqs = [
  ['Do you accept custom orders?', 'Yes. Yukti Artful specializes in custom orders across resin art, portraits, memory frames, jewellery, paintings, and personalized gifts.'],
  ['How long does delivery take?', 'Delivery depends on the artwork type. Most jewellery orders take 5-7 days, portraits 7-10 days, custom frames 7-12 days, and paintings 10-15 days.'],
  ['Do you ship across India?', 'Yes. Pan India delivery is available with secure packaging through trusted shipping partners.'],
  ['Can I personalize my artwork?', 'Absolutely. You can personalize names, dates, colors, photos, themes, quotes, and artwork style based on the selected category.'],
  ['How can I place an order?', 'Use the inquiry form, message on Instagram, or connect on WhatsApp. Share your idea and references so customization can begin.'],
]
