import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Profile() {
  return (
    <div className="pt-24 max-w-4xl mx-auto p-6">
      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="analytics">AI Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square bg-gray-800 rounded-lg" />
            <div className="aspect-square bg-gray-800 rounded-lg" />
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          AI analytics dashboard here
        </TabsContent>
      </Tabs>
    </div>
  )
}