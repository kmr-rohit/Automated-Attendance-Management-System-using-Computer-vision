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
#this qr_image will be stored in db of admin and given to student for attendance purpose
