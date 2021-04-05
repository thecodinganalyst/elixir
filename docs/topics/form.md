# Form

This will be the format of the json data file as referenced in the `data` field of the `menu item` in the `navigation.json`, when the `component` field of the `menu item` is `form`.

## Form Structure

layout
: fixed to `form`

title
: title to be displayed at the top of the form

data
: the fields to display in the form, conforming to the [Control](./control.md) structure

actions
: the buttons to be displayed, conforming to the [Action](./action.md) structure

## Sample

```json
{
  "layout": "form",
  "title": "Sample Form 1",
  "data": [
    {
      "name": "Name",
      "value": "",
      "label": "Name",
      "required": true,
      "order": 1,
      "control": "textbox",
      "type": "text",
      "size": "12"
    },
    {
      "name": "Type",
      "value": "",
      "label": "Type",
      "required": true,
      "order": 2,
      "control": "dropdown",
      "size": "12",
      "options": [
        { "display": "Asset", "value": "Asset" },
        { "display": "Liability", "value": "Liability" }
      ]
    },
    {
      "name": "OpenDate",
      "value": "",
      "label": "Opening Date",
      "required": true,
      "order": 3,
      "control": "textbox",
      "type": "date",
      "size": "12"
    },
    {
      "name": "Curr",
      "value": "",
      "label": "Currency",
      "required": true,
      "order": 4,
      "control": "dropdown",
      "size": "4",
      "options": [
        { "display": "SGD", "value": "SGD" },
        { "display": "USD", "value": "USD" }
      ]
    },
    {
      "name": "OpenBal",
      "value": "",
      "label": "Opening Balance",
      "required": true,
      "order": 4,
      "control": "textbox",
      "type": "number",
      "size": "8"
    }
  ],
  "actions": [
    {
      "name": "Save", "label": "Save", "method": "", "importance": "primary"
    },
    {
      "name": "Cancel", "label": "Cancel", "method": "", "importance": ""
    }
  ]
}

```