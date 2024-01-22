
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
import AddClassForm from "@/components/addClassForm"
import { get } from 'http';





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

  const fetchClasses = async () => {
    const { data, error } =  await supabase
      .from('classes')
      .select('*')    
      .eq('instructor_email', user?.email)
    //console.log(data);
    return data;
  }

  const result = await fetchProfile();
  console.log(result);

  // fetching Qr
  const res = await fetch( "http://localhost:3000/getqr", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
    },
    body : JSON.stringify({
      email : result.email,
    }),
  })
  const res2 = await res.json();



  const classesToday = await fetchClasses();
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

function StudentProfile(){
  return(
    <div className=' flex gap-20 items-center w-full justify-center mt-4'>
    <Card className='w-[450px] h-[450px]'>
      <CardHeader>
        <CardTitle>Student Details</CardTitle>
        <CardDescription>Details of the logged-in Student</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='p-4 '>Email: {result.email}</p>
        <p className='p-4 '>Bio: {result.bio}</p>
        <p className='p-4 '>Branch: {result.branch}</p>
        <p className='p-4 '>Semester: {result.semester}</p>
      </CardContent>
    </Card>
    <Card className='w-[450px] h-[450px]'>
    <CardHeader >
      <CardTitle>QR Code </CardTitle>
      <CardDescription>Your Generated QR Code</CardDescription>
    </CardHeader>
    <CardContent >
    <div className="flex flex-col justify-center">
      <AspectRatio  >
        <Image src="https://images.ctfassets.net/lzny33ho1g45/6TK1TbLNZQ4iHr0PjdZS2Y/ffb5c5646b914435f10b085b012bc78d/zap-qr-1.png" width="330" height="330" alt="Image" className="rounded-md object-cover" />
      </AspectRatio>
      <Button>Download QR </Button>
    </div>
    </CardContent>
    </Card>
    </div>
  )
}
function TeacherProfile(){
  return(
    <div className=' flex gap-20 items-center w-full justify-center mt-4'>
    <Card className='w-[450px]'>
      <CardHeader>
        <CardTitle>Teacher Details</CardTitle>
        <CardDescription>Details of the logged-in Teacher</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='p-4 '>Email: {result.email}</p>
        <p className='p-4 '>Bio: {result.bio}</p>
        <p className='p-4 '>Branch: {result.branch}</p>
        <div className='p-4'>Courses Enrolled :
            <ul className='list-disc list-inside'>
              {result.courses_enrolled?.map((course: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, index: React.Key | null | undefined) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
      </CardContent>
    </Card>
    </div>
  )
}

async function AttendenceSheet(){
  let attendenceSheet2: any[] = [];

  const { data, error } =  await supabase
      .from('classes')
      .select('*')  


  function getStatus(classId: number | undefined): string {
    const isPresent = result.classes_status.includes(classId);
    return isPresent ? "Present" : "Absent";
  }

    data?.map((classToday) => {
      result.courses_enrolled?.map((course: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, index: React.Key | null | undefined) => {
        if(classToday.course_code == course){
          attendenceSheet2.push({
            courseCode: classToday.course_code,
            courseName: classToday.course_name,
            classStartTime: classToday.class_start_time,
            classEndTime: classToday.class_end_time,
            Status: getStatus(classToday.id),
            Date: classToday.class_date,
          })
        }
      })
    })

  return(
    <Table  className='p-4 m-auto w-[90%]'>
            <TableCaption>Your Attendence Sheet.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Class Date</TableHead>
                <TableHead>Class Start Time</TableHead>
                <TableHead>Class End Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendenceSheet2.map((attendence) => (
                <TableRow key={attendence.id}>
                  <TableCell className="font-medium ">{attendence.courseCode}</TableCell>
                  <TableCell>{attendence.courseName}</TableCell>
                  <TableCell>{attendence.Date}</TableCell>
                  <TableCell>{attendence.classStartTime}</TableCell>
                  <TableCell>{attendence.classEndTime}</TableCell>
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
  );
}

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
          {result.role == 'Teacher' && TeacherProfile()}
          {result.role=='Student' && StudentProfile() }
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
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Status</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {classesToday?.map((classToday) => (
                <TableRow key={classToday.id}>
                  <TableCell className="font-medium ">{classToday.course_code}</TableCell>
                  <TableCell>{classToday.course_name}</TableCell>
                  <TableCell>{classToday.class_start_time}</TableCell>
                  <TableCell>{classToday.class_end_time}</TableCell>
                  <TableCell>
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
            <AddClassForm />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
        <TabsContent value="attendencesheet">
          <AttendenceSheet />
        </TabsContent>
      </Tabs>

      </div>
    </div>
  )
}

