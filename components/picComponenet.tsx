'use client'
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from '@/components/ui/button'

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user"
};

export default function PicComponenet() {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      {isCaptureEnable || (
        <Button className='w-fit h-fit p-2 m-auto'  onClick={() => setCaptureEnable(true)}>Start Capturing Image </Button>
      )}
      {isCaptureEnable && (
        <>
          <div className='w-fit h-fit p-2 m-auto'>
            <Button   onClick={() => setCaptureEnable(false)}>Stop Capturing </Button>
          </div>
          <div className='w-fit h-fit p-2 m-auto'>
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <Button className='w-fit h-fit p-2 m-auto bg-green-500'  onClick={capture}>Capture Image</Button>
        </>
      )}
      {url && (
        <>
          <div>
            <Button className='w-fit h-fit p-2 m-auto bg-red-500'
              onClick={() => {
                setUrl(null);
              }}
            >
              Delete Image
            </Button>
          </div>
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        </>
      )}
    </>
  );
};
