#!/bin/env bash

if [ ! -d env ]
then
    echo "Please run this script from the project root directory."
    exit -1
fi

source env/bin/activate

cd thirds/OCMovies-API-EN-FR
pip install -r requirements-dev.txt -q
./manage.py create_db
./manage.py runserver

