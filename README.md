# 3D Portfolio

Many websites nowadays look roughly the same, which is very good for accessibility and familiarity. However, I wonder if there are unknown designs that might still mostly meet accessibility requirements while offering a refreshing take on a website.

This website couples as my portfolio and my attempt at a new style of navigation bar. Instead of either a bar appended to the top or side of the screen, or one that expands once clicked on, I made my navigation bar into a 3D objects that can be moved around.

## Shortcomings of Design

1. Mobile support is not great. It can be quite laggy, and some taps or drags register in unintended ways (for example, dragging down might refresh the page on some phones).
2. There is no keyboard or screen reader support as of yet.
3. To prevent undesired clicks on faces when moving the cube, I had to use double click as the event to access one of the cube's faces. Double click is a rare and unfamiliar input method on websites.

## Compatibility

The website was tested on Chrome on PC and Android where it works well.

iOS support is unpredictable. It seems to work on newer iPhones, but does not work on older ones (mainly tested with iPhone 12). From my testing, the issue seems to be related to animations. Before any animation plays, the box can be moved around. Once any animation is played, the box can no longer be moved. Also, the touchmove event is used in this application, which is not supported on Opera or Safari according to MDN.

This project is tested with BrowserStack.
