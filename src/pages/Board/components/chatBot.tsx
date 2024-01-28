import React, { useContext, useEffect, useRef, useState } from 'react'
import { Bot, Check, Plus, Send } from "lucide-react"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { BaseURL } from '@/pages/baseURL'
import { useParams } from 'react-router'


const ChatBot = () => {

  const { boardId } = useParams();
  // useEffect(() => {
  //   const buildCSV = async () => {
  //     const response = await fetch(BaseURL + `csvbuild/${boardId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });
  //     const data = await response.json();
  //   }
  // }, [])


  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Ask me about the board"
    }
  ]);
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const sendMessage = async () => {
    if (input.trim().length === 0) return
    const userMessage = input;
    setSending(true);
    setInput("")
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "user",
        content: userMessage
      }
    ])
    const response = await fetch(BaseURL + `tascrum/chatbot/${boardId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ request_messsage: userMessage })
    })
    const data = await response.json();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "bot",
        content: data.ai_message
      }
    ])
    setSending(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="flex items-center space-x-2">
          <Avatar className='bg-muted p-1 flex justify-center items-center'>
            <Bot />
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Chat Bot</p>
            <p className="text-sm text-muted-foreground">Ask me anything about the board</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className='overflow-y-auto max-h-96'>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage()
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="message"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={sending}
          />
          <Button type="submit" size="default" disabled={input.trim().length === 0}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

export default ChatBot
