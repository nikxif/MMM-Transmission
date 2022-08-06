# MMM-Transmission

A MagicMirror module that connects to the **Transmission BitTorrent client** and allows you to monitor the progress of your torrents from your MagicMirror installation!

Using MMM-Transmission, you can display your current list of torrents, along with their status, progress and estimated time of completion, and a discreet progress bar. The module is created with the intent of monitoring Transmission, not updating the client (e.g. pausing downloads).

*I am not associated with the Transmission project but can recommend it as a solid, lightweight solution for your RaspberryPi.*

## Requirements
1. A working MagicMirror installation.
2. A working and configured [Transmission](https://transmissionbt.com/) installation.
3. A working installation of Python 3.
4. The transmission-rpc Python module. You can install it using ```$ sudo pip3 install transmission-rpc``` on your terminal.

## Installation
1. Open a terminal window and navigate to the MagicMirror modules directory: ```$ cd MagicMirror/modules```
2. Clone the MMM-Transmission repo: ```$ git clone https://github.com/nikxif/MMM-Transmission```
3. Change the directory to the config folder: ```$ cd ~/MagicMirror/config```
4. Modify your config.js file and add the MMM-Transmission module: ```$ sudo nano config.js```

## Configuration
The basic configuration in the ```config.js``` file is this:

```
{
    module: "MMM-Transmission",
    position: "top_left",
    config: {}
},
 ```

The possible configs (and their defaults) are shown below:

```
config: {
    TBTParams: {
        host: "localhost",
        port: "9091",
        username: "pi",
        password: "raspberry"
    },
    freq: 10000,
    maxDisplayed: 3,
    titleColor: "#fff",
    propertyColor: "#666",
    progressColor: "#fff"
}
 ```

Initially, the module is trying to connect to the Transmission client by using the default host, port, username and password settings. If you have updated the default pi/raspberry username and password combination (and you should!) you should update these by using the ```TBTParams``` setting.

The ```maxDisplayed``` parameter can be set to change the max number of torrents displayed on the MM simultaneously (default: 3). If there are more torrents than allowed, priority will be given to downloading torrents first; then to the ones with higher progress.

The ```titleColor```, ```propertyColor``` and ```progressColor``` control the color of the torrent titles, torrent properties and progress bars respectively. At this moment, turning off the progress bars is not possible through the config file.

```freq``` determines how frequently data will be pulled from the Transmission client, in milliseconds.

## Known issues
None at present time.

## Next steps
1. Adding the ability to turn off/modify progress bars
2. Adding the display of download/upload rates
3. Adding buffering for the Transmission client JSON results
4. Adding more ways to sort the torrent list
