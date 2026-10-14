import { createItemResources, createModifiers } from "../shared.js";
import { ItemTemplateData } from "./templates/item.js";

export default class EquipmentData extends ItemTemplateData {
	static defineSchema() {
		const superFields = super.defineSchema();
		return {
			...superFields,
			...createItemResources(),
			// Whether the quantity is tracked, for items that aren't unique.
			hasQuantity: new foundry.data.fields.BooleanField({ initial: false }),
			quantity: new foundry.data.fields.NumberField({
				initial: 1,
				integer: true
			}),
			weight: new foundry.data.fields.NumberField({
				initial: 0,
				integer: true
			}),
			// Whether the item can be equipped, and whether it currently is.
			equippable: new foundry.data.fields.BooleanField({ initial: false }),
			equipped: new foundry.data.fields.BooleanField({ initial: false }),
			tags: new foundry.data.fields.StringField({ initial: "" }),
			itemType: new foundry.data.fields.StringField({ initial: "" }),
			equipmentType: new foundry.data.fields.StringField({ initial: "" }),
			actorType: new foundry.data.fields.StringField({ initial: "" }),
			modifiers: createModifiers()
		};
	}
}
