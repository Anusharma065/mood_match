"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Heart, MessageCircle, Share2, UserPlus, Filter, Send } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from your API
const mockPosts = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just tried the meditation playlist recommended by MoodMatch when I was feeling anxious. It really helped calm my nerves!",
    mood: "Anxious",
    recommendation: "Meditation Playlist",
    likes: 24,
    comments: 5,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Sam Taylor",
      username: "samt",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Feeling down today, but the upbeat music recommendations really helped lift my spirits. Thanks MoodMatch!",
    mood: "Sad",
    recommendation: "Upbeat Playlist",
    likes: 18,
    comments: 3,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Jamie Rivera",
      username: "jrivera",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "The puzzle game recommended to me was perfect for my anxious mind. It helped me focus on something else and calm down.",
    mood: "Anxious",
    recommendation: "Puzzle Game",
    likes: 32,
    comments: 7,
    timestamp: "1 day ago",
  },
]

const mockHistory = [
  {
    id: 1,
    date: "Today",
    mood: "Anxious",
    energyLevel: "Low",
    recommendations: [
      { type: "Music", name: "Calming Playlist" },
      { type: "Video", name: "Guided Meditation" },
    ],
  },
  {
    id: 2,
    date: "Yesterday",
    mood: "Happy",
    energyLevel: "High",
    recommendations: [
      { type: "Music", name: "Upbeat Dance Mix" },
      { type: "Game", name: "Action Adventure" },
    ],
  },
  {
    id: 3,
    date: "3 days ago",
    mood: "Sad",
    energyLevel: "Low",
    recommendations: [
      { type: "Music", name: "Comforting Melodies" },
      { type: "Video", name: "Inspiring Stories" },
    ],
  },
]

export default function DashboardPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("community")
  const [communityTab, setCommunityTab] = useState("all")
  const [newPost, setNewPost] = useState("")
  const [posts, setPosts] = useState(mockPosts)

  const handlePostSubmit = () => {
    if (!newPost.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something before posting.",
        variant: "destructive",
      })
      return
    }

    const newPostObj = {
      id: posts.length + 1,
      user: {
        name: "You",
        username: "currentuser",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: newPost,
      mood: "Shared",
      likes: 0,
      comments: 0,
      timestamp: "Just now",
    }

    setPosts([newPostObj, ...posts])
    setNewPost("")

    toast({
      title: "Post shared!",
      description: "Your post has been shared with the community.",
    })
  }

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>

      <Tabs defaultValue="community" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="history">Your History</TabsTrigger>
        </TabsList>

        <TabsContent value="community" className="mt-0">
          {/* New Post Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Share with the Community</CardTitle>
              <CardDescription>Share your experience with recommendations or ask for advice</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handlePostSubmit}>
                Share <Send className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Community Tabs */}
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="all" value={communityTab} onValueChange={setCommunityTab}>
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="my">My Posts</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          {/* Community Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <CommunityPost key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <div className="space-y-6">
            {mockHistory.map((entry) => (
              <HistoryEntry key={entry.id} entry={entry} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/mood">Record New Mood</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CommunityPost({ post }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{post.user.name}</p>
                <p className="text-sm text-gray-500">
                  @{post.user.username} · {post.timestamp}
                </p>
              </div>

              <Button variant="ghost" size="sm">
                <UserPlus className="h-4 w-4" />
                <span className="sr-only">Follow</span>
              </Button>
            </div>

            <p className="mt-2">{post.content}</p>

            {post.mood && (
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline">Mood: {post.mood}</Badge>
                {post.recommendation && <Badge variant="outline">Tried: {post.recommendation}</Badge>}
              </div>
            )}

            <div className="mt-4 flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 ${liked ? "text-red-500" : ""}`}
                onClick={handleLike}
              >
                <Heart className="h-4 w-4" /> {likeCount}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function HistoryEntry({ entry }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{entry.date}</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/recommendations">View Recommendations</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">Mood: {entry.mood}</Badge>
          <Badge variant="outline">Energy: {entry.energyLevel}</Badge>
        </div>

        <h4 className="font-medium mb-2">Recommendations:</h4>
        <ul className="space-y-1">
          {entry.recommendations.map((rec, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-purple-600">•</span>
              <span>
                {rec.type}: {rec.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/mood">Record Similar Mood</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
