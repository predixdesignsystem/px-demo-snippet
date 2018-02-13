v1.3.7
==================
* fix travis and tests for hybrid

v1.3.6
==================
* reduce icon-set imports

v1.3.5
==================
* Clean up CodePen example code

v1.3.4
==================
* Codepen fixes for Firefox and correct polygit dependency versions

v1.3.3
==================
* Check if highlight cache exists before using it

v1.3.2
==================
* remove old dependency resolutions

v1.3.1
==================
* Sub in released dependency versions

v1.3.0
==================
* Polymer 1.x/2.x hybrid support.

v1.2.2
==================
* fix dark theme

v1.2.1
==================
* Added the `hide-codepen` property

v1.2.0
==================
* Added the `expand code` functionality to editor

v1.1.4
==================
* Fix accidental delete

v1.1.3
==================
* Removing px-tabs case

v1.1.2
==================
* Make code container position relative so clipboard is contained within it

v1.1.1
==================
* Fix comment for analyzer

v1.1.0
==================
* update tab demo snippet
* Added ability to have snippet indent on tags and attrs
* Change buttons to be abs positioned so they dont take area away from the snippet

v1.0.1
==================
* update tab demo snippet

v1.0.0
==================
* update dependencies for design refresh
* added new icons
* switch codepen url to https
* fix IE display issue
* simplify sass structure

v0.6.20
==================
* override prism style for token entity class

v0.6.19
==================
* added a try/catch for json stringify

v0.6.18
==================
* Updated to cool grays

v0.6.17
==================
* Update colors design to pick up new colors

v0.6.16
==================
* changing ghp.sh to account for Alpha releases

v0.6.15
==================
* added background css variable and updated style of the codepen icon

v0.6.14
==================
* Updated dependencies

v0.6.13
==================
* changing browser in wct testing from safari 8 to safari 10 on elcapitan

v0.6.12
==================
* changing all devDeps to ^

v0.6.11
==================
* Update px-theme to 2.0.1 and update test fixtures


v0.6.10
==================
* changing Gruntfile.js to gulpfile.js


v0.6.9
==================
* removed unnecessary px-theme-styles import in px-demo-snippet.html and bower updated px-clipboard

v0.6.8
==================
* bumping px-clipboard to fill container

v0.6.7
=================
* fixed travis

v0.6.6
=================
* add 3 includes properties to API documentation

v0.6.5
=================
* had hover state and title to codepen/edit icon

v0.6.4
=================
* added shadow dom support to the snippet highlighting.

v0.6.4
=================
* added shadow dom support to the snippet highlighting.

v0.6.3
=================
* brought back the span checker until we have a better solution.

v0.6.2
=================
* changed timeout to 250 for prism-highlighter

v0.6.1
=================
* added codeLink attribute for components that can't compile there own codepen e.g. px-vis

v0.6.0
=================
* added a setTimeout to prism highlighter until we figure out how to listen to the event listener being registered on that element.
* added the attributes scriptsIncludes, linksIncludes, and polygitIncludes.

v0.5.3
=================
* changed prism highlighter checker from a simple string "<span" to see if the element has been registered on the page.

v0.4.0
=================
* added sibling Element

v0.3.2
=================
* added px-tabs exception

v0.3.1
=================
* added a title and description to the codepen

v0.3.0
=================
* added dynamic code pen the mix

v0.2.2
=================
* moved prism-element to latest version that supports shadow dom.

v0.2.1
=================
* changed async from 0 to 50

v0.2.0
=================
* added the ability to specify a parent component

v0.1.6
=================
* added css break-all words to editor

v0.1.5
=================
* changed the call to prism-highlighter so that it is async, and is run after everything's been loaded.

v0.1.4
=================
* created temp hack until we figure out the event listener for prism"

v0.1.3
=================
* removed ace-widget and replaced with prism-element

v0.1.2
=================
* changing px-clipboard in bower

v0.1.1
=================
* added flex grow to editor class

v0.1.0
=================
* added light dom content support

v0.0.11
=================
* changed polymer to 1.5.0

v0.0.10
=================
* added travis

v0.0.9
=================
* changed bower file to match px-theme bower designation

v0.0.8
=================
* added checker for object - if value is object, wrap it in single quotes, otherwise, double quotes. also, added html mode back into editor

v0.0.7
=================
* changed px-clipboard call to 0.0.4

v0.0.6
=================
* downgraded polymer to 1.5

v0.0.5
=================
* changed how content is inserted into editor

v0.0.4
=================
* added top padding to clipboard

v0.0.3
==================
* removed default top margin

v0.0.2
==================
* added margin to the right of the editor

v0.0.1
==================
* Initial release
