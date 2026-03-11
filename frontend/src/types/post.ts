export type PostStatus = "SAFE" | "WARNING" | "BLOCKED"

export interface PostAuthor {
  id: string
  name: string
  username: string
  avatar: string
  verified: boolean
}

export interface AIDetection {
  deepfakeProbability: number
  explicitProbability: number
  suicideRisk: number
  status: PostStatus
}

export interface Post {
  id: string
  author: PostAuthor
  caption: string
  mediaUrl: string
  mediaType: "image" | "video"
  createdAt: string

  likes: number
  comments: number
  shares: number

  aiDetection?: AIDetection
}