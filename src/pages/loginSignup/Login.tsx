import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-dropdown-menu';
import {Link } from 'react-router-dom';
import { Mail , Lock } from 'lucide-react';
import AuthContext , { AuthContextType } from '@/contexts/AuthContext';



const loginSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
});

type LoginFormValues = z.input<typeof loginSchema>;


const Login: React.FC = () => {
  const authContext = useContext<AuthContextType |null >(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided properly.");
  }
  const { loginUser } = authContext;
    const { register, handleSubmit, formState: { errors , isSubmitting } } = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
    });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      // Replace this with your registration logic
      console.log('Form data:', data);

      // Simulate an async operation (e.g., API call)
      await loginUser(data);

      console.log('Registration complete!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen">
              <Label className="text-2xl font-semibold mb-12 text-center">Logo</Label>
      <Label className="text-2xl font-semibold mb-9">Login</Label>
      <Card className="w-96 py-14 px-12 bg-secondary" >

        <form onSubmit={handleSubmit(onSubmit)} className='grid'>
          <Label className="relative mb-4 flex">
          <Input
            placeholder='Email'
            type="email"
            {...register('email')}
            className="ring-2 pl-9 peer bg-transparent"
          />
            <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
              <Mail className='h-4 w-4'/>
            </Label>
          </Label>
          {errors.email && <Label className="text-red-500 mb-4 text-xs">{errors.email.message}</Label>}
          <Label className="relative mb-4 flex">
          <Input
            placeholder='Password'
            type="password"
            {...register('password')}
            className="ring-2 pl-9 peer bg-transparent"
          />
            <Label className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-primary/60 peer-focus:text-primary">
              <Lock className='h-4 w-4'/>
            </Label>
          </Label>
          {errors.password && <Label className="text-red-500 mb-4 text-xs">{errors.password.message}</Label>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Loging in...' : 'Login'}
          </Button>
        </form>
            <div className="mt-4 text-sm flex justify-center gap-2">
                <Label>Dont have Account? </Label>
                <Link
                  className="hover:text-primary"
                  to={"/register"}
                >
                  Create account
                </Link>
            </div>
      </Card>
    </div>
  );
};

export default Login;
