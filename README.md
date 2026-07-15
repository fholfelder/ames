# ames
`ames` war einer griechischen Mythologie zufolge ein Gott, welcher sich um die Ausbildung seiner Schützlinge sorgte und somit immer neue Methoden erschuf, diese zu fordern und zu fördern. Darauf hin entwickelte er ein ultrakrasses mega nices Tool mit Vue3, welches er fortan auf Ausbildungsmessen mitnahm. Wirklich beeindruckend, mit welchen Framworks die Götter schon im alten Griechenland hantiert haben. Nachgelesen kann das ganze [hier](https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ).

...
Ne Spaß ames bedeutet einfach **a**usbildungs**mes**sen-Tool. Aber cool wär's schon gewesen oder?

## Ausführung

1. Wenn `bun` installiert ist, kann das Projekt direkt mit `bun dev` gestartet werden.
   
   => Diese ist dann unter http://localhost:5173 erreichbar!
2. Die App kann mit `docker compose build && docker compose up` gestartet werden.
   
   => Diese ist dann unter http://localhost:3210 erreichbar!

## Setup

- `bun` installieren
- `bun install` installiert all `npm`-Abhänigkeiten (=> viel schneller als `npm install`)

## Development

Änderungen am Projekt hinzufügen und 

```sh
bun dev
```
ausführen

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```
