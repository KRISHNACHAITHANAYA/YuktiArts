import { Upload } from 'lucide-react'
import { AdminManager } from '../Orders/Orders'

export default function GalleryManagement() {
  return (
    <div>
      <AdminManager title="Manage Gallery" copy="Upload images, delete images, and edit gallery content from this protected dashboard." />
      <div className="admin-upload"><Upload size={18} /> Upload Images</div>
    </div>
  )
}
