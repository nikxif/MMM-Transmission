from transmission_rpc import Client
import sys, json

try:
    c = Client(host=sys.argv[1], port=sys.argv[2], username=sys.argv[3], password=sys.argv[4])
    torrentsList = c.get_torrents()
except Exception as e:
    print(e)

data_dict = {}
data_dict["data"] = []

for t in torrentsList:
    torrent_data = {
        'name': t.name,
        'status': t.status.capitalize(),
        'progress': t.progress,
        'eta': t.format_eta(),
        'downrate': t.rateDownload,
        'uprate': t.rateUpload
    }
    data_dict["data"].append(torrent_data)

print(json.dumps(data_dict))
