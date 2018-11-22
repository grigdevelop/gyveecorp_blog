import { ServerTestUtil } from "../tools/serverTestUtil";

module.exports = async () => {
    ServerTestUtil.init();
    await ServerTestUtil.run();
}
