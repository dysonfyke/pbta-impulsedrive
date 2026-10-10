import { AttributeChoiceValueField, MappingField } from "../fields.js";
import { createModifiers } from "../shared.js";
import { ItemTemplateData } from "./templates/item.js";

export default class PlaybookData extends ItemTemplateData {
	static defineSchema() {
		const superFields = super.defineSchema();
		return {
			...superFields,
			slug: new foundry.data.fields.StringField({
				required: true,
				validate: (value) => {
					if (value !== value.slugify()) {
						return new foundry.data.validation.DataModelValidationFailure({
							unresolved: true,
							invalidValue: value,
							message: `${value} is not a valid slug`
						});
					}
				}
			}),
			actorType: new foundry.data.fields.StringField({ initial: "" }),
			stats: new foundry.data.fields.ObjectField(),
			statsDetail: new foundry.data.fields.StringField({ initial: "" }),
			attributes: new MappingField(
				new foundry.data.fields.SchemaField({
					label: new foundry.data.fields.StringField({ initial: "", required: true }),
					description: new foundry.data.fields.StringField({ blank: true }),
					value: new AttributeChoiceValueField({ initial: "" }),
					max: new AttributeChoiceValueField({ initial: null, required: false }),
					custom: new foundry.data.fields.BooleanField(),
					path: new foundry.data.fields.StringField({ initial: "details", required: true }),
					type: new foundry.data.fields.StringField({
						initial: "Details",
						required: true
					}),
					choices: new foundry.data.fields.ArrayField(
						new foundry.data.fields.SchemaField({
							value: new AttributeChoiceValueField({ initial: "" }),
							options: new foundry.data.fields.ObjectField()
						})
					),
					options: new foundry.data.fields.ObjectField()
				})
			),
			choiceSets: new foundry.data.fields.ArrayField(
				new foundry.data.fields.SchemaField({
					title: new foundry.data.fields.StringField({ initial: "", required: true }),
					// @todo consider HTMLField instead
					desc: new foundry.data.fields.StringField({ initial: "", required: true }),
					type: new foundry.data.fields.StringField({ initial: "multi", choices: ["single", "multi"] }),
					// optional: new foundry.data.fields.BooleanField({ initial: false }),
					repeatable: new foundry.data.fields.BooleanField({ initial: true }),
					// The most choices that can be picked each time the set is offered. 0 is unlimited.
					max: new foundry.data.fields.NumberField({
						required: true,
						integer: true,
						min: 0,
						initial: 0,
						nullable: false
					}),
					// Sets sharing a group are alternatives, only one of them is taken each time.
					group: new foundry.data.fields.StringField({ initial: "" }),
					choices: new foundry.data.fields.ArrayField(
						new foundry.data.fields.SchemaField({
							// A choice either grants the item at `uuid`, or has no item and applies its own modifiers.
							id: new foundry.data.fields.StringField({ initial: "" }),
							label: new foundry.data.fields.StringField({ initial: "" }),
							repeatable: new foundry.data.fields.BooleanField({ initial: false }),
							modifiers: createModifiers(),
							uuid: new foundry.data.fields.StringField({ initial: "", required: true }),
							img: new foundry.data.fields.StringField({ initial: null, nullable: true }),
							granted: new foundry.data.fields.BooleanField({ initial: false }),
							advancement: new foundry.data.fields.NumberField({
								required: true,
								integer: true,
								min: 0,
								initial: 0,
								nullable: false
							})
						})
					),
					grantOn: new foundry.data.fields.NumberField({
						required: true,
						integer: true,
						min: 0,
						initial: 0,
						nullable: false
					}),
					// For sets granted when an attribute fills up: the attribute's sheet config (TOML) name,
					// and whether it is emptied again once a choice has been taken.
					trigger: new foundry.data.fields.StringField({ initial: "" }),
					reset: new foundry.data.fields.BooleanField({ initial: false }),
					granted: new foundry.data.fields.BooleanField({ initial: false }),
					advancement: new foundry.data.fields.NumberField({
						required: true,
						integer: true,
						min: 0,
						initial: 0,
						nullable: false
					})
				})
			)
		};
	}
}
