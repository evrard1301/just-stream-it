#!/bin/env bash

if [ ! -d env ]
then
    echo "Please run this script from the project root directory."
    exit -1
fi

sass -w src/scss/style.scss src/css/style.css
