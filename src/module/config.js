export const PBTA = {};

// The item data that tracks a character's use of the item, rather than defining it.
// It can be changed on a locked item, and is kept when an item is updated from its source.
PBTA.itemStateFields = [
	"uses",
	"equipped",
	"quantity",
	"actorType"
];

// Item data that players may still personalise on a locked item, by item type.
// It is kept when the item is updated from its source.
PBTA.itemPersonalFields = {
	equipment: ["name", "description"]
};

// The most use boxes shown for an item, whatever its max uses.
PBTA.maxUseBoxes = 20;

PBTA.detailTypes = [
	"Text",
	"LongText",
	"Notes",
	"Moves",
	"Equipment"
];

PBTA.attrTypes = [
	"Number",
	"Clock",
	"Xp",
	"Resource",
	"Text",
	"LongText",
	"Checkbox",
	"ListMany",
	"ListOne",
	"Roll",
	"Track"
];

PBTA.sheetConfigs = [
	"maxMod",
	"minMod",
	"rollFormula",
	"rollResults",
	"rollShifting",
	"skipAttributeGrant",
	"statClock",
	"statShifting",
	"statToggle",
	"statToken"
];

PBTA.playbooks = [];

PBTA.rollModes = {
	def: "PBTA.Normal",
	adv: "PBTA.Advantage",
	dis: "PBTA.Disadvantage"
};
