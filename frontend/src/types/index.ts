export interface Course {
  id: string
  collectionId: string
  title: string
  description: string
  date: string
  time: string
  location: string
  address: string
  max_participants: number
  current_participants: number
  price: number
  currency: string
  is_active: boolean
}

export interface GalleryImage {
  id: string
  collectionId: string
  title: string
  description: string
  image: string
  display_order: number
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface SiteSettings {
  id: string
  collectionId: string
  about_photo: string
  about_name: string
  about_credential: string
}
