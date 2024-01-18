import qrcode

#function to convert hash key(detailed info of students) to qr code
def generate_qr_code(data):
    qr=qrcode.QRCode(
        version=1,
        # There are forty (40) versions of the QR code, which regulates the size of the code. Version 1 is the smallest, whereas version 40 is the largest. Version 1 will generate a 21x21 matrix QR code.
        error_correction=qrcode.constants.ERROR_CORRECT_M, #error precision more the value , less the data we can store in qr
        box_size=10,
        border=4,
    )

    qr.add_data(data)
    qr.make(fit=True)
    qr_image=qr.make_image(fill_color="black",back_color="white")
    qr_image.save('qrimage.png')
    return qr_image



# for qr code verification and detection
import cv2
import numpy as np
from pyzbar.pyzbar import decode

lst = []

cap = cv2.VideoCapture(0)

while (cap.isOpened()):
    _, img = cap.read()
    for qrcode in decode(img): #so that iut can detect more than 1 qr at one time
        codeData = qrcode.data.decode('utf-8')
        print(codeData)
        # print(qrcode)
        points = (np.array([qrcode.polygon], np.int32))
        # print(points)
        points = (points.reshape((-1, 1, 2)))
        points2 = qrcode.rect
        if codeData in lst:
            cv2.polylines(img, [points], True, (0,255,0), 5)
            cv2.putText(img, codeData, (points2[0], points2[1]-10), cv2.FONT_HERSHEY_SIMPLEX,
                                            1, (0,255,0), 2)
        else:
            cv2.polylines(img, [points], True, (0,0,255), 5)
            cv2.putText(img, 'UnAuthorized', (points2[0], points2[1]-10), cv2.FONT_HERSHEY_SIMPLEX,
                        1, (0,0,255), 2)
    cv2.imshow('image', img)
    if cv2.waitKey(1)& 0xff == ord('q'): #press q to break the while loop and close the verification
        break
