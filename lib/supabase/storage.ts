import { createClient } from "./client"

const BUCKET_NAME = "images"

export interface UploadResult {
  url: string
  path: string
  error?: string
}

/**
 * Generate a unique filename for uploaded images
 */
function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split(".").pop() || "png"
  const baseName = originalName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "-")
  return `${baseName}-${timestamp}-${randomString}.${extension}`
}

/**
 * Upload an image file to Supabase Storage
 */
export async function uploadImage(file: File): Promise<UploadResult> {
  const supabase = createClient()

  const fileName = generateUniqueFileName(file.name)
  const filePath = `blog/${fileName}`

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    })

  if (error) {
    console.error("Upload error:", error)
    return {
      url: "",
      path: "",
      error: error.message,
    }
  }

  // Get the public URL for the uploaded file
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path)

  return {
    url: urlData.publicUrl,
    path: data.path,
  }
}

/**
 * Upload an image from a base64 data URL
 */
export async function uploadBase64Image(
  dataUrl: string,
  fileName: string = "image.png"
): Promise<UploadResult> {
  // Convert base64 to blob
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  const file = new File([blob], fileName, { type: blob.type })

  return uploadImage(file)
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteImage(path: string): Promise<{ error?: string }> {
  const supabase = createClient()

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path])

  if (error) {
    console.error("Delete error:", error)
    return { error: error.message }
  }

  return {}
}
