"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Frown, Meh, Smile } from "lucide-react"

export default function MoodInputPage() {
  const { toast } = useToast()
  const [moodData, setMoodData] = useState({
    currentMood: "neutral",
    energyLevel: [50],
    symptoms: "",
    preferredContent: "enhance",
    contentTypes: ["music", "videos", "games"],
  })

  const handleMoodChange = (value) => {
    setMoodData({ ...moodData, currentMood: value })
  }

  const handleEnergyChange = (value) => {
    setMoodData({ ...moodData, energyLevel: value })
  }

  const handleSymptomsChange = (e) => {
    setMoodData({ ...moodData, symptoms: e.target.value })
  }

  const handlePreferredContentChange = (value) => {
    setMoodData({ ...moodData, preferredContent: value })
  }

  const handleContentTypeChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setMoodData({
        ...moodData,
        contentTypes: [...moodData.contentTypes, value],
      })
    } else {
      setMoodData({
        ...moodData,
        contentTypes: moodData.contentTypes.filter((type) => type !== value),
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Mood data submitted:", moodData)

    toast({
      title: "Mood submitted!",
      description: "We're generating your personalized recommendations.",
    })

    // In a real app, you would redirect to recommendations page
    // router.push('/recommendations');
  }

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">How Are You Feeling Today?</h1>

      <Card>
        <CardHeader>
          <CardTitle>Mood Input</CardTitle>
          <CardDescription>Tell us about your current mood to get personalized content recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Current Mood */}
              <div>
                <Label className="text-base">How would you describe your current mood?</Label>
                <Tabs defaultValue={moodData.currentMood} className="mt-2" onValueChange={handleMoodChange}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="negative" className="flex items-center gap-2">
                      <Frown className="h-4 w-4" /> Negative
                    </TabsTrigger>
                    <TabsTrigger value="neutral" className="flex items-center gap-2">
                      <Meh className="h-4 w-4" /> Neutral
                    </TabsTrigger>
                    <TabsTrigger value="positive" className="flex items-center gap-2">
                      <Smile className="h-4 w-4" /> Positive
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Energy Level */}
              <div>
                <Label className="text-base">Energy Level</Label>
                <div className="pt-2">
                  <Slider
                    defaultValue={moodData.energyLevel}
                    max={100}
                    step={1}
                    onValueChange={handleEnergyChange}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low Energy</span>
                    <span>High Energy</span>
                  </div>
                </div>
              </div>

              {/* Symptoms or Feelings */}
              <div>
                <Label htmlFor="symptoms" className="text-base">
                  Describe your symptoms or feelings (optional)
                </Label>
                <Textarea
                  id="symptoms"
                  placeholder="E.g., feeling anxious, excited, tired, etc."
                  className="mt-2"
                  value={moodData.symptoms}
                  onChange={handleSymptomsChange}
                />
              </div>

              {/* Content Preference */}
              <div>
                <Label className="text-base">What kind of content would you prefer?</Label>
                <RadioGroup
                  defaultValue={moodData.preferredContent}
                  className="mt-2"
                  onValueChange={handlePreferredContentChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enhance" id="enhance" />
                    <Label htmlFor="enhance">Enhance my current mood</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="change" id="change" />
                    <Label htmlFor="change">Help me change my mood</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Content Types */}
              <div>
                <Label className="text-base">What type of content are you interested in?</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <ContentTypeCheckbox
                    id="music"
                    label="Music"
                    checked={moodData.contentTypes.includes("music")}
                    onChange={handleContentTypeChange}
                  />
                  <ContentTypeCheckbox
                    id="videos"
                    label="Videos"
                    checked={moodData.contentTypes.includes("videos")}
                    onChange={handleContentTypeChange}
                  />
                  <ContentTypeCheckbox
                    id="games"
                    label="Games"
                    checked={moodData.contentTypes.includes("games")}
                    onChange={handleContentTypeChange}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-8">
              Get Recommendations <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function ContentTypeCheckbox({ id, label, checked, onChange }) {
  return (
    <div className="flex items-center space-x-2 border rounded-md p-3">
      <input
        type="checkbox"
        id={id}
        value={id}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}
