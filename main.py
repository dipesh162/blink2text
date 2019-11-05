from flask import Flask, render_template, Response
import dlib,cv2,sys
from imutils import face_utils
import camera, face_detection
from flask_socketio import SocketIO
from PIL import Image
from io import BytesIO
import base64
import json


app = Flask(__name__)
app.config['DEBUG'] = True
app.config['ENV'] = True
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app)

face_detect = dlib.get_frontal_face_detector()
blinkDetect = face_detection.blinkDetect()
change = 0

@socketio.on('input image')
def test_message(input):
	input_str = input.split(",")[1]
	prev = blinkDetect.TOTAL
	blinkDetect.enqueue_input(input_str)
	op = blinkDetect.get_frame()
	change = blinkDetect.TOTAL - prev
	prev = blinkDetect.TOTAL
	# data = {'op': op, 'change' : change}
	# data = json.dumps(data)
	if change :
		socketio.emit('im1',op)
	else:
		socketio.emit('im2',op)
	
	# input_img = base64_to_pil_image(input_str)
	# output_img = blinkDetect.blink_detect(input_img)
	# output_str = pil_image_to_base64(output_img)
	# op = binascii.a2b_base64(output_str)
	# socketio.emit('im',op)

# @socketio.on('connect')
# def test_connect():
# 	# print('Hellosdo world!', file=sys.stderr)


@app.route('/')
@app.route('/index')

def index():
	user={'username':'VineeT Goyal'}
	return render_template('index.html')

# def gen():
# 	while True:
# 		frame = blinkDetect.get_frame()
# 		yield frame

# @app.route('/video_feed')
# def video_feed():
# 	for video_frame in gen():
# 		socket.emit('from_flask',{'data':video_frame.decode()},namespace='/test')


if __name__=='__main__':
	socketio.run(app)

################################################################################

# def gen(camera):
# 	global change
# 	while True:

# 		frame = camera.get_frame()
# 		prev = blinkDetect.TOTAL
# 		frame = blinkDetect.blink_detect(frame)
# 		change = blinkDetect.TOTAL - prev
		
		# formated_data = cv2.imencode('.jpeg', frame)[1]
		# frame_bytes = formated_data.tobytes()

# 		# return frame_bytes

# 		yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes+ b'\r\n')




# for video_frame in gen(camera.Camera()):
# 	socketio.emit('from_flask', {'data': video_frame})
# @app.route('/video_feed')
# def video_feed():
# 	return Response(gen(camera.Camera()),
#                 mimetype='multipart/x-mixed-replace; boundary=frame')

