# Install poetry
curl -sSL https://install.python-poetry.org | python -
POETRY_BIN_DIR_PATH=~/.local/bin
POETRY_ACTIVATION="export PATH=$(echo $POETRY_BIN_DIR_PATH):\$PATH"
echo $POETRY_ACTIVATION >> ~/.bashrc
${POETRY_BIN_DIR_PATH}/poetry config virtualenvs.in-project true

# Install python env with poetry
mv $PWD/$(dirname ${0})/pyproject.toml $PWD
${POETRY_BIN_DIR_PATH}/poetry install
PYTHON_ACTIVATION="source $(pwd)/.venv/bin/activate"
echo $PYTHON_ACTIVATION >> ~/.bashrc
