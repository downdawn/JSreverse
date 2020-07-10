import requests

data = {"group": "ws-group-lin",
        "action": "base64_encode",
        "encode_str": "hello, sekiro",
        }

res = requests.post("https://sekiro.virjar.com/invoke", data=data)

print(res.json()['data'])

new_data = {
    "group": "ws-group-lin",
    "action": "base64_decode",
    "decode_str": "aGVsbG8sIHNla2lybw==",
}

res = requests.post("https://sekiro.virjar.com/invoke", data=new_data)

print(res.json()['data'])

new_data = {
    "group": "ws-group-lin",
    "action": "get_signature",
    # "decode_str": "5L2g5aW95Z2P5ZWKLOaIkeWlveWWnOasog==",
}

res = requests.post("https://sekiro.virjar.com/invoke", data=new_data)

_signature = res.json()['data']
print(_signature)

