### NRG Changelog
---
### 0.3.0 - Aelinor
#### New features:
* You can now define a default folders structure to scaffold
* You can now specify a custom templates for default items and custom items 
* Updated json schema (added customFileTemplates)
* Updated json schema (added templateFile to customFileTemplates)
* Updated json schema (added description for fields and examples)
* Updated json schema TS types
* Updated json schema TS types (added $schema entry)

#### Bugfixes
* Solved init bug that were creating the .energy.cli.json, but when using the generate command was throwing error.

#### Minor changes
* Added badges on readme
* Updated package repo data

---
### 0.2.4 - Aelene
* Throwing errors for: MissingItemTypeFlagException and unhandled errors.
* Various tweaks on messages.
* Refined output for missing filename item for interface from 'int' -> 'interface' only in case of interface-type.
* Changed `dotnetInterfaceStyle` from false -> true.
* Now the cli conf file is called `.energy.cli.json`.
* Fixed bug on mismatch between `nrg g --int` && `nrg g --interface`.
* Added test `should create the interface item correctly`.