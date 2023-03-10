import { defineField } from "sanity";

const colorFields = [
  // TODO: customize this form component by adding color swatches to reflect the palette that's
  // currently selected. See: https://www.sanity.io/docs/component-api
  defineField({
    title: "Colour palette",
    name: "colorPalette",
    description: `Colours will be extracted from the photo unless you choose "custom", in which case you'll be able to select your own colours`,
    type: "string",
    options: {
      list: [
        { title: "Dominant", value: "dominant" },
        { title: "Vibrant", value: "vibrant" },
        { title: "Light Vibrant", value: "lightVibrant" },
        { title: "Dark Vibrant", value: "darkVibrant" },
        { title: "Muted", value: "muted" },
        { title: "Light Muted", value: "lightMuted" },
        { title: "Dark Muted", value: "darkMuted" },
        { title: "Custom", value: "custom" }
      ]
    }
  }),
  defineField({
    name: "primaryColor",
    title: "Primary colour",
    type: "color",
    options: {
      disableAlpha: true
    },
    hidden: ({ parent }) => parent?.colorPalette !== "custom"
  }),
  defineField({
    name: "secondaryColor",
    title: "Secondary colour",
    type: "color",
    options: {
      disableAlpha: true
    },
    hidden: ({ parent }) => parent?.colorPalette !== "custom"
  })
];
export default colorFields;
