addLayer("o", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: decimalZero,
        best: decimalZero,
        total: decimalZero,
        resetTime: 0,
    }},
    color: "#4BDC13",
    requires: new Decimal(6), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('s',13)||player.o.unlocked},
    branches:['s'],
    componentStyles: {
        "buyable"() {
            return {                
                "width": "200px",
                "height": "150px",
                "border-radius": "10%",
                "border": "5px solid",
	              "border-color": "rgba(0, 0, 0, 0.1)",
                "font-size": "13px",
            }
        }
    }
})