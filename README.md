# 3D Portfolio

Many websites nowadays look roughly the same, which is very good for accessibility and familiarity. However, I wonder if there are unknown designs that might still mostly meet accessibility requirements while offering a refreshing take on a website.

This website couples as my portfolio and my attempt at a new style of navigation bar. Instead of either a bar appended to the top or side of the screen, or one that expands once clicked on, I made my navigation bar into a 3D objects that can be moved around.

## Shortcomings of Design

1. I have not coded keyboard support yet.
2. I have not coded screen reader support yet.
3. To prevent undesired clicks on faces when moving the cube, I had to use double click as the event to access one of the cube's faces. Double click is a rare and unfamiliar input method on websites.

## To-Do List

1. Fix the outline on the intro message
2. Hide nav text when a page is opened.
3. Fix bug where if the box is not moved before opening a page, it does not animate correctly.
4. Disable moving box during page intro and when inside other pages.
5. Make checkDoubleClick into an object so it can be copied easily in the future.
6. Set computed values of CSS rotate values on page double click.

## Compatibility

The website was tested on Chrome on PC and Android. It should work fine on iOS, but it was not tested on it.
