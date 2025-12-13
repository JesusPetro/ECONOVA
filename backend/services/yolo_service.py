try:
    from ultralytics import YOLO
except:
    pass

try:
    import numpy as np
except: 
    pass


class YOLOService:
    def __init__(self, model_path: str):
        """
        Carga el modelo YOLO (una sola vez al iniciar la app)
        """
        try:
            self.model = YOLO(model_path)
        except:
            pass

    def predict_material(self, image: np.ndarray) -> str | None:
        """
        Ejecuta inferencia y retorna SOLO el nombre del material.

        Si hay múltiples detecciones, retorna la de mayor confianza.
        Si no detecta nada, retorna None.
        """
        try:
            results = self.model(image, verbose=False)

            best_label = None
            best_conf = 0.0

            for result in results:
                if result.boxes is None:
                    continue

                for box in result.boxes:
                    conf = float(box.conf[0])
                    if conf > best_conf:
                        cls_id = int(box.cls[0])
                        best_label = self.model.names[cls_id]
                        best_conf = conf

            return best_label
        except:
            return "organic"


yolo_service = YOLOService(
    model_path="weights/best.pt"
)
