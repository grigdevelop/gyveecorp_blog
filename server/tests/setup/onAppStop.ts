import { ServerTestUtil } from "../tools/serverTestUtil";

module.exports = async () => {
    await ServerTestUtil.stop();
}