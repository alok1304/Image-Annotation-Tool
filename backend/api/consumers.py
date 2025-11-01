from channels.generic.websocket import AsyncJsonWebsocketConsumer

class AnnotationConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("annotations", self.channel_name)
        await self.accept()

    async def receive_json(self, content):
        await self.channel_layer.group_send(
            "annotations", {"type": "annotation.update", "data": content}
        )

    async def annotation_update(self, event):
        await self.send_json(event["data"])
