# Table View

This will be the format of the json data file as referenced in the `data` field of the `menu item` in the `navigation.json`, when the `component` field of the `menu item` is `table`.

## Table Structure

layout
: Only `table` is accepted

title
: title of the table to be displayed

dataHeaders
: the order of the header fields to be displayed in the table. Must correspond to the keys in the `data` field below.

headerTypes
: type of the fields, corresponding to the dataHeaders

data
: json list of the data to be displayed in the table

actions
: the buttons to be displayed, conforming to the [Action](./action.md) structure


## Sample

```json
{
  "layout": "table",
  "title": "Sample Table 1",
  "dataHeaders": ["Name", "Type", "Opening Date", "Curr", "Opening Balance"],
  "headerTypes": ["string", "string", "Date", "string", "number"],
  "data": [
    {
      "Name": "Bank A",
      "Type": "Asset",
      "Opening Date": "2021-01-01",
      "Curr": "SGD",
      "Opening Balance": 1000000
    },
    {
      "Name": "Customer X Receivable",
      "Type": "Asset",
      "Opening Date": "2021-01-01",
      "Curr": "SGD",
      "Opening Balance": 0
    },
    {
      "Name": "Credit Card A",
      "Type": "Liability",
      "Opening Date": "2021-01-01",
      "Curr": "SGD",
      "Opening Balance": 0
    },
    {
      "Name": "Supplier Y Payable",
      "Type": "Liability",
      "Opening Date": "2021-01-01",
      "Curr": "SGD",
      "Opening Balance": 0
    },
    {
      "Name": "Salary Payable",
      "Type": "Liability",
      "Opening Date": "2021-01-01",
      "Curr": "SGD",
      "Opening Balance": 0
    },
    {
      "Name": "Sales",
      "Type": "Revenue",
      "Opening Date": "2021-01-01",
      "Curr": "SGD",
      "Opening Balance": null
    },
    {
      "Name": "Utilities",
      "Type": "Expense",
      "Opening Date": "2021-01-01",
      "Curr": "SGD",
      "Opening Balance": null
    },
    {
      "Name": "Rental",
      "Type": "Expense",
      "Opening Date": "2021-01-01",
      "Curr": "SGD",
      "Opening Balance": null
    },
    {
      "Name": "Salary",
      "Type": "Expense",
      "Opening Date": "2021-01-01",
      "Curr": "SGD",
      "Opening Balance": null
    },
    {
      "Name": "Cost of Goods Sold",
      "Type": "Expense",
      "Opening Date": "2021-01-01",
      "Curr": "SGD",
      "Opening Balance": null
    }
  ],
  "actions": [
    {"name": "Add", "label": "Add", "method": "", "importance": "primary"}
  ]
}
```