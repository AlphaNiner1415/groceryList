from flask import request
from flask import jsonify
from flask import Flask
from flask_cors import CORS

import json
from bson import ObjectId
import pymongo


app = Flask(__name__)
CORS(app)


def toObjectId(id):
    return ObjectId(id)


client = pymongo.MongoClient(
    "mongodb+srv://testuser:uni1@cluster0-acp-9z0m0.mongodb.net/test?retryWrites=true&w=majority")
db = client.grocery_list_db
item_coll = db['items']
list_coll = db['lists']


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/test")
def test():
    return "Hello test!"


@app.route("/getbyname")
def getbyname():
    name = request.args.get('name')
    docs = item_coll.find({'name': {"$regex": name, "$options": "$i"}})
    ret = list()
    for doc in docs:
        doc["_id"] = str(doc["_id"])
        ret.append(doc)
    return jsonify(ret)


@app.route("/item/<item_id>", methods=["GET", "POST", "DELETE"])
def item(item_id):
    if request.method == "GET":
        docs = item_coll.find({'_id': ObjectId(item_id)})
        ret = list()
        for doc in docs:
            doc["_id"] = str(doc["_id"])
            ret.append(doc)
        return jsonify(ret)

    if request.method == "POST":
        new_item = request.json
        item_coll.insert_one(new_item)
        return jsonify({"response": "Successfully created new item"})

    if request.method == "DELETE":
        item_coll.delete_one({"_id": ObjectId(item_id)})
        return jsonify({"response": "Successfully deleted item"})


@app.route("/getallitems")
def getallitems():
    docs = item_coll.find({})
    ret = list()
    for doc in docs:
        doc["_id"] = str(doc["_id"])
        ret.append(doc)
    return jsonify(ret)


@app.route("/g_list/<list_id>", methods=["GET", "POST", "DELETE"])
def g_list(list_id):
    if request.method == "GET":
        if list_id == "all":
            docs = list_coll.find({})
            ret = list()
            for doc in docs:
                doc["_id"] = str(doc["_id"])
                ret.append(doc)
            return jsonify(ret)

        doc = list_coll.find_one({'_id': ObjectId(list_id)})
        ret = list()
        doc["_id"] = str(doc["_id"])
        ret.append(doc)
        return jsonify(ret)

    if request.method == "POST":
        content = request.json
        list_coll.insert_one(content)
        return jsonify({"response": "Successfully created new list"})

    if request.method == "DELETE":
        list_coll.delete_one({"_id": ObjectId(list_id)})
        return jsonify({"response": "Successfully deleted"})


@app.route("/additem/<list_id>", methods=["POST"])
def additem(list_id):
    if request.method == "POST":
        content = request.json
        item = content["id"]
        list_coll.update_one({"_id": ObjectId(list_id)}, {
            "$addToSet": {"items": item}})
        return jsonify({"response": "Successfully updated"})


@app.route("/updatelist/<list_id>", methods=["POST"])
def updatelist(list_id):
    if request.method == "POST":
        content = request.json
        list_coll.update_one({"_id": ObjectId(list_id)}, {
            "$set": {"items": content}})
        return jsonify({"response": "Successfully updated"})


@app.route("/deleteitem/<list_id>", methods=["POST"])
def deleteitem(list_id):
    if request.method == "POST":
        content = request.json
        item = content["id"]
        list_coll.update_one({"_id": ObjectId(list_id)}, {
            "$pull": {"items": item}})
        return jsonify({"response": "Successfully updated"})


@app.route("/getlistitems/<list_id>")
def getlistitems(list_id):
    result = list_coll.find({'_id': ObjectId(list_id)})
    list_str = result[0]["items"]
    list_oid = list(map(toObjectId, list_str))
    docs = item_coll.find({"_id": {"$in": list_oid}})
    ret = list()
    for doc in docs:
        doc["_id"] = str(doc["_id"])
        ret.append(doc)
    return jsonify(ret)


if __name__ == "__main__":
    app.run()
