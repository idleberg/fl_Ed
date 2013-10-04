#!/bin/bash
java -jar bin/yuicompressor.jar --type js dist/fl_view-dev.js -o dist/fl_view.js
java -jar bin/yuicompressor.jar --type css dist/fl_view-dev.css -o dist/fl_view.css