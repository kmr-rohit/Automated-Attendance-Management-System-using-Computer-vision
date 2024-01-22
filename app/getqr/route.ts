import {exec} from 'child_process';
import { NextResponse } from 'next/server';

export async function POST(request : Request) {
    const {email} = await request.json();
    exec(`${email}` , (err , stdout , stderr) => {
      if(err){
        console.error( `exec error : ${err}`);
        return;
      }
      console.log( `stdout : ${stdout}`);
      console.log( `stderr : ${stderr}`);
    });
    
    return NextResponse.json({product : 'product'});
}
  