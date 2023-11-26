import { PoruEvent } from "../../../global";
import { logWithLabel } from "../../utils/console";
export const event: PoruEvent = {
    name: "nodeConnect",
    run: async (client, node) => {
        logWithLabel("info", `Node ${node.options.identifier} the node has been connected`)
    }
}