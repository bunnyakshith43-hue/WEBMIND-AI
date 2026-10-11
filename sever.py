#!/usr/bin/env python3
"""
WebMind AI - Responsive Full-Stack Server
Provides static file serving and functional REST API endpoints.
"""

import http.server
import json
import os
import sys
from datetime import datetime
from urllib.parse import urlparse

PORT = 8080
DATA_FILE = os.path.join(os.path.dirname(__file__), 'backend_data.json')

# Initialize or load persistent data
def load_data():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return {
        'likes': 428,
        'inquiries': [],
        'status': {
            'isOpen': True,
            'message': 'Open Now',
            'hoursToday': '7:00 AM - 9:00 PM',
            'phone': '(555) 019-2834',
            'address': '742 Evergreen Terrace, Downtown District'
        }
    }

def save_data(data):
    try:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error saving data: {e}", file=sys.stderr)

db = load_data()

class WebMindHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable aggressive caching for API calls
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)

        # API: Get Current Likes
        if parsed.path == '/api/likes':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {'likes': db.get('likes', 428)}
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return

        # API: Get Business Status
        if parsed.path == '/api/status':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = db.get('status', {})
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return

        # API: Get All Confirmed Bookings
        if parsed.path in ['/api/bookings', '/api/booking']:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {'bookings': db.get('bookings', [])}
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return

        # Fallback to static file server
        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        body_bytes = self.rfile.read(content_length) if content_length > 0 else b'{}'
        
        try:
            payload = json.loads(body_bytes.decode('utf-8')) if body_bytes else {}
        except Exception:
            payload = {}

        # API: Increment Like Counter
        if parsed.path == '/api/like':
            db['likes'] = db.get('likes', 0) + 1
            save_data(db)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'success': True, 'likes': db['likes']}).encode('utf-8'))
            return

        # API: Submit Customer Inquiry / Table Callback
        if parsed.path == '/api/inquiry':
            entry = {
                'id': len(db.get('inquiries', [])) + 1,
                'timestamp': datetime.now().isoformat(),
                'name': payload.get('name', 'Anonymous Guest'),
                'phone': payload.get('phone', ''),
                'note': payload.get('note', ''),
                'type': payload.get('type', 'general')
            }
            if 'inquiries' not in db:
                db['inquiries'] = []
            db['inquiries'].append(entry)
            save_data(db)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            resp = {
                'success': True,
                'message': 'Thank you! We received your request and will connect with you right away.',
                'entry': entry
            }
            self.wfile.write(json.dumps(resp).encode('utf-8'))
            return

        # API: Confirm Your Request / Booking System
        if parsed.path in ['/api/booking', '/api/bookings']:
            booking_id = f"BK-{len(db.get('bookings', [])) + 1001}"
            booking = {
                'id': booking_id,
                'timestamp': datetime.now().isoformat(),
                'shopName': payload.get('shopName', 'WebMind Shop'),
                'guestName': payload.get('guestName', payload.get('name', 'Valued Guest')),
                'contact': payload.get('contact', payload.get('phone', payload.get('email', ''))),
                'date': payload.get('date', datetime.now().strftime('%Y-%m-%d')),
                'time': payload.get('time', '19:00'),
                'partySize': payload.get('partySize', payload.get('guests', '2 Guests')),
                'serviceType': payload.get('serviceType', 'General Reservation'),
                'specialRequests': payload.get('specialRequests', payload.get('notes', 'None')),
                'status': 'CONFIRMED'
            }
            if 'bookings' not in db:
                db['bookings'] = []
            db['bookings'].append(booking)
            save_data(db)

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            resp = {
                'success': True,
                'bookingId': booking_id,
                'message': f"Request Confirmed! Your booking ID is {booking_id}.",
                'booking': booking
            }
            self.wfile.write(json.dumps(resp).encode('utf-8'))
            return

        # 404 for unknown API routes
        self.send_response(404)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'error': 'Not found'}).encode('utf-8'))

if __name__ == '__main__':
    server_address = ('', PORT)
    # Use ThreadingHTTPServer to handle requests concurrently without blocking
    ServerClass = getattr(http.server, 'ThreadingHTTPServer', http.server.HTTPServer)
    httpd = ServerClass(server_address, WebMindHandler)
    print(f"WebMind Full-Stack Server running on port {PORT}...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        httpd.server_close()
