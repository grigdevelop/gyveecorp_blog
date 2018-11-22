import { testEnvironment } from "../tools/serverTestUtil";

module.exports = async () => {
    await testEnvironment.globalBegin();
}
