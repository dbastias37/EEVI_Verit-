from flask import render_template, request, redirect, url_for, flash
from utils.db import get_db


def admin_packs_list():
    """Renderiza la lista de packs."""
    conn = get_db()
    packs = conn.execute('SELECT slug, name, description, price, image FROM packs').fetchall()
    return render_template('admin_packs.html', packs=packs)


def admin_packs_new():
    conn = get_db()
    if request.method == 'POST':
        slug = request.form['slug'].strip()
        name = request.form['name'].strip()
        desc = request.form.get('description', '').strip()
        price = request.form['price'].strip()
        image = request.form.get('image', '').strip()
        if not slug or not name:
            flash('Slug y nombre son obligatorios')
        else:
            existing = conn.execute('SELECT 1 FROM packs WHERE slug=?', (slug,)).fetchone()
            if existing:
                flash('Slug ya existe')
            else:
                conn.execute(
                    'INSERT INTO packs (slug, name, description, price, image) VALUES (?,?,?,?,?)',
                    (slug, name, desc, price, image)
                )
                conn.commit()
                return redirect(url_for('admin.admin_packs'))
    return render_template('admin_pack_form.html', pack=None)


def admin_packs_edit(slug):
    conn = get_db()
    pack = conn.execute('SELECT slug, name, description, price, image FROM packs WHERE slug=?', (slug,)).fetchone()
    if not pack:
        return redirect(url_for('admin.admin_packs'))
    if request.method == 'POST':
        name = request.form['name'].strip()
        desc = request.form.get('description', '').strip()
        price = request.form['price'].strip()
        image = request.form.get('image', '').strip()
        conn.execute(
            'UPDATE packs SET name=?, description=?, price=?, image=? WHERE slug=?',
            (name, desc, price, image, slug)
        )
        conn.commit()
        return redirect(url_for('admin.admin_packs'))
    return render_template('admin_pack_form.html', pack=pack)


def admin_packs_delete(slug):
    conn = get_db()
    conn.execute('DELETE FROM packs WHERE slug=?', (slug,))
    conn.commit()
    return redirect(url_for('admin.admin_packs'))
