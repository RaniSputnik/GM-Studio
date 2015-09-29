# GM-Studio

A node.js library for loading and modifying [GameMaker : Studio](http://www.yoyogames.com/studio) projects, planning to expand with command line support. Key focus is for another project I am planning, GMLDoc.

#### Installation

```
npm install gm-studio
```

#### Usage

```
var studio = require("gm-studio");
var filePath = "/projects/MyGame.gmx";
var project = new studio.Project(filePath);
```
Reload the project from disk;
```
project.reload().then(function(){

  // TODO do something with project
  
}).fail(function(err){
  console.error(err);
});
```

TODO all the things;

#### License

> This is free and unencumbered software released into the public domain.

> Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

> In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

> For more information, please refer to <http://unlicense.org>

--------

I am not affiliated in any way with [YoyoGames](http://www.yoyogames.com/).

Find me on the [GameMaker Community](http://gmc.yoyogames.com/), [@RaniSputnik](http://gmc.yoyogames.com/index.php?showuser=133979).
