export const PBTA = {};

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
