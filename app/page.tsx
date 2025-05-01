import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Music, Film, Gamepad, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Match Your Mood with</span>
              <span className="block text-purple-600">Perfect Content</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover songs, videos, and games that enhance or align with how you feel. Share your experiences with a
              supportive community.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">How Mood Match Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Heart className="h-10 w-10 text-purple-500" />}
              title="Express Your Mood"
              description="Tell us how you're feeling with our intuitive mood input system."
            />
            <FeatureCard
              icon={<Music className="h-10 w-10 text-purple-500" />}
              title="Get Recommendations"
              description="Receive personalized songs, videos, and games that match your current state."
            />
            <FeatureCard
              icon={<Film className="h-10 w-10 text-purple-500" />}
              title="Connect & Share"
              description="Join our community to share experiences and discover new content."
            />
          </div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Discover Content That Resonates</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <ContentTypeCard
              icon={<Music className="h-12 w-12 text-purple-600" />}
              title="Music"
              description="Find songs that enhance your mood or help you transition to a better state."
            />
            <ContentTypeCard
              icon={<Film className="h-12 w-12 text-purple-600" />}
              title="Videos"
              description="Discover videos that resonate with how you're feeling or lift your spirits."
            />
            <ContentTypeCard
              icon={<Gamepad className="h-12 w-12 text-purple-600" />}
              title="Games"
              description="Play games that match your energy level and emotional state."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-700 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">Ready to Match Your Mood?</h2>
          <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
            Join thousands of users who have discovered content that perfectly aligns with their emotional state.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Create Your Account <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function ContentTypeCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
