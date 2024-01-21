
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
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
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import PicComponenet from "@/components/picComponenet"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { set } from 'react-hook-form';



export default async function dashboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('email', user?.email)
      .single();
    //console.log(data);
    return data;
  }

  const result = await fetchProfile();
  //console.log(result);
  
  const user1 = {
    id: 1,
    created_at: '2022-01-19T12:00:00Z',
    email: 'xyz@gmail.com',
    bio: 'This is a dummy bio.',
    urls: null,
    branch: 'Computer Science',
    semester: 'Spring 2022',
    role : 'Teacher',
  };

const attendenceSheet = [
  {
    id : 1,
    courseCode: "ME201",
    courseName: "Mechanical Vibrations",
    Status: "Absent",
    Date: "12/09/2021",
  },
  {
    id : 1,
    courseCode: "ME201",
    courseName: "Mechanical Vibrations",
    Status: "Present",
    Date: "12/09/2021",
  },
  {
    id : 1,
    courseCode: "ME201",
    courseName: "Mechanical Vibrations",
    Status: "Present",
    Date: "12/09/2021",
  },
  {
    id : 1,
    courseCode: "ME201",
    courseName: "Mechanical Vibrations",
    Status: "Absent",
    Date: "12/09/2021",
  },
  {
    id : 1,
    courseCode: "ME201",
    courseName: "Mechanical Vibrations",
    Status: "Present",
    Date: "12/09/2021",
  },
  {
    id : 1,
    courseCode: "ME201",
    courseName: "Mechanical Vibrations",
    Status: "Absent",
    Date: "12/09/2021",
  },
]

const classesToday = [
  {
    id: 1,
    courseCode: "ME201",
    name: 'Mechanical Vibrations',
    time: '9:00 AM',
  },
  {
    id: 2,
    courseCode: "ME201",
    name: 'Computer Networks',
    time: '11:00 AM',
  },
  {
    id: 3,
    courseCode: "ME201",
    name: 'Software Engineering',
    time: '2:00 PM',
  },
  {
    id: 4,
    courseCode: "ME201",
    name: 'Data Structures',
    time: '4:00 PM',
  }
]
  return (
    <div className='w-full h-full' >
      <Header />
      <div > 
      <Tabs defaultValue="profile">
        <TabsList  className=' flex gap-20 items-center w-full justify-center mt-4'>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          {result.role=='Teacher' && <TabsTrigger value="markattendence">Mark Attendence</TabsTrigger>}
          {result.role=='Student' && <TabsTrigger value="attendencesheet">Attendence Sheet</TabsTrigger>}
        </TabsList>
        <TabsContent value="profile">
        <div className=' flex gap-20 items-center w-full justify-center mt-4'>
          <Card className='w-[450px]'>
            <CardHeader>
              <CardTitle>Teacher Details</CardTitle>
              <CardDescription>Details of the logged-in Teacher</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Email: {result.email}</p>
              <p>Bio: {result.bio}</p>
              <p>Branch: {result.branch}</p>
              <p>Semester: {result.semester}</p>
            </CardContent>
          </Card>
        {result.role=='Student' && <Card className='w-[450px]'>
          <CardHeader >
            <CardTitle>QR Code </CardTitle>
            <CardDescription>Your Generated QR Code</CardDescription>
          </CardHeader>
          <CardContent >
          <div className="flex flex-col justify-center">
            <AspectRatio >
              <Image src="https://images.ctfassets.net/lzny33ho1g45/6TK1TbLNZQ4iHr0PjdZS2Y/ffb5c5646b914435f10b085b012bc78d/zap-qr-1.png" width="400" height="400" alt="Image" className="rounded-md object-cover" />
            </AspectRatio>
            <Button>Download QR </Button>
          </div>
          </CardContent>
          </Card>}
       
        </div>
        
        </TabsContent>  
        <TabsContent value="markattendence">
        <div className='flex gap-20 items-center w-full justify-center mt-4'>
          <Card className='w-[90%] m-auto md:w-[60%]'>
            <CardHeader>
              <CardTitle>Classes</CardTitle>
              <CardDescription>List of Classes you have Today</CardDescription>
            </CardHeader>
            <CardContent className=''>
            <Table  className='p-4 m-auto '>
            <TableCaption>Class Schedule.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {classesToday.map((classToday) => (
                <TableRow key={classToday.id}>
                  <TableCell className="font-medium ">{classToday.courseCode}</TableCell>
                  <TableCell>{classToday.name}</TableCell>
                  <TableCell>{classToday.time}</TableCell>
                  <TableCell>
                    {/* <Button className="bg-blue-500">
                    Mark Attendence
                    </Button> */}
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button className='bg-blue-500'>Mark Attendence</Button>
                      </DrawerTrigger>
                      <DrawerContent className='h-fit'>
                        <PicComponenet />
                      </DrawerContent>
                    </Drawer>
                   </TableCell>  
                </TableRow>
              ))}
            </TableBody>
            
          </Table>

            </CardContent>
          </Card>
        </div>
      </TabsContent>

        <TabsContent value="attendencesheet">
        <Table  className='p-4 m-auto w-[90%]'>
            <TableCaption>Your Attendence Sheet.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Class Date</TableHead>
                <TableHead>Status</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendenceSheet.map((attendence) => (
                <TableRow key={attendence.id}>
                  <TableCell className="font-medium ">{attendence.courseCode}</TableCell>
                  <TableCell>{attendence.courseName}</TableCell>
                  <TableCell>{attendence.Date}</TableCell>
                  <TableCell>
                    {attendence.Status == "Present" ?
                      <Button className="bg-green-500">
                    {attendence.Status}
                    </Button>
                    :
                      <Button className="bg-red-500">
                    {attendence.Status}
                    </Button>
}
                   </TableCell>  
                </TableRow>
              ))}
            </TableBody>
            
          </Table>
        </TabsContent>
      </Tabs>

      </div>
    </div>
  )
}

