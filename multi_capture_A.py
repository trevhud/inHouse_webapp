import RPi.GPIO as gp
import os
import time
import datetime
from picamera import PiCamera

camera = PiCamera()

gp.setwarnings(False)
gp.setmode(gp.BOARD)

gp.setup(7, gp.OUT)
gp.setup(11, gp.OUT)
gp.setup(12, gp.OUT)

gp.setup(15, gp.OUT)
gp.setup(16, gp.OUT)
gp.setup(21, gp.OUT)
gp.setup(22, gp.OUT)

gp.output(11, True)
gp.output(12, True)
gp.output(15, True)
gp.output(16, True)
gp.output(21, True)
gp.output(22, True)

def main():
    while True:
        gp.output(7, False)
        gp.output(11, False)
        gp.output(12, True)
        camera.rotation = 180
        camera.start_preview()
        time.sleep(3)
        date = datetime.datetime.now().strftime("%m_%d_%Y_%H_%M_%S")
        camera.capture("/home/pi/cameraA_%s.jpg" %date)
        camera.stop_preview()
        os.system('s3cmd put /home/pi/cameraA_%s.jpg s3://imagesofmicrogreens/camera_A_germination/cameraA_%s.jpg' %(date,date))
        os.system('rm /home/pi/cameraA_%s.jpg' %date)
        time.sleep(30)

        gp.output(7, True)
        gp.output(11, False)
        gp.output(12, True)
        camera.rotation = 270
        camera.start_preview()
        time.sleep(3)
        date = datetime.datetime.now().strftime("%m_%d_%Y_%H_%M_%S")
        camera.capture("/home/pi/cameraB_%s.jpg" %date)
        camera.stop_preview()
        os.system('s3cmd put /home/pi/cameraB_%s.jpg s3://imagesofmicrogreens/camera_B_firstfloor/cameraB_%s.jpg' %(date,date))
        os.system('rm /home/pi/cameraB_%s.jpg' %date)
        time.sleep(30)

        gp.output(7, False)
        gp.output(11, True)
        gp.output(12, False)
        camera.rotation = 270
        camera.start_preview()
        time.sleep(3)
        date = datetime.datetime.now().strftime("%m_%d_%Y_%H_%M_%S")
        camera.capture("/home/pi/cameraC_%s.jpg" %date)
        camera.stop_preview()
        os.system('s3cmd put /home/pi/cameraC_%s.jpg s3://imagesofmicrogreens/camera_C_secondfloor/cameraC_%s.jpg' %(date,date))
        os.system('rm /home/pi/cameraC_%s.jpg' %date)
        time.sleep(30)

        gp.output(7, True)
        gp.output(11, True)
        gp.output(12, False)
        camera.rotation = 270
        camera.start_preview()
        time.sleep(3)
        date = datetime.datetime.now().strftime("%m_%d_%Y_%H_%M_%S")
        camera.capture("/home/pi/cameraD_%s.jpg" %date)
        camera.stop_preview()
        os.system('s3cmd put /home/pi/cameraD_%s.jpg s3://imagesofmicrogreens/camera_D_thirdfloor/cameraD_%s.jpg' %(date,date))
        os.system('rm /home/pi/cameraD_%s.jpg' %date)
        time.sleep(1800)

if __name__ == "__main__":
    main()

    gp.output(7, False)
    gp.output(11, False)
    gp.output(12, True)
