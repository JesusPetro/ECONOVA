from ultralytics import YOLO
import cv2


class YOLOService:
    def __init__(self, model_path: str):
        """
        Inicializa y carga el modelo YOLO.
        Esto debe ejecutarse UNA sola vez al iniciar la app.
        """
        self.model = YOLO(model_path)

    def predict(self, image):
        """
        Ejecuta inferencia sobre una imagen OpenCV (BGR).

        Args:
            image (np.ndarray): imagen en formato OpenCV

        Returns:
            List[dict]: detecciones con label, confidence y bbox
        """
        results = self.model(image, verbose=False)

        detections = []

        for result in results:
            if result.boxes is None:
                continue

            for box in result.boxes:
                cls_id = int(box.cls[0])
                label = self.model.names[cls_id]
                confidence = float(box.conf[0])

                x1, y1, x2, y2 = map(int, box.xyxy[0])

                detections.append({
                    "label": label,
                    "confidence": confidence,
                    "bbox": [x1, y1, x2, y2]
                })

        return detections

    @staticmethod
    def draw_detections(image, detections):
        """
        Dibuja bounding boxes sobre la imagen.

        Args:
            image (np.ndarray): imagen OpenCV
            detections (list): salida de predict()

        Returns:
            np.ndarray: imagen anotada
        """
        for det in detections:
            x1, y1, x2, y2 = det["bbox"]
            label = det["label"]
            conf = det["confidence"]

            cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(
                image,
                f"{label} {conf:.2f}",
                (x1, max(y1 - 10, 20)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 255, 0),
                2
            )

        return image
