#!/bin/bash
set -e

# Compila el chat widget con Vite
npm --prefix static/chat-widget ci
npm --prefix static/chat-widget run build
