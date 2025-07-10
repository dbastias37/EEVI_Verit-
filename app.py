from flask import Flask, render_template, jsonify
import json
import os

app = Flask(__name__)

# Ruta para cargar info de los packs
def cargar_packs():
    with open('packs/info.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def index():
    packs = cargar_packs()
    return render_template('index.html', packs=packs)

@app.route('/pack/<string:pack_id>')
def ver_pack(pack_id):
    packs = cargar_packs()
    pack = next((p for p in packs if p['id'] == pack_id), None)
    if pack:
        return render_template('pack.html', pack=pack)
    return "Pack no encontrado", 404

if __name__ == '__main__':
    app.run(debug=True)

