const fs = require("fs")
const path = require("path")
const srcPkg = require(path.resolve(
  process.cwd(),
  "src",
  "package.template.json"
))
const rootPkg = require(path.resolve(process.cwd(), "package.json"))

const keys = [
  "name",
  "version",
  "description",
  "author",
  "license",
  "dependencies",
]

keys.forEach(key => (srcPkg[key] = rootPkg[key]))

fs.writeFileSync(
  path.resolve(process.cwd(), "build", "package.json"),
  JSON.stringify(srcPkg, null, 2)
)
