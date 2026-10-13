export class ItemTemplateData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			description: new foundry.data.fields.HTMLField(),
			// A locked item can only be edited by a GM, other than the state tracked on a character's sheet.
			locked: new foundry.data.fields.BooleanField({ initial: false })
		};
	}
}
