import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Import specific icons to avoid dynamic import issues
import { Smartphone, Link, LayoutGrid, Palette, BarChart, Shield } from "lucide-react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  // Map of icon names to components
  const iconMap: Record<string, React.ElementType> = {
    Smartphone: Smartphone,
    Link: Link,
    LayoutGrid: LayoutGrid,
    Palette: Palette,
    BarChart: BarChart,
    Shield: Shield,
  }

  // Get the icon component from the map
  const IconComponent = iconMap[icon] || null

  return (
    <Card className="flex flex-col items-center text-center transition-all hover:shadow-md">
      <CardHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
          {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
