import json
from bson import ObjectId

doc = {"name": "bla", "_id": ObjectId("5ddb87eaf2bb42cbfd3c32bb")}


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

# print(JSONEncoder().encode(doc))


list_str = ["5ddb87eaf2bb42cbfd3c32bb", "5ddb87eaf2bb42cbfd3c32b5"]


def oid(id):
    return ObjectId(id)


list_oid = map(oid, list_str)
print(list(list_oid))
