#!/usr/bin/env node
const fs = require("fs");
const process = require("process");
const yargs = require("yargs");
const path = require("path");
const rpc = require("@taquito/rpc");

const argv = yargs(process.argv.slice(2))
    .options({
        "url": {
            alias: "u",
            describe: "RPC URL",
            type: "string",
            default: "https://api.tez.ie/rpc/edonet/",
        }
    }).argv;

const client = new rpc.RpcClient(argv.url, "main");
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data.json")).toString());

async function packData(data) {
    const ret = [];
    for (const src of data) {
        try {
            const res = await client.packData(src, { block: "head" });
            ret.push({ ...src, packed: res.packed });
        } catch (err) {
            console.log(err);
        }
    }
    return ret;
}

packData(data).then(ret => process.stdout.write(JSON.stringify(ret, null, "  ")));