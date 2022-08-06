const spawn = require("child_process").spawn;
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  socketNotificationReceived: function(notification, payload) {
    switch(notification) {
      case "get_torrent":
        this.job(payload);
        break;
    }
  },
  
  job: function(args) {
    var process = spawn("python3", ["/home/pi/MagicMirror/modules/MMM-Transmission/transmission.py", args.host, args.port, args.username, args.password]);
    // TODO: add buffering for data output, check the commented parts
    // process.stdout.on('data', chunk => chunks.push(chunk));
    // process.stdout.on("end", ()=>{
    //   try {
    //     var data = JSON.parse(Buffer.concat(chunks).toString());
    //     console.log(data);
    //   } catch (e) {
    //     console.log(result);
    //   }
    process.stdout.on("data", (data)=>{
      console.log(data);
      this.sendSocketNotification("tbtTorrent", data.toString())
    })
  }
})
