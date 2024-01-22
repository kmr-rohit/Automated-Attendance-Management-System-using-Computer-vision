'use client'

import { useState , useEffect} from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import React from 'react'
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

import { createClient } from "@supabase/supabase-js";
const NEXT_PUBLIC_SUPABASE_URL="https://bjgogitjsngsyhliulao.supabase.co";
const NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZ29naXRqc25nc3lobGl1bGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2MDEyNzYsImV4cCI6MjAyMTE3NzI3Nn0.KNyORqCKECecNA5ir_rg2KvHgZkX1kelyUF2Oq-K7Ts";
const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL , NEXT_PUBLIC_SUPABASE_ANON_KEY);


export default function AddClassForm() {
  const [isAddClassDrawerOpen, setIsAddClassDrawerOpen] = useState(true);
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    classStartTime: '',
    classEndTime: '',
    instructor_email : 'rr7433446@gmail.com',
  });

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    
  };


  const handleCloseAddClassDrawer = () => {
    setIsAddClassDrawerOpen(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    

    try {
      const { data, error } = await supabase
        .from('classes')
        .insert([
          {
            course_code: formData.courseCode,
            course_name: formData.courseName,
            class_start_time: formData.classStartTime,
            class_end_time: formData.classEndTime,
            instructor_email : formData.instructor_email,
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      console.log('Data inserted successfully:');
      // Optionally, you can reset the form or perform any other actions here
    } catch (error) {
      console.error('Error inserting data into Supabase:', error);
      // Handle error as needed
    }
    setIsAddClassDrawerOpen(false);
  };

  return (
    (isAddClassDrawerOpen &&  <Drawer onClose={handleCloseAddClassDrawer}>
            <DrawerTrigger asChild>
              <Button className='bg-blue-500'>Add Class</Button>
            </DrawerTrigger>
            <DrawerContent className='h-fit'>
            <form className='flex flex-col w-full items-center space-y-6' onSubmit={handleSubmit}>
              <div>
                <Label>Course Code</Label>
                <Input id='courseCode' type="text" placeholder="ME201" value={formData.courseCode} onChange={handleChange} />
              </div>
              <div>
                <Label>Course Name</Label>
                <Input id='courseName' type="text" placeholder="Course Name" value={formData.courseName} onChange={handleChange} />
              </div>
              <div>
                <Label>Class Start Time</Label>
                <Input id='classStartTime' type="text" placeholder="09:00:00" value={formData.classStartTime} onChange={handleChange} />
              </div>
              <div>
                <Label>Class End Time</Label>
                <Input id='classEndTime' type="text" placeholder="10:00:00" value={formData.classEndTime} onChange={handleChange} />
              </div>
              <button type="submit">Submit</button>
            </form>
            </DrawerContent>
          </Drawer>)
    
  );
//   return (
//     <div><form className='flex flex-col w-full items-center space-y-6' >
//     <div>
//       <Label>Course Code</Label>
//       <Input id='course_code' type="text" placeholder="ME201" />
//     </div>
//     <div>
//       <Label>Course Name</Label>
//       <Input id='course_name' type="text" placeholder="Course Name" />
//     </div>
//     <div>
//       <Label>Class Start Time</Label>
//       <Input id='class_start_time' type="text" placeholder="09:00:00" />
//     </div>
//     <div>
//       <Label>Class End Time</Label>
//       <Input id='class_end_time' type="text" placeholder="10:00:00" />
//     </div>
//     <Button type="submit">Submit</Button>
// </form></div>
//   )
}

