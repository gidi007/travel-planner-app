"use client"

import { useState } from 'react'
import { MapPin, Calendar, DollarSign, Umbrella, Utensils, Camera, Map } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock API calls
const mockGenerateTrip = (preferences) => {
  // In a real app, this would call an AI service to generate a trip plan
  return {
    destination: "Paris, France",
    duration: "7 days",
    budget: "$3000",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
  }
}

const mockGetWeather = () => {
  // In a real app, this would call a weather API
  return [
    { day: "Mon", temp: 22, condition: "Sunny" },
    { day: "Tue", temp: 20, condition: "Partly Cloudy" },
    { day: "Wed", temp: 18, condition: "Rainy" },
    { day: "Thu", temp: 21, condition: "Sunny" },
    { day: "Fri", temp: 23, condition: "Sunny" },
  ]
}

const mockGetSuggestions = (type) => {
  // In a real app, this would call a recommendation API
  const suggestions = {
    restaurants: [
      { name: "Le Chateaubriand", rating: 4.5, cuisine: "French" },
      { name: "Septime", rating: 4.7, cuisine: "Modern French" },
      { name: "L'Ami Louis", rating: 4.3, cuisine: "Classic French" },
    ],
    activities: [
      { name: "Seine River Cruise", rating: 4.6, duration: "1 hour" },
      { name: "Montmartre Walking Tour", rating: 4.8, duration: "2 hours" },
      { name: "Cooking Class", rating: 4.5, duration: "3 hours" },
    ],
    attractions: [
      { name: "Eiffel Tower", rating: 4.7, waitTime: "1-2 hours" },
      { name: "Louvre Museum", rating: 4.8, waitTime: "30-60 minutes" },
      { name: "Arc de Triomphe", rating: 4.6, waitTime: "15-30 minutes" },
    ],
  }
  return suggestions[type]
}

export function TravelPlannerComponent() {
  const [preferences, setPreferences] = useState({
    destination: "",
    startDate: "",
    duration: "",
    budget: 1000,
    interests: [],
  })
  const [trip, setTrip] = useState(null)
  const [weather, setWeather] = useState([])
  const [suggestions, setSuggestions] = useState({
    restaurants: [],
    activities: [],
    attractions: [],
  })

  const handleInputChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value })
  }

  const handleBudgetChange = (value) => {
    setPreferences({ ...preferences, budget: value[0] })
  }

  const handleInterestChange = (value) => {
    setPreferences({ ...preferences, interests: [...preferences.interests, value] })
  }

  const generateTrip = () => {
    const newTrip = mockGenerateTrip(preferences)
    setTrip(newTrip)
    setWeather(mockGetWeather())
    setSuggestions({
      restaurants: mockGetSuggestions('restaurants'),
      activities: mockGetSuggestions('activities'),
      attractions: mockGetSuggestions('attractions'),
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Travel Planner</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Travel Preferences</CardTitle>
          <CardDescription>Let us know what you're looking for in your perfect trip</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" name="destination" placeholder="Where do you want to go?" onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" type="date" onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input id="duration" name="duration" type="number" min="1" onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (USD)</Label>
              <Slider
                id="budget"
                min={500}
                max={10000}
                step={100}
                value={[preferences.budget]}
                onValueChange={handleBudgetChange}
              />
              <div className="text-right">${preferences.budget}</div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="interests">Interests</Label>
              <Select onValueChange={handleInterestChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your interests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="culture">Culture & History</SelectItem>
                  <SelectItem value="nature">Nature & Outdoors</SelectItem>
                  <SelectItem value="food">Food & Cuisine</SelectItem>
                  <SelectItem value="adventure">Adventure & Sports</SelectItem>
                  <SelectItem value="relaxation">Relaxation & Wellness</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full mt-4" onClick={generateTrip}>Generate Trip Plan</Button>
        </CardContent>
      </Card>

      {trip && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Trip to {trip.destination}</CardTitle>
            <CardDescription>{trip.duration} | Budget: {trip.budget}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Trip Highlights:</h3>
            <ul className="list-disc list-inside mb-4">
              {trip.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Weather Forecast:</h3>
              <div className="flex justify-between">
                {weather.map((day, index) => (
                  <div key={index} className="text-center">
                    <div>{day.day}</div>
                    <Umbrella className={`mx-auto h-6 w-6 ${day.condition === 'Sunny' ? 'text-yellow-500' : 'text-blue-500'}`} />
                    <div>{day.temp}°C</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Map:</h3>
              <div className="h-[200px] bg-gray-300 rounded flex items-center justify-center">
                <Map className="h-12 w-12 text-gray-500" />
                <span className="ml-2 text-gray-500">Interactive Map Here</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {trip && (
        <Card>
          <CardHeader>
            <CardTitle>Local Recommendations</CardTitle>
            <CardDescription>Discover the best of {trip.destination}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="restaurants">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="attractions">Attractions</TabsTrigger>
              </TabsList>
              <TabsContent value="restaurants">
                {suggestions.restaurants.map((restaurant, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <div>
                      <div className="font-semibold">{restaurant.name}</div>
                      <div className="text-sm text-muted-foreground">{restaurant.cuisine}</div>
                    </div>
                    <div className="flex items-center">
                      <Utensils className="h-4 w-4 mr-1" />
                      <span>{restaurant.rating}</span>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="activities">
                {suggestions.activities.map((activity, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <div>
                      <div className="font-semibold">{activity.name}</div>
                      <div className="text-sm text-muted-foreground">{activity.duration}</div>
                    </div>
                    <div className="flex items-center">
                      <Camera className="h-4 w-4 mr-1" />
                      <span>{activity.rating}</span>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="attractions">
                {suggestions.attractions.map((attraction, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <div>
                      <div className="font-semibold">{attraction.name}</div>
                      <div className="text-sm text-muted-foreground">Wait time: {attraction.waitTime}</div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{attraction.rating}</span>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}