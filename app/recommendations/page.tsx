"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, ExternalLink, Music, Film, Gamepad } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from your API
const mockRecommendations = {
  music: [
    {
      id: 1,
      title: "Weightless",
      artist: "Marconi Union",
      genre: "Ambient",
      description: "Known to reduce anxiety by up to 65%",
      imageUrl: "/placeholder.svg?height=200&width=200",
      externalUrl: "#",
    },
    {
      id: 2,
      title: "Electra",
      artist: "Airstream",
      genre: "Chillout",
      description: "Perfect for relaxation and focus",
      imageUrl: "/placeholder.svg?height=200&width=200",
      externalUrl: "#",
    },
    {
      id: 3,
      title: "Watermark",
      artist: "Enya",
      genre: "New Age",
      description: "Calming melodies to ease your mind",
      imageUrl: "/placeholder.svg?height=200&width=200",
      externalUrl: "#",
    },
  ],
  videos: [
    {
      id: 1,
      title: "Guided Meditation for Anxiety",
      creator: "Calm Mind",
      duration: "15 min",
      description: "A gentle meditation to reduce anxiety and stress",
      imageUrl: "/placeholder.svg?height=200&width=350",
      externalUrl: "#",
    },
    {
      id: 2,
      title: "Nature Sounds: Forest Walk",
      creator: "Nature Therapy",
      duration: "30 min",
      description: "Immerse yourself in the calming sounds of a forest",
      imageUrl: "/placeholder.svg?height=200&width=350",
      externalUrl: "#",
    },
  ],
  games: [
    {
      id: 1,
      title: "Flow",
      developer: "Thatgamecompany",
      genre: "Puzzle",
      description: "A relaxing game about connecting colored lines",
      imageUrl: "/placeholder.svg?height=200&width=300",
      externalUrl: "#",
    },
    {
      id: 2,
      title: "Monument Valley",
      developer: "ustwo games",
      genre: "Puzzle",
      description: "Navigate impossible architecture and optical illusions",
      imageUrl: "/placeholder.svg?height=200&width=300",
      externalUrl: "#",
    },
  ],
}

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState("music")
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState(null)

  // Simulate loading recommendations
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecommendations(mockRecommendations)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Personalized Recommendations</h1>
        <p className="text-gray-600">
          Based on your mood:{" "}
          <Badge variant="outline" className="ml-1">
            Anxious
          </Badge>
          <Badge variant="outline" className="ml-1">
            Low Energy
          </Badge>
        </p>
      </div>

      <Tabs defaultValue="music" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="music" className="flex items-center gap-2">
            <Music className="h-4 w-4" /> Music
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Film className="h-4 w-4" /> Videos
          </TabsTrigger>
          <TabsTrigger value="games" className="flex items-center gap-2">
            <Gamepad className="h-4 w-4" /> Games
          </TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-t-purple-600 border-purple-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Finding the perfect content for your mood...</p>
          </div>
        ) : (
          <>
            <TabsContent value="music" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations?.music.map((item) => (
                  <MusicCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations?.videos.map((item) => (
                  <VideoCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="games" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations?.games.map((item) => (
                  <GameCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>

      <div className="mt-10 text-center">
        <p className="text-gray-600 mb-4">Not finding what you're looking for?</p>
        <Button asChild>
          <Link href="/mood">Try Another Mood Input</Link>
        </Button>
      </div>
    </div>
  )
}

function MusicCard({ item }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex">
          <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} className="w-24 h-24 object-cover" />
          <div className="p-4 flex-1">
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600">{item.artist}</p>
            <Badge variant="outline" className="mt-1">
              {item.genre}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">
              Listen <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function VideoCard({ item }) {
  return (
    <Card>
      <CardContent className="p-0">
        <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">{item.creator}</p>
            <Badge variant="outline">{item.duration}</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-2">{item.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">
            Watch <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

function GameCard({ item }) {
  return (
    <Card>
      <CardContent className="p-0">
        <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">{item.developer}</p>
            <Badge variant="outline">{item.genre}</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-2">{item.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">
            Play <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
