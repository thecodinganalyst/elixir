## Control Structure

name
: name to uniquely identify the control

value
: default value of the control

label
: label to display on the control

required
: `true` or `false` only, indicating if the field needs to be filled before it can be submitted. Default false.

order
: order of which control to be displayed first. Numeric value only

control
: only allowed `textbox`, `textarea`, `dropdown` to indicate which control to display

type
: indicate what type of data is to be displayed for the textbox, and the control will fit accordingly to the type, as of [MatInput](https://material.angular.io/components/input/overview). Allowed values are `color`, `date`, `datetime-local`, `email`, `month`, `number`, `password`, `search`, `tel`, `text`, `time`, `url`, `week`,

options
: the options to display if the `control` field is `dropdown`, to conform to the Options structure below

size
: to determine how big should the control be displayed, conforming to [Material Layout Grid](https://material.io/design/layout/responsive-layout-grid.html#columns-gutters-and-margins). Accepts 1 - 12. A full length in mobile is 4, tablet is 8, and desktop is 12.

## Options Structure

display
: the text to display for the option

value
: the value to be submitted when the option is selected

