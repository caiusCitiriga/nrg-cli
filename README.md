# Energy CLI 
[![Travis branch](https://img.shields.io/travis/caiusCitiriga/nrg-cli.svg?branch=dev.svg)](https://travis-ci.org/caiusCitiriga/nrg-cli)
[![npm version](https://badge.fury.io/js/nrg-cli.svg)](https://badge.fury.io/js/nrg-cli)
[![License: MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://raw.githubusercontent.com/caiusCitiriga/nrg-cli/feature/templates/LICENSE)


***Note:*** Some features may be broken or not work as expected.<br>
**This is not a stable version yet.**

### The problem 
How much time do you spend on creating files, folders and classes for your projects? Nevertheless how much time takes you to scaffold your projects if you don't have an helper like Angular's CLI?

Let's say that you spend 10 seconds on creating a file. (the worst-case scenario)

+ create a folder that will contain all those new kinds of files (mkdir) 
+ create the file inside that folder (touch)
+ type the skeleton for that class in the newly created file

**10 seconds?** Maybe a bit too optimistic... 

Ah, and we are keeping apart any project specific naming conventions, so you also have to think a bit on how to name your file in a real world scenario. 

Now multiply that *10s timespan* for each item you will create... 
Based on the size of your project, the result could change drastically.


### The solution
Mostly every project that I've started so far, talking about frontend "JSish" stuff, have one thing in common:

You will use DTOs, Interfaces, Enums, Config files, maybe CONSTs files and so on. 

 ***Wouldn't be great having someone that takes care of that for you in a split second standardizing the whole process, yet giving you the ability to make some exceptions for custom scenarios?***

### Introducing Energy CLI [nrg]
*Energy* aims to solve this problem, by standardizing your project structure into something like this:

```
source/
    dtos/
    enums/
    cores/
    consts/
    customs/
    entities/
    services/
    interfaces/
    ...
```

This structure is the most commonly used. But is fully customizable, don't worry. Every item you will generate through *Energy*, will be placed inside the **source** folder. This folder is customizable too, and you can specify its path and name in the configuration, just like for anything else. 

*Energy* also offers various handy commands to perform operations over the existing files, initialize projects, scaffold structures and more. It provides shorcuts for other time consuming actions and keeps your project structure always clean and organized. 

*Energy* can be initialized in practically any project, and is a good tool to have in your *dev-dependencies* while developing. 

## Features
* Custom additional item types.
* Customizable item file templates.
* Works in any project of any language.
* Most commonly used item types are built in. 
* Folders auto scaffolding during an item generation.
* One shot project folders scaffolding by JSON structure.

## Get started
```bash
#  Install Energy
npm i nrg-cli -g

#  Test if it works
nrg
```

***Note:*** In order for the CLI to work, you have to manually create a `energy.cli.conf` inside the folder you want to use nrg. Once created, copy this content:
```json
{
    "$schema": "https://raw.githubusercontent.com/caiusCitiriga/nrg-ngx-cli/583bbb20748582ce78ca2fd943e5a1da7f4916c4/src/config/cli-conf.schema.json",
    "srcFolder": "src",
    "defaultExt": "ts",
    "additionalTypes": [],
    "dotnetInterfaceStyle": false
}
```
## **INIT**: 
**Usage**: ```nrg init```

**Description**: Initializes a new Energy project inside the current directory

A file called `energy.cli.json` will be created. This is the configuration file for Energy. 

It holds all the project configurations. This file is needed by all the other commands in order to function. 

The commands bases their logic on values stored in this file, some may be optional, but still, the file has to be present.


## **GENERATE**: 
**Usage**: ```nrg g --item=filename```

**Description**: Generates a new item.

 - The respective file will be named with a [filename.item-type.extension] notation.
 - Also, the item-type will match a specific folder inside your source folder. So all of your item types will be organized nicely.
 - If the item type folder does not exists, it will be created. The same is true for all the folders specified before the filename. <br>***Note:*** those folders needs to be separated using the Unix forward-slash (`/`).
 - The extension used will be the one specified in the cli configuration.


All the item-types behaves the same, exception made for the **interfaces**. 

Still, the creation process is the same, and the class would be initialized too. However, for this particular item-type, you can decide whether to put or not a `I` in front of the interface name. 

By default is set to false, but you can change this setting in the CLI conf at the `dotnetInterfaceStyle` preference.

**Usage example**:
```
nrg g --dto=folder-one/folder-two/test-item
```

This command will generate a new **dto** item-type inside the **source** folder, in the **dtos** folder, inside the two newly created folders **folder-one/folder-two**.

The file will be named **test-item.dto.ts** (assuming that we are using a `ts` extension in the CLI config).

The class name would be: **TestItem**

*Energy* by default generates TypeScript file templates, learn how to configure this behavior specifying your [custom file templates](#custom-file-templates)

## **SCAFFOLD**: 
**Usage**: ```nrg scaffold```

**Description**: Scaffolds the folders structure defined in the cli configuration.

The command can be ran without flags, and it will scaffold the structure inside **source** folder defined in the configuration. [Learn how to configure these folders](#default-project-structure-configuration)
 
**Flags**:
- **root**: Allows to specify a different location for the scaffold process. This will bypass the default configuration.

**Usage example**:
```bash
# This will scaffold the default structure inside the ./src
nrg scaffold 

# This will scaffold the default structure inside the ./src/new-struct folder
nrg scaffold --root=src/new-struct

# This will scaffold the default structure inside a folder called src2, outside src
nrg scaffold --root=src2
```

# **CLI Configuration**:
*Energy* has a `.energy.cli.json` file that holds all its configurations. *Energy* reads this file each time you issue a command. This means that you can quickly change this file manually, and the cli will use the new configuration with the next command you will run.

Some of the powers of *Energy* resides in its configuration file. Settings that you set, but don't necessarily use inside the commands. 

### Custom file templates:

*Energy* features a templating system for your files, it was originally meant for TypeScript files, but *Energy* fits in any project, of any language. 

For this purpose you can override the default behavior of the templating system, specifying a custom template to use for a certain item type, or to override a default one.

So when you will generate an item of that kind, the new template defined by you will be used instead the default one.

The templates can be defined inline in the cli configuration, or you can link for each item a template path. This path will be relative, and it will match a template file.

The template must contain a `{{classname}}` placeholder, which will be swapped at generation time with the real Class/Interface/Enum name.

In order to successfully define a custom item template, you have to specify two properties. The item type **name** you want to override, and the **template** or **templateFile**, but one of this two has to be defined. Otherwise an error will be thrown.

**Custom file template-inline example:**
```typescript
// .energy.cli.json

"customFileTemplates": [
    {
        "itemName": "entity",
        "template": "import * as fs from 'fs';\n\nexport class {{classname}} {\n\n}\n"
    }
],
```

**Custom file template-file example:**
```typescript
// .energy.cli.json

"customFileTemplates": [
    {
        "itemName": "entity",
        "templateFile": "src/templates/entity.template.ts"
    }
],
```

```typescript
//  src/templates/entity.template.ts

import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BaseClass } 'src/base/base-class.ts';

export class {{classname}} extends BaseClass {

    public constructor(){
        super();
    }

}
```

As you can see, this is a much more complex template than the default one, it imports various modules, and also extends a BaseClass. And it is as simple as that. Create your file, place it where you want, and link it in the configuration. **Remember the {{classname}}**.


### Default project structure configuration:
The default project configuration is a quick way to scaffold a complex folders structure you know you will use. So instead of going folder by folder manually, define your structure as JSON inside the cli configuration and let *Energy* do the work for you.

**Default project structure configuration example**:
```typescript
// .energy.cli.json

"defaultProjectStructure": {
    "default": {
        "folder-one": {
            "deep-one": null,
            "deep-two": {
                "deep-deep-one": null,
                "deep-deep-two": null
            }
        },
        "folder-two": {
            "deep-one": null,
            "deep-two": null,
            "deep-three": null
        },
        "interfaces": null,
        "dtos": null,
        "enums": null,
        "customs": null,
        "models": null,
        "entities": {
            "plain": null,
            "complex": null
        }
    }
}
```
**Note**: If you don't need a further structure inside a folder, you have to give it a **null** value.

There are no restrictions for the name you can use for the folders.


### All the configurations:
| Preference                | Description                                                                                  |
|:--------------------------|----------------------------------------------------------------------------------------------|
| `srcFolder`               | The relative path to the folder you want to use as **source** folder.                        |
| `defaultExt`              | The default extension used for the newly generated items.                                    |
| `additionalTypes`         | The additional item-types you want to generate.<br><br>**type**: `{name: string, plural: string}[]`<br><br>**name**: The name for the item type. Used for the *notation*<br><br>**plural**: The plural form of that name. Used for the folder name                                                                         |
| `dotnetInterfaceStyle`    | When creating interfaces, decides whether to put or not a `I` in front of the interface name |
| `customFileTemplates`     | An array containing all of your custom templates for item types. These templates can be used to override the default file templating system.<br><br>**type**: `{itemName: string, template?: string; templateFile?: string}[]`<br><br>**itemName**: The name of the item type you want to affect. For example: *dto, enum, model*. In case of custom item type, use the *singular form* name<br><br>**template**: The string to use for the template, defined inline. If you have a simple template you can use this.<br><br>**templateFile**: In case of complex templates, you can organize your templates into folders, and bind the relative path for each template.<br>Learn more about [custom file templates](#custom-file-templates).                                                  |
| `defaultProjectStructure` | A folders structure you want to scaffold istantly. Energy will go through all these folders and will create the structure for you.<br> The value is a JSON object, see the [Scaffold Command](#scaffold) for more information.                                                                                          |

---
### Built With
* [Chalk](https://github.com/chalk/chalk) - Terminal string styling done right
* [Inversify](https://github.com/inversify/InversifyJS/) - A powerful and lightweight IoC container
* [SmartCLI](https://github.com/caiusCitiriga/smart-cli/) - A NodeJS framework for building flexible and powerful console applications.
* [TypeScript](https://github.com/Microsoft/TypeScript) - TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
* **Love and passion. For coding, and beautiful code**

### Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/caiuscitiriga/nrg-cli/tags). 

### Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)

### Testing
The code is tested with Jasmine on its core parts, and all the possible break points are covered. So each release won't break any existing feature from now.

### License
This project is licensed under the MIT License - see the [LICENSE.md](https://raw.githubusercontent.com/caiusCitiriga/nrg-cli/dev/LICENSE) file for details