[![Build Status](https://travis-ci.org/caiusCitiriga/nrg-cli.svg?branch=dev)](https://travis-ci.org/caiusCitiriga/nrg-cli)
# Energy CLI ```WIP [unstable]```
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
* Fully customizable behaviour and structure.
* Most commonly used item types are built in. 
* Allows you to add custom additional item types.
* Folders auto scaffolding during an item generation.
* [NOT AVAILABLE YET] Configurable NPM package auto init.
* [NOT AVAILABLE YET] Configurable Git repository auto init.

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

## **CLI Configuration**:
*Energy* has a `.energy.cli.json` file that holds all its configurations.

Below, each configuration and effect on the CLI:

| Preference               | Description                                                                                  |
|:-------------------------|----------------------------------------------------------------------------------------------|
| `srcFolder`              | The relative path to the folder you want to use as **source** folder.                        |
| `defaultExt`             | The default extension used for the newly generated items.                                    |
| `additionalTypes`        | The additional item-types you want to generate. <br>`{name: string, plural: string}[]`       |
| `dotnetInterfaceStyle`   | When creating interfaces, decides whether to put or not a `I` in front of the interface name |


## Upcoming features:
* Allow the user to specify a different extension when generating the item
* Implement **new** command to generate a new project
* Implement **init** command to initialize a project into an existing directory
* Implement **set** command to set preferences from the CLI
* Implement **restore** command that will remove *node_modules* and reinstall everything
* Implement **reset** command that will issue a `git reset --hard` and a `git clean -f-d` to reset all the unstaged changes. 
* Allow the user to specify file templates for default and custom item types
* Allow the user to specify more than one **src_outlet**. But one must be set as default one in the config file.
* Consider implementing **copy** command that will accept several flags, this command will copy items from a place to another of the project. This will require a “project-structure-integrity” system. In order to be able to quickly gather informations and paths from an item type to another.
* Consider implementing **move** command that will accept several flags, this command will move items from a place to another of the project. This will require a “project-structure-integrity” system. In order to be able to quickly gather informations and paths from an item type to another.
* Consider implementing **del** command that will accept several flags, this command will delete items from a specific item-type folder. This will require a “project-structure-integrity” system. In order to be able to quickly gather informations and paths from an item type to another. 