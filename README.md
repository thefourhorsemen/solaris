# solaris

solaris helps you understand the way you consume locally the energy produced by solar panel
installations.

It has been specially designed for home solar panel installations.

solaris allows you to:

* display the energy assessment of your electric installation
* display the daily average of the energy assessment
* compute some KPIs such as:
    * auto consumption: the amount of the solar panel production locally consumed
    * auto production: the amount of the electric installation consumption produced by solar panels

Those data can be selected by day, week, month, and year.

## Supported formats

Currently, only CSV (comma separated values) files conform to the net energy Enphase format is
supported.

Each line of such file, except the header line, should respect the following format:

`<date>,<production>,<consumption>,<exported>,<imported>`

where the:

* `<date>`: the date in ISO format, for example `2022-09-01 17:00:00 +0200`
* `<production>`: the production of the solar panels, for example `469`
* `<consumption>`: the consumption of the electric installation, foe example `637`
* `<exported>`: the electric energy exported to the power grid, for example `0`
* `<imported>`: the electric energy imported from the power grid, for example `168`

Note that the energy unit is the Wh (Watt hour).

## Technology

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).