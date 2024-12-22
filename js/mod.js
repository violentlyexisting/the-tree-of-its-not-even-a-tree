let modInfo = {
	name: "The Skibidi Tree",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  if (player.points.gte(player.cap)) gain=gain.div(tmp.s.decay.x)
  gain=gain.div(tmp.s.decay.y)
  gain=gain.div(tmp.s.decay.z)
  if (hasUpgrade('s',11)) gain=gain.mul(upgradeEffect('s',11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
    cap: new Decimal(0),
    limit: new Decimal(5)
}}

// Display extra things at the top of the page
var displayThings = [
    function() {
      let txt = ``
      let text = `Points above ${formatWhole(player.cap)} divide point generation. Currently: ${format(tmp.s.decay.x)}x`
      let text2 = `<br>Time spent on this skibidi (${formatTime(player.s.resetTime)}) divides point generation. Currently: ${format(tmp.s.decay.y)}x`
      let text3 = `<br>Skibidi toilets also divide point generation. Currently: ${format(tmp.s.decay.z)}x`
      let text4 = `<br>Points are hardcapped at ${formatWhole(player.limit)}`
      if (player.points.gte(player.cap)) txt = txt + text
      txt = txt + text2
      txt = txt + text3
      if (player.points.gte(player.limit)) txt = txt + text4
      return txt
    }
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}