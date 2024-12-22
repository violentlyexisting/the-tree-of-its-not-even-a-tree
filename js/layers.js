addLayer("s", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		    points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        rizz: new Decimal(0),
    }},
    color: "rgb(255, 0, 0)",
    requires: new Decimal(2), // Can be a function that takes requirement increases into account
    resource: "skibidi toilets", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency base
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    effect() {
        let x = player.s.points.pow(2)
        let y = player.s.points.pow(0.8).div(1000)
        x = x.min(1000)
        if (x.gte(1000)) x = x.mul(y)
        return x
    },
    effectDescription() {
        return `granting ${format(tmp.s.effect)} rizz.`
    },
    upgrades: {
        11: {
            title: "The",
            description() {
                return `Rizz boosts point gain.`
            },
            cost: new Decimal(25),
            currencyDisplayName:"rizz",
            currencyInternalName:"rizz",
            currencyLayer:"s",
            effect() {
                let x = player.s.rizz.add(1).log10().add(1)
                return x
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer,this.id))}x`
            }            
        },
        12: {title: "weather",description(){return`Unlock sigma.`}}
    },
    decay() {
        let x = player.points.add(1).mul(4).root(2.5)
        let y = Decimal.pow((player.s.resetTime/100)+1, 2.5)
        let z = player.s.points.add(1).mul(2).root(2)
        return {x:x,y:y,z:z}
    }
})
