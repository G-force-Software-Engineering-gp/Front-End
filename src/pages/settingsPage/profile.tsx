import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import AuthContext from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ClipboardList, Mail, UserCircle2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const profileFormSchema = z.object({
  username: z
    .string({
      required_error: 'Please enter your username',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(20, {
      message: 'Username must not be longer than 10 characters.',
    }),
  bio: z.string().max(160).min(4),
  name: z
    .string({
      required_error: 'Please enter your name',
    })
    .max(20, {
      message: 'Name must not be longer than 20 characters',
    }),
  role: z.string({
    required_error: 'Please choose your role.',
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const { toast } = useToast();
  const [EditProfile, setEditProfile] = useState(false);

  interface RootObject {
    id: number;
    occupations: string;
    bio?: any;
    profimage: string;
    birthdate?: any;
    user: User;
  }

  interface User {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
  }

  const queryClient = useQueryClient();
  const editProfileMutation = useMutation((profileInfo: any) => editProfileData(profileInfo));

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    const UpdateValues = {
      occupations: values.role,
      bio: values.bio,
      user: {
        first_name: values.name,
        last_name: profileData?.user.last_name,
        username: values.username,
      },
    };
    editProfileMutation.mutate(UpdateValues, {
      onSuccess: () => {
        toast({ description: 'Profile Updated!' });
        setEditProfile(false);
        queryClient.invalidateQueries(['profileData']);
      },
      onError: (error) => {
        toast({ variant: 'destructive', description: 'Update Profile Failed! Try again later.' });
      },
    });
  }

  const [id, setID] = useState();

  const fetchProfileData = async () => {
    const response = await fetch('https://amirmohammadkomijani.pythonanywhere.com/tascrum/profile/', {
      method: 'GET',
      headers: {
        Authorization: `JWT ${authTokens.access}`,
      },
    });
    const data = await response.json();
    setID(data[0].id);
    setDefaultValues({
      username: profileData?.user.username,
      bio: profileData?.bio,
      name: profileData?.user.first_name,
      role: profileData?.occupations,
    });
    return data[0];
  };

  const editProfileData = async (profileInfo: any) => {
    const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/profile/${id}/`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${authTokens.access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileInfo),
    });
  };

  const { data: profileData } = useQuery<RootObject, Error>({ queryKey: ['profileData'], queryFn: fetchProfileData });

  const [defaultFormValues, setDefaultValues] = useState<Partial<ProfileFormValues>>({
    username: profileData?.user.username,
    bio: profileData?.bio,
    name: profileData?.user.first_name,
    role: profileData?.occupations === '' ? 'role' : profileData?.occupations,
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
      </div>
      <Separator />
      <Card className="w-fit">
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between">
            <div className="flex flex-row">
              <Avatar className="mr-3 h-12 w-12 rounded-full">
                <AvatarImage className="rounded-full" alt="Avatar" src={profileData?.profimage} />
                <AvatarFallback className="rounded-full">
                  {profileData ? profileData.user.first_name[0] : ''}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xl">{profileData?.user.first_name}</span>
                <span className="text-sm font-thin">{profileData?.user.username}</span>
              </div>
            </div>
            {profileData?.occupations === '' ? null : <Badge className="ml-3 mr-3">{profileData?.occupations}</Badge>}
          </CardTitle>
        </CardHeader>
        <CardTitle className="mx-9">
          <div className="mb-2 flex flex-col">
            <div className="mb-1 flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span className="text-base">Email</span>
            </div>
            <p className="rounded p-1 pl-2 text-sm font-thin outline outline-1">{profileData?.user.email}</p>
          </div>
          <div className="mb-2 flex flex-col">
            <div className="mb-1 flex items-center">
              <ClipboardList className="mr-2 h-4 w-4" />
              <span className="text-base">bio</span>
            </div>
            <Textarea className="resize-none outline" disabled value={profileData?.bio} />
          </div>
        </CardTitle>
        <CardFooter className="m-3 flex justify-between">
          <Button
            disabled={EditProfile}
            onClick={() => {
              setEditProfile(true);
            }}
            variant="secondary"
            className="h-10 w-full"
          >
            Edit Profile
          </Button>
        </CardFooter>
      </Card>
      {EditProfile && (
        <div className="rounded-lg border p-4">
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
                      This is your public display name. It can be your real name or a pseudonym.
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
                      <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>This is your public Bio.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between">
                <Button
                  disabled={editProfileMutation.isLoading}
                  onClick={() => {
                    setEditProfile(false);
                  }}
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button disabled={editProfileMutation.isLoading} type="submit">
                  Update profile
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Profile;
