= Nessus Cheat Sheet
Damian Krawczyk <https://limberduck.org>
:description: Cheet Sheet
:imagesdir: limberduck/assets
:toc: left
:revnumber:     0.0.2
:revremark:     Initial
:revdate:       {localdatetime}
:stylesdir: stylesheets
:stylesheet: asciidoc-style-limberduck.css
:experimental:
:icons: font
:icon-set: fas
:icon-set: fab
:icon-set: far
:icon-set: fi
:icon-set: pf
:table-stripes: hover
:sectanchors:

ifdef::env-github[]
:tip-caption: :bulb:
:note-caption: :information_source:
:important-caption: :heavy_exclamation_mark:
:caution-caption: :fire:
:warning-caption: :warning:
:yes: :white_check_mark:
:no: :x:
:depends: :question:
endif::[]

== Data directories

[cols=".^1,4"]
|===
|Linux
|``/opt/nessus/var/nessus``
|macOS
|``/Library/Nessus/run/var/nessus``
|Windows
|``C:\ProgramData\Tenable\Nessus\nessus``
|===

== Binary directories and utilities

[cols=".^1,4"]
|===
|Linux
|``/opt/nessus/sbin`` +
``/opt/nessus/bin``
|macOS
|``/Library/Nessus/run/sbin`` +
``/Library/Nessus/run/bin``
|Windows
|``C:\Program Files\Tenable\Nessus`` +
``C:\Program Files (x86)\Tenable\Nessus``
|===

- ``nessusd`` - e.g. to recompile plugins
- ``nessuscli`` - e.g. to configure, manage and update Nessus https://docs.tenable.com/nessus/Content/NessusCLI.htm[(docs)]
- ``nasl`` - e.g. to test, run, sign plugins

== Logs directories and files

[cols=".^1,4"]
|===
|Linux
|``/opt/nessus/var/nessus/logs``
|macOS
|``/Library/Nessus/run/var/nessus/logs``
|Windows
|``C:\ProgramData\Tenable\Nessus\nessus\logs``
|===

- ``nessusd.dump`` — Nessus dump log file used for debugging output. +
- ``nessusd.messages`` — Nessus scanner log. +
- ``www_server.log`` — Nessus web server log. +
- ``backend.log`` — Nessus backend log. +
- ``nessuscli.log`` — Nessus CLI log. +

== Plugin directories and files

[cols=".^1,4"]
|===
|Linux
|``/opt/nessus/lib/nessus/plugins``
|macOS
|``/Library/Nessus/run/lib/nessus/plugins``
|Windows
|``C:\ProgramData\Tenable\Nessus\nessus\plugins``
|===

- ``*.nasl`` - plugins with readable source code
- ``*.nbin`` - compiled plugins
- ``*.inc`` - include libraries

== Search in plugin content

```terminal
cd /opt/nessus/lib/nessus/plugins
grep -rl script_id.19506 . <1>
```
<1>  Due to big number of plugins you need to use ``-r`` parameter to 
recursively search in plugins directory (i.e., force grep to behave as rgrep).

== Advanced Settings

```terminal
cd /opt/nessus/sbin
nessuscli fix --list
nessuscli fix --get setting_name
nessuscli fix --set setting_name=<value>
```

== API

```
https://localhost:8834/api <1>
https://localhost:8834/server/status <2>
https://localhost:8834/server/properties <3>
```
<1> Access Nessus API documentation.
<2> Check Nessus service status.
<3> Check Nessus service version.

== Plugin Feed

=== Check latest available plugins feed 

```terminal
curl https://plugins.nessus.org/v2/plugins.php 
202201311213
```

=== Check Plugin Feed in Nessus

Login to Nessus, go to Settings > About > check Plugin Set, 
or on OS level:

```terminal
cd /opt/nessus/lib/nessus/plugins
head -1 plugin_feed_info.inc
PLUGIN_SET = "202201311213";
```

== Good practices

When you run scan:
[options="interactive"]
[.do]
* [x] Make sure that you have latest feed.
* [x] Perform scan with credentials. https://docs.tenable.com/nessus/Content/NessusCredentialedChecks.htm[(docs)]

When you analyze scan results:
[options="interactive"]
[.do]
* [x] Use Audit Trail to make sure why plugin did not provide result.
* [x] Check Knowledge Base to find more details.

== Additional resources

- https://docs.tenable.com/Nessus.htm[docs.tenable.com/Nessus.htm] - Nessus documentation
- https://www.tenable.com/downloads/nessus[tenable.com/downloads/nessus] - Nessus download page
- https://www.tenable.com/plugins/search[tenable.com/plugins/search] - Nessus Plugins Search
- https://community.tenable.com[community.tenable.com] - Tenable Community
- https://github.com/tenable[github.com/tenable] - Tenable profile at GitHub
