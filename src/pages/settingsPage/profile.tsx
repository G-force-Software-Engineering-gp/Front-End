import { Separator } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ClipboardList, Mail, UserCircle2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge"

const BioSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
})

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please enter your email.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
})

const profile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <Card className='max-w-[350px]'>
        <CardHeader>
          <CardTitle className='flex flex-row items-center justify-between'>
            <div className='flex flex-row'>
              <Avatar className="rounded-full h-12 w-12 mr-3">
                <AvatarImage className="rounded-full" alt="Avatar" />
                <AvatarFallback className="rounded-full">N</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='text-xl'>Name</span>
                <span className='text-sm font-thin'>@Username</span>
              </div>
            </div>
            <Badge className='mr-3'>Student</Badge>
          </CardTitle>
        </CardHeader>
        <CardTitle className='mx-9'>
          <div className='flex flex-col mb-2'>
            <div className='flex items-center mb-1'>
              <ClipboardList className='h-4 w-4 mr-2' />
              <span className='text-base'>Bio</span>
            </div>
            <Textarea className='resize-none' disabled value="fuck this shit" />
          </div>
          <div className='flex flex-col mb-2'>
            <div className='flex items-center mb-1'>
              <Mail className='h-4 w-4 mr-2' />
              <span className='text-base'>Email</span>
            </div>
            <p className='pl-2 font-thin outline outline-1 p-1 rounded text-sm'>ehsan.ahmadpoor2002@gmail.com</p>
          </div>
        </CardTitle>
        <CardFooter className='flex justify-between m-3'>
          <Button variant="secondary" className='w-full h-10'>Edit Profile</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default profile
