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
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "ohio point(s)", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(Decimal.div(1, "1e100"))
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('s',23)||player.o.unlocked},
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
    },
    buyables: { // display, cost, canAfford, buy and optionally purchaseLimit
        11: { // buyableEffect, and getBuyableAmount
            display() { return `Point nerf based on itself starts 1 point later.
            Cost: ${format(tmp[this.layer].buyables[this.id].cost)} ohio point.` },
            cost: new Decimal(1),
            canAfford() { return player.o.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {                
                player.o.points = player.o.points.sub(tmp[this.layer].buyables[this.id].cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.cap = player.cap.add(1)
            },
            purchaseLimit: new Decimal(1),
        },
        12: {
            display() { return `Reduce the point nerf based on itself.
            Cost: ${format(tmp[this.layer].buyables[this.id].cost)} ohio points.
            Currently: ${format(buyableEffect(this.layer,this.id).x)}x
            Next: ${format(buyableEffect(this.layer,this.id).y)}x` },
            cost() {
                let x = Decimal.pow(2, getBuyableAmount(this.layer,this.id).add(1).pow(1.2))
                return x
            },
            canAfford() { return player.o.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {                
                player.o.points = Decimal.floor(player.o.points.sub(tmp[this.layer].buyables[this.id].cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            // purchaseLimit: new Decimal(1),
            effect() {
                let x = Decimal.pow(1.1, getBuyableAmount(this.layer,this.id))
                return {
                    x:x,
                    y:x.mul(1.1),
                }
            },
        },
        13: {
            display() { return `Keep Rizz Upgrade 12 "weather".
            Cost: ${format(tmp[this.layer].buyables[this.id].cost)} ohio points.` },
            cost: new Decimal(10),
            canAfford() { return player.o.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {                
                player.o.points = player.o.points.sub(tmp[this.layer].buyables[this.id].cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.cap = player.cap.add(1)
            },
            purchaseLimit: new Decimal(1),
        },      
    },
    prestigeButtonText() {
        let txt = `Reset for <b>+${formatWhole(getResetGain('o'))}</b> ohio point(s).`
        let txt2 = `<br><br>Next at ta txeN`
        txt = txt + txt2
        return txt
    },
    tabFormat: {
        "Upgrades": {
            content:[
                "main-display",
                "blank",
                "prestige-button",
                "blank",              
                ["row", [["buyable",11], ["buyable",12], ["buyable",13], ]],
            ]
        }
    }
})