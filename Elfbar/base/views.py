import cv2
import base64
from pyzbar.pyzbar import decode
import numpy as np

from django.core import serializers
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Product


def home(request):
    return render(request, "index.html")


@csrf_exempt
def check_for_barcode(request):
    if request.method == "POST":
        frame = request.FILES["image"]
        img = cv2.imdecode(np.frombuffer(frame.read(), np.uint8), cv2.IMREAD_COLOR)
        detected_barcodes = decode(img)

        if detected_barcodes:
            for i in range(len(detected_barcodes)):
                barcode = detected_barcodes[i]
                if barcode.type == "QRCODE":
                    detected_barcodes.remove(barcode)
                
                (x, y, w, h) = barcode.rect
                cv2.rectangle(
                    img, (x - 10, y - 10), (x + w + 10, y + h + 10), (255, 0, 0), 2
                )

        _, buffer = cv2.imencode(".jpg", img)
        img_str = base64.b64encode(buffer).decode("utf-8")

        products = []
        
        for barcode in detected_barcodes:
            product = Product.objects.get(barcode=barcode.data.decode("utf-8"))
            products.append(serializers.serialize("json", [product]))
                

        return JsonResponse(
            {
                "status": "success",
                "image": img_str,
                "products": products,
            }
        )

    return JsonResponse({"status": "error"})
