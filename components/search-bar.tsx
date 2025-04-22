"use client"

import type React from "react"
import { useState } from "react"
import TextInput from "@leafygreen-ui/text-input"
import Button from "@leafygreen-ui/button"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search action
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto">
      <div className="flex">
        <TextInput
          type="text"
          placeholder="I need a waterproof hiking backpack..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button type="submit" variant="primary" className="ml-2" leftGlyph={<Search size={16} />}>
          Search
        </Button>
      </div>
    </form>
  )
}
