import cv2
from pyzbar.pyzbar import decode


def barcode_reader(frame):
    detected_barcodes = decode(frame)

    for barcode in detected_barcodes:
        (x, y, w, h) = barcode.rect
        cv2.rectangle(frame, (x - 10, y - 10), (x + w + 10, y + h + 10), (255, 0, 0), 2)

        if barcode.data != "":
            print(f"Data: {barcode.data.decode('utf-8')}, Type: {barcode.type}")

    return frame


if __name__ == "__main__":
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        frame = cv2.flip(frame, 1)
        if not ret:
            break

        frame = barcode_reader(frame)
        cv2.imshow("Barcode reader", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()
