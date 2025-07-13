python -m venv .venv

if ($env:OS -eq "Windows_NT") {
    .\.venv\Scripts\Activate.ps1
} else {
    . ./.venv/bin/activate
}

pip install -r requirements.txt
