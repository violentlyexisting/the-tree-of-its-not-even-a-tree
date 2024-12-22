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
        sigma: new Decimal(0),
    }},
    color: "rgb(255, 0, 0)",
    requires: new Decimal(2), // Can be a function that takes requirement increases into account
    resource: "skibidi toilets", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency base
    gainMult() { // Calculate the multiplier for main currency from bonuses
        req = new Decimal(1)
        if (hasUpgrade('s',15)) req=req.div(upgradeEffect('s',15))
        if (hasUpgrade('s',21)) req=req.div(2)
        //if (hasUpgrade('s',22)) req=req.div(upgradeEffect('s',22))
        if (player.s.points.gte(10)) req=req.mul(player.s.points.div(10))
        return req
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
        x = x.min(10000)
        let y = player.s.points.pow(0.8)
        if (x.gte(1000)) x = player.s.points.pow(2).min(1000).add(y)
        return x
    },
    effectDescription() {
        return `granting ${format(tmp.s.effect)} rizz.`
    },
    upgrades: {
        11: {title: "The",description(){return `Rizz boosts point gain.`},cost: new Decimal(25),currencyDisplayName:"rizz",currencyInternalName:"rizz",currencyLayer:"s",effect() {let x = player.s.rizz.add(1).log10().add(1);return x},effectDisplay() {return `${format(upgradeEffect(this.layer,this.id))}x`}},
        12: {title: "weather",description(){return`Unlock sigma.`},cost:new Decimal(36),currencyDisplayName:"rizz",currencyInternalName:"rizz",currencyLayer:"s"},
        13: {title: "outside",description(){return`Points boost themselves`},cost:new Decimal(144),currencyDisplayName:"rizz",currencyInternalName:"rizz",currencyLayer:"s",effect(){let x = player.points.add(1).root(2);return x},effectDisplay() {return `${format(upgradeEffect('s',13))}x`}},
        14: {title: "is",description(){return`Multiplier to points that decreases with time in this skibidi.`},cost:new Decimal(15**2),currencyDisplayName:"rizz",currencyInternalName:"rizz",currencyLayer:"s",effect(){let x = new Decimal(10).sub(Decimal.pow(player.s.resetTime, 0.9)).max(1);return x},effectDisplay() {return `${format(upgradeEffect('s',14))}x`}},
        15: {title: "rizzy",description(){return`Multiplier to skibidi toilets based on points.`},cost:new Decimal(20**2),currencyDisplayName:"rizz",currencyInternalName:"rizz",currencyLayer:"s",effect(){let x = player.points.add(1).root(2.3);return x},effectDisplay() {return `${format(upgradeEffect('s',15))}x`}},
        21: {title: "But the",description(){return`Skibidi toilet requirement is divided by 2.`},cost:new Decimal(4),currencyDisplayName:"sigma",currencyInternalName:"sigma",currencyLayer:"s",},
        22: {title: "fire",description(){return`Sigma costs decrease with more skibidi toilets.`},cost:new Decimal(5),currencyDisplayName:"sigma",currencyInternalName:"sigma",currencyLayer:"s",effect(){let x = player.s.points.pow(1.5).add(1);return x},effectDisplay() {return `${format(upgradeEffect('s',22))}x`}},
        23: {title: "is",description(){return`Unlock Ohio.`},cost(){let x = new Decimal(1000);if(hasUpgrade('s',22))x=x.div(upgradeEffect('s',22));return x},currencyDisplayName:"sigma",currencyInternalName:"sigma",currencyLayer:"s",}
    },
    decay() {
        let x = player.points.sub(player.cap).mul(4).max(0).root(2.5).add(1) // player.cap
        x = x.div(buyableEffect('o',12).x)
        let y = Decimal.pow((player.s.resetTime/100)+1, 2.5) // skibidi reset time
        let z = player.s.points.add(1).mul(2).root(2) // skibidi amount
        return {x:x,y:y,z:z}
    },
    sigmaduction() {
       let x = decimalOne
       return x
    },
    tabFormat: {
      "Main": {
        content:[
          "main-display",
          "blank",
          "prestige-button",
          "blank",
          "resource-display",
          "blank",
          ["display-text", function() {return `<span style="text-shadow:0 0 10px">Rizz Upgrades</span>`}],
          "blank",
          ["row",[["upgrade",11], ["upgrade",12], ["upgrade",13], ["upgrade",14], ["upgrade",15]]],
          function(){if (hasUpgrade('s',12)) return "blank"},
          ["display-text", function(){let text=`You have ${format(player.s.sigma)} sigma.<br>(${format(tmp.s.sigmaduction)}/s)`; if(hasUpgrade('s',12)) return text}],
          function(){if (hasUpgrade('s',12)) return "blank"},
          ["display-text", function() {let text = `<span style="text-shadow:0 0 10px">Sigma Upgrades</span>`; if(hasUpgrade('s',12)) return text}],
          function(){if (hasUpgrade('s',12)) return "blank"},
          function(){if (hasUpgrade('s',12)) return ["row", [ ["upgrade",21], ["upgrade",22], ["upgrade",23], ] ]}
        ]
      }
    },
    update(diff) {
        if (hasUpgrade('s',12)) player.s.sigma = player.s.sigma.add(tmp.s.sigmaduction.mul(diff)).min(player.limit)
    }
})
