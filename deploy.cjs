const fs = require("fs")
const { execSync } = require("child_process")

// GET COMMAND OPTIONS
const args = process.argv.slice(2);
const options = args.reduce((total, value, index) => {
  if(index % 2 === 0) {
    total[value] = args[index + 1]
  }
  return total
}, {})

const mode = options['--mode'] ?? 'staging'

const versionData = JSON.parse(fs.readFileSync(`assets/version.json`, "utf-8"))
const currentVersion = versionData[mode]

const configs = {
  staging: {
    DOCKER_IMAGE: 'stg-tankmons',
    DOCKER_REMOTE_TAG: 'plhuan/stg-tankmons',
    BUILD_SCRIPT: 'build-stg'
  },
  production: {
    DOCKER_IMAGE: 'pro-tankmons',
    DOCKER_REMOTE_TAG: 'plhuan/pro-tankmons',
    BUILD_SCRIPT: 'build-pro'
  }
}
const CONFIG = configs[mode]

const versionArr = currentVersion.split('.')
const newVersion =  `${versionArr.slice(0, -1).join('.')}.${(Number(versionArr.at(-1)) + 1)}`
console.log(`****** ✨️ DEPLOY ******
****** TAG: ${CONFIG.DOCKER_REMOTE_TAG}:${newVersion} ****`);
const script = `docker build --platform linux/amd64 -f Dockerfile -t ${CONFIG.DOCKER_IMAGE} . && docker tag ${CONFIG.DOCKER_IMAGE} ${CONFIG.DOCKER_REMOTE_TAG}:${newVersion} && docker push ${CONFIG.DOCKER_REMOTE_TAG}:${newVersion}`
execSync(script, { stdio: "inherit" })

const scriptRemoveImage = `docker images --format "{{.Repository}}:{{.Tag}}" | grep "${CONFIG.DOCKER_REMOTE_TAG}" | xargs -I {} docker rmi -f {}`
execSync(scriptRemoveImage, { stdio: "inherit" })

// UPDATE VERSION
versionData[mode] = newVersion
fs.writeFileSync('assets/version.json', JSON.stringify(versionData))

console.log(`****** ✅ DEPLOY DONE ********
*****TAG: ${CONFIG.DOCKER_REMOTE_TAG}:${newVersion} *****`);


