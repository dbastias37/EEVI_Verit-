#!/bin/sh
flask db init && flask db migrate -m "initial" && flask db upgrade

