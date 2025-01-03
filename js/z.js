addLayer("h", {
    name: "hawk", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		    points: decimalZero,
        best: decimalZero,
        total: decimalZero,
        resetTime: 0,
    }},
    color: "rgb(255, 232, 27)",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "hawk(s)", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal("1e1000")
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    prestigeButtonText() {
        let x = new Decimal("1e100000").div(Decimal.pow(player.o.resetTime, 10))
        let txt = `Ahh you gotta give that a hawk <b>+${formatWhole(getResetGain(this.layer))}</b>.`
        let txt2 = `<br><br>Next at ${formatWhole(x)}`
        txt = txt + txt2
        return txt
    },
})