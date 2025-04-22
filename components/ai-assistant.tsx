"use client"

import type React from "react"
import { useState } from "react"
import Button from "@leafygreen-ui/button"
import TextInput from "@leafygreen-ui/text-input"
import Card from "@leafygreen-ui/card"
import IconButton from "@leafygreen-ui/icon-button"
import { H3, Body } from "@leafygreen-ui/typography"
import { MessageSquare, X, Minimize, Maximize } from "lucide-react"
import { palette } from "@leafygreen-ui/palette"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your shopping assistant. How can I help you today?",
      role: "assistant",
    },
  ])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }

    setMessages([...messages, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        role: "assistant",
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  // Simple mock AI response function
  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("hiking") || lowerQuery.includes("backpack")) {
      return "I recommend checking out our Adventure Pro Backpack. It's waterproof and perfect for hiking trips!"
    } else if (lowerQuery.includes("shoe") || lowerQuery.includes("sneaker")) {
      return "We have a great selection of shoes! Are you looking for running shoes, casual sneakers, or something else?"
    } else if (lowerQuery.includes("discount") || lowerQuery.includes("sale")) {
      return "We currently have a summer sale with up to 40% off on selected items. Would you like me to show you those products?"
    } else {
      return "I'd be happy to help you find what you're looking for. Could you provide more details about what you need?"
    }
  }

  return (
    <>
      {/* Chat button */}
      <Button
        variant="primary"
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50 flex items-center justify-center"
        leftGlyph={<MessageSquare size={24} />}
      />

      {/* Chat panel */}
      {isOpen && (
        <Card
          className={`fixed right-6 shadow-xl z-40 w-80 md:w-96 ${
            isMinimized ? "bottom-20 h-auto" : "bottom-24 h-[500px] max-h-[80vh]"
          }`}
        >
          <div className="p-4 border-b flex flex-row items-center justify-between">
            <H3>Shopping Assistant</H3>
            <div className="flex gap-2">
              <IconButton aria-label={isMinimized ? "Maximize" : "Minimize"} onClick={toggleMinimize}>
                {isMinimized ? <Maximize size={16} /> : <Minimize size={16} />}
              </IconButton>
              <IconButton aria-label="Close" onClick={toggleOpen}>
                <X size={16} />
              </IconButton>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="p-4 overflow-y-auto flex-1 h-[calc(500px-130px)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === "user"
                            ? `bg-[${palette.blue.base}] text-white`
                            : `bg-[${palette.gray.light2}] text-gray-800`
                        }`}
                      >
                        <Body>{message.content}</Body>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <TextInput
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="primary">
                    Send
                  </Button>
                </form>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  )
}
