# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A Node.js command-line notes app (CommonJS, ES6 per `.jshintrc`). Dependencies are `yargs` 12 (CLI parsing), `chalk` 2 (colored output), and `validator` (imported in `app.js` but unused).

## Commands

```bash
npm install                                   # install dependencies
node app.js add --title="t1" --body="b1"      # add a note (rejects duplicate titles)
node app.js remove --title="t1"               # remove a note by title
node app.js read --title="t1"                 # print one note
node app.js list                              # print all note titles
node app.js --help                            # yargs-generated help
```

There is no test suite (`npm test` just exits with an error) and no lint script; `.jshintrc` exists for editor JSHint integration only.

## Architecture

- `app.js` registers yargs commands (`add`, `remove`, `read`, `list`) whose handlers delegate to functions exported from `notes.js`, then calls `yargs.parse()`.
- `notes.js` holds all logic. Notes are an array of `{title, body}` objects persisted as JSON in `notes.json`. Every operation reads the whole file (`readNotes`), modifies the array, and rewrites it (`saveNotes`). Titles are the unique key.
- `notes.json` is read/written via the relative path `./notes.json`, so it resolves against the **current working directory** — run the CLI from the repo root. A missing or invalid file is treated as an empty list.
- `notes.json` is committed with sample data; running `add`/`remove` modifies a tracked file.

## Known issues

- `addNote` contains a leftover `debugger` statement (only matters under `node inspect`).
- `Muhil.txt` is a leftover from an `fs.appendFileSync` experiment (see the commented-out code at the bottom of `app.js`); nothing reads it.
