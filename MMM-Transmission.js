Module.register("MMM-Transmission", {
	defaults: {
    	freq: 10000,
		maxDisplayed: 3,
    	titleColor: "#fff",
		propertyColor: "#666",
		progressColor: "#fff",
		TBTParams: {
			host: "localhost",
			port: "9091",
			username: "pi",
			password: "raspberry"
		},
		tableWidth: "100%"
	},
	
	start: function() {
   		this.sendSocketNotification("get_torrent", this.config.TBTParams);
  	},

  	getDom: function() {
   		 var e = document.createElement("div")
   		 e.id = "pi_tbt"
		return e
	},

 	 notificationReceived: function(notification, payload, sender) {
	 	switch(notification) {
      			case "DOM_OBJECTS_CREATED":
        			var timer = setInterval(()=>{
						this.sendSocketNotification("get_torrent", this.config.TBTParams)
        		}, this.config.freq)
        		break
    		}
	},

  	socketNotificationReceived: function(notification, payload) {
		switch (notification) {
			case "tbtTorrent":
				var e = document.getElementById("pi_tbt");
				e.style.color = this.config.titleColor;
				e.style.display = "block";

				var parseObj = this.parseTorrentData(payload);
				if (parseObj.done == false) {
					e.innerHTML = parseObj.data;
					break;
				} else {
					var torrentData = this.sortTorrentData(parseObj.data);

					e.innerHTML = "";
					var tbl = this.populateTorrentTable(torrentData);
					// tbl.style.width = this.config.tableWidth;
					
					e.appendChild(tbl);
					break;
			}
		}
  	},

	parseTorrentData: function(payload) {
		try {
			returnObj = {
				data: JSON.parse(payload).data,
				done: true
			}
		} catch(err) {
			returnObj = {
				data: err.message,
				done: false
			}
		}
		return returnObj;
	},

					// TODO: Add modular sorting
				// TODO: Create function to more finely sort the array (make stopped but not full be higher up)
	sortTorrentData: function(data) {
		data.sort((a, b) => (a.status > b.status) ? 1 : (a.status === b.status) ?((a.progress < b.progress) ? 1 : -1) : -1);
		return data;
	},

	// TODO: Implement rates in the table
	populateTorrentTable: function(data) {
		var tbl = document.createElement("table");
		tbl.id = "tbt_tb";
		var tableLimit = Math.min(this.config.maxDisplayed, data.length);

		for (let i=0; i < tableLimit; i++) {
			var name = data[i].name.toString();
			var status = data[i].status.toString();
			var progress = data[i].progress.toString();
			var eta = data[i].eta.toString();

			var trn = tbl.insertRow();
			var tdn = trn.insertCell();
			tdn.colSpan = "3";
			tdn.innerHTML = name;
			// tdn.style.width = "100%";
			// tdn.style.whiteSpace = "nowrap";
			// tdn.style.textOverflow = "ellipsis";
			// tdn.style.overflow = "hidden";
			// tdn.style.maxWidth = "1px"
			
			var trg = tbl.insertRow();
			var tdg = trg.insertCell();
			tdg.colSpan = "3";
			tdg.style.height="0.4rem";
			tdg.appendChild(this.createProgressBar(progress));

			var trp = tbl.insertRow();
			trp.style.color = this.config.propertyColor;
			var tdstatus = trp.insertCell();
			tdstatus.innerHTML = status;
			var tdprogress = trp.insertCell();
			tdprogress.innerHTML = "Progress: " + progress + " %";
			var tdrate = trp.insertCell();
			tdrate.innerHTML = "ETA: " + eta;
		}
		return tbl;
	},

	createProgressBar: function(progress) {
		var bar = document.createElement("div");
		bar.style.width = progress + "%";
		bar.style.height = "100%"
		bar.style.backgroundColor = this.config.progressColor;
		return bar;
	}
})
