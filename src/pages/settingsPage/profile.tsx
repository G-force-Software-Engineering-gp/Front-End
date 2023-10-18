import { Separator } from '@radix-ui/react-dropdown-menu'
import React, { useState } from 'react'
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
import { zodResolver } from "@hookform/resolvers/zod"
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
import { useQuery } from '@tanstack/react-query'


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const profileFormSchema = z.object({
  username: z
    .string({
      required_error: "Please enter your username"
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(10, {
      message: "Username must not be longer than 10 characters.",
    }),
  email: z
    .string({
      required_error: "Please enter your email.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  name: z.string({
    required_error: "Please enter your name"
  })
    .max(20, {
      message: "Name must not be longer than 20 characters"
    }),
  role: z.string({
    required_error: "Please choose your role."
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const Profile = () => {

  const [EditProfile, setEditProfile] = useState(false);
  const defaultValues: Partial<ProfileFormValues> = {

  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })


  function onSubmit(data: ProfileFormValues) {

  }

  const fetchProfileData = async () => {
    const response = await fetch('https://amirmohammadkomijani.pythonanywhere.com/tascrum/profile/4',
      {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3NzE3NTMzLCJpYXQiOjE2OTc2MzExMzMsImp0aSI6IjFkNjViY2YzYzdlMjQ0Zjk4MWFiMDc4ZTkyNTRiODZkIiwidXNlcl9pZCI6Nn0.K8CuI_0b0WdFiBP5ct0KWGq4og0ySNHOa5CbqMJj9mw`
        }
      });
    const data = await response.json();
    console.log(response)
    return data
  };

  const { data: profileData, isLoading, isError, error } = useQuery(['profileData'], fetchProfileData)


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
                <AvatarFallback className="rounded-full">{profileData["user"]["first_name"]}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='text-xl'>name</span>
                <span className='text-sm font-thin'>username</span>
              </div>
            </div>
            <Badge className='mr-3'>Student</Badge>
          </CardTitle>
        </CardHeader>
        <CardTitle className='mx-9'>
          <div className='flex flex-col mb-2'>
            <div className='flex items-center mb-1'>
              <Mail className='h-4 w-4 mr-2' />
              <span className='text-base'>email</span>
            </div>
            <p className='pl-2 font-thin outline outline-1 p-1 rounded text-sm'>ehsan.ahmadpoor2002@gmail.com</p>
          </div>
          <div className='flex flex-col mb-2'>
            <div className='flex items-center mb-1'>
              <ClipboardList className='h-4 w-4 mr-2' />
              <span className='text-base'>bio</span>
            </div>
            <Textarea className='outline resize-none' disabled value="fuck this shit" />
          </div>
        </CardTitle>
        <CardFooter className='flex justify-between m-3'>
          <Button disabled={EditProfile} onClick={() => { setEditProfile(true) }} variant="secondary" className='w-full h-10'>Edit Profile</Button>
        </CardFooter>
      </Card>
      {EditProfile &&
        (
          <div className='p-4 border rounded-lg'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name. It can be your real name or a
                        pseudonym.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display Username. You can only change this once every 30 days.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your Role/Occupation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Student">Student</SelectItem>
                          <SelectItem value="Employee">Employee</SelectItem>
                          <SelectItem value="Project Manager">Project Manager</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This is your public display Occupation. Choose the role you have in your work.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public Bio.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex flex-row justify-between'>
                  <Button onClick={() => { form.reset(); setEditProfile(false); }} variant="secondary">Cancel</Button>
                  <Button type="submit">Update profile</Button>
                </div>
              </form>
            </Form>
          </div>
        )
      }
    </div>
  )
}

export default Profile
