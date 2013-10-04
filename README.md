# fl_Ed

Watch a [demo](http://idleberg.github.io/fl_Ed/)!

## Installation

Clone repository `git clone https://github.com/idleberg/fl_Ed.git` or download manually

## Usage

Before usage, modified developer files in the `dist`folder should be minified using the build tool `./build.sh` (requires [YUI Compressor](http://yui.github.io/yuicompressor/))

## URL Parameters

You can control the editor by passing URL parameters (e.g. path/to/fl_ED?param1=hello&param2=world)

`reset=true`  
Reset the localStorage, cannot be combined with other parameters

`editor.x=int`  
Set x-position for editor window

`editor.y=int`  
Set y-position for editor window

`editor.w=int`  
Set width for editor window

`editor.h=int`  
Set height for editor window

## License

The MIT License (MIT)

Copyright (c) 2013 [Jan T. Sott](http://github.com/idleberg/fl_Ed)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.