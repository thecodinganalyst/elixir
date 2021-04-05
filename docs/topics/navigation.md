# Navigation

Elixir will reference `assets/navigation.json` for information on how to build the frame for navigation. 

The structure requirement of the navigation file is as follows:

logo
: path to the logo to be displayed in the sidenav

title 
: title to be displayed in the sidenav

menu 
: a list of menu items

bottomMenu 
: a list of menu item, this menu will be aligned to the bottom of the sidenav

The structure of the menu item is as follows:

icon
: name of the material design icon to be displayed, list available at https://fonts.google.com/icons?selected=Material+Icons

name 
: name to identify this menu item

path
: sub path to append to the url for this menu item

component
: only 2 options are allowed currently - `table` and `form`

data
: path to the json file to instruct how the component is to be displayed

